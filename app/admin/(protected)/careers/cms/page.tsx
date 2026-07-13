import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Folder, Type, ShieldCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ensureDefaultCareerFields } from "@/lib/career-actions";
import CareerFieldRowActions from "@/components/admin/CareerFieldRowActions";
import CareerCategoryRowActions from "@/components/admin/CareerCategoryRowActions";

export const dynamic = "force-dynamic";

export default async function CareerCmsPage() {
  await ensureDefaultCareerFields();

  const [fields, categories] = await Promise.all([
    prisma.careerFormField.findMany({ orderBy: { order: "asc" } }),
    prisma.careerCategory.findMany({ orderBy: { order: "asc" } }),
  ]);

  const applicationCounts = await Promise.all(
    categories.map((c: any) =>
      prisma.careerApplication.count({ where: { categoryId: c.id } })
    )
  );

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Careers CMS</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure the application form fields and job categories that appear on the public careers page.
        </p>
      </div>

      {/* Categories section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <Folder className="h-4 w-4 text-blue-500" />
            Categories
          </h2>
          <Link href="/admin/careers/cms/categories/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((c: any, i: number) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-500">{c.slug}</TableCell>
                  <TableCell>{applicationCounts[i] ?? 0}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        c.active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {c.active ? "Active" : "Hidden"}
                    </span>
                  </TableCell>
                  <TableCell>{c.order}</TableCell>
                  <TableCell className="text-right">
                    <CareerCategoryRowActions id={c.id} />
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-slate-400">
                    No categories yet. Add one to give applicants a role to apply for.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Fields section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <Type className="h-4 w-4 text-blue-500" />
            Application Form Fields
          </h2>
          <Link href="/admin/careers/cms/fields/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Field
            </Button>
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((f: any) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {f.system && (
                      <span title="System field — cannot be deleted">
                        <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                      </span>
                    )}
                    {f.label}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-500">{f.key}</TableCell>
                  <TableCell className="text-xs uppercase tracking-wide text-slate-600">{f.type}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        f.required ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {f.required ? "Required" : "Optional"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        f.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {f.active ? "Active" : "Hidden"}
                    </span>
                  </TableCell>
                  <TableCell>{f.order}</TableCell>
                  <TableCell className="text-right">
                    <CareerFieldRowActions id={f.id} isSystem={!!f.system} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Fields marked with a shield are system fields (name, email, phone, CV upload). You can rename or reorder them, but they can't be deleted — toggle Active to hide.
        </p>
      </section>
    </div>
  );
}
