import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Use service role for server-side operations (bypasses RLS for admin)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('location_info')
    .select('*')
    .order('display_order')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { 
    headers: { 
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' 
    } 
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  const { error } = await supabase
    .from('location_info')
    .upsert(body, { onConflict: 'location_id' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url)
  const locationId = searchParams.get('location_id')
  
  if (!locationId) {
    return NextResponse.json({ error: 'location_id required' }, { status: 400 })
  }

  const body = await request.json()
  
  const { error } = await supabase
    .from('location_info')
    .update(body)
    .eq('location_id', locationId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const locationId = searchParams.get('location_id')
  
  if (!locationId) {
    return NextResponse.json({ error: 'location_id required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('location_info')
    .delete()
    .eq('location_id', locationId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
