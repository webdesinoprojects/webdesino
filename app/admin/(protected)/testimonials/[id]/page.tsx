import prisma from "@/lib/prisma";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditTestimonialPage({ params }: PageProps) {
  const testimonial = await prisma.testimonial.findUnique({
    where: { id: params.id },
  });

  if (!testimonial) {
    notFound();
  }

  return <TestimonialForm testimonial={testimonial} />;
}
