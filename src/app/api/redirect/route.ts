// app/api/redirect/route.ts
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const formatIP = (ip: string): string => {
  if (ip.startsWith('::ffff:')) {
    return ip.substring(7)
  }
  return ip
}

export async function GET(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const rawIp = forwarded?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    request.ip ||
    request.headers.get('x-client-ip') ||
    'Unknown'

  const ip = formatIP(rawIp)

  try {
    // IP için güncel yönlendirme verisini al
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mardin/redirect.php?ipAddress=${ip}`
    )

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error('Error fetching redirect data:', error?.response?.data || error?.message)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    )
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/mardin/redirect.php`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/mardin/redirect.php`,
      {
        data: { id: body.id },
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    )
  }
}