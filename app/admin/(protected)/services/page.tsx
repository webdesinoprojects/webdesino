import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Folder } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ServicesPage() {
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { title: "asc" },
    include: {
      _count: {
        select: { subtypes: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">Service Categories</h1>
        <Link href="/admin/services/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Sub-services</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Folder className="h-4 w-4 text-blue-500" />
                  {category.title}
                </TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category._count.subtypes} pages</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/services/${category.id}`}>
                    <Button variant="outline" size="sm">
                      Manage Pages
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                  No service categories found. Create one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
