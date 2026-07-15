"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Plus, Trash2, X } from "lucide-react";
import { updateHomepageHero } from "@/lib/actions";
import {
  homepageHeroIconNames,
  type HomepageHeroContent,
  type HomepageHeroIconName,
  type HomepageHeroWord,
} from "@/lib/homepage-hero";
import type { HeroShowcaseItem } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";

interface HomepageHeroFormProps {
  content: HomepageHeroContent;
  saved?: boolean;
}

function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function listToLines(value: string[]): string {
  return value.join("\n");
}

const emptyWord: HomepageHeroWord = { text: "", href: "" };

const emptyShowcaseItem: HeroShowcaseItem = {
  name: "",
  category: "",
  stat: "",
  description: "",
  iconName: "Globe",
  iconColor: "text-[#111184]",
};

const cardClass = "min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden";
const cardHeaderClass = "border-b border-slate-100 bg-slate-50/70 px-6 py-4";
const cardContentClass = "p-6";
const sectionTitleClass = "text-base font-semibold text-slate-900";

export default function HomepageHeroForm({ content, saved = false }: HomepageHeroFormProps) {
  const [hero, setHero] = useState<HomepageHeroContent>(content);
  const [showSavedToast, setShowSavedToast] = useState(saved);

  useEffect(() => {
    if (!saved) return;

    setShowSavedToast(true);
    const timeout = window.setTimeout(() => {
      setShowSavedToast(false);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [saved]);

  const updateField = <K extends keyof HomepageHeroContent>(
    field: K,
    value: HomepageHeroContent[K]
  ) => {
    setHero((prev) => ({ ...prev, [field]: value }));
  };

  const updateWord = (index: number, field: keyof HomepageHeroWord, value: string) => {
    const next = [...hero.rotatingWords];
    next[index] = { ...next[index], [field]: value };
    updateField("rotatingWords", next);
  };

  const updateShowcaseItem = (
    index: number,
    field: keyof HeroShowcaseItem,
    value: string
  ) => {
    const next = [...hero.showcaseItems];
    next[index] = {
      ...next[index],
      [field]: field === "iconName" ? (value as HomepageHeroIconName) : value,
    };
    updateField("showcaseItems", next);
  };

  return (
    <div className="w-full min-w-0 max-w-5xl space-y-6 md:ml-8 xl:ml-10">
      {showSavedToast && (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm text-green-800 shadow-xl">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="min-w-0">
            <p className="font-semibold">Homepage hero saved</p>
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
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Homepage Hero</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Edit the first section on the homepage. Empty required lists fall back to the current design.
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

      <form action={updateHomepageHero} className="admin-premium-form min-w-0 space-y-6">
        <input type="hidden" name="content" value={JSON.stringify(hero)} />

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Main Copy</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="space-y-2">
              <Label htmlFor="titleLine1">Title line</Label>
              <Input
                id="titleLine1"
                value={hero.titleLine1}
                onChange={(event) => updateField("titleLine1", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                value={hero.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="searchPlaceholder">Search placeholder</Label>
              <Input
                id="searchPlaceholder"
                value={hero.searchPlaceholder}
                onChange={(event) => updateField("searchPlaceholder", event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>CTA Buttons</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} grid grid-cols-1 md:grid-cols-2 gap-4`}>
            <div className="space-y-2">
              <Label htmlFor="primaryCtaText">Primary text</Label>
              <Input
                id="primaryCtaText"
                value={hero.primaryCtaText}
                onChange={(event) => updateField("primaryCtaText", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primaryCtaLink">Primary link</Label>
              <Input
                id="primaryCtaLink"
                value={hero.primaryCtaLink}
                onChange={(event) => updateField("primaryCtaLink", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryCtaText">Secondary text</Label>
              <Input
                id="secondaryCtaText"
                value={hero.secondaryCtaText}
                onChange={(event) => updateField("secondaryCtaText", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryCtaLink">Secondary link</Label>
              <Input
                id="secondaryCtaLink"
                value={hero.secondaryCtaLink}
                onChange={(event) => updateField("secondaryCtaLink", event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Typewriter Phrases</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-2`}>
            <Label htmlFor="typingPhrases">One phrase per line</Label>
            <Textarea
              id="typingPhrases"
              rows={5}
              value={listToLines(hero.typingPhrases)}
              onChange={(event) => updateField("typingPhrases", linesToList(event.target.value))}
            />
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={`${cardHeaderClass} flex flex-row items-center justify-between gap-4`}>
            <CardTitle className={sectionTitleClass}>Rotating Top Links</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateField("rotatingWords", [...hero.rotatingWords, emptyWord])}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Link
            </Button>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            {hero.rotatingWords.map((word, index) => (
              <div key={`${word.text}-${index}`} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input
                    value={word.text}
                    onChange={(event) => updateWord(index, "text", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Link</Label>
                  <Input
                    value={word.href}
                    onChange={(event) => updateWord(index, "href", event.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-600"
                    onClick={() => updateField("rotatingWords", hero.rotatingWords.filter((_, itemIndex) => itemIndex !== index))}
                    aria-label="Remove rotating link"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Showcase Images</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <ImageUpload
              name="showcase_images_upload"
              label="Upload showcase images"
              multiple
              maxFiles={10}
              defaultValues={hero.showcaseImages}
              onUploadCompleteMultiple={(urls) => updateField("showcaseImages", urls)}
            />
            <div className="space-y-2">
              <Label htmlFor="showcaseImages">Image paths or URLs, one per line</Label>
              <Textarea
                id="showcaseImages"
                rows={7}
                value={listToLines(hero.showcaseImages)}
                onChange={(event) => updateField("showcaseImages", linesToList(event.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={`${cardHeaderClass} flex flex-row items-center justify-between gap-4`}>
            <CardTitle className={sectionTitleClass}>Showcase Cards</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateField("showcaseItems", [...hero.showcaseItems, emptyShowcaseItem])}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Card
            </Button>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-5`}>
            {hero.showcaseItems.map((item, index) => (
              <div key={`${item.name}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-800">Card {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                    onClick={() => updateField("showcaseItems", hero.showcaseItems.filter((_, itemIndex) => itemIndex !== index))}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={item.name}
                      onChange={(event) => updateShowcaseItem(index, "name", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      value={item.category}
                      onChange={(event) => updateShowcaseItem(index, "category", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stat</Label>
                    <Input
                      value={item.stat}
                      onChange={(event) => updateShowcaseItem(index, "stat", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <select
                      value={item.iconName}
                      onChange={(event) => updateShowcaseItem(index, "iconName", event.target.value)}
                      className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {homepageHeroIconNames.map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={3}
                    value={item.description}
                    onChange={(event) => updateShowcaseItem(index, "description", event.target.value)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
          <div className="flex justify-end gap-3">
          <Link href="/admin/pages">
            <Button type="button" variant="outline">
              Back
            </Button>
          </Link>
          <Button type="submit">Save Homepage Hero</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
