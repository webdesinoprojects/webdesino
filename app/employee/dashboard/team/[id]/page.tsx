import prisma from "@/lib/prisma";
import TeamForm from "@/components/admin/TeamForm";
import { requireEmployee } from "@/lib/employee-session";
import { notFound } from "next/navigation";

export default async function EmployeeEditTeamPage({ params }: { params: { id: string } }) {
  await requireEmployee("team");
  const member = await prisma.teamMember.findUnique({ where: { id: params.id } });
  if (!member) notFound();
  return <TeamForm member={member} returnPath="/employee/dashboard/team" />;
}
