/**
 * Centralized pricing visibility configuration
 *
 * Controls where pricing information can be displayed across the site.
 * When a section is set to false, pricing should be hidden and replaced
 * with generic messaging.
 */

export const PRICING_VISIBILITY = {
  // Hero section - Nearest Location pricing display
  heroNearest: true,

  // Location cards in the Locations grid
  locationCards: false,

  // Individual store pages (/locations/[slug])
  storePages: false,

  // Menu section/page
  menu: false,

  // Footer
  footer: false,

  // SEO/Schema structured data
  schema: false,

  // Header CTA
  header: false,
} as const;

/**
 * Generic pricing message to display when prices are hidden
 */
export const PRICING_HIDDEN_MESSAGE = {
  short: "Call for pricing",
  medium: "Pricing varies by location",
  long: "Pricing varies by location. Call your nearest store for today's pricing.",
} as const;

/**
 * Helper to check if pricing should be shown in a given context
 */
export function shouldShowPricing(context: keyof typeof PRICING_VISIBILITY): boolean {
  return PRICING_VISIBILITY[context];
}
