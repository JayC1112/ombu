"use client";

import { useRef } from "react";
import { useCMSData } from "@/hooks/useCMSData";

export default function PhotoGallery() {
  const { galleryImages, loading } = useCMSData();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className="text-center mb-10 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Real <span className="text-gradient">Photos</span>
          </h2>
          <p className="text-muted">
            See what awaits you at Ombu Grill
          </p>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div
          className="relative"
        >
          {/* Gradient Overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {(loading ? [] : galleryImages.filter((img: any) => img.image_url)).map((image, index) => (
              <div
                key={image.id || index}
                
                className="relative flex-shrink-0 snap-center"
              >
                <div className="relative w-64 h-48 md:w-80 md:h-60 rounded-xl overflow-hidden group bg-gradient-to-br from-card via-card-hover to-primary/20">
                  {image.image_url ? (
                    <img src={image.image_url} alt={image.alt_text || image.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-card via-card-hover to-primary/20" />
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm text-white font-medium">
                        {image.title || image.alt_text || image.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Hint (mobile) */}
        <p
          className="text-center text-xs text-muted mt-4 md:hidden"
        >
          Swipe to see more
        </p>
      </div>
    </section>
  );
}
