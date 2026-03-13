import prisma from "@/lib/prisma";
import LocationForm from "@/components/admin/LocationForm";
import { requireEmployee } from "@/lib/employee-session";
import { notFound } from "next/navigation";

export default async function EmployeeEditLocationPage({ params }: { params: { id: string } }) {
  await requireEmployee("locations");
  const location = await prisma.locationPage.findUnique({ where: { id: params.id } });
  if (!location) notFound();
  return <LocationForm location={location} returnPath="/employee/dashboard/locations" />;
}
