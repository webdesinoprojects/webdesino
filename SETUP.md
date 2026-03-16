# Setup Instructions

## Required Assets

Before running the project, you need to add the following assets:

### 1. Logo
- **Location**: `public/logo.png`
- **Description**: Webdesino company logo
- **Recommended Size**: 300x100px (or maintain aspect ratio)

### 2. Brand Logos (Trusted by Leading Brands)
- **Location**: `public/brands/`
- **Files Needed**:
  - `brand1.png`
  - `brand2.png`
  - `brand3.png`
  - `brand4.png`
  - `brand5.png`
- **Description**: Logos of companies/brands that trust Webdesino
- **Recommended Size**: 200x100px each

### 3. Portfolio Images
- **Location**: `public/portfolio/`
- **Files Needed**:
  - `bookbuzzz.jpg`
  - `luckynutra.jpg`
  - `buykharibauli.jpg`
  - `meritshot.jpg`
- **Description**: Screenshots or images of portfolio projects
- **Recommended Size**: 1200x600px

### 4. Webdesino Icon
- **Location**: `public/webdesino-icon.svg`
- **Description**: Icon/graphic for the "Why Choose Us" section
- **Status**: Placeholder SVG created, replace with actual design

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Assets**
   - Replace placeholder logo with actual Webdesino logo
   - Add brand logos to `public/brands/`
   - Add portfolio images to `public/portfolio/`
   - Update icon SVG if needed

3. **Configure Environment** (if needed)
   - Set `FRONTEND_URL` (example: `https://webdesino.com`) for auth/reset links (optional if host headers are available in deployment)
   - Optionally set `NEXT_PUBLIC_SITE_URL` as your public base URL
   - In Supabase Auth settings, set `Site URL` to your production domain and add `https://your-domain.com/auth/callback` to Redirect URLs
   - Set `GA_MEASUREMENT_ID` (example: `G-XXXXXXXXXX`) for Google Analytics
   - Update contact information in `components/Navbar.tsx` and `components/Footer.tsx`
   - Update social media links in `components/Footer.tsx`

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Customization

### Colors
Colors are defined in `tailwind.config.ts`:
- Cream: `#F5F5DC`
- Orange: `#FF6B35`
- Teal: `#004E64`

### Content
All content is extracted from webdesino.com and can be updated in:
- `components/Hero.tsx` - Hero section content
- `components/ServicesPills.tsx` - Services list
- `components/WhyChooseUs.tsx` - Features list
- `components/Portfolio.tsx` - Portfolio projects
- `components/Testimonials.tsx` - Client testimonials
- `components/FAQ.tsx` - FAQ questions and answers

## SEO Checklist

- ✅ Metadata configured in `app/layout.tsx`
- ✅ JSON-LD structured data added
- ✅ Semantic HTML5 tags used
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Image alt text added
- ✅ Sitemap configured (`app/sitemap.ts`)
- ✅ Robots.txt configured (`public/robots.txt`)
- ✅ Internal linking implemented

## Performance Optimization

- ✅ Next.js Image component used
- ✅ Server-side rendering enabled
- ✅ Optimized bundle size
- ✅ Mobile-first responsive design

