import prisma from "@/lib/prisma";
import PageForm from "@/components/admin/PageForm";
import { requireEmployee } from "@/lib/employee-session";
import { notFound } from "next/navigation";

export default async function EmployeeEditPagePage({ params }: { params: { id: string } }) {
  await requireEmployee("pages");
  const page = await prisma.page.findUnique({ where: { id: params.id } });
  if (!page) notFound();
  return <PageForm page={page} returnPath="/employee/dashboard/pages" />;
}
