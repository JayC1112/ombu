"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Beef, Fish, UtensilsCrossed, Salad, CookingPot, Coffee, IceCream, Star, MapPin } from "lucide-react";
import { menuCategoryImages } from "@/data/images";
import ImagePlaceholder from "./ImagePlaceholder";
import { useDisplayPrices } from "@/utils/priceGate";
import { useLocationStore } from "@/store/locationStore";
import { getPricing, getAvailableConcepts } from "@/data/locations";
import { scrollToSection } from "@/utils/scrollTo";

// Menu categories with icons
const categories = [
  { id: "bbq-meats", label: "BBQ Meats", icon: Beef },
  { id: "seafood", label: "Seafood", icon: Fish },
  { id: "appetizers", label: "Appetizers", icon: UtensilsCrossed },
  { id: "sides-soups", label: "Sides & Soups", icon: Salad },
  { id: "rice-noodles", label: "Rice & Noodles", icon: CookingPot },
  { id: "beverages", label: "Beverages", icon: Coffee },
  { id: "desserts", label: "Desserts", icon: IceCream },
];

// Complete menu data from Ombu Grill Utah
const menuItems = {
  "bbq-meats": [
    // Lunch items (included in lunch price)
    { name: "Prime Beef Brisket", description: "Thinly sliced premium beef brisket, quick-grilling Korean BBQ favorite", tier: "lunch" },
    { name: "Prime Pork Belly (Samgyeopsal)", description: "Thick-cut Korean pork belly, crispy outside, juicy inside", tier: "lunch" },
    { name: "Sliced Chicken Breast", description: "Tender sliced chicken breast, perfect for light grilling", tier: "lunch" },
    { name: "Ombu Signature Chicken Thigh", description: "House-marinated chicken thigh with special Ombu seasoning", tier: "lunch" },
    { name: "Spicy Pork Belly", description: "Gochujang-marinated pork belly with Korean chili kick", tier: "lunch" },
    { name: "Hawaiian Beef Brisket", description: "Sweet pineapple-marinated beef brisket, tropical flavor", tier: "lunch" },
    { name: "Ombu Beef Bulgogi", description: "Classic Korean marinated beef in sweet soy sauce", tier: "lunch" },
    { name: "Hawaiian Pork Steak", description: "Juicy pork steak with Hawaiian-style marinade", tier: "lunch" },
    { name: "Original Pork Steak", description: "Traditional seasoned pork steak, Korean style", tier: "lunch" },
    { name: "Sausages", description: "Assorted grilled sausages", tier: "lunch" },
    { name: "Prime Beef Steak", description: "Premium cut beef steak for grilling", tier: "lunch" },
    { name: "Garlic Beef Steak", description: "Aromatic garlic-marinated beef steak", tier: "lunch" },
    { name: "Beef Tongue", description: "Thinly sliced beef tongue, tender delicacy", tier: "lunch" },
    // Dinner-only premium items
    { name: "Beef Tenderloin", description: "Premium beef tenderloin, melt-in-your-mouth tender", tier: "dinner" },
    { name: "Kalbi (Short Rib)", description: "Korean-style marinated beef short ribs (LA Galbi)", tier: "dinner" },
    { name: "Spicy Kalbi", description: "Gochujang-marinated spicy beef short ribs", tier: "dinner" },
    { name: "Hawaiian Beef Steak", description: "Sweet Hawaiian-marinated premium beef steak", tier: "dinner" },
    { name: "Ribeye", description: "USDA Choice ribeye steak, perfectly marbled", tier: "dinner" },
    { name: "Premium New York Steak", description: "Prime New York strip steak, premium cut", tier: "dinner" },
  ],
  "seafood": [
    { name: "Shrimp (with Shell)", description: "Fresh whole shrimp, shell-on for extra flavor", tier: "lunch" },
    { name: "Shrimp (without Shell)", description: "Peeled and deveined shrimp, ready to grill", tier: "lunch" },
    { name: "Cajun Shrimp (with Shell)", description: "Cajun-seasoned shrimp with shell", tier: "lunch" },
    { name: "Cajun Shrimp (without Shell)", description: "Spicy Cajun-seasoned peeled shrimp", tier: "lunch" },
    { name: "Prime Calamari", description: "Fresh squid rings, tender grilled texture", tier: "dinner" },
    { name: "Cajun Calamari", description: "Cajun-spiced calamari rings", tier: "dinner" },
    { name: "Mussels with Cheese", description: "Grilled mussels topped with melted cheese", tier: "dinner" },
    { name: "Grilled Sanma", description: "Japanese Pacific saury fish, grilled whole", tier: "dinner" },
  ],
  "appetizers": [
    { name: "Edamame", description: "Steamed Japanese soybeans with sea salt", tier: "lunch" },
    { name: "Takoyaki", description: "Japanese octopus balls with savory sauce", tier: "lunch" },
    { name: "Fried Chicken Cutlet", description: "Crispy breaded chicken cutlet (Tonkatsu style)", tier: "lunch" },
    { name: "Fried Pork Cutlet", description: "Golden fried pork cutlet, Japanese style", tier: "lunch" },
    { name: "Fried Chicken Wings", description: "Crispy Korean-style fried chicken wings", tier: "lunch" },
    { name: "Chicken Wings with Chile Sauce", description: "Spicy fried wings with Korean chile sauce", tier: "lunch" },
    { name: "Chicken Nuggets", description: "Crispy bite-sized chicken nuggets", tier: "lunch" },
    { name: "Fried Spring Roll", description: "Crispy vegetable spring rolls", tier: "lunch" },
    { name: "Fried Cheese Roll", description: "Golden fried mozzarella cheese rolls", tier: "lunch" },
    { name: "Fried Dumpling", description: "Crispy Korean-style fried dumplings (Mandu)", tier: "lunch" },
    { name: "Fried Sesame Ball", description: "Sweet sesame-coated rice balls", tier: "lunch" },
    { name: "French Fries", description: "Classic crispy french fries", tier: "lunch" },
    { name: "Corn Cheese", description: "Sweet corn with melted cheese, Korean favorite", tier: "lunch" },
    { name: "Fried Shrimp", description: "Crispy tempura-style fried shrimp", tier: "dinner" },
    { name: "Fried Squid Tentacles", description: "Crispy fried calamari tentacles", tier: "dinner" },
    { name: "Korean Style Corn Dog", description: "Korean street food corn dog with crispy coating", tier: "dinner" },
  ],
  "sides-soups": [
    { name: "Fresh Lettuce Wraps", description: "Crisp lettuce for wrapping grilled meats", tier: "lunch" },
    { name: "Assorted Fresh Vegetables", description: "Seasonal grilling vegetables", tier: "lunch" },
    { name: "Tortilla", description: "Soft flour tortillas for Korean tacos", tier: "lunch" },
    { name: "Jalapeño", description: "Fresh sliced jalapeño peppers", tier: "lunch" },
    { name: "Pineapple", description: "Sweet grilled pineapple slices", tier: "lunch" },
    { name: "Kimchi", description: "Traditional fermented Korean cabbage", tier: "lunch" },
    { name: "Pickled Cucumbers", description: "Refreshing Korean pickled cucumbers", tier: "lunch" },
    { name: "Pickled Shredded Radish", description: "Tangy pickled Korean radish", tier: "lunch" },
    { name: "Seaweed Soup", description: "Light Korean seaweed soup (Miyeok-guk)", tier: "lunch" },
    { name: "Kimchi Soft Tofu Soup", description: "Spicy kimchi tofu stew (Sundubu-jjigae)", tier: "lunch" },
    { name: "Miso Soup", description: "Traditional Japanese miso soup", tier: "lunch" },
  ],
  "rice-noodles": [
    { name: "Tonkotsu Ramen", description: "Rich pork bone broth ramen noodles", tier: "lunch" },
    { name: "Beef Stone Bibimbap", description: "Korean mixed rice in hot stone bowl with beef", tier: "lunch" },
    { name: "Kimchi Fried Rice", description: "Stir-fried rice with kimchi and vegetables", tier: "lunch" },
    { name: "Ombu BBQ Chicken Fried Rice", description: "Fried rice with grilled BBQ chicken", tier: "lunch" },
    { name: "Ombu BBQ Pork Fried Rice", description: "Fried rice with grilled BBQ pork", tier: "lunch" },
    { name: "Fried Rice with Egg", description: "Classic egg fried rice", tier: "lunch" },
    { name: "Steamed Rice", description: "Fresh steamed white rice", tier: "lunch" },
    { name: "Vegetable Lo Mein", description: "Stir-fried noodles with vegetables", tier: "lunch" },
    { name: "Curry Chicken", description: "Japanese-style curry with chicken", tier: "lunch" },
  ],
  "beverages": [
    { name: "Boba Milk Tea", description: "Classic milk tea with tapioca pearls", tier: "lunch" },
    { name: "Taro Boba Milk Tea", description: "Purple taro flavored boba tea", tier: "lunch" },
    { name: "Brown Sugar Milk Tea", description: "Rich brown sugar boba with tiger stripes", tier: "lunch" },
    { name: "Matcha Milk Tea", description: "Japanese green tea latte with boba", tier: "lunch" },
    { name: "Thai Tea", description: "Sweet Thai iced tea with cream", tier: "lunch" },
    { name: "Lychee Fruit Tea", description: "Refreshing lychee flavored tea", tier: "lunch" },
    { name: "Passion Fruit Tea", description: "Tropical passion fruit iced tea", tier: "lunch" },
    { name: "Mango Juice", description: "Fresh mango juice", tier: "lunch" },
    { name: "Watermelon Juice", description: "Fresh watermelon juice", tier: "lunch" },
    { name: "Strawberry Milkshake", description: "Creamy strawberry shake", tier: "lunch" },
    { name: "Mango Milkshake", description: "Tropical mango shake", tier: "lunch" },
    { name: "Oreo Milkshake", description: "Cookies and cream shake", tier: "lunch" },
    { name: "Ramune (Japanese Soda)", description: "Classic Japanese marble soda, various flavors", tier: "lunch" },
    { name: "Soft Drinks", description: "Coke, Sprite, Dr Pepper & more (free refills)", tier: "lunch" },
  ],
  "desserts": [
    { name: "Chocolate Crepe Cake", description: "Layered chocolate crepe cake", tier: "lunch" },
    { name: "Vanilla Crepe Cake", description: "Delicate vanilla mille crepe", tier: "lunch" },
    { name: "Strawberry Mille Crepe Cake", description: "Fresh strawberry layered crepe cake", tier: "lunch" },
    { name: "Strawberry Swirl Cheesecake", description: "Creamy cheesecake with strawberry swirl", tier: "lunch" },
    { name: "Chocolate Cake", description: "Rich chocolate layer cake", tier: "lunch" },
    { name: "Lemon Cake", description: "Light and tangy lemon cake", tier: "lunch" },
    { name: "Macarons", description: "French macarons, assorted flavors", tier: "lunch" },
    { name: "Strawberry Mochi Ice Cream", description: "Japanese mochi with strawberry ice cream", tier: "lunch" },
    { name: "Oreo Mochi Ice Cream", description: "Cookies & cream mochi ice cream", tier: "lunch" },
    { name: "Matcha Mochi Ice Cream", description: "Green tea mochi ice cream", tier: "lunch" },
    { name: "Mango Mochi Ice Cream", description: "Tropical mango mochi ice cream", tier: "lunch" },
  ],
};

export default function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("bbq-meats");
  const [menuImages, setMenuImages] = useState<Record<string, string>>({});
  
  // Load menu images from database
  useEffect(() => {
    fetch('/api/cms/images')
      .then(res => res.json())
      .then(data => {
        const images: Record<string, string> = {}
        data.filter((img: any) => img.category === 'menu').forEach((img: any) => {
          images[img.key] = img.image_url
        })
        setMenuImages(images)
      })
      .catch(console.error)
  }, [])
  
  // Check if prices should be displayed
  const displayPrices = useDisplayPrices();
  const { activeLocation, activeConcept } = useLocationStore();
  const currentLocation = activeLocation();
  const currentConcept = activeConcept();
  const pricing = currentLocation && currentConcept
    ? getPricing(currentLocation, currentConcept)
    : null;

  // Get current category image (database first, then fallback to static)
  const dbImage = menuImages[activeCategory]
  const staticImage = menuCategoryImages[activeCategory as keyof typeof menuCategoryImages]
  
  // Get current items
  const currentItems = menuItems[activeCategory as keyof typeof menuItems] || [];
  const lunchItems = currentItems.filter(item => item.tier === "lunch");
  const dinnerItems = currentItems.filter(item => item.tier === "dinner");

  return (
    <section id="menu" className="py-20 md:py-24 relative bg-background">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              All-You-Can-Eat <span className="text-gradient">Menu</span>
            </h2>
            <p className="text-base md:text-xl text-muted max-w-2xl mx-auto px-2">
              80+ items including premium Korean BBQ meats, seafood, appetizers, 
              rice bowls, boba drinks & desserts. Grill at your table!
            </p>
            {displayPrices && pricing && (
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <span className="inline-flex items-center gap-1 bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                  Lunch (11AM-3PM) from ${pricing.lunch?.toFixed(2) || "16.99"}
                </span>
                <span className="inline-flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  Dinner from ${pricing.dinner?.toFixed(2) || "25.99"}
                </span>
              </div>
            )}
            {!displayPrices && (
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <button
                  onClick={() => scrollToSection("locations")}
                  className="inline-flex items-center gap-1 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/30 transition-colors"
                >
                  <MapPin size={14} />
                  Select a location to view pricing
                </button>
              </div>
            )}
          </motion.div>

          {/* Category Tabs - Scrollable on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center md:flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                    activeCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-card hover:bg-card-hover text-muted hover:text-foreground border border-border"
                  }`}
                >
                  <category.icon size={16} />
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Category Image + Menu Items */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category Hero Image */}
            {(dbImage || staticImage) && (
              <div className="relative w-full h-40 md:h-56 rounded-2xl overflow-hidden mb-6">
                {dbImage ? (
                  <img src={dbImage} alt={activeCategory} className="w-full h-full object-cover" />
                ) : (
                  <ImagePlaceholder
                    image={staticImage}
                    fill
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                    {categories.find((c) => c.id === activeCategory)?.label}
                  </h3>
                  <p className="text-sm text-white/80">
                    {currentItems.length} items available
                  </p>
                </div>
              </div>
            )}

            {/* Lunch Items */}
            {lunchItems.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Included in Lunch & Dinner
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {lunchItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className="glass rounded-xl p-4 hover:bg-card-hover transition-all duration-300"
                    >
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted mt-1">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Dinner-only Items */}
            {dinnerItems.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Star size={16} className="text-primary" />
                  <span className="text-primary">Dinner Only</span>
                  <span className="text-xs text-muted font-normal">(Premium items)</span>
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {dinnerItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className="glass rounded-xl p-4 hover:bg-card-hover transition-all duration-300 border border-primary/20"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full whitespace-nowrap">
                          Dinner
                        </span>
                      </div>
                      <p className="text-sm text-muted mt-1">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Dining Rules Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 glass rounded-2xl p-5 md:p-6"
          >
            <h4 className="font-semibold mb-3 text-center">Dining Guidelines</h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
              <div>
                <span className="text-primary font-medium">⏱ 90 min limit</span>
                <p className="text-muted text-xs mt-1">Per table at peak hours</p>
              </div>
              <div>
                <span className="text-primary font-medium">🍽 Leftover Policy</span>
                <p className="text-muted text-xs mt-1">Excessive leftovers may be charged by weight. The exact rate may vary by location—please ask your server or manager for details.</p>
              </div>
              <div>
                <span className="text-primary font-medium">👥 Groups 6+</span>
                <p className="text-muted text-xs mt-1">18% gratuity included</p>
              </div>
              <div>
                <span className="text-primary font-medium">⚠️ Allergy info</span>
                <p className="text-muted text-xs mt-1">Please inform server</p>
              </div>
            </div>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-muted text-sm mt-6"
          >
            * Menu items and pricing may vary by location. Visit your nearest Ombu Grill for the full experience.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
