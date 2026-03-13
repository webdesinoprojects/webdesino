import prisma from "@/lib/prisma";
import { requireEmployee } from "@/lib/employee-session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, MessageSquare } from "lucide-react";
import { deleteTestimonial } from "@/lib/actions";
import ActionsMenu from "@/components/admin/ActionsMenu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export default async function EmployeeTestimonialsPage() {
  await requireEmployee("testimonials");
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Testimonials</h1>
        <Link href="/employee/dashboard/testimonials/new">
          <Button><Plus className="mr-2 h-4 w-4" /> Add Testimonial</Button>
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Text</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-500" />{t.name}
                </TableCell>
                <TableCell>{t.company || "-"}</TableCell>
                <TableCell className="max-w-md truncate">{t.text}</TableCell>
                <TableCell className="text-right">
                  <ActionsMenu id={t.id} editUrl={`/employee/dashboard/testimonials/${t.id}`} deleteAction={deleteTestimonial} />
                </TableCell>
              </TableRow>
            ))}
            {testimonials.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center py-10 text-gray-500">No testimonials found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
