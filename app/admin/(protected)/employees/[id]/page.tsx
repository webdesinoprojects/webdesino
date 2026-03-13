import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EmployeeForm from "@/components/admin/EmployeeForm";

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      permissions: true,
      status: true,
      note: true,
    },
  });

  if (!employee) {
    notFound();
  }

  return <EmployeeForm employee={employee} />;
}