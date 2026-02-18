import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/apiAuth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  const auth = await requireAuth(request)
  if (auth instanceof NextResponse) return auth

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string
    const key = formData.get('key') as string
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `${category}/${key}-${Date.now()}.${ext}`

    // Resolve content type (HEIC from iPhone may have empty type)
    const contentType = file.type || (ext === 'heic' ? 'image/heic' : ext === 'heif' ? 'image/heif' : 'application/octet-stream')

    // Upload to Supabase Storage with service role
    const { error: uploadError } = await supabase.storage
      .from('cms-images')
      .upload(fileName, buffer, {
        contentType,
        upsert: true
      })

    if (uploadError) {
      const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY
      console.error('Storage upload failed:', uploadError.message, { hasServiceKey, fileName, contentType })
      return NextResponse.json({
        error: uploadError.message,
        debug: { hasServiceKey },
      }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('cms-images')
      .getPublicUrl(fileName)

    // Update site_images database (skip for gallery uploads — gallery has its own table)
    if (category !== 'gallery') {
      const { error: dbError } = await supabase
        .from('site_images')
        .upsert({
          category,
          key,
          image_url: urlData.publicUrl,
          alt_text: key,
        }, {
          onConflict: 'category,key',
        })

      if (dbError) {
        return NextResponse.json({ error: dbError.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, url: urlData.publicUrl })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
