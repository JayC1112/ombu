# Deployment Guide

## Quick Deploy to Vercel

### Option 1: CLI Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
npx vercel

# Production deploy
npx vercel --prod
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Click "Deploy"

Vercel will auto-detect Next.js and configure build settings.

---

## Pre-Deployment Steps

### 1. Add Images
Add the following images to `public/images/`:

```
public/images/
├── hero/
│   └── hero-bbq.webp          # 1920x1080 recommended
├── menu/
│   ├── beef.webp              # 800x600 recommended
│   ├── pork-chicken.webp
│   ├── seafood.webp
│   └── hotpot.webp
├── locations/
│   ├── midvale.webp           # 800x600 recommended
│   ├── slc.webp
│   ├── layton.webp
│   ├── orem.webp
│   ├── south-jordan.webp
│   └── south-salt-lake.webp
└── og-image.jpg               # 1200x630 for social sharing
```

### 2. Enable Images
Edit `src/data/images.ts`:
```typescript
export const IMAGE_PLACEHOLDERS_ENABLED = false;  // Change to false
```

### 3. Verify Build
```bash
npm run build
```

Expected output:
```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ● /locations/[slug]
│   ├ /locations/midvale
│   ├ /locations/salt-lake-city
│   ├ /locations/layton
│   └ [+3 more paths]
├ ○ /robots.txt
└ ○ /sitemap.xml
```

---

## Domain Configuration

### Vercel Domain Setup
1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add `ombugrillutah.com`
4. Configure DNS:
   - A Record: `76.76.21.21`
   - Or CNAME: `cname.vercel-dns.com`

### SSL
Vercel automatically provisions SSL certificates.

---

## Post-Deployment Checklist

### Verify Pages
- [ ] https://ombugrillutah.com
- [ ] https://ombugrillutah.com/locations/midvale
- [ ] https://ombugrillutah.com/locations/salt-lake-city
- [ ] https://ombugrillutah.com/locations/layton
- [ ] https://ombugrillutah.com/locations/orem
- [ ] https://ombugrillutah.com/locations/south-jordan
- [ ] https://ombugrillutah.com/locations/south-salt-lake
- [ ] https://ombugrillutah.com/robots.txt
- [ ] https://ombugrillutah.com/sitemap.xml

### Test Features
- [ ] Mobile navigation menu
- [ ] Smooth scrolling on all sections
- [ ] Geolocation detection
- [ ] Phone call links (tel:)
- [ ] Google Maps directions links
- [ ] Social media links

### SEO Verification
1. **Google Search Console**
   - Add property for ombugrillutah.com
   - Submit sitemap: `https://ombugrillutah.com/sitemap.xml`
   - Add verification code to `layout.tsx`:
   ```typescript
   verification: {
     google: "your-verification-code",
   },
   ```

2. **Test Structured Data**
   - Use [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Verify Restaurant, FAQ, and Organization schemas

3. **Test Social Sharing**
   - [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Optional: Analytics

### Google Analytics 4
1. Create GA4 property
2. Add to `layout.tsx`:

```typescript
// In <head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
```

---

## Updating Content

### Change Location Info
Edit `src/data/locations.ts`:
- Phone numbers
- Addresses
- Hours
- Pricing

### Change Menu Items
Edit `src/components/Menu.tsx`:
- menuItems object

### Change FAQs
Edit `src/data/faq.ts`:
- generalFAQs
- hotpotFAQs

After changes:
```bash
npm run build
npx vercel --prod
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading
1. Check file paths match `src/data/images.ts`
2. Ensure `IMAGE_PLACEHOLDERS_ENABLED = false`
3. Verify images are in `public/images/`

### Navigation Not Working
1. Clear browser cache
2. Check browser console for errors
3. Verify `scrollTo.ts` utility is imported

---

## Support

For technical issues, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
