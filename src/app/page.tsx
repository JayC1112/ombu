import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DiningRules from "@/components/DiningRules";
import About from "@/components/About";
import PhotoGallery from "@/components/PhotoGallery";
import Menu from "@/components/Menu";
import Locations from "@/components/Locations";
import GoogleReviewsPreview from "@/components/GoogleReviewsPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { locations, siteConfig, getBrandName, getConceptLabel } from "@/data/locations";

// ItemList schema for locations (SEO)
const locationsItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ombu Grill Locations in Utah",
  description: "All 6 Ombu Grill and Ombu Hotpot locations across Utah",
  numberOfItems: locations.length,
  itemListElement: locations.map((loc, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Restaurant",
      "@id": `${siteConfig.url}/locations/${loc.slug}`,
      name: `${getBrandName(loc)} - ${loc.name}`,
      description: `All-you-can-eat ${getConceptLabel(loc)} in ${loc.city}, Utah`,
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address,
        addressLocality: loc.city,
        addressRegion: loc.state,
        postalCode: loc.zip,
        addressCountry: "US",
      },
      telephone: loc.phoneDisplay,
      url: `${siteConfig.url}/locations/${loc.slug}`,
      servesCuisine: loc.concepts.kbbq ? ["Korean", "BBQ"] : ["Korean", "Hot Pot"],
      ...(loc.googleMapsUrl && { sameAs: [loc.googleMapsUrl] }),
      ...(loc.lat && loc.lng && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: loc.lat,
          longitude: loc.lng,
        },
      }),
    },
  })),
};

export default function Home() {
  return (
    <>
      {/* ItemList schema for locations */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsItemListSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <DiningRules />
        <About />
        <PhotoGallery />
        <Menu />
        <Locations />
        <GoogleReviewsPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
