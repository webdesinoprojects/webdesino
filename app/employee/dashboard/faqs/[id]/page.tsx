import prisma from "@/lib/prisma";
import FAQForm from "@/components/admin/FAQForm";
import { requireEmployee } from "@/lib/employee-session";
import { notFound } from "next/navigation";

export default async function EmployeeEditFAQPage({ params }: { params: { id: string } }) {
  await requireEmployee("faqs");
  const faq = await prisma.faq.findUnique({ where: { id: params.id } });
  if (!faq) notFound();
  return <FAQForm faq={faq} returnPath="/employee/dashboard/faqs" />;
}
