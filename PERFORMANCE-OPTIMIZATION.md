# Performance Optimization for 40K+ Location Pages

## Current Architecture Issues

With 40K+ pages, you need to optimize:
1. Database queries
2. Build time
3. Page generation
4. SEO/Sitemap
5. Admin panel performance

---

## 1. Database Optimization ✅ CRITICAL

### Add Indexes (Run in Supabase SQL Editor)

```sql
-- Index for location lookups (most common query)
CREATE INDEX IF NOT EXISTS "LocationPage_slug_idx" ON "LocationPage"("slug");

-- Index for state filtering
CREATE INDEX IF NOT EXISTS "LocationPage_state_idx" ON "LocationPage"("state");

-- Index for service filtering
CREATE INDEX IF NOT EXISTS "LocationPage_serviceFocus_idx" ON "LocationPage"("serviceFocus");

-- Composite index for combined filtering (state + service)
CREATE INDEX IF NOT EXISTS "LocationPage_state_service_idx" 
ON "LocationPage"("state", "serviceFocus");

-- Index for location name (for deduplication in footer)
CREATE INDEX IF NOT EXISTS "LocationPage_location_idx" ON "LocationPage"("location");

-- Index for admin panel sorting
CREATE INDEX IF NOT EXISTS "LocationPage_location_asc_idx" 
ON "LocationPage"("location" ASC);
```

**Impact:** Queries will be 10-100x faster with proper indexes.

---

## 2. Next.js Configuration

### Update `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for location pages
  output: 'standalone', // For production deployment
  
  // Optimize image loading
  images: {
    domains: ['your-supabase-storage.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Increase static generation timeout
  staticPageGenerationTimeout: 180, // 3 minutes per page
  
  // Enable experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
```

---

## 3. Dynamic Page Generation Strategy

### Current: `app/(website)/[slug]/page.tsx`

**Problem:** Generating 40K pages at build time is slow.

**Solution:** Use Incremental Static Regeneration (ISR)

```typescript
// app/(website)/[slug]/page.tsx

export const revalidate = 86400; // Revalidate every 24 hours

export async function generateStaticParams() {
  // Only generate top 100 most important pages at build time
  const topLocations = await prisma.locationPage.findMany({
    select: { slug: true },
    take: 100,
    orderBy: { createdAt: 'desc' }
  });

  return topLocations.map((loc) => ({
    slug: loc.slug,
  }));
}

// This enables on-demand generation for other pages
export const dynamicParams = true;
```

**Benefits:**
- Build time: ~5 minutes instead of hours
- First visit generates page (cached forever)
- Updates every 24 hours automatically

---

## 4. Footer Optimization

### Current Issue: Loading 1,804+ locations in footer

**Solution:** Limit footer locations

```typescript
// app/(website)/layout.tsx

export default async function WebsiteLayout({ children }) {
  // Only show top 100 locations in footer
  const locations = await prisma.locationPage.findMany({
    select: {
      location: true,
      slug: true,
    },
    take: 100, // Limit to 100
    orderBy: {
      location: 'asc',
    },
  });

  // Deduplicate
  const uniqueLocationsMap = new Map();
  locations.forEach(loc => {
    if (!uniqueLocationsMap.has(loc.location)) {
      uniqueLocationsMap.set(loc.location, {
        name: loc.location,
        slug: loc.slug,
      });
    }
  });
  
  const footerLocations = Array.from(uniqueLocationsMap.values());

  return (
    <>
      <Navbar />
      {children}
      <Footer locations={footerLocations} />
      <BottomNav />
      <ContactWidget />
    </>
  );
}
```

**Alternative:** Remove dynamic locations from footer entirely, use only hardcoded ones.

---

## 5. Admin Panel Optimization

### Pagination for Location List

```typescript
// app/admin/(protected)/locations/page.tsx

interface LocationsPageProps {
  searchParams: {
    state?: string;
    service?: string;
    page?: string; // Add pagination
  };
}

export default async function LocationsPage({ searchParams }: LocationsPageProps) {
  const page = parseInt(searchParams?.page || '1');
  const pageSize = 50; // Show 50 per page
  const skip = (page - 1) * pageSize;

  const [locations, totalCount] = await Promise.all([
    prisma.locationPage.findMany({
      where: whereConditions,
      orderBy: { location: "asc" },
      take: pageSize,
      skip: skip,
    }),
    prisma.locationPage.count({
      where: whereConditions,
    })
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  // Add pagination UI
}
```

---

## 6. Sitemap Optimization

### Split into Multiple Sitemaps

```typescript
// app/sitemap.ts

export default async function sitemap() {
  // Return sitemap index pointing to sub-sitemaps
  return [
    {
      url: 'https://webdesino.com/sitemap-locations-1.xml',
      lastModified: new Date(),
    },
    {
      url: 'https://webdesino.com/sitemap-locations-2.xml',
      lastModified: new Date(),
    },
    // ... split into chunks of 10,000 URLs each
  ];
}

// app/sitemap-locations-1.xml/route.ts
export async function GET() {
  const locations = await prisma.locationPage.findMany({
    select: { slug: true, updatedAt: true },
    take: 10000,
    skip: 0,
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locations.map(loc => `
        <url>
          <loc>https://webdesino.com/${loc.slug}</loc>
          <lastmod>${loc.updatedAt.toISOString()}</lastmod>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

---

## 7. Caching Strategy

### Add Redis/Upstash for Caching

```typescript
// lib/cache.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

export async function getCachedLocation(slug: string) {
  const cached = await redis.get(`location:${slug}`);
  if (cached) return cached;

  const location = await prisma.locationPage.findUnique({
    where: { slug }
  });

  // Cache for 24 hours
  await redis.setex(`location:${slug}`, 86400, JSON.stringify(location));
  
  return location;
}
```

---

## 8. Build Strategy

### Recommended Approach

1. **Development:** Use `dynamicParams = true` (generate on-demand)
2. **Production:** Pre-generate top 1000 pages, rest on-demand
3. **Revalidation:** ISR with 24-hour revalidation

### Build Command

```json
{
  "scripts": {
    "build": "next build",
    "build:fast": "SKIP_STATIC_GENERATION=true next build"
  }
}
```

---

## 9. Monitoring & Analytics

### Track Performance

```typescript
// Add to location page
export async function generateMetadata({ params }) {
  const startTime = Date.now();
  
  // ... fetch data
  
  const duration = Date.now() - startTime;
  console.log(`Page ${params.slug} generated in ${duration}ms`);
}
```

---

## 10. Database Connection Pooling

### Update Prisma Configuration

```typescript
// lib/prisma.ts
import { PrismaClient } from '@/lib/generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
```

---

## Implementation Priority

### Phase 1: Immediate (Do Now)
1. ✅ Add database indexes (run SQL script)
2. ✅ Enable ISR with `revalidate = 86400`
3. ✅ Limit footer locations to 100
4. ✅ Add pagination to admin panel

### Phase 2: Before Scaling to 40K
1. Split sitemaps
2. Implement caching layer
3. Optimize build configuration

### Phase 3: Monitoring
1. Add performance tracking
2. Monitor database query times
3. Track page generation times

---

## Expected Performance

### Before Optimization
- Build time: 5-10 hours for 40K pages
- Database queries: 500-2000ms
- Admin panel: Slow/timeout with 40K records

### After Optimization
- Build time: 5-10 minutes (top 1000 pages)
- Database queries: 10-50ms (with indexes)
- Admin panel: Fast with pagination
- Page load: <500ms (with ISR + caching)

---

## Cost Considerations

### Supabase Free Tier Limits
- Database: 500MB (should be fine)
- Bandwidth: 5GB/month (might need upgrade)
- API requests: 500K/month (should be fine with caching)

### Recommended Upgrades
- Supabase Pro: $25/month (better performance)
- Upstash Redis: Free tier sufficient for caching
- Vercel Pro: $20/month (better build times)

---

## Testing Strategy

1. Test with 1,000 pages first
2. Monitor performance metrics
3. Scale to 10,000 pages
4. Optimize based on bottlenecks
5. Scale to 40,000 pages

---

## Quick Wins (Implement Today)

```sql
-- 1. Add indexes (run in Supabase)
CREATE INDEX "LocationPage_slug_idx" ON "LocationPage"("slug");
CREATE INDEX "LocationPage_state_service_idx" ON "LocationPage"("state", "serviceFocus");
```

```typescript
// 2. Enable ISR in location page
export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const topLocations = await prisma.locationPage.findMany({
    select: { slug: true },
    take: 100,
  });
  return topLocations.map((loc) => ({ slug: loc.slug }));
}
```

```typescript
// 3. Limit footer locations
const locations = await prisma.locationPage.findMany({
  take: 100, // Add this line
  // ... rest of query
});
```

These 3 changes will handle 40K pages efficiently!
