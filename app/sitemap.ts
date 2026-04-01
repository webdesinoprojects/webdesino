import { MetadataRoute } from 'next';
import { getPortfolioProjects } from '@/lib/data';
import { getAllCaseSlugs } from '@/lib/case-studies';
import { servicesData } from '@/lib/services-data';
import prisma from '@/lib/prisma';

// CRITICAL FIX: Cache sitemap for 24 hours
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Get all dynamic project routes
  const projects = getPortfolioProjects();
  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `https://webdesino.com/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 2. Get all case study routes
  const caseSlugs = getAllCaseSlugs();
  const caseStudyEntries: MetadataRoute.Sitemap = caseSlugs.map((slug) => ({
    url: `https://webdesino.com/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // 3. Get all service routes
  const serviceCategoryEntries: MetadataRoute.Sitemap = servicesData.map((category) => ({
    url: `https://webdesino.com/services/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const serviceSubtypeEntries: MetadataRoute.Sitemap = servicesData.flatMap((category) => 
    category.subtypes.map((subtype) => ({
      url: `https://webdesino.com/services/${category.slug}/${subtype.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  );

  // 4. Get all location routes - CRITICAL: Limit to 1000
  const locations = await prisma.locationPage.findMany({
    select: { slug: true },
    take: 1000, // CRITICAL: Limit sitemap size
    orderBy: { updatedAt: 'desc' }, // Most recently updated first
  });
  const locationEntries: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `https://webdesino.com/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 5. Define static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://webdesino.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://webdesino.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://webdesino.com/services',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://webdesino.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://webdesino.com/portfolio',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://webdesino.com/case-studies',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // 5. Combine and return
  return [
    ...staticRoutes,
    ...serviceCategoryEntries,
    ...serviceSubtypeEntries,
    ...projectEntries,
    ...caseStudyEntries,
    ...locationEntries,
  ];
}
