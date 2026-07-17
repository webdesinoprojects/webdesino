"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, X } from "lucide-react";
import { updateMaximizeSection } from "@/lib/actions";
import {
  maximizeIconNames,
  type MaximizeCta,
  type MaximizeRecognitionItem,
  type MaximizeSectionContent,
  type MaximizeStat,
} from "@/lib/maximize-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";

interface MaximizeSectionFormProps {
  content: MaximizeSectionContent;
  saved?: boolean;
}

const cardClass = "min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden";
const cardHeaderClass = "border-b border-slate-100 bg-slate-50/70 px-6 py-4";
const cardContentClass = "p-6";
const sectionTitleClass = "text-base font-semibold text-slate-900";

export default function MaximizeSectionForm({
  content,
  saved = false,
}: MaximizeSectionFormProps) {
  const [section, setSection] = useState<MaximizeSectionContent>(content);
  const [showSavedToast, setShowSavedToast] = useState(saved);

  useEffect(() => {
    if (!saved) return;

    setShowSavedToast(true);
    const timeout = window.setTimeout(() => {
      setShowSavedToast(false);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [saved]);

  const updateField = <K extends keyof MaximizeSectionContent>(
    field: K,
    value: MaximizeSectionContent[K]
  ) => {
    setSection((prev) => ({ ...prev, [field]: value }));
  };

  const updateCta = (field: "primaryCta" | "secondaryCta", key: keyof MaximizeCta, value: string) => {
    updateField(field, { ...section[field], [key]: value });
  };

  const updateRecognitionItem = (
    index: number,
    field: keyof MaximizeRecognitionItem,
    value: string
  ) => {
    const next = [...section.recognitionItems];
    next[index] = { ...next[index], [field]: value };
    updateField("recognitionItems", next);
  };

  const updateStat = (index: number, field: keyof MaximizeStat, value: string) => {
    const next = [...section.stats];
    next[index] = { ...next[index], [field]: value };
    updateField("stats", next);
  };

  return (
    <div className="w-full min-w-0 max-w-5xl space-y-6 md:ml-8 xl:ml-10">
      {showSavedToast && (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm text-green-800 shadow-xl">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="min-w-0">
            <p className="font-semibold">Maximize section saved</p>
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
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Maximize Section
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Edit the homepage web design CTA section, image, recognition row, and stats.
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

      <form action={updateMaximizeSection} className="admin-premium-form min-w-0 space-y-6">
        <input type="hidden" name="content" value={JSON.stringify(section)} />

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Main Copy</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Badge icon</Label>
                <select
                  value={section.badgeIconName}
                  onChange={(event) => updateField("badgeIconName", event.target.value as any)}
                  className="h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                >
                  {maximizeIconNames.map((iconName) => (
                    <option key={iconName} value={iconName}>
                      {iconName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Badge text</Label>
                <Input
                  value={section.badgeText}
                  onChange={(event) => updateField("badgeText", event.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Blue heading line</Label>
                <Input
                  value={section.headingBlueLine}
                  onChange={(event) => updateField("headingBlueLine", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Black heading text</Label>
                <Input
                  value={section.headingBlackPrefix}
                  onChange={(event) => updateField("headingBlackPrefix", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Blue heading word</Label>
                <Input
                  value={section.headingBlueWord}
                  onChange={(event) => updateField("headingBlueWord", event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                value={section.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Image</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="space-y-2">
              <Label>Image alt text</Label>
              <Input
                value={section.imageAlt}
                onChange={(event) => updateField("imageAlt", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <ImageUpload
                name="maximize_image"
                label="Upload Section Image"
                defaultValue={section.image}
                onUploadComplete={(url: string) => updateField("image", url)}
              />
              <Input
                value={section.image}
                onChange={(event) => updateField("image", event.target.value)}
                placeholder="/location-story.png or uploaded URL"
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>CTA Buttons</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} grid gap-5 md:grid-cols-2`}>
            {(["primaryCta", "secondaryCta"] as const).map((field) => (
              <div key={field} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-4 font-semibold text-slate-900">
                  {field === "primaryCta" ? "Primary Button" : "Secondary Button"}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Text</Label>
                    <Input
                      value={section[field].text}
                      onChange={(event) => updateCta(field, "text", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Link</Label>
                    <Input
                      value={section[field].href}
                      onChange={(event) => updateCta(field, "href", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ARIA label</Label>
                    <Input
                      value={section[field].ariaLabel}
                      onChange={(event) => updateCta(field, "ariaLabel", event.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Recognition Row</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="space-y-2">
              <Label>Recognition text</Label>
              <Input
                value={section.recognitionText}
                onChange={(event) => updateField("recognitionText", event.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {section.recognitionItems.slice(0, 3).map((item, index) => (
                <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-4 font-semibold text-slate-900">Badge {index + 1}</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <select
                        value={item.iconName}
                        onChange={(event) => updateRecognitionItem(index, "iconName", event.target.value)}
                        className="h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                      >
                        {maximizeIconNames.map((iconName) => (
                          <option key={iconName} value={iconName}>
                            {iconName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input
                        value={item.value}
                        onChange={(event) => updateRecognitionItem(index, "value", event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Label</Label>
                      <Input
                        value={item.label}
                        onChange={(event) => updateRecognitionItem(index, "label", event.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Lower Stats</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} grid gap-4 md:grid-cols-3`}>
            {section.stats.slice(0, 3).map((stat, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-4 font-semibold text-slate-900">Stat {index + 1}</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Input
                      value={stat.value}
                      onChange={(event) => updateStat(index, "value", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Label</Label>
                    <Input
                      value={stat.label}
                      onChange={(event) => updateStat(index, "label", event.target.value)}
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
              Save Maximize Section
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
