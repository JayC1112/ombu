"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Beef, Salad, Flame, Users } from "lucide-react";
import { useDisplayPrices } from "@/utils/priceGate";
import { useLocationStore } from "@/store/locationStore";
import { useCMSData } from "@/hooks/useCMSData";

const getFeatures = (displayPrices: boolean, pricing: { lunch: number | null; dinner: number | null } | null) => [
  {
    icon: Beef,
    title: "Premium Korean BBQ Meats",
    description:
      "USDA choice beef brisket (chadol), marinated bulgogi, LA galbi short ribs, samgyupsal pork belly & more. Better quality than typical Utah buffets.",
  },
  {
    icon: Salad,
    title: "Fresh Banchan & Ingredients",
    description:
      "Unlimited Korean side dishes including kimchi, pickled vegetables, fresh lettuce wraps, and house-made dipping sauces prepared daily.",
  },
  {
    icon: Flame,
    title: "Cook at Your Table",
    description:
      "Interactive Korean BBQ experience with modern smokeless grills. Grill your own meat to perfection - more fun than any Utah steakhouse!",
  },
  {
    icon: Users,
    title: "Best Value in Utah",
    description: displayPrices && pricing
      ? `All-you-can-eat lunch from $${pricing.lunch?.toFixed(2) || "16.99"}, dinner from $${pricing.dinner?.toFixed(2) || "25.99"}. Groups, families & date nights welcome. Better value than Rodizio Grill or Texas de Brazil!`
      : "All-you-can-eat Korean BBQ with premium meats, unlimited sides, and interactive grilling. Groups, families & date nights welcome. Better value than Rodizio Grill or Texas de Brazil!",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Check if prices should be displayed
  const displayPrices = useDisplayPrices();
  const { siteSettings } = useCMSData();
  const { activeLocation, activeConcept } = useLocationStore();
  const currentLocation = activeLocation();
  const currentConcept = activeConcept();
  
  const features = getFeatures(displayPrices, null);

  return (
    <section id="about" className="py-24 relative bg-background">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why Utah Loves <span className="text-gradient">Ombu Grill</span>
            </h2>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto px-2">
              Utah&apos;s favorite Korean BBQ since 2013. Serving Salt Lake City, 
              Midvale, South Jordan, Layton, Orem & South Salt Lake with 
              authentic all-you-can-eat Korean BBQ and Hot Pot.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:bg-card-hover transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "6", label: "Locations in Utah" },
              { value: "50+", label: "Menu Items" },
              { value: "10+", label: "Years Serving Utah" },
              { value: "4.5", label: "Google Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
