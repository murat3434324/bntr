import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mardin/admin.php`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'pokKSHJleDfT'
        }
      }
    )

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error('Admin API error:', error?.response?.data || error?.message)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Admin API request body:', body)

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/mardin/admin.php`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'pokKSHJleDfT'
        }
      }
    )

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error('Admin API error:', error?.response?.data || error?.message)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    )
  }
}