"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone, MapPin, Navigation, Utensils } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLocationStore } from "@/store/locationStore";
import { buildDirectionsUrl } from "@/hooks/useCMSData";

const navLinks = [
  { href: "/#home", label: "Home", sectionId: "home" },
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/#menu", label: "Menu", sectionId: "menu" },
  { href: "/#locations", label: "Locations", sectionId: "locations" },
  { href: "/#contact", label: "Contact", sectionId: "contact" },
  { href: "/dining-policy", label: "Dining Policy", sectionId: null },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Get location state from store
  const {
    locationStatus,
    nearestLocation,
    selectedLocation,
    activeLocation,
  } = useLocationStore();

  // The active location is selectedLocation > nearestLocation
  const currentLocation = activeLocation();

  // Determine CTA state
  const hasSelectedLocation = selectedLocation !== null;
  const hasNearestLocation = locationStatus === "granted" && nearestLocation !== null;
  const hasActiveLocation = currentLocation !== null && (hasSelectedLocation || hasNearestLocation);

  // CTA label
  const callLabel = hasSelectedLocation
    ? `Call ${currentLocation?.name}`
    : hasNearestLocation
    ? "Call Nearest"
    : null;

  // Handle navigation with smooth scroll
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string | null) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);

    // If sectionId is null, it's a regular page link - let it navigate normally
    if (sectionId === null) {
      return;
    }

    e.preventDefault();

    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // If we're on the home page, scroll after menu closes
    if (pathname === "/") {
      // Small delay to allow menu close animation
      setTimeout(scrollToSection, 50);
    } else {
      // Navigate to home page first, then scroll
      router.push("/");
      // Wait for navigation to complete
      setTimeout(scrollToSection, 300);
    }
  }, [pathname, router]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="text-2xl font-bold text-gradient"
          >
            OMBU GRILL
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.sectionId)}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group cursor-pointer"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* Dynamic CTA Buttons */}
          {hasActiveLocation && currentLocation ? (
            // Location available: Show Call + Directions
            <div className="flex items-center gap-2">
              <a
                href={`tel:${currentLocation.phone}`}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-medium transition-colors"
              >
                <Phone size={16} />
                <span>{callLabel}</span>
              </a>
              <a
                href={buildDirectionsUrl(currentLocation.address, currentLocation.city, currentLocation.state, currentLocation.zip)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground px-4 py-2.5 rounded-full font-medium transition-colors"
                title="Get directions"
              >
                <Navigation size={16} />
              </a>
            </div>
          ) : (
            // No location: Show View Menu + Locations
            <div className="flex items-center gap-2">
              <Link
                href="/#menu"
                onClick={(e) => handleNavClick(e, "menu")}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-medium transition-colors cursor-pointer"
              >
                <Utensils size={16} />
                <span>View Menu</span>
              </Link>
              <Link
                href="/#locations"
                onClick={(e) => handleNavClick(e, "locations")}
                className="flex items-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground px-4 py-2.5 rounded-full font-medium transition-colors cursor-pointer"
              >
                <MapPin size={16} />
                <span>Locations</span>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground hover:bg-card/50 rounded-lg transition-colors active:scale-95"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`md:hidden overflow-hidden ${!isMobileMenuOpen ? "pointer-events-none" : ""}`}
      >
        <div className="glass mt-2 mx-4 rounded-2xl">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.sectionId)}
                className="text-left text-foreground hover:text-primary py-3 px-4 rounded-xl hover:bg-card transition-colors cursor-pointer active:bg-card"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="flex gap-2 mt-2">
              {hasActiveLocation && currentLocation ? (
                <>
                  <a
                    href={`tel:${currentLocation.phone}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors"
                  >
                    <Phone size={16} />
                    {callLabel}
                  </a>
                  <a
                    href={buildDirectionsUrl(currentLocation.address, currentLocation.city, currentLocation.state, currentLocation.zip)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-card hover:bg-card-hover text-foreground py-3 px-4 rounded-xl font-medium transition-colors border border-border"
                  >
                    <Navigation size={16} />
                  </a>
                </>
              ) : (
                <>
                  <Link
                    href="/#menu"
                    onClick={(e) => handleNavClick(e, "menu")}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors cursor-pointer active:bg-primary-dark"
                  >
                    <Utensils size={16} />
                    Menu
                  </Link>
                  <Link
                    href="/#locations"
                    onClick={(e) => handleNavClick(e, "locations")}
                    className="flex-1 flex items-center justify-center gap-2 bg-card hover:bg-card-hover text-foreground py-3 rounded-xl font-medium transition-colors border border-border cursor-pointer active:bg-card-hover"
                  >
                    <MapPin size={16} />
                    Locations
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </motion.div>
    </header>
  );
}
