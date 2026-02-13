import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 只保护 /admin 路径（不包括 /admin/login）
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // 检查 session cookie
    const adminSession = request.cookies.get('admin_session')

    if (!adminSession || adminSession.value !== 'true') {
      // 未登录，重定向到登录页
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
