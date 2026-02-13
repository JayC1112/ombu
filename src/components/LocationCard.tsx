"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, Clock, Navigation, Check, Beef, Soup } from "lucide-react";
import { useLocationStore } from "@/store/locationStore";
import { buildDirectionsUrl } from "@/hooks/useCMSData";
import ImagePlaceholder from "./ImagePlaceholder";
import { PRICING_HIDDEN_MESSAGE } from "@/config/pricingVisibility";

// Type for transformed location from useCMSData hook
interface TransformedLocation {
  id: string;
  slug: string;
  name: string;
  fullName?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneDisplay: string;
  phoneE164?: string;
  hours: string;
  hoursShort?: string;
  lat: number | null;
  lng: number | null;
  concepts: {
    kbbq: boolean;
    hotpot: boolean;
  };
  timeLimitMinutes?: number | null;
  isActive?: boolean;
  displayOrder?: number;
}

interface LocationCardProps {
  location: TransformedLocation;
  index: number;
}

export default function LocationCard({ location, index }: LocationCardProps) {
  const {
    nearestLocation,
    selectedLocation,
    setSelectedLocation,
    locationStatus,
  } = useLocationStore();

  // Check if this is the nearest location
  const isNearest =
    locationStatus === "granted" &&
    nearestLocation?.id === location.id &&
    !selectedLocation;

  // Check if this is the selected location
  const isSelected = selectedLocation?.id === location.id;

  // Handle selecting this location
  const handleSelect = () => {
    setSelectedLocation(location);
  };

  // Get concept info from the transformed format
  const { concepts } = location;
  const hasBoth = concepts.kbbq && concepts.hotpot;
  const isKbbqOnly = concepts.kbbq && !concepts.hotpot;
  const isHotpotOnly = concepts.hotpot && !concepts.kbbq;
  
  const conceptLabel = hasBoth ? 'KBBQ & Hot Pot' : isKbbqOnly ? 'KBBQ' : 'Hot Pot';

  // Get directions URL
  const directionsUrl = buildDirectionsUrl(location.address, location.city, location.state, location.zip);

  // Display name - use fullName if available
  const displayName = location.fullName || location.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass rounded-2xl overflow-hidden hover:bg-card-hover transition-all duration-300 relative ${
        isNearest ? "ring-2 ring-accent" : ""
      } ${isSelected ? "ring-2 ring-primary glow" : ""}`}
    >
      {/* Location Image - using placeholder for now */}
      <div className="relative w-full h-36 bg-gradient-to-br from-card via-card-hover to-primary/20">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

        {/* Status Badge - on image overlay */}
        {isNearest && !isSelected && (
          <div className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
            Nearest to you
          </div>
        )}
        {isSelected && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Check size={12} />
            Selected
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Header with Name and Concept Badge */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold">{displayName}</h3>
          <div
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              hasBoth
                ? "bg-gradient-to-r from-primary/20 to-accent/20 text-foreground"
                : isKbbqOnly
                ? "bg-primary/20 text-primary"
                : "bg-accent/20 text-accent"
            }`}
          >
            {(isKbbqOnly || hasBoth) && <Beef size={12} />}
            {(isHotpotOnly || hasBoth) && <Soup size={12} />}
            <span>{conceptLabel}</span>
          </div>
        </div>

        {/* Location Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <MapPin className="text-primary mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-foreground">{location.address}</p>
              <p className="text-muted text-sm">
                {location.city}, {location.state} {location.zip}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-primary shrink-0" size={18} />
            <a
              href={`tel:${location.phone}`}
              onClick={handleSelect}
              className="text-foreground hover:text-primary transition-colors"
            >
              {location.phoneDisplay}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-primary shrink-0" size={18} />
            <span className="text-muted">{location.hours}</span>
          </div>
        </div>

        {/* Pricing Message (no actual prices shown) */}
        <div className="bg-card/50 rounded-xl p-3 mb-4">
          <p className="text-sm text-muted">{PRICING_HIDDEN_MESSAGE.short}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <a
            href={`tel:${location.phone}`}
            onClick={handleSelect}
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors"
          >
            <Phone size={16} />
            Call
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSelect}
            className="flex-1 flex items-center justify-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground py-3 rounded-xl font-medium transition-colors"
          >
            <Navigation size={16} />
            Directions
          </a>
        </div>

        {/* Link to store page */}
        <Link
          href={`/locations/${location.slug}`}
          className="block mt-3 text-center text-sm text-primary hover:underline"
        >
          View Location Details
        </Link>
      </div>
    </motion.div>
  );
}
