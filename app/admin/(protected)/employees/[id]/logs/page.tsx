import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ScrollText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EMPLOYEE_PERMISSION_LABELS, type EmployeePermissionKey } from "@/lib/employee-permissions";

export default async function EmployeeLogsPage({ params }: { params: { id: string } }) {
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!employee) notFound();

  const logs = await prisma.employeeLog.findMany({
    where: { employeeId: params.id },
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  const sectionLabel = (section: string) =>
    EMPLOYEE_PERMISSION_LABELS[section as EmployeePermissionKey] ?? section;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/employees">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-indigo-500" />
            Activity Logs — {employee.name}
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">{employee.email} · {employee.role}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-slate-500 text-sm whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <span className="inline-flex rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700 capitalize">
                    {sectionLabel(log.section)}
                  </span>
                </TableCell>
                <TableCell className="text-slate-700 text-sm">{log.action}</TableCell>
              </TableRow>
            ))}
            {logs.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12 text-slate-400">
                  No activity recorded yet for this employee.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {logs.length > 0 && (
        <p className="text-xs text-slate-400 text-right">
          Showing {logs.length} most recent {logs.length === 1 ? "entry" : "entries"}
        </p>
      )}
    </div>
  );
}
