import prisma from "@/lib/prisma";
import FAQForm from "@/components/admin/FAQForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditFAQPage({ params }: PageProps) {
  const faq = await prisma.faq.findUnique({
    where: { id: params.id },
  });

  if (!faq) {
    notFound();
  }

  return <FAQForm faq={faq} />;
}
