"use client";

import { Instagram, Music2, MapPin, Phone, Navigation, Utensils } from "lucide-react";
import { useCMSData, defaultSocialLinks, buildDirectionsUrl } from "@/hooks/useCMSData";
import { useLocationStore } from "@/store/locationStore";
import { scrollToSection } from "@/utils/scrollTo";
import { Loader2 } from "lucide-react";

export default function Footer() {
  const { locations, siteSettings, loading } = useCMSData();
  const currentYear = new Date().getFullYear();

  // Get active location for mobile CTA
  const { locationStatus, selectedLocation, nearestLocation, activeLocation } =
    useLocationStore();
  const currentLocation = activeLocation();

  // Determine CTA state
  const hasSelectedLocation = selectedLocation !== null;
  const hasNearestLocation =
    locationStatus === "granted" && nearestLocation !== null;
  const hasActiveLocation =
    currentLocation !== null && (hasSelectedLocation || hasNearestLocation);

  // Build directions URL for current location
  const getDirectionsUrl = (loc: any) => {
    return buildDirectionsUrl(loc.address, loc.city, loc.state, loc.zip);
  };

  if (loading) {
    return (
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-gradient mb-4">
                {siteSettings.site_name?.toUpperCase() || 'OMBU GRILL'}
              </h3>
              <p className="text-muted mb-4">
                {siteSettings.site_description || `Utah&apos;s #1 Korean BBQ & Hot Pot experience with ${locations.length} locations to serve you.`}
              </p>
              <div className="flex gap-3">
                {defaultSocialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-card-hover flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon === 'instagram' ? <Instagram size={18} /> : <Music2 size={18} />}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <a
                    href="/menu"
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    Full Menu
                  </a>
                </li>
                <li>
                  <a
                    href="/ayce-guidelines"
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    AYCE Guidelines
                  </a>
                </li>
                <li>
                  <a
                    href="/dining-policy"
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    Dining Policy
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("locations")}
                    className="text-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    Locations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-semibold mb-4">Hours</h4>
              <div className="space-y-2 text-muted">
                <p>Open Daily</p>
                <p className="text-foreground font-medium">Most: 11 AM - 10 PM</p>
                <p className="text-sm">South Salt Lake: 12 PM - 12 AM</p>
                <p className="text-sm mt-3">
                  Lunch: 11 AM - 3 PM
                  <br />
                  Dinner: 3 PM - Close
                </p>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h4 className="font-semibold mb-4">Locations</h4>
              <ul className="space-y-3">
                {locations.slice(0, 4).map((location) => (
                  <li key={location.id} className="flex items-start gap-2">
                    <MapPin
                      className="text-primary shrink-0 mt-0.5"
                      size={14}
                    />
                    <div className="text-sm">
                      <p className="text-foreground">{location.fullName || location.name}</p>
                      <a
                        href={`tel:${location.phone}`}
                        className="text-muted hover:text-primary transition-colors"
                      >
                        {location.phoneDisplay}
                      </a>
                    </div>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => scrollToSection("locations")}
                    className="text-primary hover:underline text-sm cursor-pointer"
                  >
                    View all {locations.length} locations →
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted text-sm">
              © {currentYear} Ombu Grill Utah. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA Spacer - Prevents content from being hidden behind fixed CTA */}
      <div className="h-[72px] md:hidden" />

      {/* Sticky Mobile CTA - Dynamic based on location */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden glass border-t border-border p-3 z-40 safe-area-inset-bottom">
        <div className="flex gap-2">
          {hasActiveLocation && currentLocation ? (
            <>
              <a
                href={`tel:${currentLocation.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors"
              >
                <Phone size={18} />
                Call {currentLocation.name}
              </a>
              <a
                href={getDirectionsUrl(currentLocation)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-card-hover border border-border text-foreground py-3 px-4 rounded-xl font-medium transition-colors"
              >
                <Navigation size={18} />
              </a>
            </>
          ) : (
            <>
              <button
                onClick={() => scrollToSection("menu")}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors cursor-pointer"
              >
                <Utensils size={18} />
                View Menu
              </button>
              <button
                onClick={() => scrollToSection("locations")}
                className="flex-1 flex items-center justify-center gap-2 bg-card-hover border border-border text-foreground py-3 rounded-xl font-medium transition-colors cursor-pointer"
              >
                <MapPin size={18} />
                Locations
              </button>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
