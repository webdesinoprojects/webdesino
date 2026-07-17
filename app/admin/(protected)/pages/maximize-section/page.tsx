import prisma from "@/lib/prisma";
import MaximizeSectionForm from "@/components/admin/MaximizeSectionForm";
import { getMaximizeSectionContent, MAXIMIZE_SECTION_PAGE_SLUG } from "@/lib/maximize-section";

export default async function MaximizeSectionPage({
  searchParams,
}: {
  searchParams?: { saved?: string };
}) {
  const page = await prisma.page.findUnique({
    where: { slug: MAXIMIZE_SECTION_PAGE_SLUG },
  });

  const content = getMaximizeSectionContent(page?.content);

  return <MaximizeSectionForm content={content} saved={searchParams?.saved === "1"} />;
}
