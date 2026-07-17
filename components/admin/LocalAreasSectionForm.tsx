"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUp, CheckCircle2, Plus, Trash2, X } from "lucide-react";
import { updateLocalAreasSection } from "@/lib/actions";
import type {
  LocalAreaLink,
  LocalAreasContent,
  LocalLocationCard,
} from "@/lib/local-areas-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface LocalAreasSectionFormProps {
  content: LocalAreasContent;
  saved?: boolean;
}

const emptyArea: LocalAreaLink = { name: "", href: "" };
const emptyLocationCard: LocalLocationCard = { name: "", link: "" };

const cardClass = "min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden";
const cardHeaderClass = "border-b border-slate-100 bg-slate-50/70 px-6 py-4";
const cardContentClass = "p-6";
const sectionTitleClass = "text-base font-semibold text-slate-900";

function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= items.length) return items;

  const next = [...items];
  const [item] = next.splice(index, 1);
  next.splice(targetIndex, 0, item);
  return next;
}

export default function LocalAreasSectionForm({
  content,
  saved = false,
}: LocalAreasSectionFormProps) {
  const [section, setSection] = useState<LocalAreasContent>(content);
  const [showSavedToast, setShowSavedToast] = useState(saved);

  useEffect(() => {
    if (!saved) return;

    setShowSavedToast(true);
    const timeout = window.setTimeout(() => {
      setShowSavedToast(false);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [saved]);

  const updateField = <K extends keyof LocalAreasContent>(
    field: K,
    value: LocalAreasContent[K]
  ) => {
    setSection((prev) => ({ ...prev, [field]: value }));
  };

  const updateArea = (index: number, field: keyof LocalAreaLink, value: string) => {
    const next = [...section.introAreas];
    next[index] = { ...next[index], [field]: value };
    updateField("introAreas", next);
  };

  const updateLocationCard = (index: number, field: keyof LocalLocationCard, value: string) => {
    const next = [...section.locationCards];
    next[index] = { ...next[index], [field]: value };
    updateField("locationCards", next);
  };

  return (
    <div className="w-full min-w-0 max-w-5xl space-y-6 md:ml-8 xl:ml-10">
      {showSavedToast && (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm text-green-800 shadow-xl">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="min-w-0">
            <p className="font-semibold">Local areas section saved</p>
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
                Local Areas Section
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Edit homepage local area copy, inline links, map embed, location cards, and CTA.
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

      <form action={updateLocalAreasSection} className="admin-premium-form min-w-0 space-y-6">
        <input type="hidden" name="content" value={JSON.stringify(section)} />

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Section Copy</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={section.title} onChange={(event) => updateField("title", event.target.value)} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Intro prefix</Label>
                <Textarea
                  rows={4}
                  value={section.introPrefix}
                  onChange={(event) => updateField("introPrefix", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Intro suffix</Label>
                <Textarea
                  rows={4}
                  value={section.introSuffix}
                  onChange={(event) => updateField("introSuffix", event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description paragraph</Label>
              <Textarea
                rows={4}
                value={section.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Highlight line</Label>
              <Input
                value={section.highlightText}
                onChange={(event) => updateField("highlightText", event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={`${cardHeaderClass} flex flex-row items-center justify-between`}>
            <CardTitle className={sectionTitleClass}>Inline Area Links</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateField("introAreas", [...section.introAreas, { ...emptyArea }])}
            >
              <Plus className="h-4 w-4" />
              Add Area
            </Button>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            {section.introAreas.map((area, index) => (
              <div key={index} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1.5fr_auto]">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={area.name} onChange={(event) => updateArea(index, "name", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input value={area.href} onChange={(event) => updateArea(index, "href", event.target.value)} />
                </div>
                <div className="flex items-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={index === 0}
                    onClick={() => updateField("introAreas", moveItem(section.introAreas, index, -1))}
                    aria-label="Move area up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={index === section.introAreas.length - 1}
                    onClick={() => updateField("introAreas", moveItem(section.introAreas, index, 1))}
                    aria-label="Move area down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                    onClick={() =>
                      updateField(
                        "introAreas",
                        section.introAreas.filter((_, i) => i !== index)
                      )
                    }
                    aria-label="Remove area"
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
            <CardTitle className={sectionTitleClass}>Map Embed</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="space-y-2">
              <Label>Map title</Label>
              <Input value={section.mapTitle} onChange={(event) => updateField("mapTitle", event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Google Maps embed URL</Label>
              <Textarea
                rows={4}
                value={section.mapEmbedUrl}
                onChange={(event) => updateField("mapEmbedUrl", event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={`${cardHeaderClass} flex flex-row items-center justify-between`}>
            <CardTitle className={sectionTitleClass}>Location Cards</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateField("locationCards", [...section.locationCards, { ...emptyLocationCard }])}
            >
              <Plus className="h-4 w-4" />
              Add Card
            </Button>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            {section.locationCards.map((location, index) => (
              <div key={index} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1.5fr_auto]">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={location.name}
                    onChange={(event) => updateLocationCard(index, "name", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input
                    value={location.link}
                    onChange={(event) => updateLocationCard(index, "link", event.target.value)}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={index === 0}
                    onClick={() => updateField("locationCards", moveItem(section.locationCards, index, -1))}
                    aria-label="Move location card up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={index === section.locationCards.length - 1}
                    onClick={() => updateField("locationCards", moveItem(section.locationCards, index, 1))}
                    aria-label="Move location card down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                    onClick={() =>
                      updateField(
                        "locationCards",
                        section.locationCards.filter((_, i) => i !== index)
                      )
                    }
                    aria-label="Remove location card"
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
            <CardTitle className={sectionTitleClass}>Closing CTA</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="space-y-2">
              <Label>Closing paragraph</Label>
              <Textarea
                rows={4}
                value={section.closingText}
                onChange={(event) => updateField("closingText", event.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>CTA text</Label>
                <Input value={section.ctaText} onChange={(event) => updateField("ctaText", event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>CTA link</Label>
                <Input value={section.ctaHref} onChange={(event) => updateField("ctaHref", event.target.value)} />
              </div>
            </div>
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
              Save Local Areas Section
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
