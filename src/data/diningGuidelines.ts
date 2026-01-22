import { Clock, Scale, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface DiningGuideline {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  shortDescription: string;
}

export const diningGuidelines: DiningGuideline[] = [
  {
    id: "time-limit",
    icon: Clock,
    title: "90 Minute Limit",
    description:
      "During peak hours, dining time is limited to 90 minutes to ensure all guests can enjoy our restaurant.",
    shortDescription: "Peak hours",
  },
  {
    id: "leftover-fee",
    icon: Scale,
    title: "Leftover Policy",
    description:
      "Excessive leftovers may be charged by weight. The exact rate may vary by location—please ask your server or manager for details.",
    shortDescription: "Reduce waste",
  },
  {
    id: "gratuity",
    icon: Users,
    title: "Parties 6+ 18% Gratuity",
    description:
      "An 18% gratuity is automatically added for parties of 6 or more guests.",
    shortDescription: "Large parties",
  },
];

export const diningGuidelinesText = {
  timeLimit: "90-minute dining limit during peak hours",
  leftoverFee: "Leftover policy: Excessive leftovers may be charged by weight. The exact rate may vary by location—please ask your server or manager for details.",
  gratuity: "18% gratuity for parties of 6+",
};
