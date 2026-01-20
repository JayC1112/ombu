# Ombu Grill Utah - Official Website

Utah's #1 All-You-Can-Eat Korean BBQ & Hot Pot restaurant chain with 6 locations.

## Tech Stack

- **Framework**: Next.js 16.1.2 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Language**: TypeScript 5

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles & Tailwind
│   ├── robots.ts           # robots.txt generation
│   ├── sitemap.ts          # sitemap.xml generation
│   └── locations/[slug]/   # Dynamic location pages
│       └── page.tsx
├── components/             # React components
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section with geolocation
│   ├── About.tsx           # About section
│   ├── Menu.tsx            # Menu categories
│   ├── Locations.tsx       # All locations grid
│   ├── LocationCard.tsx    # Individual location card
│   ├── Contact.tsx         # Contact & social links
│   ├── Footer.tsx          # Footer with mobile CTA
│   ├── DiningRules.tsx     # Dining guidelines
│   ├── PhotoGallery.tsx    # Photo gallery
│   ├── GoogleReviewsPreview.tsx # Reviews section
│   ├── ImagePlaceholder.tsx # Placeholder for images
│   └── CopyButton.tsx      # Copy to clipboard button
├── data/                   # Static data
│   ├── locations.ts        # All 6 location data
│   ├── images.ts           # Image configuration
│   ├── faq.ts              # FAQ content
│   ├── gallery.ts          # Gallery images
│   ├── reviews.ts          # Google reviews
│   └── diningGuidelines.ts # Dining rules
├── store/                  # State management
│   └── locationStore.ts    # Zustand store for location
├── config/                 # Configuration
│   └── pricingVisibility.ts # Pricing display settings
└── utils/                  # Utilities
    └── scrollTo.ts         # Smooth scroll utility
```

## Features

### Core Features
- **6 Location Pages**: Each location has a dedicated SEO-optimized page
- **Geolocation**: Auto-detects nearest location on homepage
- **Dynamic Pricing**: Shows pricing based on nearest location (configurable)
- **Mobile-First Design**: Responsive with sticky mobile CTAs
- **Smooth Navigation**: Client-side smooth scrolling

### SEO Features
- **Structured Data**: JSON-LD schemas (WebSite, Organization, FAQ, Restaurant)
- **Dynamic Metadata**: Each location has unique title/description
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Proper crawler configuration

### Locations
1. Midvale - Korean BBQ
2. Salt Lake City - Korean BBQ
3. Layton - Korean BBQ
4. Orem - Korean BBQ
5. South Jordan - Korean BBQ + Hot Pot
6. South Salt Lake - Hot Pot Only

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

### Run Production Server
```bash
npm run start
```

### Linting
```bash
npm run lint
```

## Configuration

### Images
Images are configured in `src/data/images.ts`. Set `IMAGE_PLACEHOLDERS_ENABLED`:
- `true`: Shows colored placeholder divs (for development)
- `false`: Shows actual images (for production)

Required images:
```
public/images/
├── hero/
│   └── hero-bbq.webp
├── menu/
│   ├── beef.webp
│   ├── pork-chicken.webp
│   ├── seafood.webp
│   └── hotpot.webp
├── locations/
│   ├── midvale.webp
│   ├── slc.webp
│   ├── layton.webp
│   ├── orem.webp
│   ├── south-jordan.webp
│   └── south-salt-lake.webp
└── og-image.jpg (1200x630 for social sharing)
```

### Pricing Visibility
Configure in `src/config/pricingVisibility.ts`:
- Controls where pricing is displayed
- Default: Only show on hero for nearest location via geolocation

### Location Data
Edit `src/data/locations.ts` to update:
- Addresses and phone numbers
- Hours of operation
- Pricing (lunch/dinner)
- Google Maps URLs
- Concepts (KBBQ/Hot Pot availability)

## Deployment

### Vercel (Recommended)
```bash
npx vercel
```

Or connect GitHub repo to Vercel for automatic deployments.

### Other Platforms
Build static files:
```bash
npm run build
```

Output in `.next/` folder. Deploy to any Node.js hosting or static hosting with `next export`.

### Environment Variables
No environment variables required for basic deployment.

Optional:
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID
- Add Google Search Console verification in `layout.tsx`

## Pre-Deployment Checklist

- [x] All TypeScript errors resolved
- [x] All ESLint errors resolved
- [x] Build succeeds
- [x] 12 pages generated correctly
- [x] Navigation works on all devices
- [x] Mobile menu functional
- [ ] Add actual images to `/public/images/`
- [ ] Set `IMAGE_PLACEHOLDERS_ENABLED = false`
- [ ] Configure domain (ombugrillutah.com)
- [ ] Add Google Analytics (optional)
- [ ] Add Google Search Console verification (optional)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

Private - Ombu Grill Utah

## Contact

Website: https://ombugrillutah.com
Instagram: @ombuutah
TikTok: @ombu_utah
Email: info@ombugrillutah.com
