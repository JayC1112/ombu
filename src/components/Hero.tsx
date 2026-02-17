"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Flame,
  MapPin,
  Phone,
  Navigation,
  Clock,
  Loader2,
  Soup,
  Beef,
} from "lucide-react";
import {
  getDirectionsUrl,
  getPricing,
  getAvailableConcepts,
  getConceptLabel,
} from "@/data/locations";
import { useLocationStore } from "@/store/locationStore";
import { heroImage } from "@/data/images";
import ImagePlaceholder from "./ImagePlaceholder";
import { shouldShowPricing } from "@/config/pricingVisibility";
import { scrollToSection } from "@/utils/scrollTo";
import { useDisplayPrices } from "@/utils/priceGate";

export default function Hero() {
  const [heroImgUrl, setHeroImgUrl] = useState<string | null>(null)
  
  // Use the shared location store
  const {
    locationStatus,
    nearestLocation,
    nearestDistance,
    selectedLocation,
    activeLocation,
    activeConcept,
    requestUserLocation,
    setSelectedConcept,
  } = useLocationStore();

  // Load hero image from database
  useEffect(() => {
    fetch('/api/cms/images')
      .then(res => res.json())
      .then(data => {
        const hero = data.find((img: any) => img.category === 'hero' && img.key === 'hero')
        if (hero?.image_url) {
          setHeroImgUrl(hero.image_url)
        }
      })
      .catch(console.error)
  }, [])

  // Request location on mount
  useEffect(() => {
    requestUserLocation();
  }, [requestUserLocation]);

  // Get the active location and concept
  const currentLocation = activeLocation();
  const currentConcept = activeConcept();
  const isLocating = locationStatus === "locating";

  // Determine if we have an active location to show
  const hasSelectedLocation = selectedLocation !== null;
  const hasNearestLocation = locationStatus === "granted" && nearestLocation !== null;
  const hasActiveLocation = currentLocation !== null && (hasSelectedLocation || hasNearestLocation);

  // Get available concepts and pricing for the current location
  const availableConcepts = currentLocation
    ? getAvailableConcepts(currentLocation)
    : [];
  const hasBothConcepts = availableConcepts.length === 2;
  const pricing = currentLocation && currentConcept
    ? getPricing(currentLocation, currentConcept)
    : null;

  // Check if pricing should be shown
  // IMPORTANT: Only show prices when user has selected a location OR geolocation succeeded
  const displayPrices = useDisplayPrices();
  const canShowPricing = shouldShowPricing("heroNearest");
  const shouldShowPrices = canShowPricing && displayPrices;

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Hero Image */}
      <div className="absolute inset-0">
        {heroImgUrl ? (
          <img src={heroImgUrl} alt="Hero" className="w-full h-full object-cover" />
        ) : (
          <ImagePlaceholder
            image={heroImage}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        {/* Decorative blurs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-4 md:mb-6"
          >
            <Flame className="text-primary" size={18} />
            <span className="text-sm font-medium text-foreground">
              6 Locations Across Utah • Open Daily
            </span>
          </div>

          {/* Main Heading - SEO Focused */}
          <h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 leading-tight"
          >
            Utah&apos;s #1{" "}
            <span className="text-gradient">All-You-Can-Eat</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Korean BBQ & Hot Pot
          </h1>

          {/* Price highlight - Only show when location is selected */}
          {displayPrices && (
            <div
              className="flex flex-wrap justify-center gap-2 mb-4"
            >
              {currentLocation && pricing && (
                <>
                  <span className="inline-flex items-center gap-1 bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                    Lunch from ${pricing.lunch?.toFixed(2) || "16.99"}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    Dinner from ${pricing.dinner?.toFixed(2) || "25.99"}
                  </span>
                </>
              )}
            </div>
          )}
          {!displayPrices && (
            <div
              className="flex flex-wrap justify-center gap-2 mb-4"
            >
              <button
                onClick={() => scrollToSection("locations")}
                className="inline-flex items-center gap-1 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/30 transition-colors"
              >
                <MapPin size={14} />
                Select a location to view pricing
              </button>
            </div>
          )}

          {/* Subtitle */}
          <p
            className="text-base md:text-xl text-muted mb-6 md:mb-8 max-w-2xl mx-auto px-2"
          >
            Premium bulgogi, galbi, pork belly & 50+ items grilled at your table.
            Walk-ins welcome • No reservations needed.
          </p>

          {/* Dynamic Pricing Section - ONLY place where pricing is shown */}
          <div
            className="mb-8"
          >
            {/* Loading State */}
            {isLocating && (
              <div className="flex items-center justify-center gap-3 mb-4">
                <Loader2 className="animate-spin text-primary" size={20} />
                <span className="text-muted">Finding nearest location...</span>
              </div>
            )}

            {/* Has Nearest Location with Geolocation - Show dynamic pricing */}
            {shouldShowPrices && currentLocation && pricing && (
              <div className="space-y-4">
                {/* Concept Toggle (for South Jordan which has both) */}
                {hasBothConcepts && (
                  <div className="flex justify-center gap-2 mb-4">
                    {availableConcepts.map((concept) => (
                      <button
                        key={concept}
                        onClick={() => setSelectedConcept(concept)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          currentConcept === concept
                            ? "bg-primary text-white"
                            : "bg-card hover:bg-card-hover text-muted border border-border"
                        }`}
                      >
                        {concept === "kbbq" ? (
                          <Beef size={16} />
                        ) : (
                          <Soup size={16} />
                        )}
                        {concept === "kbbq" ? "KBBQ" : "Hot Pot"}
                      </button>
                    ))}
                  </div>
                )}

                {/* Pricing Chips */}
                <div className="flex flex-wrap justify-center gap-3">
                  {/* Concept Badge */}
                  <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                    {currentConcept === "kbbq" ? (
                      <Beef size={16} className="text-primary" />
                    ) : (
                      <Soup size={16} className="text-accent" />
                    )}
                    <span className="text-sm font-medium text-foreground">
                      {currentConcept === "kbbq" ? "Korean BBQ" : "Hot Pot"}
                    </span>
                  </div>

                  {/* Lunch Price */}
                  <div className="glass rounded-full px-5 py-2.5 flex items-center gap-2">
                    <span className="text-muted text-sm">Lunch</span>
                    <span className="font-bold text-foreground">
                      ${pricing.lunch?.toFixed(2)}
                    </span>
                  </div>

                  {/* Dinner Price */}
                  <div className="glass rounded-full px-5 py-2.5 flex items-center gap-2 ring-2 ring-primary/50">
                    <span className="text-muted text-sm">Dinner</span>
                    <span className="font-bold text-foreground">
                      ${pricing.dinner?.toFixed(2)}
                    </span>
                  </div>

                  {/* Hours */}
                  <div className="glass rounded-full px-5 py-2.5 flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    <span className="text-foreground text-sm font-medium">
                      {currentLocation.hours}
                    </span>
                  </div>
                </div>

                {/* Add-on Note (for Hot Pot at South Jordan) */}
                {pricing.note && (
                  <p className="text-sm text-accent mt-2">
                    {pricing.note}
                  </p>
                )}

                {/* Location indicator */}
                <p className="text-sm text-muted mt-2">
                  Prices for{" "}
                  <span className="text-foreground font-medium">
                    {currentLocation.name}
                  </span>
                  {" (nearest)"}
                </p>
              </div>
            )}

            {/* No pricing available - Show select location prompt */}
            {!displayPrices && !isLocating && (
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 max-w-md mx-auto">
                  <p className="text-lg font-medium text-foreground mb-2">
                    Select a Location to View Pricing
                  </p>
                  <p className="text-muted text-sm mb-4">
                    Choose a location below to see pricing for that store.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => scrollToSection("locations")}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-xl font-semibold transition-colors cursor-pointer"
                    >
                      <MapPin size={18} />
                      Find Location
                    </button>
                    <button
                      onClick={() => scrollToSection("menu")}
                      className="flex-1 flex items-center justify-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground py-3 px-6 rounded-xl font-semibold transition-colors cursor-pointer"
                    >
                      View Menu
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Location Card (when active) */}
          {hasActiveLocation && currentLocation && (
            <div
              className="glass rounded-2xl p-5 max-w-lg mx-auto mb-8 glow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="text-primary" size={18} />
                  <span className="font-semibold text-foreground">
                    {hasSelectedLocation ? "Selected Location" : "Nearest Location"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {nearestDistance && !hasSelectedLocation && (
                    <span className="text-sm text-muted">
                      {nearestDistance} mi away
                    </span>
                  )}
                  <span className="text-xs bg-card px-2 py-1 rounded-full text-muted">
                    {getConceptLabel(currentLocation)}
                  </span>
                </div>
              </div>

              <div className="text-left mb-4">
                <h3 className="text-xl font-bold text-foreground">
                  {currentLocation.name}
                </h3>
                <p className="text-muted">
                  {currentLocation.address}, {currentLocation.city},{" "}
                  {currentLocation.state} {currentLocation.zip}
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:${currentLocation.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  <Phone size={18} />
                  {currentLocation.phoneDisplay}
                </a>
                <a
                  href={getDirectionsUrl(currentLocation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground px-5 py-3 rounded-xl font-semibold transition-colors"
                >
                  <Navigation size={18} />
                  Directions
                </a>
              </div>
            </div>
          )}

          {/* Secondary CTA */}
          <div
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => scrollToSection("locations")}
              className="text-muted hover:text-foreground transition-colors text-sm underline underline-offset-4 cursor-pointer"
            >
              View All 6 Locations
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => scrollToSection("menu")}
              className="text-muted hover:text-foreground transition-colors text-sm underline underline-offset-4 cursor-pointer"
            >
              See Full Menu
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <ChevronDown size={24} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
