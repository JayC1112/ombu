import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('display_order')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data || [], { 
    headers: { 
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' 
    } 
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  const { error } = await supabase
    .from('gallery_images')
    .upsert(body)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
