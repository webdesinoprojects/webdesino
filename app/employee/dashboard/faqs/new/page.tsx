import FAQForm from "@/components/admin/FAQForm";
import { requireEmployee } from "@/lib/employee-session";

export default async function EmployeeNewFAQPage() {
  await requireEmployee("faqs");
  return <FAQForm returnPath="/employee/dashboard/faqs" />;
}
