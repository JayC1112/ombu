import { Metadata } from "next";
import Link from "next/link";
import {
  Beef,
  Drumstick,
  Fish,
  Soup,
  Salad,
  Coffee,
  ChevronRight,
  MapPin,
  Phone,
  Utensils,
  Flame,
} from "lucide-react";
import { locations, siteConfig } from "@/data/locations";

export const metadata: Metadata = {
  title: "Menu | All-You-Can-Eat Korean BBQ & Hot Pot",
  description:
    "Ombu Grill full menu: premium beef, pork, chicken, seafood, hot pot broths, banchan sides, and sauce bar. All-you-can-eat Korean BBQ starting at $16.99. View our complete menu.",
  keywords: [
    "Korean BBQ menu",
    "KBBQ menu Utah",
    "Ombu Grill menu",
    "all you can eat Korean BBQ menu",
    "hot pot menu",
    "Korean BBQ meats",
    "bulgogi",
    "samgyupsal",
    "galbi",
  ],
  alternates: {
    canonical: `${siteConfig.url}/menu`,
  },
  openGraph: {
    title: "Full Menu | Ombu Grill Korean BBQ & Hot Pot",
    description:
      "Explore our complete all-you-can-eat menu. Premium meats, seafood, hot pot broths, sides, and sauce bar.",
    url: `${siteConfig.url}/menu`,
  },
};

// Menu Schema
const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Ombu Grill All-You-Can-Eat Menu",
  description: "Complete menu for Ombu Grill Korean BBQ & Hot Pot",
  hasMenuSection: [
    {
      "@type": "MenuSection",
      name: "Beef",
      description: "Premium beef selections for Korean BBQ",
      hasMenuItem: [
        { "@type": "MenuItem", name: "Prime Ribeye", description: "USDA Prime grade ribeye, perfectly marbled" },
        { "@type": "MenuItem", name: "Chadol Baegi", description: "Thinly sliced beef brisket" },
        { "@type": "MenuItem", name: "Bulgogi", description: "Sweet soy marinated beef" },
        { "@type": "MenuItem", name: "LA Galbi", description: "Cross-cut short ribs in sweet soy marinade" },
        { "@type": "MenuItem", name: "Beef Tongue", description: "Thinly sliced, tender gyutan" },
        { "@type": "MenuItem", name: "Woo Samgyup", description: "Beef belly with rich flavor" },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Pork & Chicken",
      description: "Pork and chicken selections",
      hasMenuItem: [
        { "@type": "MenuItem", name: "Samgyupsal", description: "Thick-cut pork belly" },
        { "@type": "MenuItem", name: "Spicy Pork", description: "Gochujang marinated pork" },
        { "@type": "MenuItem", name: "Dak Galbi", description: "Spicy chicken thigh" },
        { "@type": "MenuItem", name: "Garlic Chicken", description: "Garlic butter chicken" },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Seafood",
      description: "Fresh seafood options",
      hasMenuItem: [
        { "@type": "MenuItem", name: "Jumbo Shrimp", description: "Large tiger shrimp" },
        { "@type": "MenuItem", name: "Squid", description: "Fresh squid rings" },
        { "@type": "MenuItem", name: "Mussels", description: "Green lip mussels" },
        { "@type": "MenuItem", name: "Scallops", description: "Sea scallops" },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Hot Pot Broths",
      description: "Hot pot soup bases",
      hasMenuItem: [
        { "@type": "MenuItem", name: "Kimchi Jjigae", description: "Spicy kimchi broth" },
        { "@type": "MenuItem", name: "Beef Bone Broth", description: "Rich Seolleongtang style" },
        { "@type": "MenuItem", name: "Miso Soup", description: "Japanese soybean base" },
        { "@type": "MenuItem", name: "Spicy Mala", description: "Sichuan peppercorn broth" },
      ],
    },
  ],
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Menu",
      item: `${siteConfig.url}/menu`,
    },
  ],
};

const beefItems = [
  { name: "Prime Ribeye", description: "USDA Prime grade ribeye, perfectly marbled for maximum flavor and tenderness", popular: true },
  { name: "Chadol Baegi", description: "Thinly sliced beef brisket, a quick-grilling Korean BBQ favorite", popular: true },
  { name: "Bulgogi", description: "Classic sweet soy marinated beef, the most beloved Korean BBQ dish", popular: true },
  { name: "LA Galbi", description: "Cross-cut short ribs marinated in our signature sweet soy sauce", popular: false },
  { name: "Beef Tongue (Gyutan)", description: "Thinly sliced beef tongue, tender with a unique texture", popular: false },
  { name: "Woo Samgyup", description: "Beef belly slices with rich, savory flavor perfect for grilling", popular: false },
  { name: "Chadol Bulgogi", description: "Marinated brisket combining the best of chadol and bulgogi", popular: false },
  { name: "Beef Intestine", description: "For adventurous eaters, crispy when grilled with chewy texture", popular: false },
];

const porkChickenItems = [
  { name: "Samgyupsal", description: "Thick-cut pork belly, Korea's most popular BBQ meat—crispy outside, juicy inside", popular: true },
  { name: "Spicy Pork (Jeyuk)", description: "Pork shoulder marinated in spicy gochujang sauce", popular: true },
  { name: "Dak Galbi", description: "Spicy marinated chicken thigh with vegetables, a Chuncheon specialty", popular: false },
  { name: "Garlic Chicken", description: "Tender chicken breast in aromatic garlic butter sauce", popular: false },
  { name: "Pork Jowl (Hangjeongsal)", description: "Prized pork cheek meat, fatty and incredibly flavorful", popular: true },
  { name: "Honey Butter Chicken", description: "Sweet glazed chicken breast, perfect for those who prefer milder flavors", popular: false },
  { name: "Pork Belly (Thin)", description: "Thinly sliced pork belly for quick, crispy grilling", popular: false },
  { name: "Spicy Chicken", description: "Chicken thigh in our house-made spicy marinade", popular: false },
];

const seafoodItems = [
  { name: "Jumbo Shrimp", description: "Large tiger shrimp, shell-on for maximum flavor", popular: true },
  { name: "Squid", description: "Fresh squid rings, tender and quick to cook", popular: false },
  { name: "Mussels", description: "New Zealand green lip mussels, plump and sweet", popular: false },
  { name: "Scallops", description: "Plump sea scallops, perfect with butter on the grill", popular: true },
  { name: "Salmon", description: "Fresh Atlantic salmon, great for both grill and hot pot", popular: false },
  { name: "Fish Cake", description: "Korean-style fish cake, slightly sweet and chewy", popular: false },
];

const hotpotBroths = [
  { name: "Kimchi Jjigae", description: "Spicy fermented kimchi stew base, tangy and warming", spicy: true },
  { name: "Beef Bone Broth (Seolleongtang)", description: "Rich, milky broth from slow-simmered beef bones", spicy: false },
  { name: "Miso Soup", description: "Japanese-style savory soybean base, mild and comforting", spicy: false },
  { name: "Spicy Mala", description: "Sichuan peppercorn broth with numbing heat, for spice lovers", spicy: true },
  { name: "Mushroom Broth", description: "Vegetarian-friendly broth with mixed mushrooms", spicy: false },
  { name: "Tom Yum", description: "Thai-inspired sour and spicy lemongrass broth", spicy: true },
];

const sides = [
  { name: "Kimchi", description: "Traditional fermented napa cabbage" },
  { name: "Japchae", description: "Sweet potato glass noodles with vegetables" },
  { name: "Kongnamul", description: "Seasoned soybean sprouts" },
  { name: "Pickled Radish", description: "Sweet and tangy yellow radish" },
  { name: "Steamed Rice", description: "Fluffy Korean short-grain rice" },
  { name: "Egg Soup", description: "Silky steamed egg custard" },
  { name: "Lettuce Wraps", description: "Fresh lettuce for wrapping grilled meats" },
  { name: "Perilla Leaves", description: "Aromatic sesame leaves for wrapping" },
  { name: "Garlic", description: "Fresh garlic cloves to grill alongside meat" },
  { name: "Mushrooms", description: "Assorted mushrooms for grilling" },
  { name: "Onions", description: "Sliced onions, sweet when grilled" },
  { name: "Corn Cheese", description: "Creamy corn with melted cheese" },
];

const sauceBar = [
  { name: "Ssamjang", description: "Essential Korean BBQ dipping sauce—savory, slightly sweet, with fermented bean paste" },
  { name: "Sesame Oil + Salt", description: "Classic simple dip for beef, lets the meat flavor shine" },
  { name: "Gochujang", description: "Spicy red pepper paste, add heat to any meat" },
  { name: "Garlic Soy Sauce", description: "Light soy with fresh minced garlic" },
  { name: "Wasabi Mayo", description: "Creamy with a wasabi kick, great for seafood" },
  { name: "Ponzu", description: "Citrus soy sauce, refreshing with pork belly" },
];

const drinks = [
  { name: "Soft Drinks", description: "Coke, Sprite, assorted sodas" },
  { name: "Korean Beverages", description: "Sikhye (rice punch), Sujeonggwa (cinnamon punch)" },
  { name: "Hot Tea", description: "Barley tea, green tea" },
  { name: "Soju", description: "Korean rice liquor (must be 21+)", alcohol: true },
  { name: "Korean Beer", description: "Hite, Cass, Terra (must be 21+)", alcohol: true },
  { name: "Makgeolli", description: "Korean rice wine, milky and slightly sweet (must be 21+)", alcohol: true },
];

function MenuSection({
  id,
  title,
  icon: Icon,
  items,
  showPopular = false,
  showSpicy = false,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  items: { name: string; description: string; popular?: boolean; spicy?: boolean; alcohol?: boolean }[];
  showPopular?: boolean;
  showSpicy?: boolean;
}) {
  return (
    <section id={id} className="py-12 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="text-primary" size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="glass rounded-xl p-4 hover:bg-card-hover transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground">{item.name}</h3>
              <div className="flex gap-1">
                {showPopular && item.popular && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
                {showSpicy && item.spicy && (
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                    Spicy
                  </span>
                )}
                {item.alcohol && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                    21+
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-muted mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-border">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              OMBU GRILL
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/ayce-guidelines"
                className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
              >
                AYCE Guidelines
              </Link>
              <Link
                href="/#locations"
                className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
              >
                Locations
              </Link>
              <Link
                href="/#contact"
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <Phone size={16} />
                <span className="hidden sm:inline">Contact</span>
              </Link>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-card/50 to-transparent">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted mb-6">
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                  <ChevronRight size={14} />
                  <span className="text-foreground">Menu</span>
                </nav>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Our <span className="text-gradient">Menu</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mb-8">
                  All-you-can-eat premium meats, seafood, and sides. Everything is included
                  in your AYCE price—order as much as you want!
                </p>

                {/* Quick Navigation */}
                <div className="flex flex-wrap gap-2">
                  <a href="#beef" className="flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-card-hover border border-border text-sm transition-colors">
                    <Beef size={16} /> Beef
                  </a>
                  <a href="#pork-chicken" className="flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-card-hover border border-border text-sm transition-colors">
                    <Drumstick size={16} /> Pork & Chicken
                  </a>
                  <a href="#seafood" className="flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-card-hover border border-border text-sm transition-colors">
                    <Fish size={16} /> Seafood
                  </a>
                  <a href="#hotpot" className="flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-card-hover border border-border text-sm transition-colors">
                    <Soup size={16} /> Hot Pot
                  </a>
                  <a href="#sides" className="flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-card-hover border border-border text-sm transition-colors">
                    <Salad size={16} /> Sides
                  </a>
                  <a href="#sauce-bar" className="flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-card-hover border border-border text-sm transition-colors">
                    <Flame size={16} /> Sauce Bar
                  </a>
                  <a href="#drinks" className="flex items-center gap-2 px-4 py-2 rounded-full bg-card hover:bg-card-hover border border-border text-sm transition-colors">
                    <Coffee size={16} /> Drinks
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Menu Content */}
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* KBBQ Meats */}
              <div className="py-8 border-b border-border">
                <h2 className="text-3xl font-bold mb-2">Korean BBQ Meats</h2>
                <p className="text-muted">
                  Premium cuts grilled at your table on our smokeless grills.
                  All meats are included in your AYCE price.
                </p>
              </div>

              <MenuSection
                id="beef"
                title="Beef"
                icon={Beef}
                items={beefItems}
                showPopular
              />

              <MenuSection
                id="pork-chicken"
                title="Pork & Chicken"
                icon={Drumstick}
                items={porkChickenItems}
                showPopular
              />

              <MenuSection
                id="seafood"
                title="Seafood"
                icon={Fish}
                items={seafoodItems}
                showPopular
              />

              {/* Hot Pot Section */}
              <div className="py-8 border-b border-border mt-8">
                <h2 className="text-3xl font-bold mb-2">Hot Pot</h2>
                <p className="text-muted">
                  Available at South Jordan (+$5 add-on) and South Salt Lake (dedicated Hot Pot).
                  Choose your broth and cook meats, vegetables, and noodles in simmering soup.
                </p>
              </div>

              <MenuSection
                id="hotpot"
                title="Hot Pot Broths"
                icon={Soup}
                items={hotpotBroths}
                showSpicy
              />

              {/* Sides & Accompaniments */}
              <div className="py-8 border-b border-border mt-8">
                <h2 className="text-3xl font-bold mb-2">Sides & Banchan</h2>
                <p className="text-muted">
                  Traditional Korean side dishes (banchan) included with every meal.
                  Unlimited refills on all sides.
                </p>
              </div>

              <MenuSection
                id="sides"
                title="Banchan & Sides"
                icon={Salad}
                items={sides}
              />

              {/* Sauce Bar */}
              <section id="sauce-bar" className="py-12 scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Flame className="text-primary" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Sauce Bar</h2>
                    <p className="text-sm text-muted">Self-serve station with unlimited sauces</p>
                  </div>
                </div>
                <div className="glass rounded-2xl p-6">
                  <p className="text-muted mb-6">
                    Visit our self-serve sauce bar to customize your dipping sauces.
                    Mix and match to create your perfect flavor combination!
                  </p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {sauceBar.map((sauce, index) => (
                      <div key={index} className="bg-card/50 rounded-lg p-3">
                        <h3 className="font-medium text-foreground">{sauce.name}</h3>
                        <p className="text-xs text-muted mt-1">{sauce.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Drinks */}
              <MenuSection
                id="drinks"
                title="Beverages"
                icon={Coffee}
                items={drinks}
              />

              {/* Guidelines Link */}
              <section className="py-12 my-8 glass rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Before You Dine</h3>
                <p className="text-muted mb-4">
                  Please review our all-you-can-eat dining guidelines including time limits,
                  leftover policy, and party gratuity.
                </p>
                <Link
                  href="/ayce-guidelines"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  Read AYCE Guidelines <ChevronRight size={16} />
                </Link>
              </section>
            </div>
          </div>

          {/* CTA Section */}
          <section className="py-12 md:py-16 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Eat?
                </h2>
                <p className="text-muted mb-8 max-w-xl mx-auto">
                  Find your nearest Ombu Grill and enjoy unlimited Korean BBQ & Hot Pot.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/#locations"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <MapPin size={18} />
                    Find a Location
                  </Link>
                  <Link
                    href="/ayce-guidelines"
                    className="flex items-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <Utensils size={18} />
                    View Guidelines
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Location Quick Links */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Our Locations
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {locations.map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/locations/${loc.slug}`}
                      className="glass rounded-xl p-4 hover:bg-card-hover transition-colors group"
                    >
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {loc.name}
                      </h3>
                      <p className="text-sm text-muted">{loc.address}</p>
                      <p className="text-sm text-muted">
                        {loc.city}, {loc.state}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <Link
                  href="/"
                  className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity"
                >
                  OMBU GRILL
                </Link>
                <p className="text-sm text-muted mt-1">
                  Utah&apos;s #1 Korean BBQ & Hot Pot
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted">
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link href="/ayce-guidelines" className="hover:text-foreground transition-colors">
                  Guidelines
                </Link>
                <Link href="/#locations" className="hover:text-foreground transition-colors">
                  Locations
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
