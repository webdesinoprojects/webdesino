import TeamForm from "@/components/admin/TeamForm";
import { requireEmployee } from "@/lib/employee-session";

export default async function EmployeeNewTeamPage() {
  await requireEmployee("team");
  return <TeamForm returnPath="/employee/dashboard/team" />;
}
