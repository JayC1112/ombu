import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import { policySections, policyFooter } from "@/data/diningPolicy";
import { siteConfig } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Dining Policy | Ombu Grill - Restaurant Rules & Guidelines",
  description:
    "Learn about Ombu Grill's dining policies including pricing, time limits, service charges, and more. We want to set clear expectations to ensure a great experience for everyone.",
  keywords: [
    "dining policy",
    "restaurant rules",
    "Ombu Grill policies",
    "Korean BBQ rules",
    "dining guidelines",
    "restaurant etiquette",
  ],
  alternates: {
    canonical: `${siteConfig.url}/dining-policy`,
  },
  openGraph: {
    title: "Dining Policy | Ombu Grill",
    description:
      "Clear dining policies and guidelines to help you have the best experience at Ombu Grill.",
    url: `${siteConfig.url}/dining-policy`,
  },
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Dining Policy",
      item: `${siteConfig.url}/dining-policy`,
    },
  ],
};

export default function DiningPolicyPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
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
                href="/ayce-guidelines"
                className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
              >
                Guidelines
              </Link>
              <Link
                href="/#locations"
                className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
              >
                Locations
              </Link>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="py-12 md:py-16 bg-gradient-to-b from-primary/10 to-transparent">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Dining Policy
                </h1>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                  We want to set clear expectations upfront to ensure a great experience for
                  everyone.
                </p>
              </div>
            </div>
          </section>

          {/* Policy Sections */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto space-y-6">
                {policySections.map((section) => (
                  <div
                    key={section.id}
                    className="glass rounded-2xl p-6 md:p-8 hover:bg-card-hover transition-colors"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {section.titleEN}
                    </h2>
                    <div className="space-y-4">
                      {section.bodyEN.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer Section - If Something Wasn't Right */}
          <section className="py-12 md:py-16 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="glass rounded-2xl p-6 md:p-8 border-2 border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageCircle className="text-primary" size={24} />
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {policyFooter.titleEN}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {policyFooter.bodyEN.map((paragraph, index) => (
                      <p key={index} className="text-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Back to Home */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <ChevronRight size={16} className="rotate-180" />
                  Back to Home
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
