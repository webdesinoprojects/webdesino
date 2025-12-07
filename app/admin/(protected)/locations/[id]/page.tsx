import LocationForm from "@/components/admin/LocationForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditLocationPage({ params }: PageProps) {
  const location = await prisma.locationPage.findUnique({
    where: { id: params.id },
  });

  if (!location) {
    notFound();
  }

  return <LocationForm location={location} />;
}
