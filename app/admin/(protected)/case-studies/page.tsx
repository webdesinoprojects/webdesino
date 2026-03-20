import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProject } from "@/lib/actions";
import ActionsMenu from "@/components/admin/ActionsMenu";

export default async function AdminCaseStudiesPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Case Studies</h1>
        <Link href="/admin/case-studies/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Case Study
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium max-w-md truncate">{project.title}</TableCell>
                <TableCell>{project.industry}</TableCell>
                <TableCell>{project.client || "-"}</TableCell>
                <TableCell className="text-right">
                  <ActionsMenu
                    id={project.id}
                    editUrl={`/admin/case-studies/${project.id}`}
                    deleteAction={deleteProject}
                  />
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                  No case studies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
