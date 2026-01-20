# Ombu Grill Utah - Official Website

🔥 Utah's #1 All-You-Can-Eat Korean BBQ & Hot Pot restaurant chain with 6 locations.

**Live Site**: [ombugrillutah.com](https://ombugrillutah.com)

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.2 | React Framework (App Router) |
| React | 19.2.3 | UI Library |
| Tailwind CSS | 4 | Styling |
| Framer Motion | 12.x | Animations |
| Zustand | 5.x | State Management |
| Lucide React | 0.562 | Icons |
| TypeScript | 5 | Type Safety |

---

## Project Structure

```
ombu/
├── public/                   # Static assets
│   ├── og-image.svg          # Social sharing image (SVG)
│   ├── og-image.png          # Social sharing image (PNG) ← Generate before deploy
│   ├── logo.svg              # Brand logo
│   └── images/               # Site images
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout + SEO Schema
│   │   ├── page.tsx          # Home page
│   │   ├── globals.css       # Global styles
│   │   ├── menu/page.tsx     # Menu page
│   │   ├── ayce-guidelines/  # Dining guidelines page
│   │   ├── locations/[slug]/ # Dynamic location pages (6)
│   │   ├── robots.ts         # robots.txt
│   │   └── sitemap.ts        # sitemap.xml
│   ├── components/           # 12 React components
│   ├── data/                 # Static data (locations, menu, etc.)
│   ├── store/                # Zustand state management
│   ├── config/               # App configuration
│   └── utils/                # Utility functions
├── vercel.json               # Vercel deployment config
├── next.config.ts            # Next.js configuration
└── package.json
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

### Images - Complete Guide

Images are configured in `src/data/images.ts`.

#### Step 1: Toggle Placeholder Mode
```typescript
// src/data/images.ts (line 9)
export const IMAGE_PLACEHOLDERS_ENABLED = true;  // Development (colored boxes)
export const IMAGE_PLACEHOLDERS_ENABLED = false; // Production (real images)
```

#### Step 2: Add Required Images

| Image | Path | Size | Description |
|-------|------|------|-------------|
| **Hero** | `public/images/hero/hero-bbq.webp` | 1920×1080 | Homepage background |
| **OG Image** | `public/og-image.png` | 1200×630 | Social sharing (Facebook/Twitter) |
| **Logo** | `public/logo.svg` | 200×60 | Brand logo (SVG provided) |

**Menu Category Images** (`public/images/menu/`):
| File | Size | Description |
|------|------|-------------|
| `bbq-meats.webp` | 800×400 | Korean BBQ meats (bulgogi, galbi) |
| `seafood.webp` | 800×400 | Shrimp, calamari, mussels |
| `appetizers.webp` | 800×400 | Fried dumplings, wings, edamame |
| `sides-soups.webp` | 800×400 | Kimchi, soup, banchan |
| `rice-noodles.webp` | 800×400 | Bibimbap, ramen, fried rice |
| `beverages.webp` | 800×400 | Boba tea, milkshakes |
| `desserts.webp` | 800×400 | Mochi ice cream, crepe cake |

**Location Images** (`public/images/locations/`):
| File | Size | Description |
|------|------|-------------|
| `midvale.webp` | 600×400 | Midvale store front/interior |
| `slc.webp` | 600×400 | Salt Lake City location |
| `layton.webp` | 600×400 | Layton location |
| `orem.webp` | 600×400 | Orem location |
| `south-jordan.webp` | 600×400 | South Jordan location |
| `south-salt-lake.webp` | 600×400 | South Salt Lake (Hot Pot) |
| `fallback.webp` | 600×400 | Default if specific image missing |

#### Step 3: Image Optimization Tips
```bash
# Convert JPG/PNG to WebP (recommended)
# Use https://squoosh.app or:
cwebp -q 80 input.jpg -o output.webp

# Recommended quality settings:
# - Hero: 80-85% quality
# - Menu/Location: 75-80% quality
# - Keep file sizes under 200KB each
```

#### Complete File Structure
```
public/
├── og-image.png              ← 1200×630 (generate from og-image.svg)
├── og-image.svg              ← Source file (provided)
├── logo.svg                  ← Brand logo (provided)
├── favicon.ico               ← Already in src/app/
└── images/
    ├── hero/
    │   └── hero-bbq.webp     ← 1920×1080
    ├── menu/
    │   ├── bbq-meats.webp    ← 800×400
    │   ├── seafood.webp
    │   ├── appetizers.webp
    │   ├── sides-soups.webp
    │   ├── rice-noodles.webp
    │   ├── beverages.webp
    │   └── desserts.webp
    └── locations/
        ├── midvale.webp      ← 600×400
        ├── slc.webp
        ├── layton.webp
        ├── orem.webp
        ├── south-jordan.webp
        ├── south-salt-lake.webp
        └── fallback.webp
```

---

### Location Data

Edit `src/data/locations.ts` to update store information:

| Field | Example | Description |
|-------|---------|-------------|
| `name` | "Midvale" | Display name |
| `address` | "6930 S State St" | Street address |
| `phone` | "8015613577" | Phone (digits only) |
| `phoneDisplay` | "(801) 561-3577" | Formatted phone |
| `hours` | "Daily 11 AM - 10 PM" | Operating hours |
| `lat`, `lng` | 40.6111, -111.8919 | GPS coordinates (for directions) |
| `pricing.kbbq.lunch` | 16.99 | Lunch price |
| `pricing.kbbq.dinner` | 25.99 | Dinner price |

**Google Maps URLs**: Auto-generated from address, or set `googleMapsUrl` manually.

---

### Pricing Visibility

Configure in `src/config/pricingVisibility.ts`:
- Controls where pricing is displayed
- Default: Only show on hero for nearest location via geolocation

## Deployment

### Step 1: Generate OG Image (Required)

```bash
# Option A: Use browser converter
open http://localhost:3000/convert-og-image.html
# Click "Generate PNG" → Move to public/og-image.png
# Then delete convert-og-image.html

# Option B: Use online converter
# Upload public/og-image.svg to https://cloudconvert.com/svg-to-png
# Download and save as public/og-image.png
```

### Step 2: Deploy to Vercel

**Method A: Via GitHub (Recommended)**
```bash
# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/ombu.git
git push -u origin main

# Then import project at vercel.com
```

**Method B: Via Vercel CLI**
```bash
npm i -g vercel
vercel --prod
```

### Step 3: Configure Domain

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add `ombugrillutah.com`
3. Configure DNS:
   - Type: `A` Record → `76.76.21.21`
   - Or Type: `CNAME` → `cname.vercel-dns.com`

### Step 4: Post-Deployment Verification

```bash
# Test sitemap
curl https://ombugrillutah.com/sitemap.xml

# Test robots.txt
curl https://ombugrillutah.com/robots.txt
```

**Manual Checks:**
- [ ] Homepage loads correctly
- [ ] Mobile navigation works
- [ ] Menu categories switch properly
- [ ] Location pages load (`/locations/salt-lake-city`, etc.)
- [ ] Phone call buttons work on mobile

### Step 5: SEO Setup

1. **Google Search Console**
   - Add property: `ombugrillutah.com`
   - Submit sitemap: `https://ombugrillutah.com/sitemap.xml`
   
2. **Test Rich Results**
   - Visit: https://search.google.com/test/rich-results
   - Enter: `https://ombugrillutah.com`
   - Verify Schema data (FAQ, Restaurant, LocalBusiness)

3. **Google Analytics (Optional)**
   - Create GA4 property
   - Add `NEXT_PUBLIC_GA_ID` environment variable in Vercel

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 ID |
| `NEXT_PUBLIC_GTM_ID` | No | Google Tag Manager ID |

---

## Pre-Deployment Checklist

### Code Quality
- [x] TypeScript - No errors
- [x] ESLint - No errors
- [x] Build - Successful

### SEO
- [x] Meta tags (title, description, keywords)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Schema.org structured data (7 types)
- [x] Sitemap.xml auto-generated
- [x] Robots.txt configured

### Content
- [x] 80+ menu items (real data from ombugrillutah.com)
- [x] 6 locations with addresses, phones, hours
- [x] Dining guidelines
- [x] FAQ content

### Assets
- [x] Logo SVG (`public/logo.svg`)
- [x] OG Image SVG (`public/og-image.svg`)
- [ ] OG Image PNG (`public/og-image.png`) ← Generate before deploy
- [ ] Actual food/location images (currently using placeholders)

### Configuration
- [x] vercel.json (security headers, caching)
- [x] next.config.ts (image optimization)
- [ ] Set `IMAGE_PLACEHOLDERS_ENABLED = false` when images ready

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

---

## Changelog

### v1.0.0 (2026-01-20)

**Initial Release**

#### Features
- 🏠 Homepage with hero, about, menu, locations, contact sections
- 📍 6 individual location pages with SEO optimization
- 🍖 Full menu with 80+ items (BBQ meats, seafood, appetizers, drinks, desserts)
- 📱 Mobile-first responsive design
- 🔍 Geolocation-based nearest location detection

#### SEO
- Schema.org structured data (Website, Organization, FAQ, Restaurant, 6x LocalBusiness)
- Auto-generated sitemap.xml with all pages
- Optimized meta tags with 50+ Utah-focused keywords
- Open Graph & Twitter Card support

#### Performance
- Image optimization (AVIF/WebP)
- CSS optimization enabled
- Security headers configured

#### Mobile Fixes
- Fixed bottom CTA bar content overlap
- Fixed navigation menu animation issues
- Added iOS safe area support
- Improved scroll behavior with header offset

---

## License

Private - Ombu Grill Utah

---

## Contact

| Channel | Link |
|---------|------|
| Website | https://ombugrillutah.com |
| Instagram | [@ombuutah](https://instagram.com/ombuutah) |
| TikTok | [@ombu_utah](https://tiktok.com/@ombu_utah) |
| Email | info@ombugrillutah.com |
