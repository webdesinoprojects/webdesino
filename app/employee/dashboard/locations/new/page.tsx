import LocationForm from "@/components/admin/LocationForm";
import { requireEmployee } from "@/lib/employee-session";

export default async function EmployeeNewLocationPage() {
  await requireEmployee("locations");
  return <LocationForm returnPath="/employee/dashboard/locations" />;
}
