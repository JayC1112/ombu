import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Clock, Navigation } from "lucide-react";
import { locations, siteConfig, getDirectionsUrl, getConceptLabel } from "@/data/locations";
import { PRICING_HIDDEN_MESSAGE } from "@/config/pricingVisibility";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "All Ombu Grill Locations in Utah | Find a Location Near You",
  description:
    "Find all Ombu Grill locations in Utah. 6 locations across Salt Lake City, Midvale, South Jordan, Layton, Orem, and South Salt Lake. View addresses, hours, phone numbers, and get directions.",
  keywords: [
    "Ombu Grill locations",
    "Korean BBQ Utah",
    "Ombu Grill near me",
    "all you can eat Utah",
    "KBBQ locations",
    "hot pot locations Utah",
  ],
  alternates: {
    canonical: `${siteConfig.url}/locations`,
  },
  openGraph: {
    title: "All Ombu Grill Locations in Utah",
    description:
      "Find all 6 Ombu Grill locations across Utah. View addresses, hours, phone numbers, and get directions to your nearest location.",
    url: `${siteConfig.url}/locations`,
  },
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Locations",
      item: `${siteConfig.url}/locations`,
    },
  ],
};

export default function LocationsPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-card/50 to-transparent">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted mb-6">
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                  <ChevronRight size={14} />
                  <span className="text-foreground">Locations</span>
                </nav>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  All <span className="text-gradient">Ombu Locations</span> in Utah
                </h1>
                <p className="text-xl text-muted max-w-2xl">
                  Visit any of our 6 locations across Utah. Find addresses, hours, phone numbers, and get directions to your nearest Ombu Grill.
                </p>
              </div>
            </div>
          </section>

          {/* Locations Grid */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {locations.map((location) => {
                    const hasBoth = location.concepts.kbbq && location.concepts.hotpot;
                    const conceptLabel = getConceptLabel(location);

                    return (
                      <div
                        key={location.id}
                        className="glass rounded-2xl overflow-hidden hover:bg-card-hover transition-all duration-300"
                      >
                        {/* Location Header */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold">{location.name}</h3>
                            <div className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/20 text-primary">
                              {conceptLabel}
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

                          {/* Pricing Message */}
                          <div className="bg-card/50 rounded-xl p-3 mb-4">
                            <p className="text-sm text-muted">{PRICING_HIDDEN_MESSAGE.short}</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 mb-3">
                            <a
                              href={`tel:${location.phone}`}
                              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors"
                            >
                              <Phone size={16} />
                              Call
                            </a>
                            <a
                              href={getDirectionsUrl(location)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground py-3 rounded-xl font-medium transition-colors"
                            >
                              <Navigation size={16} />
                              Directions
                            </a>
                          </div>

                          {/* View Details Link */}
                          <Link
                            href={`/locations/${location.slug}`}
                            className="block text-center text-sm text-primary hover:underline"
                          >
                            View Location Details →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Info Message */}
                <div className="mt-12 glass rounded-2xl p-6 text-center">
                  <p className="text-muted text-sm mb-4">
                    {PRICING_HIDDEN_MESSAGE.long}
                  </p>
                  <p className="text-muted text-sm">
                    Hours vary by location. Most stores: 11 AM – 10 PM. South Salt Lake (Hot Pot): 12 PM – 12 AM.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
