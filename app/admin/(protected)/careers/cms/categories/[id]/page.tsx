import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CareerCategoryForm from "@/components/admin/CareerCategoryForm";

export const dynamic = "force-dynamic";

export default async function EditCareerCategoryPage({ params }: { params: { id: string } }) {
  const category = (await prisma.careerCategory.findUnique({ where: { id: params.id } })) as any;
  if (!category) notFound();

  return (
    <CareerCategoryForm
      initial={{
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description ?? null,
        active: category.active !== false,
        order: category.order ?? 0,
      }}
    />
  );
}
