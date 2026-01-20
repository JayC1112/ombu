export type Concept = "kbbq" | "hotpot";

export interface LocationPricing {
  kbbq?: {
    lunch: number;
    dinner: number;
  };
  hotpot?: {
    lunch?: number;
    dinner?: number;
    addOnFromKbbq?: number;
    note?: string;
  };
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneDisplay: string;
  hours: string;
  hoursShort: string;
  lat: number | null;
  lng: number | null;
  concepts: {
    kbbq: boolean;
    hotpot: boolean;
  };
  pricing: LocationPricing;
  menuUrl?: string;
  googleMapsUrl?: string;
}

export const locations: Location[] = [
  {
    id: "midvale",
    slug: "midvale",
    name: "Midvale",
    address: "6930 S State St",
    city: "Midvale",
    state: "UT",
    zip: "84047",
    phone: "8015613577",
    phoneDisplay: "(801) 561-3577",
    hours: "Daily 11 AM - 10 PM",
    hoursShort: "11AM-10PM",
    lat: 40.6111,
    lng: -111.8919,
    concepts: { kbbq: true, hotpot: false },
    pricing: {
      kbbq: { lunch: 16.99, dinner: 25.99 },
    },
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ombu+Grill+6930+S+State+St%2C+Midvale%2C+UT+84047",
  },
  {
    id: "slc",
    slug: "salt-lake-city",
    name: "Salt Lake City",
    address: "1438 State St",
    city: "Salt Lake City",
    state: "UT",
    zip: "84115",
    phone: "8014844848",
    phoneDisplay: "(801) 484-4848",
    hours: "Daily 11 AM - 10 PM",
    hoursShort: "11AM-10PM",
    lat: 40.7449,
    lng: -111.8883,
    concepts: { kbbq: true, hotpot: false },
    pricing: {
      kbbq: { lunch: 16.99, dinner: 25.99 },
    },
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ombu+Grill+1438+S+State+St%2C+Salt+Lake+City%2C+UT+84115",
  },
  {
    id: "layton",
    slug: "layton",
    name: "Layton",
    address: "1120 N Main St",
    city: "Layton",
    state: "UT",
    zip: "84041",
    phone: "3855619140",
    phoneDisplay: "(385) 561-9140",
    hours: "Daily 11 AM - 10 PM",
    hoursShort: "11AM-10PM",
    lat: 41.0779,
    lng: -111.9627,
    concepts: { kbbq: true, hotpot: false },
    pricing: {
      kbbq: { lunch: 16.99, dinner: 25.99 },
    },
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ombu+Grill+1120+N+Main+St%2C+Layton%2C+UT+84041",
  },
  {
    id: "orem",
    slug: "orem",
    name: "Orem",
    address: "147 N State St",
    city: "Orem",
    state: "UT",
    zip: "84057",
    phone: "8012246667",
    phoneDisplay: "(801) 224-6667",
    hours: "Daily 11 AM - 10 PM",
    hoursShort: "11AM-10PM",
    lat: 40.2989,
    lng: -111.6946,
    concepts: { kbbq: true, hotpot: false },
    pricing: {
      kbbq: { lunch: 16.99, dinner: 26.99 },
    },
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ombu+Grill+147+N+State+St%2C+Orem%2C+UT+84057",
  },
  {
    id: "south-jordan",
    slug: "south-jordan",
    name: "South Jordan",
    address: "11460 District Dr",
    city: "South Jordan",
    state: "UT",
    zip: "84095",
    phone: "3852812984",
    phoneDisplay: "(385) 281-2984",
    hours: "Daily 11 AM - 10 PM",
    hoursShort: "11AM-10PM",
    lat: 40.5607,
    lng: -111.9294,
    concepts: { kbbq: true, hotpot: true },
    pricing: {
      kbbq: { lunch: 17.99, dinner: 26.99 },
      hotpot: {
        addOnFromKbbq: 5,
        note: "+$5 add-on to KBBQ price",
      },
    },
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ombu+Grill+11460+District+Dr%2C+South+Jordan%2C+UT+84095",
  },
  {
    id: "south-salt-lake",
    slug: "south-salt-lake",
    name: "South Salt Lake",
    address: "3424 S State St",
    city: "South Salt Lake",
    state: "UT",
    zip: "84115",
    phone: "3853018732",
    phoneDisplay: "(385) 301-8732",
    hours: "Daily 12 PM - 12 AM",
    hoursShort: "12PM-12AM",
    lat: 40.7046,
    lng: -111.8883,
    concepts: { kbbq: false, hotpot: true },
    pricing: {
      hotpot: {
        lunch: 19.99,
        dinner: 29.99,
      },
    },
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ombu+Hotpot+3424+S+State+St%2C+South+Salt+Lake%2C+UT+84115",
  },
];

export const socialLinks = {
  instagram: "https://instagram.com/ombuutah",
  tiktok: "https://tiktok.com/@ombu_utah",
};

export const siteConfig = {
  name: "Ombu Grill",
  domain: "ombugrillutah.com",
  url: "https://ombugrillutah.com",
};

// Helper to generate Google Maps directions URL
export function getDirectionsUrl(location: Location): string {
  if (location.lat && location.lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
  }
  const address = encodeURIComponent(
    `${location.address}, ${location.city}, ${location.state} ${location.zip}`
  );
  return `https://www.google.com/maps/dir/?api=1&destination=${address}`;
}

// Helper to get Google Maps embed URL
export function getMapsEmbedUrl(location: Location): string {
  const query = encodeURIComponent(
    `${location.address}, ${location.city}, ${location.state} ${location.zip}`
  );
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

// Helper to get concept label
export function getConceptLabel(location: Location): string {
  if (location.concepts.kbbq && location.concepts.hotpot) {
    return "KBBQ + Hot Pot";
  }
  if (location.concepts.kbbq) {
    return "KBBQ";
  }
  if (location.concepts.hotpot) {
    return "Hot Pot";
  }
  return "";
}

// Helper to get brand name based on concept
export function getBrandName(location: Location): string {
  if (location.concepts.hotpot && !location.concepts.kbbq) {
    return "Ombu Hotpot";
  }
  return "Ombu Grill";
}

// Helper to get available concepts for a location
export function getAvailableConcepts(location: Location): Concept[] {
  const concepts: Concept[] = [];
  if (location.concepts.kbbq) concepts.push("kbbq");
  if (location.concepts.hotpot) concepts.push("hotpot");
  return concepts;
}

// Helper to get pricing for a specific concept at a location
export function getPricing(
  location: Location,
  concept: Concept
): { lunch: number | null; dinner: number | null; note?: string } | null {
  if (concept === "kbbq" && location.pricing.kbbq) {
    return {
      lunch: location.pricing.kbbq.lunch,
      dinner: location.pricing.kbbq.dinner,
    };
  }

  if (concept === "hotpot" && location.pricing.hotpot) {
    const hp = location.pricing.hotpot;

    // If hotpot has direct pricing
    if (hp.lunch !== undefined && hp.dinner !== undefined) {
      return {
        lunch: hp.lunch,
        dinner: hp.dinner,
      };
    }

    // If hotpot is add-on to KBBQ
    if (hp.addOnFromKbbq !== undefined && location.pricing.kbbq) {
      return {
        lunch: location.pricing.kbbq.lunch + hp.addOnFromKbbq,
        dinner: location.pricing.kbbq.dinner + hp.addOnFromKbbq,
        note: hp.note || `+$${hp.addOnFromKbbq} add-on`,
      };
    }
  }

  return null;
}

// Helper to get primary pricing display
export function getPrimaryPricing(location: Location): {
  lunch: number;
  dinner: number;
  concept: string;
  hotpotAddon?: number;
} | null {
  if (location.pricing.kbbq) {
    return {
      lunch: location.pricing.kbbq.lunch,
      dinner: location.pricing.kbbq.dinner,
      concept: "KBBQ",
      hotpotAddon: location.pricing.hotpot?.addOnFromKbbq,
    };
  }
  if (location.pricing.hotpot?.lunch && location.pricing.hotpot?.dinner) {
    return {
      lunch: location.pricing.hotpot.lunch,
      dinner: location.pricing.hotpot.dinner,
      concept: "Hot Pot",
    };
  }
  return null;
}

// Helper to find location by slug
export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((loc) => loc.slug === slug);
}

// Helper to find location by id
export function getLocationById(id: string): Location | undefined {
  return locations.find((loc) => loc.id === id);
}

// Get full address string
export function getFullAddress(location: Location): string {
  return `${location.address}, ${location.city}, ${location.state} ${location.zip}`;
}
