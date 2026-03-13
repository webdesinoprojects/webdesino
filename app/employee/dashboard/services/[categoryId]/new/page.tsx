import prisma from "@/lib/prisma";
import ServiceForm from "@/components/admin/ServiceForm";
import { requireEmployee } from "@/lib/employee-session";

export default async function EmployeeNewServicePage({ params }: { params: { categoryId: string } }) {
  await requireEmployee("services");

  const categories = await prisma.serviceCategory.findMany({
    select: { id: true, title: true },
  });

  const initialService = {
    categoryId: params.categoryId,
  } as any;

  return <ServiceForm service={initialService} categories={categories} returnPath={`/employee/dashboard/services/${params.categoryId}`} />;
}
