import { PrismaClient } from "../lib/generated/prisma";
import * as fs from "fs";
import * as path from "path";
import { getPortfolioProjects } from "../lib/data";

const prisma = new PrismaClient();

const BLOG_PAGE_SIZE = 10;
const RESERVED_SLUGS = new Set([
  "about",
  "blog",
  "case-studies",
  "contact",
  "our-clients",
  "portfolio",
  "pricing",
  "privacy-policy",
  "refund-policy",
  "rohit-tiwari",
  "search",
  "services",
  "terms-conditions",
  "testimonials",
]);

function walk(dir: string): string[] {
  const out: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...walk(full));
    } else if (e.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function websiteStaticRouteCount(): number {
  const websiteRoot = path.join(process.cwd(), "app", "(website)");
  const allFiles = walk(websiteRoot).filter((p) => p.endsWith("page.tsx"));
  const staticOnly = allFiles.filter((p) => !p.includes("["));
  return staticOnly.length;
}

async function main() {
  const [
    locationCount,
    genericPageCount,
    locationSlugs,
    genericSlugs,
    blogPostCount,
    projectCount,
    serviceCategoryCount,
    serviceSubtypeCount,
  ] = await Promise.all([
    prisma.locationPage.count(),
    prisma.page.count(),
    prisma.locationPage.findMany({ select: { slug: true } }),
    prisma.page.findMany({ select: { slug: true } }),
    prisma.blogPost.count(),
    prisma.project.count(),
    prisma.serviceCategory.count(),
    prisma.serviceSubtype.count(),
  ]);

  const staticWebsiteRoutes = websiteStaticRouteCount();

  const catchAllSlugCount = new Set(
    [...locationSlugs.map((x) => x.slug), ...genericSlugs.map((x) => x.slug)].filter(
      (slug) => slug && !RESERVED_SLUGS.has(slug)
    )
  ).size;

  const blogListingPages = Math.max(1, Math.ceil(blogPostCount / BLOG_PAGE_SIZE));
  const blogDetailPages = blogPostCount;
  const caseStudyPages = projectCount;
  const portfolioPages = getPortfolioProjects().length;
  const serviceCategoryPages = serviceCategoryCount;
  const serviceSubtypePages = serviceSubtypeCount;

  const estimatedTotalUrls =
    staticWebsiteRoutes +
    catchAllSlugCount +
    blogListingPages +
    blogDetailPages +
    caseStudyPages +
    portfolioPages +
    serviceCategoryPages +
    serviceSubtypePages;

  console.log("=".repeat(64));
  console.log("Website Page Count Report");
  console.log("=".repeat(64));
  console.log(`Static website routes (app/(website), non-dynamic): ${staticWebsiteRoutes}`);
  console.log(`Catch-all dynamic pages from /[slug] (LocationPage + Page): ${catchAllSlugCount}`);
  console.log(`  - LocationPage records: ${locationCount}`);
  console.log(`  - Generic Page records: ${genericPageCount}`);
  console.log(`Blog listing pages (/blog?page=n): ${blogListingPages}`);
  console.log(`Blog detail pages (/blog/[slug]): ${blogDetailPages}`);
  console.log(`Case study pages (/case-studies/[slug]): ${caseStudyPages}`);
  console.log(`Portfolio pages (/portfolio/[slug]): ${portfolioPages}`);
  console.log(`Service category pages (/services/[category]): ${serviceCategoryPages}`);
  console.log(`Service subtype pages (/services/[category]/[slug]): ${serviceSubtypePages}`);
  console.log("-".repeat(64));
  console.log(`Estimated total website URLs: ${estimatedTotalUrls}`);
  console.log("=".repeat(64));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

