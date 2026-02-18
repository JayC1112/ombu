"use client";

import Image from "next/image";
import { useState } from "react";
import { IMAGE_PLACEHOLDERS_ENABLED, type ImageData } from "@/data/images";

interface ImagePlaceholderProps {
  image: ImageData;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  placeholderClassName?: string;
}

/**
 * Smart image component that renders a placeholder div when images are not available,
 * preventing 400 errors from Next/Image optimization.
 */
export default function ImagePlaceholder({
  image,
  fill = false,
  priority = false,
  sizes,
  className = "",
  placeholderClassName = "",
}: ImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false);

  // When placeholders are enabled or image failed to load, render a gradient div
  if (IMAGE_PLACEHOLDERS_ENABLED || hasError) {
    return (
      <div
        className={`bg-gradient-to-br from-card via-card-hover to-primary/20 ${
          fill ? "absolute inset-0" : ""
        } ${placeholderClassName || className}`}
        role="img"
        aria-label={image.alt}
      />
    );
  }

  // When actual images are available, render Next/Image
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
