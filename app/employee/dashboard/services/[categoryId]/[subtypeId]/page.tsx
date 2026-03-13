import prisma from "@/lib/prisma";
import ServiceForm from "@/components/admin/ServiceForm";
import { requireEmployee } from "@/lib/employee-session";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    categoryId: string;
    subtypeId: string;
  };
}

export default async function EmployeeEditServicePage({ params }: PageProps) {
  await requireEmployee("services");

  const [service, categories] = await Promise.all([
    prisma.serviceSubtype.findUnique({
      where: { id: params.subtypeId },
    }),
    prisma.serviceCategory.findMany({
      select: { id: true, title: true },
    }),
  ]);

  if (!service) {
    notFound();
  }

  return <ServiceForm service={service} categories={categories} returnPath={`/employee/dashboard/services/${params.categoryId}`} />;
}
