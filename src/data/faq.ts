export interface FAQItem {
  question: string;
  answer: string;
}

// General FAQs used across all locations
export const generalFAQs: FAQItem[] = [
  {
    question: "Is there a time limit for dining?",
    answer:
      "Yes, during peak hours (typically dinner time and weekends), there is a 90-minute dining limit. This ensures all guests have the opportunity to enjoy our restaurant. During slower periods, we are more flexible.",
  },
  {
    question: "What is the leftover policy?",
    answer:
      "To encourage mindful ordering and reduce food waste, there is a charge for uneaten food left on the table. We recommend ordering in smaller batches and going back for more as needed. Ask your server for current policy details.",
  },
  {
    question: "Is gratuity included for large parties?",
    answer:
      "Yes, an 18% gratuity is automatically added for parties of 6 or more guests. This helps ensure our staff can provide excellent service to larger groups.",
  },
  {
    question: "Do you take reservations?",
    answer:
      "We generally operate on a first-come, first-served basis for smaller parties. For large groups (10+), we recommend calling ahead to check availability. Walk-ins are always welcome!",
  },
  {
    question: "What is included in the all-you-can-eat price?",
    answer:
      "Our AYCE price includes unlimited servings of all meats, seafood, vegetables, rice, and traditional Korean side dishes (banchan). Drinks and specialty items may be charged separately.",
  },
];

// Hot Pot specific FAQs
export const hotpotFAQs: FAQItem[] = [
  {
    question: "Is Hot Pot available at all locations?",
    answer:
      "Hot Pot is currently available at our South Jordan location (as an add-on to KBBQ) and our South Salt Lake location (dedicated Hot Pot restaurant). Other locations offer Korean BBQ only.",
  },
  {
    question: "Can I get both KBBQ and Hot Pot?",
    answer:
      "Yes! At our South Jordan location, you can add Hot Pot to your KBBQ experience. This gives you the best of both worlds at one table. Call ahead for current pricing.",
  },
];

// Get FAQs for a specific location
export function getLocationFAQs(hasHotpot: boolean): FAQItem[] {
  const faqs = [...generalFAQs];

  if (hasHotpot) {
    faqs.push(...hotpotFAQs);
  }

  return faqs;
}
