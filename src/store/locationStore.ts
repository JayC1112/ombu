import { create } from "zustand";
import {
  locations,
  type Location,
  type Concept,
  getAvailableConcepts,
} from "@/data/locations";

export type LocationStatus = "idle" | "locating" | "granted" | "denied" | "error";

interface UserCoordinates {
  lat: number;
  lng: number;
}

interface LocationState {
  // State
  userLocation: UserCoordinates | null;
  locationStatus: LocationStatus;
  nearestLocation: Location | null;
  nearestDistance: number | null; // in miles
  selectedLocation: Location | null; // User manually selected
  selectedConcept: Concept | null; // Selected concept (kbbq or hotpot)

  // Computed: returns selectedLocation if set, otherwise nearestLocation
  activeLocation: () => Location | null;

  // Computed: returns the active concept for the active location
  activeConcept: () => Concept | null;

  // Actions
  requestUserLocation: () => void;
  computeNearest: (coords: UserCoordinates) => void;
  setSelectedLocation: (location: Location | null) => void;
  setSelectedConcept: (concept: Concept | null) => void;
  clearSelection: () => void;
}

// Haversine formula to calculate distance between two points
function getDistanceMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  // Initial state
  userLocation: null,
  locationStatus: "idle",
  nearestLocation: null,
  nearestDistance: null,
  selectedLocation: null,
  selectedConcept: null,

  // Computed: get active location (selected > nearest)
  activeLocation: () => {
    const state = get();
    return state.selectedLocation || state.nearestLocation;
  },

  // Computed: get active concept for the active location
  activeConcept: () => {
    const state = get();
    const activeLocation = state.selectedLocation || state.nearestLocation;

    if (!activeLocation) return null;

    // If user selected a concept, use it (if valid for this location)
    if (state.selectedConcept) {
      const available = getAvailableConcepts(activeLocation);
      if (available.includes(state.selectedConcept)) {
        return state.selectedConcept;
      }
    }

    // Default to first available concept
    const available = getAvailableConcepts(activeLocation);
    return available[0] || null;
  },

  // Request user's geolocation
  requestUserLocation: () => {
    // Check if geolocation is available
    if (typeof window === "undefined" || !navigator.geolocation) {
      set({ locationStatus: "error" });
      return;
    }

    set({ locationStatus: "locating" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        set({
          userLocation: coords,
          locationStatus: "granted",
        });
        // Compute nearest after getting location
        get().computeNearest(coords);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          set({ locationStatus: "denied" });
        } else {
          set({ locationStatus: "error" });
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  },

  // Compute nearest location from user coordinates
  computeNearest: (coords: UserCoordinates) => {
    let minDistance = Infinity;
    let nearest: Location | null = null;

    locations.forEach((location) => {
      // Skip locations without valid lat/lng
      if (location.lat === null || location.lng === null) {
        return;
      }

      const distance = getDistanceMiles(
        coords.lat,
        coords.lng,
        location.lat,
        location.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearest = location;
      }
    });

    set({
      nearestLocation: nearest,
      nearestDistance: nearest ? Math.round(minDistance * 10) / 10 : null,
    });
  },

  // Set a manually selected location (from clicking a location card)
  setSelectedLocation: (location: Location | null) => {
    set({
      selectedLocation: location,
      // Reset concept when changing location
      selectedConcept: null,
    });
  },

  // Set selected concept (kbbq or hotpot)
  setSelectedConcept: (concept: Concept | null) => {
    set({ selectedConcept: concept });
  },

  // Clear selection (both location and concept)
  clearSelection: () => {
    set({
      selectedLocation: null,
      selectedConcept: null,
    });
  },
}));
