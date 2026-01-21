import { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Scale,
  Users,
  Utensils,
  AlertCircle,
  Baby,
  Salad,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react";
import { locations, siteConfig } from "@/data/locations";

export const metadata: Metadata = {
  title: "AYCE Dining Guidelines | All-You-Can-Eat Rules & Policies",
  description:
    "Ombu Grill all-you-can-eat Korean BBQ dining guidelines. 90-minute time limit, $2/oz leftover fee, 18% gratuity for 6+ guests. Learn our AYCE policies before your visit.",
  keywords: [
    "AYCE guidelines",
    "all you can eat rules",
    "Korean BBQ rules",
    "KBBQ time limit",
    "leftover fee Korean BBQ",
    "Ombu Grill policies",
  ],
  alternates: {
    canonical: `${siteConfig.url}/ayce-guidelines`,
  },
  openGraph: {
    title: "AYCE Dining Guidelines | Ombu Grill",
    description:
      "Everything you need to know before dining at Ombu Grill. Time limits, ordering tips, and policies for the best Korean BBQ experience.",
    url: `${siteConfig.url}/ayce-guidelines`,
  },
};

// FAQ Schema for this page
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the time limit at Ombu Grill?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "During peak hours (dinner time and weekends), there is a 90-minute dining limit. During slower periods, we are more flexible. This ensures all guests can enjoy our restaurant.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a leftover fee at Ombu Grill?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, to minimize food waste, a $2 per ounce fee applies to uneaten food left on the table. We recommend ordering in smaller batches and going back for more as needed.",
      },
    },
    {
      "@type": "Question",
      name: "Is gratuity included for large parties?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, an 18% gratuity is automatically added for parties of 6 or more guests.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a reservation at Ombu Grill?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We operate on a first-come, first-served basis for smaller parties. For large groups of 10 or more, we recommend calling ahead. Walk-ins are always welcome!",
      },
    },
    {
      "@type": "Question",
      name: "Can I bring kids to Ombu Grill?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! Ombu Grill is family-friendly. Kids pricing is based on height: Under 40\" is free, 40\" to 50\" is $9.99, and over 50\" is full price. The interactive grilling experience is fun for all ages.",
      },
    },
    {
      "@type": "Question",
      name: "Does everyone at the table need to order the same thing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all guests at the table must order the same AYCE option. This helps ensure a fair dining experience and allows everyone to enjoy the full variety of meats and sides together.",
      },
    },
  ],
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
      name: "AYCE Guidelines",
      item: `${siteConfig.url}/ayce-guidelines`,
    },
  ],
};

const guidelines = [
  {
    icon: Users,
    title: "Same Menu for the Party",
    description:
      "All guests at the table must order the same AYCE option. This ensures everyone can share and enjoy the full variety of meats and sides together. No splitting between lunch and dinner pricing.",
    important: true,
  },
  {
    icon: Clock,
    title: "90-Minute Time Limit",
    description:
      "During peak hours (dinner time and weekends), dining time is limited to 90 minutes. This allows us to serve all guests efficiently. During slower periods, we may be more flexible—ask your server!",
    important: true,
  },
  {
    icon: Scale,
    title: "Leftover Fee: $2 per Ounce",
    description:
      "To minimize food waste, uneaten food left on the table is charged at $2 per ounce. Order in smaller batches and go back for more—there's no limit to how many rounds you can order!",
    important: true,
  },
  {
    icon: Utensils,
    title: "Ordering Limits per Round",
    description:
      "To ensure fresh, quality food, we recommend ordering 2-3 items per person per round. You can order as many rounds as you like within your time limit. Your server will help pace your meal.",
    important: false,
  },
  {
    icon: Users,
    title: "18% Gratuity for Parties of 6+",
    description:
      "An 18% gratuity is automatically added for parties of 6 or more guests. This helps ensure our staff can provide excellent service to larger groups.",
    important: true,
  },
  {
    icon: AlertCircle,
    title: "No Takeout / No Sharing",
    description:
      "All-you-can-eat food must be consumed at the restaurant. Taking food home or sharing with non-paying guests is not permitted. Each guest must order their own AYCE meal.",
    important: false,
  },
];

const additionalInfo = [
  {
    icon: Baby,
    title: "Kids Pricing (Height-based)",
    description:
      "Under 40\": Free | 40\" to 50\": $9.99 | Over 50\": Full price",
  },
  {
    icon: Salad,
    title: "Allergies & Dietary Needs",
    description:
      "Please inform your server of any allergies before ordering. We offer vegetable options but cannot guarantee a completely allergen-free environment due to shared grills.",
  },
  {
    icon: MapPin,
    title: "Reservations",
    description:
      "Walk-ins welcome! For parties of 10+, we recommend calling ahead to check availability. We do not take reservations for smaller groups.",
  },
];

export default function AYCEGuidelinesPage() {
  return (
    <>
      {/* JSON-LD Schema */}
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
            <Link
              href="/"
              className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              OMBU GRILL
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/menu"
                className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
              >
                Menu
              </Link>
              <Link
                href="/#locations"
                className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
              >
                Locations
              </Link>
              <Link
                href="/#contact"
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <Phone size={16} />
                <span className="hidden sm:inline">Contact</span>
              </Link>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-card/50 to-transparent">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted mb-6">
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                  <ChevronRight size={14} />
                  <span className="text-foreground">AYCE Guidelines</span>
                </nav>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  All-You-Can-Eat{" "}
                  <span className="text-gradient">Dining Guidelines</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl">
                  Everything you need to know for the best Korean BBQ experience at Ombu Grill.
                  Please review these guidelines before your visit.
                </p>
              </div>
            </div>
          </section>

          {/* Main Guidelines */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                  AYCE Rules & Policies
                </h2>
                <div className="space-y-6">
                  {guidelines.map((guideline, index) => (
                    <div
                      key={index}
                      className={`glass rounded-2xl p-6 ${
                        guideline.important ? "border-l-4 border-primary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <guideline.icon className="text-primary" size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {guideline.title}
                          </h3>
                          <p className="text-muted leading-relaxed">
                            {guideline.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Additional Info */}
          <section className="py-12 md:py-16 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                  Additional Information
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {additionalInfo.map((info, index) => (
                    <div key={index} className="glass rounded-xl p-5">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                        <info.icon className="text-accent" size={20} />
                      </div>
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      <p className="text-sm text-muted">{info.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 md:py-16 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Dine?
                </h2>
                <p className="text-muted mb-8 max-w-xl mx-auto">
                  Find your nearest Ombu Grill location and experience Utah&apos;s best
                  all-you-can-eat Korean BBQ.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/menu"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Utensils size={18} />
                    View Full Menu
                  </Link>
                  <Link
                    href="/#locations"
                    className="flex items-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <MapPin size={18} />
                    Find a Location
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Location Quick Links */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Our Locations
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {locations.map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/locations/${loc.slug}`}
                      className="glass rounded-xl p-4 hover:bg-card-hover transition-colors group"
                    >
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {loc.name}
                      </h3>
                      <p className="text-sm text-muted">{loc.address}</p>
                      <p className="text-sm text-muted">
                        {loc.city}, {loc.state}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <Link
                  href="/"
                  className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity"
                >
                  OMBU GRILL
                </Link>
                <p className="text-sm text-muted mt-1">
                  Utah&apos;s #1 Korean BBQ & Hot Pot
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted">
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link href="/menu" className="hover:text-foreground transition-colors">
                  Menu
                </Link>
                <Link href="/#locations" className="hover:text-foreground transition-colors">
                  Locations
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
