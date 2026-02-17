import { create } from "zustand";

export type LocationStatus = "idle" | "locating" | "granted" | "denied" | "error";
export type Concept = "kbbq" | "hotpot";

interface Location {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneDisplay: string;
  phoneE164: string;
  hours: string;
  hoursShort: string;
  lat: number | null;
  lng: number | null;
  concept: Concept | Concept[];
}

interface UserCoordinates {
  lat: number;
  lng: number;
}

interface LocationState {
  // State
  userLocation: UserCoordinates | null;
  locationStatus: LocationStatus;
  nearestLocation: Location | null;
  nearestDistance: number | null;
  selectedLocation: Location | null;
  selectedConcept: Concept | null;
  locations: Location[];
  loading: boolean;

  // Computed
  activeLocation: () => Location | null;
  activeConcept: () => Concept | null;

  // Actions
  fetchLocations: () => Promise<void>;
  requestUserLocation: () => void;
  computeNearest: (coords: UserCoordinates) => void;
  setSelectedLocation: (location: Location | null) => void;
  setSelectedConcept: (concept: Concept | null) => void;
  clearSelection: () => void;
}

// Haversine formula
function getDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function transformLocation(loc: any): Location {
  const concept: Concept | Concept[] = loc.concept === 'both' 
    ? ['kbbq', 'hotpot'] 
    : loc.concept === 'hotpot' ? 'hotpot' : 'kbbq'
  
  return {
    id: loc.location_id,
    slug: loc.location_id,
    name: loc.name,
    address: loc.address,
    city: loc.city,
    state: loc.state,
    zip: loc.zip,
    phone: loc.phone,
    phoneDisplay: loc.phone_display || loc.phone,
    phoneE164: loc.phone,
    hours: loc.hours || 'Daily 11 AM - 10 PM',
    hoursShort: loc.hours_short || '11AM-10PM',
    lat: loc.lat,
    lng: loc.lng,
    concept,
  }
}

export function getAvailableConcepts(location: Location): Concept[] {
  if (Array.isArray(location.concept)) {
    return location.concept
  }
  return [location.concept]
}

export function getConceptLabel(concept: Concept): string {
  return concept === 'kbbq' ? 'Korean BBQ' : 'Hot Pot'
}

export const useLocationStore = create<LocationState>((set, get) => ({
  userLocation: null,
  locationStatus: "idle",
  nearestLocation: null,
  nearestDistance: null,
  selectedLocation: null,
  selectedConcept: null,
  locations: [],
  loading: true,

  activeLocation: () => {
    const state = get();
    return state.selectedLocation || state.nearestLocation;
  },

  activeConcept: () => {
    const state = get();
    const activeLocation = state.selectedLocation || state.nearestLocation;
    if (!activeLocation) return null;

    if (state.selectedConcept) {
      const available = getAvailableConcepts(activeLocation);
      if (available.includes(state.selectedConcept)) {
        return state.selectedConcept;
      }
    }

    const available = getAvailableConcepts(activeLocation);
    return available[0] || null;
  },

  fetchLocations: async () => {
    try {
      const res = await fetch('/api/cms/locations', { next: { revalidate: 60 } })
      const data = await res.json()
      
      if (Array.isArray(data)) {
        const locations = data.map(transformLocation)
        set({ locations, loading: false })
        
        // Auto-detect nearest if we have user location
        const state = get()
        if (state.userLocation) {
          get().computeNearest(state.userLocation)
        }
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error)
      set({ loading: false })
    }
  },

  requestUserLocation: () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      set({ locationStatus: "error" });
      return;
    }

    set({ locationStatus: "locating" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
        set({ userLocation: coords, locationStatus: "granted" });
        get().computeNearest(coords);
      },
      (error) => {
        set({ locationStatus: error.code === error.PERMISSION_DENIED ? "denied" : "error" });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  },

  computeNearest: (coords: UserCoordinates) => {
    const { locations } = get();
    let minDistance = Infinity;
    let nearest: Location | null = null;

    locations.forEach((location) => {
      if (location.lat && location.lng) {
        const distance = getDistanceMiles(coords.lat, coords.lng, location.lat, location.lng);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = location;
        }
      }
    });

    set({ nearestLocation: nearest, nearestDistance: nearest ? Math.round(minDistance * 10) / 10 : null });
  },

  setSelectedLocation: (location: Location | null) => {
    set({ selectedLocation: location, selectedConcept: null });
  },

  setSelectedConcept: (concept: Concept | null) => {
    set({ selectedConcept: concept });
  },

  clearSelection: () => {
    set({ selectedLocation: null, selectedConcept: null });
  },
}));

// Get pricing for a location
export async function getPricing(location: Location, concept: Concept): Promise<{ lunch: number | null; dinner: number | null } | null> {
  try {
    const res = await fetch(`/api/cms/pricing?location_id=${location.slug}`, { next: { revalidate: 60 } })
    const data = await res.json()
    
    if (!data || data.length === 0) return null
    
    const pricing = data[0]
    if (concept === 'kbbq') {
      return { lunch: pricing.lunch_price, dinner: pricing.dinner_price }
    } else if (concept === 'hotpot') {
      return { lunch: pricing.hotpot_lunch || pricing.lunch_price, dinner: pricing.hotpot_dinner || pricing.dinner_price }
    }
    return null
  } catch {
    return null
  }
}
