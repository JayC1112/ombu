'use client';

import { createClient } from '@/lib/supabase';
import { useState, useEffect } from 'react';

// Types
export interface LocationData {
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

export interface PricingData {
  location_id: string;
  kbbq_lunch: number | null;
  kbbq_dinner: number | null;
  hotpot_lunch: number | null;
  hotpot_dinner: number | null;
  hotpot_addon: number | null;
}

export interface ImageData {
  category: string;
  key: string;
  image_url: string;
  alt_text: string;
}

// Transform location API data to app format
export function transformLocation(loc: LocationData) {
  const concepts = {
    kbbq: loc.concept.includes('kbbq'),
    hotpot: loc.concept.includes('hotpot'),
  };
  
  return {
    id: loc.location_id,
    slug: loc.location_id,
    name: loc.name.replace('Ombu Grill ', '').replace('Ombu Hotpot ', ''),
    fullName: loc.name,
    address: loc.address,
    city: loc.city,
    state: loc.state,
    zip: loc.zip,
    phone: loc.phone,
    phoneDisplay: loc.phone_display,
    phoneE164: `+1${loc.phone}`,
    hours: loc.hours,
    hoursShort: loc.hours_short,
    lat: loc.lat,
    lng: loc.lng,
    concepts,
    timeLimitMinutes: loc.time_limit_minutes,
    isActive: loc.is_active,
    displayOrder: loc.display_order,
  };
}

// Transform pricing API data
export function transformPricing(pricing: PricingData[], locationId: string) {
  const locPricing = pricing.find(p => p.location_id === locationId);
  if (!locPricing) return {};
  
  const result: any = {};
  
  if (locPricing.kbbq_lunch || locPricing.kbbq_dinner) {
    result.kbbq = {};
    if (locPricing.kbbq_lunch) result.kbbq.lunch = locPricing.kbbq_lunch;
    if (locPricing.kbbq_dinner) result.kbbq.dinner = locPricing.kbbq_dinner;
  }
  
  if (locPricing.hotpot_lunch || locPricing.hotpot_dinner || locPricing.hotpot_addon) {
    result.hotpot = {};
    if (locPricing.hotpot_lunch) result.hotpot.lunch = locPricing.hotpot_lunch;
    if (locPricing.hotpot_dinner) result.hotpot.dinner = locPricing.hotpot_dinner;
    if (locPricing.hotpot_addon) result.hotpot.addOnFromKbbq = locPricing.hotpot_addon;
  }
  
  return result;
}

// Gallery image type
export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  alt_text: string;
  category: string;
  display_order: number;
  is_active: boolean;
}

// Site settings type
export interface SiteSettings {
  about_title?: string;
  about_description?: string;
  [key: string]: string | undefined;
}

// Hook to fetch all CMS data
export function useCMSData() {
  const [locations, setLocations] = useState<ReturnType<typeof transformLocation>[]>([]);
  const [pricing, setPricing] = useState<PricingData[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [locRes, priceRes, imgRes, galleryRes, settingsRes] = await Promise.all([
          fetch('/api/cms/locations'),
          fetch('/api/cms/pricing'),
          fetch('/api/cms/images'),
          fetch('/api/cms/gallery'),
          fetch('/api/cms/settings'),
        ]);

        const locData: LocationData[] = await locRes.json();
        const priceData: PricingData[] = await priceRes.json();
        const imgData: ImageData[] = await imgRes.json();
        const galleryData: GalleryImage[] = await galleryRes.json();
        const settingsData: SiteSettings = await settingsRes.json();

        // Filter active locations and transform
        const activeLocations = locData
          .filter((loc: LocationData) => loc.is_active)
          .sort((a: LocationData, b: LocationData) => a.display_order - b.display_order)
          .map(transformLocation);

        setLocations(activeLocations);
        setPricing(priceData);
        setImages(imgData);
        setGalleryImages(galleryData);
        setSiteSettings(settingsData);
      } catch (err) {
        console.error('Failed to fetch CMS data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return { locations, pricing, images, galleryImages, siteSettings, loading, error };
}

// Get pricing for a specific location
export function useLocationPricing(locationId: string) {
  const { pricing } = useCMSData();
  return transformPricing(pricing, locationId);
}

// Get image URL by category and key
export function getImageUrl(images: ImageData[], category: string, key: string): string | null {
  const img = images.find(i => i.category === category && i.key === key);
  return img?.image_url || null;
}

// Get all images for a category
export function getImagesByCategory(images: ImageData[], category: string): ImageData[] {
  return images.filter(i => i.category === category);
}

// Social links (can be moved to settings table later)
export const defaultSocialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/ombuutah', icon: 'instagram' },
  { name: 'TikTok', url: 'https://tiktok.com/@ombu_utah', icon: 'tiktok' },
];

// Build Google Directions URL
export function buildDirectionsUrl(address: string, city: string, state: string, zip: string) {
  const fullAddress = `${address}, ${city}, ${state} ${zip}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;
}
