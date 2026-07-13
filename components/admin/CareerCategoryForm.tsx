"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  createCareerCategory,
  updateCareerCategory,
} from "@/lib/career-actions";

type Props = {
  initial?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    active: boolean;
    order: number;
  };
};

export default function CareerCategoryForm({ initial }: Props) {
  const isEdit = !!initial;
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = isEdit
        ? await updateCareerCategory(initial!.id, formData)
        : await createCareerCategory(formData);
      if (result?.success) {
        router.push("/admin/careers/cms");
        router.refresh();
      } else {
        setError(result?.error || "Something went wrong");
      }
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/careers/cms">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-slate-800">
          {isEdit ? "Edit Category" : "Add Category"}
        </h1>
      </div>

      <form action={onSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={initial?.name ?? ""} required placeholder="e.g. Web Development" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={initial?.slug ?? ""} placeholder="Auto from name" />
            <p className="text-[11px] text-slate-400">URL: /careers/&lt;slug&gt;. Used in shareable job links.</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={4} defaultValue={initial?.description ?? ""} placeholder="Short description shown on the category card and detail page." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="order">Order</Label>
            <Input id="order" name="order" type="number" defaultValue={initial?.order ?? 100} />
          </div>
          <div className="flex flex-col gap-2 pt-6">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} value="true" className="h-4 w-4" />
              Active (show on public careers page)
            </label>
          </div>
        </div>

        <input type="hidden" name="active" value="false" />

        {error && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isEdit ? "Save Changes" : "Create Category"}
          </Button>
          <Link href="/admin/careers/cms">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
