import prisma from "@/lib/prisma";
import LocalAreasSectionForm from "@/components/admin/LocalAreasSectionForm";
import { getLocalAreasContent, LOCAL_AREAS_PAGE_SLUG } from "@/lib/local-areas-section";

export default async function LocalAreasPage({
  searchParams,
}: {
  searchParams?: { saved?: string };
}) {
  const page = await prisma.page.findUnique({
    where: { slug: LOCAL_AREAS_PAGE_SLUG },
  });

  const content = getLocalAreasContent(page?.content);

  return <LocalAreasSectionForm content={content} saved={searchParams?.saved === "1"} />;
}
