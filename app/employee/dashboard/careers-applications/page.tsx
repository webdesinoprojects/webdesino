import prisma from "@/lib/prisma";
import { requireEmployee } from "@/lib/employee-session";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, { label: string; classes: string }> = {
  new: { label: "New", classes: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" },
  reviewing: { label: "Reviewing", classes: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" },
  shortlisted: { label: "Shortlisted", classes: "bg-blue-50 text-blue-700 ring-1 ring-blue-200" },
  hired: { label: "Hired", classes: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200" },
  rejected: { label: "Rejected", classes: "bg-rose-50 text-rose-700 ring-1 ring-rose-200" },
};

export default async function EmployeeCareerApplicationsPage() {
  await requireEmployee("careers-applications");

  const applications = await prisma.careerApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-slate-800 tracking-tight">Career Applications</h1>

      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((a: any) => {
              const s = STATUS_LABELS[a.status] || { label: a.status, classes: "bg-slate-100 text-slate-600" };
              return (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell className="text-slate-600">{a.email}</TableCell>
                  <TableCell>{a.categoryName || <span className="text-slate-400">—</span>}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${s.classes}`}>
                      {s.label}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(a.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/employee/dashboard/careers-applications/${a.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#111184] hover:bg-[#111184]/5">
                        <Eye size={15} />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
            {applications.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-400">
                  No applications yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
