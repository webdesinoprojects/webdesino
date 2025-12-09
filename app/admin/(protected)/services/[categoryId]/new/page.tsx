import prisma from "@/lib/prisma";
import ServiceForm from "@/components/admin/ServiceForm";

export default async function NewServicePage({ params }: { params: { categoryId: string } }) {
  const categories = await prisma.serviceCategory.findMany({
    select: { id: true, title: true },
  });

  const initialService = {
    categoryId: params.categoryId,
  } as any;

  return <ServiceForm service={initialService} categories={categories} />;
}
