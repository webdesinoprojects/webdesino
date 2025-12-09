import PageForm from "@/components/admin/PageForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditPagePage({ params }: PageProps) {
  const page = await prisma.page.findUnique({
    where: { id: params.id },
  });

  if (!page) {
    notFound();
  }

  return <PageForm page={page} />;
}
