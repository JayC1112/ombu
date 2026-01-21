import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Utensils,
  ChevronRight,
  Beef,
  Soup,
  ExternalLink,
  Car,
  Star,
  Info,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import {
  locations,
  getLocationBySlug,
  getDirectionsUrl,
  getConceptLabel,
  getFullAddress,
  getBrandName,
  siteConfig,
  type Location,
} from "@/data/locations";
import { diningGuidelines } from "@/data/diningGuidelines";
import { getLocationFAQs } from "@/data/faq";
import { getLocationImage } from "@/data/images";
import { getLocationContent } from "@/data/locationContent";

// Generate static params for all locations
export async function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

// Generate metadata for each location
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  const content = getLocationContent(slug);

  if (!location) {
    return { title: "Location Not Found" };
  }

  const brandName = getBrandName(location);
  const conceptLabel = getConceptLabel(location);

  const title = content?.seoTitle || `${brandName} ${location.name} | Best ${conceptLabel} in ${location.city}, Utah`;
  const description = content?.seoDescription || `Best all-you-can-eat ${conceptLabel} in ${location.city}, UT. ${brandName} offers unlimited Korean BBQ from $16.99.`;

  const locationKeywords = [
    `Korean BBQ ${location.city}`,
    `KBBQ ${location.city} Utah`,
    `all you can eat ${location.city}`,
    `best Korean BBQ ${location.city}`,
    `${conceptLabel} ${location.city}`,
    `Korean restaurant ${location.city}`,
    `Asian BBQ ${location.city}`,
    `unlimited BBQ ${location.city} Utah`,
    `Ombu Grill ${location.city}`,
  ];

  return {
    title,
    description,
    keywords: locationKeywords,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/locations/${location.slug}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: `/images/locations/${location.id}.webp`,
          width: 1200,
          height: 630,
          alt: `${brandName} ${location.name} - ${conceptLabel} in ${location.city}, Utah`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/locations/${location.slug}`,
    },
  };
}

// JSON-LD Schema generators
function generateRestaurantSchema(location: Location) {
  const brandName = getBrandName(location);
  const isLateNight = location.hours.includes("12 AM");

  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": `${siteConfig.url}/locations/${location.slug}`,
    name: `${brandName} - ${location.name}`,
    image: `${siteConfig.url}/images/locations/${location.id}.webp`,
    url: `${siteConfig.url}/locations/${location.slug}`,
    telephone: location.phoneDisplay,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: "US",
    },
    geo: location.lat && location.lng ? {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    } : undefined,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: isLateNight ? "12:00" : "11:00",
      closes: isLateNight ? "00:00" : "22:00",
    },
    servesCuisine: (() => {
      const cuisines = ["Korean", "Asian", "All-You-Can-Eat"];
      if (location.concepts.kbbq) cuisines.push("BBQ", "Korean BBQ");
      if (location.concepts.hotpot) cuisines.push("Hot Pot");
      return cuisines;
    })(),
    menu: `${siteConfig.url}/menu`,
    hasMenu: {
      "@type": "Menu",
      url: `${siteConfig.url}/menu`,
    },
    acceptsReservations: "No",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    currenciesAccepted: "USD",
    areaServed: {
      "@type": "City",
      name: location.city,
    },
    ...(location.googleMapsUrl && { sameAs: [location.googleMapsUrl] }),
  };
}

function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function generateBreadcrumbSchema(location: Location) {
  const brandName = getBrandName(location);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${siteConfig.url}/#locations` },
      { "@type": "ListItem", position: 3, name: `${brandName} ${location.name}`, item: `${siteConfig.url}/locations/${location.slug}` },
    ],
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  const content = getLocationContent(slug);

  if (!location) {
    notFound();
  }

  const brandName = getBrandName(location);
  const conceptLabel = getConceptLabel(location);
  const fullAddress = getFullAddress(location);
  const directionsUrl = getDirectionsUrl(location);
  const locationImage = getLocationImage(location.id);

  // Combine standard FAQs with location-specific FAQs
  const standardFaqs = getLocationFAQs(location.concepts.hotpot);
  const locationFaqs = content?.faqs || [];
  const allFaqs = [...locationFaqs, ...standardFaqs];

  const restaurantSchema = generateRestaurantSchema(location);
  const faqSchema = generateFAQSchema(allFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema(location);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-border">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity">
              OMBU GRILL
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/menu" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
                Menu
              </Link>
              <Link href="/ayce-guidelines" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
                Guidelines
              </Link>
              <Link href="/#locations" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
                All Locations
              </Link>
              <a
                href={`tel:${location.phone}`}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <Phone size={16} />
                <span className="hidden sm:inline">Call Now</span>
              </a>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative">
            <div className="relative h-64 md:h-80 lg:h-96">
              <ImagePlaceholder image={locationImage} fill priority sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted mb-4">
                  <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                  <ChevronRight size={14} />
                  <Link href="/#locations" className="hover:text-foreground transition-colors">Locations</Link>
                  <ChevronRight size={14} />
                  <span className="text-foreground">{location.name}</span>
                </nav>

                {/* Title Card */}
                <div className="glass rounded-2xl p-6 md:p-8">
                  {/* Concept Badge */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                      location.concepts.kbbq && location.concepts.hotpot
                        ? "bg-gradient-to-r from-primary/20 to-accent/20 text-foreground"
                        : location.concepts.kbbq ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                    }`}>
                      {location.concepts.kbbq && <Beef size={14} />}
                      {location.concepts.hotpot && <Soup size={14} />}
                      {conceptLabel}
                    </span>
                    <span className="text-sm text-muted">All-You-Can-Eat</span>
                  </div>

                  {/* H1 Title - SEO Optimized */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {content?.h1 || `${brandName} – ${location.name}`}
                  </h1>

                  {/* Intro Text */}
                  {content?.intro && (
                    <p className="text-lg text-muted mb-6">{content.intro}</p>
                  )}

                  {/* Quick Info Grid - NAP */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-card/50">
                      <MapPin className="text-primary shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-sm text-muted mb-1">Address</p>
                        <p className="font-medium">{location.address}</p>
                        <p className="text-sm text-muted">{location.city}, {location.state} {location.zip}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-card/50">
                      <Phone className="text-primary shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-sm text-muted mb-1">Phone</p>
                        <a href={`tel:${location.phone}`} className="font-medium hover:text-primary transition-colors">
                          {location.phoneDisplay}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-card/50">
                      <Clock className="text-primary shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-sm text-muted mb-1">Hours</p>
                        <p className="font-medium">{location.hours}</p>
                        <p className="text-xs text-muted mt-1">Lunch: 11AM-3PM | Dinner: 3PM+</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-card/50">
                      <Utensils className="text-primary shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-sm text-muted mb-1">Last Seating</p>
                        <p className="font-medium">{content?.lastSeating || "30 min before close"}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a href={`tel:${location.phone}`} className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                      <Phone size={18} /> Call {location.phoneDisplay}
                    </a>
                    <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground px-6 py-3 rounded-xl font-semibold transition-colors">
                      <Navigation size={18} /> Get Directions
                    </a>
                    <Link href="/menu" className="flex items-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground px-6 py-3 rounded-xl font-semibold transition-colors">
                      <Utensils size={18} /> View Menu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About This Location - Unique Content */}
          {content?.description && (
            <section className="py-12 md:py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    About {brandName} {location.name}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    {content.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted leading-relaxed mb-4">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Parking & Landmarks */}
          {content && (
            <section className="py-12 md:py-16 bg-card/30">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Getting Here</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Parking */}
                    <div className="glass rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Car className="text-primary" size={24} />
                        <h3 className="font-semibold text-lg">Parking</h3>
                      </div>
                      <p className="text-muted">{content.parking}</p>
                    </div>

                    {/* Nearby Landmarks */}
                    <div className="glass rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="text-primary" size={24} />
                        <h3 className="font-semibold text-lg">Nearby Landmarks</h3>
                      </div>
                      <ul className="space-y-2">
                        {content.landmarks.map((landmark, index) => (
                          <li key={index} className="text-muted flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {landmark}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Neighborhood Description */}
                  {content.neighborhoodDescription && (
                    <p className="text-muted mt-6 text-center">
                      {content.neighborhoodDescription}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Special Features */}
          {content?.specialFeatures && content.specialFeatures.length > 0 && (
            <section className="py-12 md:py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">What Makes Us Special</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {content.specialFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 glass rounded-xl p-4">
                        <Star className="text-primary shrink-0 mt-0.5" size={18} />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Dining Guidelines */}
          <section className="py-12 md:py-16 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">Dining Guidelines</h2>
                  <div className="flex items-center gap-4">
                    <Link href="/dining-policy" className="text-primary hover:underline text-sm flex items-center gap-1">
                      Dining Policy <ChevronRight size={14} />
                    </Link>
                    <Link href="/ayce-guidelines" className="text-primary hover:underline text-sm flex items-center gap-1">
                      View All Guidelines <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {diningGuidelines.map((guideline) => (
                    <div key={guideline.id} className="glass rounded-xl p-5 hover:bg-card-hover transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <guideline.icon className="text-primary" size={24} />
                      </div>
                      <h3 className="font-semibold mb-2">{guideline.title}</h3>
                      <p className="text-sm text-muted">{guideline.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Find Us</h2>
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="relative h-64 md:h-80 bg-card">
                    <iframe
                      src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
                      width="100%" height="100%" style={{ border: 0 }}
                      allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${brandName} ${location.name}`}
                    />
                  </div>
                  <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="font-medium">{fullAddress}</p>
                        <p className="text-sm text-muted">{location.hours}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <CopyButton text={fullAddress} />
                      <a href={directionsUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
                        <ExternalLink size={16} /> Open in Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-16 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
                  <Link href="/ayce-guidelines" className="text-primary hover:underline text-sm flex items-center gap-1">
                    Full FAQ <ChevronRight size={14} />
                  </Link>
                </div>
                <div className="space-y-4">
                  {allFaqs.slice(0, 8).map((faq, index) => (
                    <details key={index} className="glass rounded-xl group">
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-medium hover:bg-card-hover transition-colors rounded-xl">
                        {faq.question}
                        <ChevronRight size={20} className="text-muted transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-5 pb-5 text-muted">{faq.answer}</div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Internal Links - Other Locations */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Other Ombu Grill Locations</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {locations.filter((loc) => loc.id !== location.id).map((loc) => (
                    <Link key={loc.id} href={`/locations/${loc.slug}`}
                      className="glass rounded-xl p-4 hover:bg-card-hover transition-colors group">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{loc.name}</h3>
                        <span className="text-xs text-muted">{getConceptLabel(loc)}</span>
                      </div>
                      <p className="text-sm text-muted">{loc.address}</p>
                      <p className="text-sm text-muted">{loc.city}, {loc.state}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="py-8 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 text-sm">
                <Link href="/menu" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
                  <Utensils size={16} /> Full Menu
                </Link>
                <span className="text-border">|</span>
                <Link href="/ayce-guidelines" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
                  <Info size={16} /> AYCE Guidelines
                </Link>
                <span className="text-border">|</span>
                <Link href="/#locations" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
                  <MapPin size={16} /> All 6 Locations
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <Link href="/" className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity">
                  OMBU GRILL
                </Link>
                <p className="text-sm text-muted mt-1">Utah&apos;s #1 Korean BBQ & Hot Pot</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <Link href="/menu" className="hover:text-foreground transition-colors">Menu</Link>
                <Link href="/ayce-guidelines" className="hover:text-foreground transition-colors">Guidelines</Link>
                <Link href="/#locations" className="hover:text-foreground transition-colors">Locations</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden glass border-t border-border p-3 z-40">
          <div className="flex gap-2">
            <a href={`tel:${location.phone}`}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors">
              <Phone size={18} /> Call Now
            </a>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-card-hover border border-border text-foreground py-3 px-4 rounded-xl font-medium transition-colors">
              <Navigation size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
