import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken, COOKIE_NAME, type TokenPayload } from './auth'

/**
 * Verify JWT from request cookies. Returns payload on success, or a 401 Response.
 */
export async function requireAuth(
  _request: Request
): Promise<TokenPayload | NextResponse> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return payload
}
