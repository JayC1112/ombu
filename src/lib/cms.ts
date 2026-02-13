import { createClient } from '@/lib/supabase'

// Server-side data fetching
export async function getLocationPricing() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('location_pricing')
    .select('*')
    .order('location_id')
  
  if (error) {
    console.error('Error fetching pricing:', error)
    return []
  }
  return data || []
}

export async function getSiteImages() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('site_images')
    .select('*')
    .order('category', { ascending: true })
  
  if (error) {
    console.error('Error fetching images:', error)
    return []
  }
  return data || []
}

export async function updatePricing(locationId: string, pricing: any) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('location_pricing')
    .upsert({ location_id: locationId, ...pricing })
    .select()
  
  if (error) {
    throw error
  }
  return data
}

export async function updateImage(category: string, key: string, imageUrl: string, altText: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('site_images')
    .upsert({ category, key, image_url: imageUrl, alt_text: altText })
    .select()
  
  if (error) {
    throw error
  }
  return data
}
