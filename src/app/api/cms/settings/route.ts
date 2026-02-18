import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/apiAuth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Convert to key-value format
  const settings: Record<string, string> = {}
  data?.forEach((item: any) => {
    settings[item.id] = item.value
  })

  return NextResponse.json(settings, { 
    headers: { 
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
    } 
  })
}

export async function POST(request: Request) {
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  const body = await request.json()
  const { id, value } = body

  const { error } = await supabase
    .from('site_settings')
    .upsert({ id, value }, { onConflict: 'id' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
