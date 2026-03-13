import ClientForm from "@/components/admin/ClientForm";
import { requireEmployee } from "@/lib/employee-session";

export default async function EmployeeNewClientPage() {
  await requireEmployee("clients");
  return <ClientForm returnPath="/employee/dashboard/clients" />;
}
