import TeamForm from "@/components/admin/TeamForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditTeamMemberPage({ params }: PageProps) {
  const member = await prisma.teamMember.findUnique({
    where: { id: params.id },
  });

  if (!member) {
    notFound();
  }

  return <TeamForm member={member} />;
}
