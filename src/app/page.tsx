export const revalidate = 60;
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

// Simple SEO schema - will be enhanced when other components are updated
const siteSchema = {
  "@context": "https://schema.org",
  "@type": "RestaurantChain",
  name: "Ombu Grill Utah",
  description: "Korean BBQ and Hot Pot restaurants in Utah",
  url: "https://ombugrillutah.com",
  servesCuisine: ["Korean BBQ", "Hot Pot"],
  areaServed: {
    "@type": "State",
    name: "Utah"
  },
  priceRange: "$$"
};

export default function Home() {
  return (
    <>
      {/* Site schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <Header />
      <main className="pb-24 md:pb-0">
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
