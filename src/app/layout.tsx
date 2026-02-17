import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { locations, siteConfig } from "@/data/locations";
import SettingsLoader from "@/components/SettingsLoader";
import VhFixer from "@/components/VhFixer";

// Global JSON-LD schemas
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: "Utah's #1 All-You-Can-Eat Korean BBQ & Hot Pot restaurant chain with 6 locations.",
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  sameAs: [
    "https://instagram.com/ombuutah",
    "https://tiktok.com/@ombu_utah",
  ],
  contactPoint: locations.map((loc) => ({
    "@type": "ContactPoint",
    telephone: loc.phoneDisplay,
    contactType: "reservations",
    areaServed: "US",
    availableLanguage: ["English", "Korean"],
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does Ombu Grill Korean BBQ cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ombu Grill offers all-you-can-eat Korean BBQ starting at $16.99-$17.99 for lunch (11AM-3PM) and $25.99-$26.99 for dinner. This includes unlimited premium meats, seafood, vegetables, and side dishes. Much better value than Brazilian steakhouses like Rodizio Grill or Texas de Brazil!",
      },
    },
    {
      "@type": "Question",
      name: "What makes Ombu Grill different from other BBQ buffets in Utah?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ombu Grill offers authentic Korean BBQ with tableside grilling, premium marinated meats, unlimited banchan (side dishes), and a fun interactive dining experience. Unlike traditional buffets, you grill fresh meat at your table. We have 6 convenient locations across Utah.",
      },
    },
    {
      "@type": "Question",
      name: "Do you take reservations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We generally operate on a first-come, first-served basis for smaller parties. For large groups (10+), we recommend calling ahead to check availability. Walk-ins are always welcome!",
      },
    },
    {
      "@type": "Question",
      name: "Is there a time limit for dining?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, during peak hours (typically dinner time and weekends), there is a 90-minute dining limit. This ensures all guests have the opportunity to enjoy our restaurant.",
      },
    },
    {
      "@type": "Question",
      name: "What is the leftover policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To encourage mindful ordering and reduce food waste, there is a charge for uneaten food left on the table. We recommend ordering in smaller batches and going back for more as needed.",
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
      name: "Is Hot Pot available at all locations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hot Pot is currently available at our South Jordan location (as an add-on to KBBQ) and our South Salt Lake location (dedicated Hot Pot restaurant). Other locations offer Korean BBQ only.",
      },
    },
    {
      "@type": "Question",
      name: "Where are Ombu Grill locations in Utah?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ombu Grill has 6 locations across Utah: Salt Lake City (1438 State St), Midvale (6930 S State St), South Jordan (11460 District Dr), Layton (1120 N Main St), Orem (147 N State St), and South Salt Lake (3424 S State St - Hot Pot only). All locations are open daily.",
      },
    },
    {
      "@type": "Question",
      name: "Is Ombu Grill good for families and kids?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Ombu Grill is family-friendly with a fun interactive grilling experience that kids love. Kids pricing is based on height: Under 40\" is free, 40\" to 50\" is $9.99, and over 50\" is full price. It's perfect for birthday celebrations and family gatherings.",
      },
    },
  ],
};

// AggregateRating schema for social proof
const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteConfig.url}/#restaurant`,
  name: siteConfig.name,
  image: `${siteConfig.url}/og-image.png`,
  servesCuisine: ["Korean", "BBQ", "Hot Pot", "Asian", "Korean BBQ"],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "2847",
    bestRating: "5",
    worstRating: "1",
  },
  areaServed: {
    "@type": "State",
    name: "Utah",
  },
  hasMenu: `${siteConfig.url}/menu`,
  acceptsReservations: "False",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  currenciesAccepted: "USD",
};

// Local Business schema for each location
const localBusinessSchemas = locations.map((loc) => ({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteConfig.url}/locations/${loc.slug}`,
  name: `${loc.concepts.hotpot && !loc.concepts.kbbq ? "Ombu Hotpot" : "Ombu Grill"} - ${loc.name}`,
  image: `${siteConfig.url}/og-image.png`,
  url: `${siteConfig.url}/locations/${loc.slug}`,
  telephone: loc.phoneDisplay,
  priceRange: "$$",
  servesCuisine: loc.concepts.kbbq ? ["Korean", "BBQ", "Korean BBQ"] : ["Korean", "Hot Pot"],
  address: {
    "@type": "PostalAddress",
    streetAddress: loc.address,
    addressLocality: loc.city,
    addressRegion: loc.state,
    postalCode: loc.zip,
    addressCountry: "US",
  },
  geo: loc.lat && loc.lng ? {
    "@type": "GeoCoordinates",
    latitude: loc.lat,
    longitude: loc.lng,
  } : undefined,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: loc.id === "south-salt-lake" ? "12:00" : "11:00",
    closes: loc.id === "south-salt-lake" ? "00:00" : "22:00",
  },
  acceptsReservations: "False",
  menu: `${siteConfig.url}/menu`,
}));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ombugrillutah.com"),
  title: {
    default: "Ombu Grill | Utah's #1 All-You-Can-Eat Korean BBQ & Hot Pot | 6 Locations",
    template: "%s | Ombu Grill Korean BBQ Utah",
  },
  description:
    "Utah's best all-you-can-eat Korean BBQ. 6 locations: Salt Lake City, Midvale, South Jordan, Layton, Orem + Hot Pot in South Salt Lake. Premium bulgogi, galbi, pork belly grilled at your table. Open daily. Walk-ins welcome! Select a location to view pricing.",
  keywords: [
    // Primary keywords - Utah focused
    "Korean BBQ Utah",
    "KBBQ Utah",
    "Korean BBQ Salt Lake City",
    "All You Can Eat Korean BBQ Utah",
    "AYCE KBBQ Utah",
    "Ombu Grill",
    "Ombu Grill Utah",
    // Location-based keywords - all cities
    "Korean BBQ near me Utah",
    "best Korean BBQ Salt Lake City",
    "Korean BBQ Midvale Utah",
    "Korean BBQ South Jordan Utah",
    "Korean BBQ Layton Utah",
    "Korean BBQ Orem Utah",
    "Korean BBQ Provo area",
    "Korean BBQ Davis County",
    "Korean BBQ Utah County",
    // Hot Pot keywords
    "Hot Pot Utah",
    "Hot Pot Salt Lake City",
    "Korean Hot Pot South Salt Lake",
    "AYCE Hot Pot Utah",
    "best Hot Pot Utah",
    // Menu item keywords
    "bulgogi Utah",
    "galbi Salt Lake City",
    "samgyupsal Utah",
    "Korean pork belly BBQ",
    "unlimited Korean BBQ meat",
    // Competitor alternative keywords
    "best BBQ buffet Utah",
    "all you can eat meat restaurant Utah",
    "unlimited BBQ Salt Lake City",
    "Korean restaurant Utah",
    "Asian BBQ buffet Salt Lake City",
    "better than Brazilian steakhouse Utah",
    // Long-tail keywords
    "cheap Korean BBQ Utah",
    "affordable AYCE Korean BBQ",
    "family Korean BBQ restaurant Utah",
    "group dining Korean BBQ Salt Lake",
    "birthday dinner Korean BBQ Utah",
    "date night Korean BBQ Utah",
    "Korean BBQ lunch special Utah",
    "late night Korean BBQ Utah",
  ],
  authors: [{ name: "Ombu Grill Utah" }],
  creator: "Ombu Grill Utah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ombugrillutah.com",
    siteName: "Ombu Grill Utah",
    title: "Ombu Grill | Utah's #1 All-You-Can-Eat Korean BBQ & Hot Pot",
    description:
      "Utah's best all-you-can-eat Korean BBQ. 6 locations: SLC, Midvale, South Jordan, Layton, Orem. Premium meats grilled at your table. Better value than Brazilian steakhouses! Select a location to view pricing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ombu Grill - Utah's Best All-You-Can-Eat Korean BBQ & Hot Pot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ombu Grill | Utah's #1 Korean BBQ | 6 Locations",
    description:
      "All-you-can-eat Korean BBQ & Hot Pot. 6 Utah locations. Premium meats, unlimited sides, tableside grilling. Open daily!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification if available
    // google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e63946",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Global JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
        />
        {/* Local Business Schema for each location */}
        {localBusinessSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <VhFixer />
        <SettingsLoader />
        {children}
      </body>
    </html>
  );
}
