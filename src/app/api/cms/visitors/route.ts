import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locationId = searchParams.get('location_id')
  const days = parseInt(searchParams.get('days') || '30')
  
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {},
      },
    }
  )

  // Get stats for the last N days
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  let query = supabase
    .from('visitor_stats')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false })

  if (locationId) {
    query = query.eq('location_id', locationId)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Calculate summary stats
  const totalVisits = data?.length || 0
  const uniquePages = new Set(data?.map(d => d.page_path)).size
  
  // Group by location
  const byLocation: Record<string, number> = {}
  data?.forEach(d => {
    const loc = d.location_id || 'direct'
    byLocation[loc] = (byLocation[loc] || 0) + 1
  })

  // Group by page
  const byPage: Record<string, number> = {}
  data?.forEach(d => {
    byPage[d.page_path] = (byPage[d.page_path] || 0) + 1
  })

  // Group by date
  const byDate: Record<string, number> = {}
  data?.forEach(d => {
    const date = d.created_at.split('T')[0]
    byDate[date] = (byDate[date] || 0) + 1
  })

  return NextResponse.json({
    totalVisits,
    uniquePages,
    byLocation: Object.entries(byLocation).map(([loc, count]) => ({ location: loc, count })),
    byPage: Object.entries(byPage).map(([page, count]) => ({ page, count })),
    byDate: Object.entries(byDate).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)),
    recentVisits: data?.slice(0, 100) || [],
  })
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {},
      },
    }
  )

  const body = await request.json()
  const { location_id, page_path, event_type, referrer } = body

  const { error } = await supabase
    .from('visitor_stats')
    .insert({
      location_id,
      page_path: page_path || '/',
      event_type: event_type || 'pageview',
      referrer,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
