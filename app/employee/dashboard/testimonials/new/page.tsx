import TestimonialForm from "@/components/admin/TestimonialForm";
import { requireEmployee } from "@/lib/employee-session";

export default async function EmployeeNewTestimonialPage() {
  await requireEmployee("testimonials");
  return <TestimonialForm returnPath="/employee/dashboard/testimonials" />;
}
