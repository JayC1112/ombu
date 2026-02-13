import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('visitor_stats')
    .select('*')
    .order('date', { ascending: false })
    .limit(30)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const totalVisits = data?.reduce((sum, row) => sum + (row.visits || 0), 0) || 0

  return NextResponse.json({
    records: data || [],
    totalVisits,
    period: '30 days'
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  const { error } = await supabase
    .from('visitor_stats')
    .insert(body)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
