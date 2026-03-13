import prisma from "@/lib/prisma";
import { requireEmployee } from "@/lib/employee-session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { deleteClient } from "@/lib/actions";
import ActionsMenu from "@/components/admin/ActionsMenu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export default async function EmployeeClientsPage() {
  await requireEmployee("clients");
  const clients = await prisma.client.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Clients</h1>
        <Link href="/employee/dashboard/clients/new">
          <Button><Plus className="mr-2 h-4 w-4" /> Add Client</Button>
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.category}</TableCell>
                <TableCell className="max-w-xs truncate">{client.url}</TableCell>
                <TableCell className="text-right">
                  <ActionsMenu id={client.id} editUrl={`/employee/dashboard/clients/${client.id}`} deleteAction={deleteClient} />
                </TableCell>
              </TableRow>
            ))}
            {clients.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center py-10 text-gray-500">No clients found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
