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
  createCareerField,
  updateCareerField,
  type CareerFieldType,
  type CareerFieldOption,
} from "@/lib/career-actions";

type Props = {
  initial?: {
    id: string;
    key: string;
    label: string;
    type: CareerFieldType;
    required: boolean;
    order: number;
    active: boolean;
    placeholder: string | null;
    helpText: string | null;
    options: CareerFieldOption[] | null;
    system: boolean;
  };
};

const FIELD_TYPES: { value: CareerFieldType; label: string }[] = [
  { value: "text", label: "Short text" },
  { value: "textarea", label: "Long text" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Phone" },
  { value: "url", label: "URL" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "select", label: "Dropdown" },
  { value: "file", label: "File upload" },
];

function optionsToText(options: CareerFieldOption[] | null): string {
  if (!options || options.length === 0) return "";
  return options.map((o) => (o.label === o.value ? o.label : `${o.label} | ${o.value}`)).join("\n");
}

export default function CareerFieldForm({ initial }: Props) {
  const isEdit = !!initial;
  const router = useRouter();
  const [type, setType] = useState<CareerFieldType>(initial?.type ?? "text");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = isEdit
        ? await updateCareerField(initial!.id, formData)
        : await createCareerField(formData);
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
          {isEdit ? "Edit Field" : "Add Form Field"}
        </h1>
      </div>

      <form action={onSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input id="label" name="label" defaultValue={initial?.label ?? ""} required placeholder="e.g. Portfolio URL" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="key">Key {isEdit && <span className="text-xs text-slate-400">(read-only)</span>}</Label>
            <Input
              id="key"
              name="key"
              defaultValue={initial?.key ?? ""}
              placeholder="Auto-generated from label"
              readOnly={isEdit}
              className={isEdit ? "bg-slate-50 text-slate-500" : ""}
            />
            <p className="text-[11px] text-slate-400">Stable identifier used to store submissions. Leave blank to auto-generate.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type {initial?.system && <span className="text-xs text-slate-400">(system)</span>}</Label>
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value as CareerFieldType)}
              disabled={initial?.system}
              className="w-full h-10 rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
            >
              {FIELD_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">Order</Label>
            <Input id="order" name="order" type="number" defaultValue={initial?.order ?? 100} />
          </div>
          <div className="flex flex-col gap-2 pt-6">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="required" defaultChecked={initial?.required ?? false} className="h-4 w-4" />
              Required
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} value="true" className="h-4 w-4" />
              Active (visible on the public form)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input id="placeholder" name="placeholder" defaultValue={initial?.placeholder ?? ""} placeholder="Shown inside empty input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="helpText">Help Text</Label>
            <Input id="helpText" name="helpText" defaultValue={initial?.helpText ?? ""} placeholder="Small hint under the input" />
          </div>
        </div>

        {type === "select" && (
          <div className="space-y-2">
            <Label htmlFor="options">Options (one per line: <code>Label | value</code>, or just Label)</Label>
            <Textarea
              id="options"
              name="options"
              rows={5}
              defaultValue={optionsToText(initial?.options ?? null)}
              placeholder={"Full-time | full_time\nPart-time | part_time\nInternship"}
            />
          </div>
        )}

        {/* Always send `active=false` if the checkbox is unchecked (checkboxes omit the value when unchecked) */}
        <input type="hidden" name="active" value="false" />

        {error && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isEdit ? "Save Changes" : "Create Field"}
          </Button>
          <Link href="/admin/careers/cms">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
