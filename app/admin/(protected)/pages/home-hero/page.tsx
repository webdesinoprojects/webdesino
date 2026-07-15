import HomepageHeroForm from "@/components/admin/HomepageHeroForm";
import { getHeroShowcaseItems } from "@/lib/data";
import { getHomepageHeroContent, HOMEPAGE_HERO_PAGE_SLUG } from "@/lib/homepage-hero";
import prisma from "@/lib/prisma";

export default async function HomepageHeroPage({
  searchParams,
}: {
  searchParams?: { saved?: string };
}) {
  const page = await prisma.page.findUnique({
    where: { slug: HOMEPAGE_HERO_PAGE_SLUG },
  });
  const defaultShowcaseItems = getHeroShowcaseItems();
  const content = getHomepageHeroContent(page?.content, defaultShowcaseItems);

  return <HomepageHeroForm content={content} saved={searchParams?.saved === "1"} />;
}
