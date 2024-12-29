// app/api/track/route.ts
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const formatIP = (ip: string): string => {
  if (ip.startsWith('::ffff:')) {
    return ip.substring(7)
  }
  return ip
}

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const rawIp = forwarded?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    request.ip ||
    request.headers.get('x-client-ip') ||
    'Unknown'

  const ip = formatIP(rawIp)

  try {
    const body = await request.json()
    
    // Online ve sistem verisi için istek
    const userData = {
      action: 'add',
      ipAddress: ip,
      os: body.os,
      lastOnline: body.lastOnline
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/mardin/ips.php`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    // Redirect verisi için istek - her zaman güncel sayfayı gönder
    const redirectData = {
      action: 'add',
      ipAddress: ip,
      page: body.page // Kullanıcının güncel sayfası
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/mardin/redirect.php`,
      redirectData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error in tracking API:', error?.response?.data || error?.message)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    )
  }
}