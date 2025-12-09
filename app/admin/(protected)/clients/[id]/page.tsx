import ClientForm from "@/components/admin/ClientForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditClientPage({
  params,
}: {
  params: { id: string };
}) {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
  });

  if (!client) {
    notFound();
  }

  return <ClientForm client={client} />;
}
