import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createServerClient } from "@/lib/supabase";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fetch settings from database
async function getSettings() {
  const supabase = await createServerClient()
  const { data } = await supabase.from('site_settings').select('*')
  
  if (!data) return {}
  
  const settings: Record<string, string> = {}
  data.forEach((item: any) => {
    settings[item.id] = item.value
  })
  return settings
}

// Fetch locations from database
async function getLocations() {
  const supabase = await createServerClient()
  const { data } = await supabase.from('location_info').select('*').eq('is_active', true).order('display_order')
  return data || []
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings()
  const locations = await getLocations()
  
  const siteName = settings.site_name || 'Ombu Grill'
  const siteTitle = settings.site_title || 'Ombu Grill - Best Korean BBQ in Utah'
  const siteDesc = settings.site_description || "Utah's best all-you-can-eat Korean BBQ. 6 locations across Utah."
  const siteUrl = 'https://ombugrillutah.com'

  // Dynamic schemas based on database
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    description: siteDesc,
    publisher: { "@id": `${siteUrl}/#organization` },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    sameAs: [
      settings.instagram_url || "https://instagram.com/ombuutah",
      settings.tiktok_url || "https://tiktok.com/@ombu_utah",
    ].filter(Boolean),
  }

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: siteName,
    image: `${siteUrl}/og-image.png`,
    servesCuisine: ["Korean", "BBQ", "Hot Pot"],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "2847",
    },
    hasMenu: `${siteUrl}/menu`,
  }

  // Schema for each location
  const localBusinessSchemas = locations.map((loc: any) => ({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/locations/${loc.location_id}`,
    name: loc.name,
    image: `${siteUrl}/og-image.png`,
    url: `${siteUrl}/locations/${loc.location_id}`,
    telephone: loc.phone_display || loc.phone,
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
      opens: loc.location_id === "south-salt-lake" ? "12:00" : "11:00",
      closes: loc.location_id === "south-salt-lake" ? "00:00" : "22:00",
    },
    menu: `${siteUrl}/menu`,
  }))

  const seoKeywords = settings.seo_keywords ? settings.seo_keywords.split(',').map(k => k.trim()) : [
    "Korean BBQ Utah", "KBBQ Utah", "Ombu Grill", "All You Can Eat Korean BBQ Utah",
    "Hot Pot Utah", "Korean Hot Pot Salt Lake City"
  ]

  return (
    <html lang="en" className="dark">
      <head>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
        />
        {localBusinessSchemas.map((schema: any, index: number) => (
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
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL("https://ombugrillutah.com"),
  title: {
    default: "Ombu Grill | Utah's #1 All-You-Can-Eat Korean BBQ & Hot Pot | 6 Locations",
    template: "%s | Ombu Grill Korean BBQ Utah",
  },
  description: "Utah's best all-you-can-eat Korean BBQ. 6 locations: Salt Lake City, Midvale, South Jordan, Layton, Orem + Hot Pot in South Salt Lake.",
  keywords: seoKeywords,
  authors: [{ name: "Ombu Grill Utah" }],
  creator: "Ombu Grill Utah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ombugrillutah.com",
    siteName: "Ombu Grill Utah",
    title: "Ombu Grill | Utah's #1 All-You-Can-Eat Korean BBQ & Hot Pot",
    description: "Utah's best all-you-can-eat Korean BBQ. 6 Utah locations.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ombu Grill" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ombu Grill | Utah's #1 Korean BBQ | 6 Locations",
    description: "All-you-can-eat Korean BBQ & Hot Pot. 6 Utah locations.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e63946",
}
