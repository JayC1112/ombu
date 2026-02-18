"use client";

import { useState, useEffect } from "react";
import ImagePlaceholder from "./ImagePlaceholder";
import { type ImageData } from "@/data/images";

interface LocationHeroImageProps {
  locationSlug: string;
  fallbackImage: ImageData;
}

export default function LocationHeroImage({ locationSlug, fallbackImage }: LocationHeroImageProps) {
  const [dbImageUrl, setDbImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/cms/images')
      .then(res => res.json())
      .then(data => {
        const img = data.find((i: any) => i.category === 'location' && i.key === locationSlug);
        if (img?.image_url) {
          setDbImageUrl(img.image_url);
        }
      })
      .catch(console.error);
  }, [locationSlug]);

  if (dbImageUrl) {
    return <img src={dbImageUrl} alt={fallbackImage.alt} className="w-full h-full object-cover" />;
  }

  return <ImagePlaceholder image={fallbackImage} fill priority sizes="100vw" className="object-cover" />;
}
