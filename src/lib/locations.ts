import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Types matching the database
export interface LocationFromDB {
  id: string;
  location_id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phone_display: string;
  hours: string;
  hours_short: string;
  lat: number | null;
  lng: number | null;
  concept: string;
  time_limit_minutes: number | null;
  is_active: boolean;
  display_order: number;
}

// Transform database location to app format
export function transformLocation(loc: LocationFromDB) {
  const concept = loc.concept || "kbbq";
  return {
    id: loc.location_id,
    slug: loc.location_id,
    name: loc.name,
    address: loc.address,
    city: loc.city,
    state: loc.state,
    zip: loc.zip,
    phone: loc.phone,
    phoneDisplay: loc.phone_display,
    phoneE164: `+1${loc.phone.replace(/\D/g, '')}`,
    hours: loc.hours,
    hoursShort: loc.hours_short || loc.hours,
    lat: loc.lat,
    lng: loc.lng,
    concepts: {
      kbbq: concept.includes("kbbq"),
      hotpot: concept.includes("hotpot"),
    },
    concept,
    conceptLabel: concept === "kbbq+hotpot" ? "KBBQ + Hot Pot" : concept === "hotpot" ? "Hot Pot" : "KBBQ",
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address + ', ' + loc.city + ', ' + loc.state + ' ' + loc.zip)}`,
  };
}

// Get all active locations
export async function getLocations(): Promise<ReturnType<typeof transformLocation>[]> {
  const { data, error } = await supabase
    .from('location_info')
    .select('*')
    .eq('is_active', true)
    .order('display_order');

  if (error || !data) {
    console.error('Error fetching locations:', error);
    return [];
  }

  return data.map(transformLocation);
}

// Get single location by slug
export async function getLocationBySlug(slug: string) {
  const { data, error } = await supabase
    .from('location_info')
    .select('*')
    .eq('location_id', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return transformLocation(data);
}

// Get directions URL
export function getDirectionsUrl(location: { address: string; city: string; state: string; zip: string }) {
  const address = `${location.address}, ${location.city}, ${location.state} ${location.zip}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

// Get full address
export function getFullAddress(location: { address: string; city: string; state: string; zip: string }) {
  return `${location.address}, ${location.city}, ${location.state} ${location.zip}`;
}

// Get brand name
export function getBrandName(location: { concepts: { kbbq: boolean; hotpot: boolean } }) {
  if (location.concepts.hotpot && !location.concepts.kbbq) {
    return "Ombu Hotpot";
  }
  return "Ombu Grill";
}

// Site config (will move to settings table)
export const siteConfig = {
  url: "https://ombugrillutah.com",
  name: "Ombu Grill Utah",
  phone: "(801) 561-3577",
};
