import prisma from "@/lib/prisma";
import TrustedBrandsForm from "@/components/admin/TrustedBrandsForm";
import { getTrustedBrandsContent, TRUSTED_BRANDS_PAGE_SLUG } from "@/lib/trusted-brands";

export default async function TrustedBrandsPage({
  searchParams,
}: {
  searchParams?: { saved?: string };
}) {
  const page = await prisma.page.findUnique({
    where: { slug: TRUSTED_BRANDS_PAGE_SLUG },
  });

  const content = getTrustedBrandsContent(page?.content);

  return <TrustedBrandsForm content={content} saved={searchParams?.saved === "1"} />;
}
