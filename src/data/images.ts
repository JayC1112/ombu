/**
 * Image configuration for the website
 *
 * IMPORTANT: Set IMAGE_PLACEHOLDERS_ENABLED to true when actual images
 * are not yet available. This will render colored placeholder divs
 * instead of broken images.
 */

export const IMAGE_PLACEHOLDERS_ENABLED = false;

export interface ImageData {
  src: string;
  alt: string;
  blurDataURL: string;
}

// Placeholder blur data URL (tiny gray image)
const PLACEHOLDER_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFERIGITFBUWFx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/AMt0HT7+ocJLkjSV1YBHYE/vvGMYi0mOZIf/2Q==";

export const heroImage: ImageData = {
  src: "/images/hero/hero-bbq.webp",
  alt: "Sizzling Korean BBQ meat on a grill",
  blurDataURL: PLACEHOLDER_BLUR,
};

export const menuCategoryImages: Record<string, ImageData> = {
  // Legacy keys for backwards compatibility
  beef: {
    src: "/images/menu/beef.webp",
    alt: "Premium marbled beef slices for Korean BBQ",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  "pork-chicken": {
    src: "/images/menu/pork-chicken.webp",
    alt: "Juicy pork belly and marinated chicken",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  seafood: {
    src: "/images/menu/seafood.webp",
    alt: "Fresh shrimp and seafood selection",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  hotpot: {
    src: "/images/menu/hotpot.webp",
    alt: "Steaming hot pot with fresh ingredients",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  // New menu categories
  "bbq-meats": {
    src: "/images/menu/bbq-meats.webp",
    alt: "Premium Korean BBQ meats including bulgogi, galbi, and pork belly",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  appetizers: {
    src: "/images/menu/appetizers.webp",
    alt: "Korean appetizers including fried dumplings, chicken wings, and corn cheese",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  "sides-soups": {
    src: "/images/menu/sides-soups.webp",
    alt: "Korean banchan side dishes and soups including kimchi and miso soup",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  "rice-noodles": {
    src: "/images/menu/rice-noodles.webp",
    alt: "Korean rice bowls and noodles including bibimbap and ramen",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  beverages: {
    src: "/images/menu/beverages.webp",
    alt: "Boba milk tea, fruit teas, and milkshakes",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  desserts: {
    src: "/images/menu/desserts.webp",
    alt: "Asian desserts including mochi ice cream and crepe cakes",
    blurDataURL: PLACEHOLDER_BLUR,
  },
};

export const locationImages: Record<string, ImageData> = {
  midvale: {
    src: "/images/locations/midvale.webp",
    alt: "Ombu Grill Midvale location",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  slc: {
    src: "/images/locations/slc.webp",
    alt: "Ombu Grill Salt Lake City location",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  layton: {
    src: "/images/locations/layton.webp",
    alt: "Ombu Grill Layton location",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  orem: {
    src: "/images/locations/orem.webp",
    alt: "Ombu Grill Orem location",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  "south-jordan": {
    src: "/images/locations/south-jordan.webp",
    alt: "Ombu Grill South Jordan location",
    blurDataURL: PLACEHOLDER_BLUR,
  },
  "south-salt-lake": {
    src: "/images/locations/south-salt-lake.webp",
    alt: "Ombu Grill South Salt Lake location",
    blurDataURL: PLACEHOLDER_BLUR,
  },
};

export const fallbackLocationImage: ImageData = {
  src: "/images/locations/fallback.webp",
  alt: "Ombu Grill restaurant interior",
  blurDataURL: PLACEHOLDER_BLUR,
};

// Helper to get location image with fallback
export function getLocationImage(locationId: string): ImageData {
  return locationImages[locationId] || fallbackLocationImage;
}

/**
 * Check if we should render actual images or placeholders
 * When images don't exist, components should render placeholder divs instead
 */
export function shouldUsePlaceholder(): boolean {
  return IMAGE_PLACEHOLDERS_ENABLED;
}
