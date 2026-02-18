export const revalidate = 60;
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DiningRules from "@/components/DiningRules";
import About from "@/components/About";
import PhotoGallery from "@/components/PhotoGallery";

import Locations from "@/components/Locations";
import GoogleReviewsPreview from "@/components/GoogleReviewsPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 md:pb-0">
        <Hero />
        <DiningRules />
        <About />
        <PhotoGallery />
        <Locations />
        <GoogleReviewsPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
