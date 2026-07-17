import prisma from "@/lib/prisma";
import AwardsSectionForm from "@/components/admin/AwardsSectionForm";
import { AWARDS_SECTION_PAGE_SLUG, getAwardsSectionContent } from "@/lib/awards-section";

export default async function AwardsSectionPage({
  searchParams,
}: {
  searchParams?: { saved?: string };
}) {
  const page = await prisma.page.findUnique({
    where: { slug: AWARDS_SECTION_PAGE_SLUG },
  });

  const content = getAwardsSectionContent(page?.content);

  return <AwardsSectionForm content={content} saved={searchParams?.saved === "1"} />;
}
