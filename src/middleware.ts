import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')
  const isAuth = !!authToken
  const isAuthPage = request.nextUrl.pathname === '/admin'
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/admin/sistem')

  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL('/admin/sistem', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}