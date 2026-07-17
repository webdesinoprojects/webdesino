import prisma from "@/lib/prisma";
import WhyChooseForm from "@/components/admin/WhyChooseForm";
import { getWhyChooseContent, WHY_CHOOSE_PAGE_SLUG } from "@/lib/why-choose";

export default async function WhyChoosePage({
  searchParams,
}: {
  searchParams?: { saved?: string };
}) {
  const page = await prisma.page.findUnique({
    where: { slug: WHY_CHOOSE_PAGE_SLUG },
  });

  const content = getWhyChooseContent(page?.content);

  return <WhyChooseForm content={content} saved={searchParams?.saved === "1"} />;
}
