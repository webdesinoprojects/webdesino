import prisma from "@/lib/prisma";
import IndustriesSectionForm from "@/components/admin/IndustriesSectionForm";
import { getIndustriesContent, INDUSTRIES_PAGE_SLUG } from "@/lib/industries-section";

export default async function IndustriesPage({
  searchParams,
}: {
  searchParams?: { saved?: string };
}) {
  const page = await prisma.page.findUnique({
    where: { slug: INDUSTRIES_PAGE_SLUG },
  });

  const content = getIndustriesContent(page?.content);

  return <IndustriesSectionForm content={content} saved={searchParams?.saved === "1"} />;
}
