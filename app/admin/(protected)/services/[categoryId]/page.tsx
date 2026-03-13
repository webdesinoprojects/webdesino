import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, ArrowLeft, FileText } from "lucide-react";
import { deleteService } from "@/lib/actions";
import ActionsMenu from "@/components/admin/ActionsMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ServiceCategoryDetailsPage({ params }: { params: { categoryId: string } }) {
  const category = await prisma.serviceCategory.findUnique({
    where: { id: params.categoryId },
    include: { subtypes: true },
  });

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/services">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">{category.title}</h1>
          <p className="text-gray-500">Manage service pages for this category</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Link href={`/admin/services/${category.id}/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Service Page
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Features</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {category.subtypes.map((subtype) => (
              <TableRow key={subtype.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  {subtype.title}
                </TableCell>
                <TableCell>{subtype.slug}</TableCell>
                <TableCell>{subtype.features.length} features</TableCell>
                <TableCell className="text-right">
                  <ActionsMenu
                    id={subtype.id}
                    editUrl={`/admin/services/${category.id}/${subtype.id}`}
                    deleteAction={deleteService}
                  />
                </TableCell>
              </TableRow>
            ))}
            {category.subtypes.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                  No service pages found in this category.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
