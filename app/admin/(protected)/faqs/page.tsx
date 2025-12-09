import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import prisma from "@/lib/prisma";
import { deleteFAQ } from "@/lib/actions";
import ActionsMenu from "@/components/admin/ActionsMenu";

export default async function FAQsPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">FAQs</h1>
        <Link href="/admin/faqs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add FAQ
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Question</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{faq.question}</td>
                  <td className="p-4 align-middle">{faq.category}</td>
                  <td className="p-4 align-middle">{faq.order}</td>
                  <td className="p-4 align-middle text-right">
                    <ActionsMenu
                      id={faq.id}
                      editUrl={`/admin/faqs/${faq.id}`}
                      deleteAction={deleteFAQ}
                    />
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-muted-foreground">
                    No FAQs found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
