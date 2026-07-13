import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CareerFieldForm from "@/components/admin/CareerFieldForm";

export const dynamic = "force-dynamic";

export default async function EditCareerFieldPage({ params }: { params: { id: string } }) {
  const field = (await prisma.careerFormField.findUnique({ where: { id: params.id } })) as any;
  if (!field) notFound();

  return (
    <CareerFieldForm
      initial={{
        id: field.id,
        key: field.key,
        label: field.label,
        type: field.type,
        required: !!field.required,
        order: field.order ?? 0,
        active: field.active !== false,
        placeholder: field.placeholder ?? null,
        helpText: field.helpText ?? null,
        options: field.options ?? null,
        system: !!field.system,
      }}
    />
  );
}
