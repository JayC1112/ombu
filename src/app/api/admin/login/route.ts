import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { signToken, COOKIE_NAME, MAX_AGE } from '@/lib/auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: '请输入邮箱和密码' }, { status: 400 })
  }

  const { data: user, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('is_active', true)
    .single()

  if (error || !user) {
    return NextResponse.json({ error: '邮箱或密码错误' }, { status: 401 })
  }

  // Support both bcrypt hash and legacy plaintext (for migration)
  let passwordValid = false
  if (user.password_hash.startsWith('$2')) {
    passwordValid = await bcrypt.compare(password, user.password_hash)
  } else {
    // Legacy plaintext — allow login but should be migrated
    passwordValid = user.password_hash === password
  }

  if (!passwordValid) {
    return NextResponse.json({ error: '邮箱或密码错误' }, { status: 401 })
  }

  const token = await signToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  })

  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })

  return response
}
