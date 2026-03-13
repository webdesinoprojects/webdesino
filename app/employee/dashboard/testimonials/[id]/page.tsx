import prisma from "@/lib/prisma";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { requireEmployee } from "@/lib/employee-session";
import { notFound } from "next/navigation";

export default async function EmployeeEditTestimonialPage({ params }: { params: { id: string } }) {
  await requireEmployee("testimonials");
  const testimonial = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!testimonial) notFound();
  return <TestimonialForm testimonial={testimonial} returnPath="/employee/dashboard/testimonials" />;
}
