import { Suspense } from "react";
import SearchContent from "@/components/SearchContent";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getFAQs() {
  return await prisma.faq.findMany({
    orderBy: { order: "asc" },
  });
}

export default async function SearchPage() {
  const faqs = await getFAQs();

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#111184]"></div>
      </div>
    }>
      <SearchContent faqs={faqs} />
    </Suspense>
  );
}
