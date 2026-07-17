"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Plus, Trash2, X } from "lucide-react";
import { updateTrustedBrands } from "@/lib/actions";
import {
  type TrustedBrandSpotlight,
  type TrustedBrandsContent,
} from "@/lib/trusted-brands";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";

interface TrustedBrandsFormProps {
  content: TrustedBrandsContent;
  saved?: boolean;
}

const emptyBrand: TrustedBrandSpotlight = {
  name: "",
  logo: "",
  link: "",
  rating: 5,
};

const cardClass = "min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden";
const cardHeaderClass = "border-b border-slate-100 bg-slate-50/70 px-6 py-4";
const cardContentClass = "p-6";
const sectionTitleClass = "text-base font-semibold text-slate-900";

function clampRating(value: string | number): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return 5;
  return Math.min(5, Math.max(1, Math.round(parsed)));
}

export default function TrustedBrandsForm({ content, saved = false }: TrustedBrandsFormProps) {
  const [section, setSection] = useState<TrustedBrandsContent>(content);
  const [showSavedToast, setShowSavedToast] = useState(saved);

  useEffect(() => {
    if (!saved) return;

    setShowSavedToast(true);
    const timeout = window.setTimeout(() => {
      setShowSavedToast(false);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [saved]);

  const updateField = <K extends keyof TrustedBrandsContent>(
    field: K,
    value: TrustedBrandsContent[K]
  ) => {
    setSection((prev) => ({ ...prev, [field]: value }));
  };

  const updateBrand = (
    index: number,
    field: keyof TrustedBrandSpotlight,
    value: string | number
  ) => {
    const next = [...section.brands];
    next[index] = {
      ...next[index],
      [field]: field === "rating" ? clampRating(value) : value,
    };
    updateField("brands", next);
  };

  return (
    <div className="w-full min-w-0 max-w-5xl space-y-6 md:ml-8 xl:ml-10">
      {showSavedToast && (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm text-green-800 shadow-xl">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="min-w-0">
            <p className="font-semibold">Trusted brands saved</p>
            <p className="text-green-700">Your carousel changes are now live.</p>
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
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Trusted Brands</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Edit the homepage brand carousel title, cards, ratings, links, and logos.
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

      <form action={updateTrustedBrands} className="admin-premium-form min-w-0 space-y-6">
        <input type="hidden" name="content" value={JSON.stringify(section)} />

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Carousel Header</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-2`}>
            <Label htmlFor="trusted-brands-title">Title</Label>
            <Input
              id="trusted-brands-title"
              value={section.title}
              onChange={(event) => updateField("title", event.target.value)}
            />
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={`${cardHeaderClass} flex flex-row items-center justify-between`}>
            <CardTitle className={sectionTitleClass}>Brand Cards</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateField("brands", [...section.brands, { ...emptyBrand }])}
            >
              <Plus className="h-4 w-4" />
              Add Brand
            </Button>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-5`}>
            {section.brands.map((brand, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">Brand {index + 1}</h3>
                    <p className="text-xs text-slate-500">
                      Each card appears in the horizontal homepage carousel.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                    onClick={() =>
                      updateField(
                        "brands",
                        section.brands.filter((_, i) => i !== index)
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
                      value={brand.name}
                      onChange={(event) => updateBrand(index, "name", event.target.value)}
                      placeholder="Brand name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Link</Label>
                    <Input
                      value={brand.link}
                      onChange={(event) => updateBrand(index, "link", event.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      value={brand.rating}
                      onChange={(event) => updateBrand(index, "rating", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Logo</Label>
                    <ImageUpload
                      name={`brand_logo_${index}`}
                      label="Upload Logo"
                      defaultValue={brand.logo}
                      onUploadComplete={(url: string) => updateBrand(index, "logo", url)}
                    />
                    <Input
                      value={brand.logo}
                      onChange={(event) => updateBrand(index, "logo", event.target.value)}
                      placeholder="/uag.png or uploaded URL"
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
              Save Trusted Brands
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
