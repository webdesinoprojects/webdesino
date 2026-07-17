import prisma from "@/lib/prisma";
import SaasSectionForm from "@/components/admin/SaasSectionForm";
import { getSaasSectionContent, SAAS_SECTION_PAGE_SLUG } from "@/lib/saas-section";

export default async function SaasSectionPage({
  searchParams,
}: {
  searchParams?: { saved?: string };
}) {
  const page = await prisma.page.findUnique({
    where: { slug: SAAS_SECTION_PAGE_SLUG },
  });

  const content = getSaasSectionContent(page?.content);

  return <SaasSectionForm content={content} saved={searchParams?.saved === "1"} />;
}
