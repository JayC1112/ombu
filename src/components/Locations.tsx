'use client';

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, Loader2, RotateCcw, Beef, Soup, Filter } from "lucide-react";
import { useLocationStore } from "@/store/locationStore";
import LocationCard from "./LocationCard";
import { PRICING_HIDDEN_MESSAGE } from "@/config/pricingVisibility";

type FilterType = "all" | "kbbq" | "hotpot";

// Types matching API response
interface ApiLocation {
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

// Transform API data to expected format
function transformLocation(loc: ApiLocation) {
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
    pricing: {}, // Will be fetched separately
    timeLimitMinutes: loc.time_limit_minutes,
    isActive: loc.is_active,
  };
}

export default function Locations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<FilterType>("all");
  const [locations, setLocations] = useState<ReturnType<typeof transformLocation>[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    locationStatus,
    nearestLocation,
    selectedLocation,
    requestUserLocation,
    clearSelection,
  } = useLocationStore();

  const isLocating = locationStatus === "locating";
  const hasSelection = selectedLocation !== null;
  const [locationImages, setLocationImages] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchLocations() {
      try {
        const [locRes, imgRes] = await Promise.all([
          fetch('/api/cms/locations'),
          fetch('/api/cms/images')
        ]);
        const data: ApiLocation[] = await locRes.json();
        const images = await imgRes.json();
        
        const activeLocations = data.filter((loc: ApiLocation) => loc.is_active);
        setLocations(activeLocations.map(transformLocation));
        
        // Set location images
        const imgMap: Record<string, string> = {};
        images.filter((img: any) => img.category === 'location').forEach((img: any) => {
          imgMap[img.key] = img.image_url;
        });
        setLocationImages(imgMap);
      } catch (err) {
        console.error('Failed to fetch locations:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLocations();
  }, []);

  // Filter locations based on concept
  const filteredLocations = locations.filter((location) => {
    if (filter === "all") return true;
    if (filter === "kbbq") return location.concepts.kbbq;
    if (filter === "hotpot") return location.concepts.hotpot;
    return true;
  });

  // Sort locations: selected first, then nearest, then rest
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    if (selectedLocation) {
      if (a.id === selectedLocation.id) return -1;
      if (b.id === selectedLocation.id) return 1;
    }
    if (nearestLocation && locationStatus === "granted") {
      if (a.id === nearestLocation.id) return -1;
      if (b.id === nearestLocation.id) return 1;
    }
    return 0;
  });

  // Helper function for concept label
  function getConceptLabel(loc: ReturnType<typeof transformLocation>) {
    if (loc.concepts.kbbq && loc.concepts.hotpot) return 'KBBQ & Hot Pot';
    if (loc.concepts.hotpot) return 'Hot Pot';
    return 'KBBQ';
  }

  if (loading) {
    return (
      <section id="locations" className="py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="animate-spin mx-auto" size={32} />
          <p className="mt-4 text-muted">Loading locations...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="locations" className="py-24 relative bg-background">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Find a <span className="text-gradient">Location</span>
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto mb-4">
              Visit any of our 6 locations across Utah.
            </p>
            <p className="text-sm text-muted max-w-2xl mx-auto mb-8">
              Hours vary by location. Most stores: 11 AM – 10 PM. South Salt Lake (Hot Pot): 12 PM – 12 AM.
            </p>

            {/* Filter + Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {/* Concept Filter */}
              <div className="flex items-center gap-1 bg-card rounded-full p-1">
                <button
                  onClick={() => setFilter("all")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === "all"
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <Filter size={14} />
                  All
                </button>
                <button
                  onClick={() => setFilter("kbbq")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === "kbbq"
                      ? "bg-primary text-white"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <Beef size={14} />
                  KBBQ
                </button>
                <button
                  onClick={() => setFilter("hotpot")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === "hotpot"
                      ? "bg-accent text-white"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <Soup size={14} />
                  Hot Pot
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {/* Find Near Me Button */}
              {locationStatus !== "granted" && (
                <button
                  onClick={requestUserLocation}
                  disabled={isLocating}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-70 text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
                >
                  {isLocating ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <MapPin size={18} />
                  )}
                  {isLocating ? "Finding..." : "Find Near Me"}
                </button>
              )}

              {/* Clear Selection Button */}
              {hasSelection && (
                <button
                  onClick={clearSelection}
                  className="inline-flex items-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground px-6 py-3 rounded-full font-medium transition-all duration-300"
                >
                  <RotateCcw size={18} />
                  Clear Selection
                </button>
              )}
            </div>

            {/* Location Status Messages */}
            {locationStatus === "denied" && (
              <p className="text-muted text-sm mt-4">
                Location access denied. You can still browse all locations below.
              </p>
            )}
            {locationStatus === "error" && (
              <p className="text-muted text-sm mt-4">
                Could not get your location. You can still browse all locations
                below.
              </p>
            )}
          </motion.div>

          {/* What to Expect - Trust Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass rounded-2xl p-6 mb-10 text-center"
          >
            <h3 className="text-lg font-semibold mb-3 text-foreground">What to Expect</h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-2">
                <Beef size={16} className="text-primary" />
                All-you-can-eat Korean BBQ
              </span>
              <span className="flex items-center gap-2">
                <Soup size={16} className="text-accent" />
                Hot Pot at select locations
              </span>
              <span>Cook at your table</span>
              <span>Fresh banchan (sides) daily</span>
              <span>6 Utah locations</span>
            </div>
          </motion.div>

          {/* Location Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLocations.map((location, index) => (
              <LocationCard
                key={location.id}
                location={location}
                index={index}
                imageUrl={locationImages[location.slug] || null}
              />
            ))}
          </div>

          {/* Empty State */}
          {sortedLocations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted">
                No locations found with the selected filter.
              </p>
              <button
                onClick={() => setFilter("all")}
                className="mt-4 text-primary hover:underline"
              >
                Show all locations
              </button>
            </div>
          )}

          {/* Static SEO Trust Block - Location Details with Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 glass rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              All <span className="text-gradient">Ombu Locations</span> in Utah
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              {locations.map((loc) => (
                <a
                  key={loc.id}
                  href={`/locations/${loc.slug}`}
                  className="block space-y-1 p-4 -m-4 rounded-xl hover:bg-card-hover transition-colors group"
                >
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {loc.concepts.hotpot && !loc.concepts.kbbq ? "Ombu Hotpot" : "Ombu Grill"} – {loc.name}
                  </h4>
                  <p className="text-muted">{loc.address}</p>
                  <p className="text-muted">{loc.city}, {loc.state} {loc.zip}</p>
                  <p className="text-muted">Phone: {loc.phoneDisplay}</p>
                  <p className="text-muted">Hours: {loc.hours}</p>
                  <p className="text-muted">
                    Offers: {getConceptLabel(loc)}
                    {loc.concepts.kbbq && loc.concepts.hotpot && " (Both available)"}
                  </p>
                  <span className="text-primary text-xs group-hover:underline">
                    View location details →
                  </span>
                </a>
              ))}
            </div>
            <p className="text-center text-muted mt-6 text-sm">
              {PRICING_HIDDEN_MESSAGE.long}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
