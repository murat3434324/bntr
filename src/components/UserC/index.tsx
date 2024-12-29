'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'

const UserTracker = () => {
  const pathname = usePathname()
  const router = useRouter()
  const lastRedirectPage = useRef<string | null>(null)
  const lastCheckedTime = useRef<number>(Date.now())

  const getUserOS = () => {
    const userAgent = window.navigator.userAgent
    const platform = window.navigator.platform
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
    const iosPlatforms = ['iPhone', 'iPad', 'iPod']
    let os = null

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS'
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS'
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows'
    } else if (/Android/.test(userAgent)) {
      os = 'Android'
    } else if (/Linux/.test(platform)) {
      os = 'Linux'
    }

    return os || 'Unknown'
  }

  const getCurrentDateTime = () => {
    const now = new Date()
    return now.toISOString().slice(0, 19).replace('T', ' ')
  }

  // Sadece admin değişikliği olduğunda yönlendir
  const checkAdminRedirect = async () => {
    try {
      const response = await axios.get('/api/redirect')
      const data = response.data

      if (data.success && data.page && data.lastUpdate) {
        // Admin tarafından yapılan güncel bir değişiklik var mı kontrol et
        const updateTime = new Date(data.lastUpdate).getTime()
        
        if (
          updateTime > lastCheckedTime.current && // Yeni bir güncelleme var
          data.page !== pathname && // Farklı bir sayfa
          data.page !== lastRedirectPage.current // Daha önce yönlendirilmediğimiz bir sayfa
        ) {
          lastRedirectPage.current = data.page
          lastCheckedTime.current = updateTime
          router.push(data.page)
        }
      }
    } catch (error) {
      console.error('Redirect check error:', error)
    }
  }

  // Kullanıcının mevcut sayfasını DB'ye kaydet
  const updateCurrentPage = async () => {
    try {
      const userData = {
        action: 'add',
        os: getUserOS(),
        lastOnline: getCurrentDateTime(),
        page: pathname
      }

      await axios.post('/api/track', userData)
    } catch (error) {
      console.error('Page update error:', error)
    }
  }

  useEffect(() => {
    // Her sayfa değişiminde mevcut sayfayı güncelle
    updateCurrentPage()

    // Her 3 saniyede bir admin yönlendirmesi kontrol et
    const redirectInterval = setInterval(checkAdminRedirect, 3000)

    // Her 3 saniyede bir mevcut sayfayı güncelle
    const updateInterval = setInterval(updateCurrentPage, 3000)

    return () => {
      clearInterval(redirectInterval)
      clearInterval(updateInterval)
    }
  }, [pathname])

  return null
}

export default UserTracker