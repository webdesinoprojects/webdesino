import PageForm from "@/components/admin/PageForm";
import { requireEmployee } from "@/lib/employee-session";

export default async function EmployeeNewPagePage() {
  await requireEmployee("pages");
  return <PageForm returnPath="/employee/dashboard/pages" />;
}
