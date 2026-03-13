import prisma from "@/lib/prisma";
import { requireEmployee } from "@/lib/employee-session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { deleteFAQ } from "@/lib/actions";
import ActionsMenu from "@/components/admin/ActionsMenu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export default async function EmployeeFAQsPage() {
  await requireEmployee("faqs");
  const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">FAQs</h1>
        <Link href="/employee/dashboard/faqs/new">
          <Button><Plus className="mr-2 h-4 w-4" /> Add FAQ</Button>
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.map((faq) => (
              <TableRow key={faq.id}>
                <TableCell className="font-medium max-w-sm truncate">{faq.question}</TableCell>
                <TableCell>{faq.category}</TableCell>
                <TableCell>{faq.order}</TableCell>
                <TableCell className="text-right">
                  <ActionsMenu id={faq.id} editUrl={`/employee/dashboard/faqs/${faq.id}`} deleteAction={deleteFAQ} />
                </TableCell>
              </TableRow>
            ))}
            {faqs.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center py-10 text-slate-400">No FAQs found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
