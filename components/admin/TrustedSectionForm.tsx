"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Plus, Trash2, X } from "lucide-react";
import { updateTrustedSection } from "@/lib/actions";
import {
  trustedSectionIconNames,
  type TrustedSectionCertification,
  type TrustedSectionContent,
  type TrustedSectionIconName,
  type TrustedSectionStat,
} from "@/lib/trusted-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";

interface TrustedSectionFormProps {
  content: TrustedSectionContent;
  saved?: boolean;
}

const emptyStat: TrustedSectionStat = {
  iconName: "Users",
  label: "",
  value: "",
};

const emptyCertification: TrustedSectionCertification = {
  name: "",
  logo: "",
  link: "",
};

const cardClass = "min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden";
const cardHeaderClass = "border-b border-slate-100 bg-slate-50/70 px-6 py-4";
const cardContentClass = "p-6";
const sectionTitleClass = "text-base font-semibold text-slate-900";

export default function TrustedSectionForm({ content, saved = false }: TrustedSectionFormProps) {
  const [section, setSection] = useState<TrustedSectionContent>(content);
  const [showSavedToast, setShowSavedToast] = useState(saved);

  useEffect(() => {
    if (!saved) return;

    setShowSavedToast(true);
    const timeout = window.setTimeout(() => {
      setShowSavedToast(false);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [saved]);

  const updateField = <K extends keyof TrustedSectionContent>(
    field: K,
    value: TrustedSectionContent[K]
  ) => {
    setSection((prev) => ({ ...prev, [field]: value }));
  };

  const updateStat = (index: number, field: keyof TrustedSectionStat, value: string) => {
    const next = [...section.stats];
    next[index] = {
      ...next[index],
      [field]: field === "iconName" ? (value as TrustedSectionIconName) : value,
    };
    updateField("stats", next);
  };

  const updateCertification = (
    index: number,
    field: keyof TrustedSectionCertification,
    value: string
  ) => {
    const next = [...section.certifications];
    next[index] = { ...next[index], [field]: value };
    updateField("certifications", next);
  };

  return (
    <div className="w-full min-w-0 max-w-5xl space-y-6 md:ml-8 xl:ml-10">
      {showSavedToast && (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm text-green-800 shadow-xl">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="min-w-0">
            <p className="font-semibold">Trusted section saved</p>
            <p className="text-green-700">Your homepage changes are now live.</p>
          </div>
          <button
            type="button"
            className="ml-2 rounded-md p-1 text-green-700 hover:bg-green-50"
            onClick={() => setShowSavedToast(false)}
            aria-label="Dismiss save message"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Link href="/admin/pages">
              <Button variant="ghost" size="icon" className="mt-0.5">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Trusted Section</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Edit the homepage trust copy, stat cards, certified partners, and marketing badge.
              </p>
            </div>
          </div>
          <Link href="/" target="_blank">
            <Button type="button" variant="outline">
              Preview Homepage
            </Button>
          </Link>
        </div>
      </div>

      <form action={updateTrustedSection} className="admin-premium-form min-w-0 space-y-6">
        <input type="hidden" name="content" value={JSON.stringify(section)} />

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Main Copy</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="space-y-2">
              <Label htmlFor="trusted-title">Title</Label>
              <Input
                id="trusted-title"
                value={section.title}
                onChange={(event) => updateField("title", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trusted-description">Description</Label>
              <Textarea
                id="trusted-description"
                rows={4}
                value={section.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={`${cardHeaderClass} flex flex-row items-center justify-between`}>
            <CardTitle className={sectionTitleClass}>Stats</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateField("stats", [...section.stats, { ...emptyStat }])}
            >
              <Plus className="h-4 w-4" />
              Add Stat
            </Button>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            {section.stats.map((stat, index) => (
              <div key={index} className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_1fr_auto]">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <select
                    value={stat.iconName}
                    onChange={(event) => updateStat(index, "iconName", event.target.value)}
                    className="h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                  >
                    {trustedSectionIconNames.map((iconName) => (
                      <option key={iconName} value={iconName}>
                        {iconName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input value={stat.value} onChange={(event) => updateStat(index, "value", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input value={stat.label} onChange={(event) => updateStat(index, "label", event.target.value)} />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="self-end text-red-500 hover:bg-red-50 hover:text-red-700"
                  onClick={() => updateField("stats", section.stats.filter((_, i) => i !== index))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Certified Partners Header</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} grid gap-4 md:grid-cols-2`}>
            <div className="space-y-2">
              <Label htmlFor="certification-title">Title</Label>
              <Input
                id="certification-title"
                value={section.certificationTitle}
                onChange={(event) => updateField("certificationTitle", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="badge-text">Badge text</Label>
              <Input
                id="badge-text"
                value={section.badgeText}
                onChange={(event) => updateField("badgeText", event.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="certification-description">Description</Label>
              <Textarea
                id="certification-description"
                rows={3}
                value={section.certificationDescription}
                onChange={(event) => updateField("certificationDescription", event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={`${cardHeaderClass} flex flex-row items-center justify-between`}>
            <CardTitle className={sectionTitleClass}>Certified Partners</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateField("certifications", [...section.certifications, { ...emptyCertification }])}
            >
              <Plus className="h-4 w-4" />
              Add Partner
            </Button>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-5`}>
            {section.certifications.map((certification, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">Partner {index + 1}</h3>
                    <p className="text-xs text-slate-500">Logo, label, and outbound link.</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                    onClick={() =>
                      updateField(
                        "certifications",
                        section.certifications.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={certification.name}
                      onChange={(event) => updateCertification(index, "name", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Link</Label>
                    <Input
                      value={certification.link}
                      onChange={(event) => updateCertification(index, "link", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Logo</Label>
                    <ImageUpload
                      name={`certification_logo_${index}`}
                      label="Upload Logo"
                      defaultValue={certification.logo}
                      onUploadComplete={(url: string) => updateCertification(index, "logo", url)}
                    />
                    <Input
                      value={certification.logo}
                      onChange={(event) => updateCertification(index, "logo", event.target.value)}
                      placeholder="/google.jpg or uploaded URL"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
          <div className="flex justify-end gap-3">
            <Link href="/admin/pages">
              <Button type="button" variant="outline">
                Back
              </Button>
            </Link>
            <Button type="submit" className="bg-[#111184] hover:bg-[#0b0b62]">
              Save Trusted Section
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
