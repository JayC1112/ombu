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

// Site settings functions
export async function getSiteSettings() {
  const supabase = createClient()
  const { data } = await supabase.from('site_settings').select('*')
  
  if (!data) return {}
  
  const settings: Record<string, string> = {}
  data.forEach((item: any) => {
    settings[item.id] = item.value
  })
  return settings
}
