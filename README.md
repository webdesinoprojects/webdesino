# Webdesino Website - Next.js Revamp

A complete revamp of the Webdesino website built with Next.js 14, TypeScript, and Tailwind CSS, optimized for SEO and performance.

## Features

- **Next.js 14** with App Router for optimal performance
- **Server-Side Rendering (SSR)** for maximum SEO-friendliness
- **Tailwind CSS** for modern, responsive desig
- **TypeScript** for type safety
- **SEO Optimized** with:
  - Dynamic metadata per page
  - JSON-LD structured data
  - Semantic HTML5
  - Proper heading hierarchy
  - Image optimization with Next.js Image component
- **Accessibility** features built-in
- **Responsive Design** - Mobile-first approach

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with metadata and JSON-LD
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── components/
│   ├── Navbar.tsx       # Navigation with mega-menu
│   ├── Hero.tsx         # Hero section with brand ticker
│   ├── ServicesPills.tsx # Services section
│   ├── WhyChooseUs.tsx  # Features section
│   ├── Portfolio.tsx   # Portfolio with filters
│   ├── Testimonials.tsx # Testimonials carousel
│   ├── FAQ.tsx          # FAQ accordion
│   └── Footer.tsx       # Footer component
├── public/              # Static assets (images, logos, etc.)
└── package.json         # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Components Overview

### Navbar
- Sticky navigation bar
- Mega-menu on hover for "Our Clients"
- Mobile-responsive menu
- Contact information in top bar

### Hero Section
- Large headline with keyword-rich H1
- Brand logo ticker (infinitely scrolling)
- Call-to-action button
- SEO-optimized content

### Services Section
- Pill-shaped service links
- Full-width orange buttons
- Arrow indicators

### Why Choose Us
- 6-item grid layout
- Central graphic/icon
- Numbered feature boxes
- Responsive design

### Portfolio
- Filter buttons by industry
- Project carousel
- Case study details
- Success metrics

### Testimonials
- Auto-rotating carousel
- Client reviews
- Navigation dots

### FAQ
- Accordion-style questions
- Expandable answers
- SEO-friendly content

### Footer
- Multi-column layout
- Quick links
- Contact information
- Social media links
- Copyright notice

## SEO Features

- **Metadata**: Dynamic titles and descriptions per page
- **Structured Data**: JSON-LD schema for Organization and Services
- **Semantic HTML**: Proper use of `<main>`, `<section>`, `<nav>`, etc.
- **Heading Hierarchy**: H1 → H2 → H3 structure
- **Image Optimization**: Next.js Image component with alt text
- **Internal Linking**: Strategic links between pages
- **Open Graph Tags**: Social media optimization

## Color Palette

- **Cream**: `#F5F5DC` - Background color
- **Orange**: `#FF6B35` - Primary accent color
- **Teal**: `#004E64` - Primary text color

## Performance

The site is optimized for:
- Fast page loads
- Lighthouse scores 95+
- Mobile-first responsive design
- Optimized images
- Minimal JavaScript bundle

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Webdesino, All Rights Reserved

