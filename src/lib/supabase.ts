import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // During build time, return a dummy client
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase env vars not set - using mock client')
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder'
    )
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
