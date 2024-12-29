import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mardin/delete.php`, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Authorization': 'pokKSHJleDfT', 
        'Content-Type': 'application/json'
      }
    })
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Internal Server Error' 
    }, { 
      status: 500 
    })
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0