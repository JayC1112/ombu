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
import { siteConfig, getLocations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "AYCE Dining Guidelines | All-You-Can-Eat Rules & Policies",
  description:
    "Ombu Grill all-you-can-eat Korean BBQ dining guidelines. 90-minute time limit, leftover policy, 18% gratuity for 6+ guests. Learn our AYCE policies before your visit.",
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
      name: "Is there a fee for leaving food?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, there is a $10 fee for excessive food waste. We encourage all guests to order responsibly. Our staff is happy to help you gauge the right amount of food for your group.",
      },
    },
    {
      "@type": "Question",
      name: "Can I bring my own food or take food out?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Outside food and beverages are not permitted. Take-out is not allowed for AYCE dining. This is standard practice at all-you-can-eat restaurants.",
      },
    },
    {
      "@type": "Question",
      name: "Do you accept reservations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We do not accept reservations. Seating is first-come, first-served. For large parties (6+), please call ahead to check availability.",
      },
    },
    {
      "@type": "Question",
      name: "What payment methods do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We accept all major credit cards, debit cards, and cash. A valid ID may be required for card payments.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a gratuity charge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An 18% gratuity is automatically added for parties of 6 or more. This ensures our staff is fairly compensated for serving larger groups.",
      },
    },
  ],
};

// Policy content - keeping as static since this rarely changes
const guidelines = [
  {
    id: "time-limit",
    title: "90-Minute Dining Limit",
    icon: Clock,
    description:
      "During peak hours (dinner time and weekends), we enforce a 90-minute dining limit to ensure all guests have an opportunity to enjoy our restaurant. During slower periods, we are more flexible. The timer starts when all guests arrive and orders are placed.",
  },
  {
    id: "waste-fee",
    title: "Food Waste Policy",
    icon: Scale,
    description:
      "To help reduce food waste, we charge $10 for excessive leftovers. Please order only what you can finish. Our staff is happy to help you gauge the right amount of food for your group size.",
  },
  {
    id: "group-policy",
    title: "Large Party Policy",
    icon: Users,
    description:
      "Parties of 6 or more will have an 18% gratuity automatically added. Please let us know in advance if anyone in your group has dietary restrictions or allergies.",
  },
  {
    id: "no-takeout",
    title: "No Outside Food or Takeout",
    icon: Utensils,
    description:
      "Outside food and beverages are not permitted. Take-out is not allowed for AYCE dining. This policy helps us maintain our food quality and hygiene standards.",
  },
  {
    id: "allergies",
    title: "Food Allergies",
    icon: AlertCircle,
    description:
      "Please inform your server of any food allergies. While we strive to accommodate dietary restrictions, cross-contamination may occur in our kitchen.",
  },
  {
    id: "kids-policy",
    title: "Children Policy",
    icon: Baby,
    description:
      "Children under 3 years old eat free (when sharing parent's plate). Regular children's pricing applies for ages 3-8. Students (with valid ID) receive a discount at select locations during off-peak hours.",
  },
  {
    id: "side-dishes",
    title: "Side Dishes & Accompaniments",
    icon: Salad,
    description:
      "All side dishes, kimchi, pickled vegetables, and dipping sauces are included. Please take only what you can finish to minimize waste.",
  },
];

export default async function AyceGuidelinesPage() {
  const locations = await getLocations();

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              <Link href="/locations" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
                Locations
              </Link>
              <Link href="/dining-policy" className="text-sm text-primary hover:text-primary/80 transition-colors hidden sm:block">
                Policies
              </Link>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-card/50 to-transparent">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                {/* Breadcrumb */}
                <nav className="flex items-center justify-center gap-2 text-sm text-muted mb-6">
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                  <ChevronRight size={14} />
                  <span className="text-foreground">Guidelines</span>
                </nav>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  All-You-Can-Eat <span className="text-gradient">Guidelines</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto">
                  Everything you need to know before your visit. Our policies ensure a great experience for everyone.
                </p>
              </div>
            </div>
          </section>

          {/* Guidelines Grid */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  {guidelines.map((guideline) => {
                    const Icon = guideline.icon;
                    return (
                      <div
                        key={guideline.id}
                        className="glass rounded-2xl p-6 hover:bg-card-hover transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                            <Icon size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              {guideline.title}
                            </h3>
                            <p className="text-muted text-sm">
                              {guideline.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="py-12 md:py-16 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Tips for the Best Experience
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="text-3xl mb-3">🍖</div>
                    <h3 className="font-semibold mb-2">Start with Meats</h3>
                    <p className="text-sm text-muted">
                      Begin with our premium meats - they are the highlight of the AYCE experience.
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="text-3xl mb-3">🥗</div>
                    <h3 className="font-semibold mb-2">Side Dishes</h3>
                    <p className="text-sm text-muted">
                      Try our kimchi, pickled vegetables, and sauces - they complement the meats perfectly.
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="text-3xl mb-3">⏰</div>
                    <h3 className="font-semibold mb-2">Come Early or Late</h3>
                    <p className="text-sm text-muted">
                      Avoid peak hours (12-2 PM and 6-8 PM) for a more relaxed dining experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Locations Section */}
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
                <p className="text-sm text-muted">
                  © {new Date().getFullYear()} Ombu Grill Utah. All rights reserved.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <Link href="/dining-policy" className="text-sm text-muted hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/dining-policy" className="text-sm text-muted hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
