import prisma from "@/lib/prisma";
import TrustedSectionForm from "@/components/admin/TrustedSectionForm";
import { getTrustedSectionContent, TRUSTED_SECTION_PAGE_SLUG } from "@/lib/trusted-section";

export default async function TrustedSectionPage({
  searchParams,
}: {
  searchParams?: { saved?: string };
}) {
  const page = await prisma.page.findUnique({
    where: { slug: TRUSTED_SECTION_PAGE_SLUG },
  });

  const content = getTrustedSectionContent(page?.content);

  return <TrustedSectionForm content={content} saved={searchParams?.saved === "1"} />;
}
