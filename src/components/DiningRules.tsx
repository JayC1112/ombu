"use client";

import { Clock, AlertCircle, Users, Info } from "lucide-react";

const rules = [
  {
    icon: Clock,
    title: "90 Min Dining",
    description: "Peak hours limit",
  },
  {
    icon: AlertCircle,
    title: "No Waste Policy",
    description: "Order what you eat",
  },
  {
    icon: Users,
    title: "Groups 6+",
    description: "18% auto-gratuity",
  },
];

export default function DiningRules() {

  return (
    <section className="py-6 border-y border-border bg-background">
      <div className="container mx-auto px-4">
        <div
          
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Info size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              Dining Guidelines
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {rules.map((rule, index) => (
              <div
                key={rule.title}
                
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <rule.icon className="text-primary" size={18} />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {rule.title}
                  </div>
                  <div className="text-muted text-xs">{rule.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <a
              href="/dining-policy"
              className="text-primary hover:underline text-sm inline-flex items-center gap-1"
            >
              Read our Dining Policy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
