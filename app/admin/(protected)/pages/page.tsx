import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, Plus } from "lucide-react";
import { deletePage } from "@/lib/actions";
import ActionsMenu from "@/components/admin/ActionsMenu";
import { HOMEPAGE_HERO_PAGE_SLUG } from "@/lib/homepage-hero";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function PagesPage() {
  const allPages = await prisma.page.findMany({
    orderBy: { title: "asc" },
  });
  const pages = allPages.filter((page) => page.slug !== HOMEPAGE_HERO_PAGE_SLUG);

  type Page = typeof pages[number];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Pages</h1>
        <Link href="/admin/pages/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Page
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-[#111184] p-2 text-white">
            <Home className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Homepage Hero</h2>
            <p className="text-sm text-slate-600">
              Edit the homepage title, description, CTAs, animated words, and showcase cards.
            </p>
          </div>
        </div>
        <Link href="/admin/pages/home-hero">
          <Button variant="outline" className="bg-white">
            Edit Homepage Hero
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page: Page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell className="text-right">
                  <ActionsMenu
                    id={page.id}
                    editUrl={`/admin/pages/${page.id}`}
                    deleteAction={deletePage}
                  />
                </TableCell>
              </TableRow>
            ))}
            {pages.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10 text-gray-500">
                  No pages found. Add one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
