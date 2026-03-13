import prisma from "@/lib/prisma";
import ClientForm from "@/components/admin/ClientForm";
import { requireEmployee } from "@/lib/employee-session";
import { notFound } from "next/navigation";

export default async function EmployeeEditClientPage({ params }: { params: { id: string } }) {
  await requireEmployee("clients");
  const client = await prisma.client.findUnique({ where: { id: params.id } });
  if (!client) notFound();
  return <ClientForm client={client} returnPath="/employee/dashboard/clients" />;
}
