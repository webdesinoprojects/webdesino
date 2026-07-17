"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUp, CheckCircle2, Plus, Trash2, X } from "lucide-react";
import { updateIndustriesSection } from "@/lib/actions";
import {
  industriesIconNames,
  type IndustriesContent,
  type IndustriesIconName,
  type IndustryCard,
} from "@/lib/industries-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface IndustriesSectionFormProps {
  content: IndustriesContent;
  saved?: boolean;
}

const emptyCard: IndustryCard = {
  iconName: "Building",
  title: "",
  description: "",
  linkLabel: "View Example",
  linkText: "",
  linkUrl: "",
};

const cardClass = "min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden";
const cardHeaderClass = "border-b border-slate-100 bg-slate-50/70 px-6 py-4";
const cardContentClass = "p-6";
const sectionTitleClass = "text-base font-semibold text-slate-900";

export default function IndustriesSectionForm({
  content,
  saved = false,
}: IndustriesSectionFormProps) {
  const [section, setSection] = useState<IndustriesContent>(content);
  const [showSavedToast, setShowSavedToast] = useState(saved);

  useEffect(() => {
    if (!saved) return;

    setShowSavedToast(true);
    const timeout = window.setTimeout(() => {
      setShowSavedToast(false);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [saved]);

  const updateField = <K extends keyof IndustriesContent>(
    field: K,
    value: IndustriesContent[K]
  ) => {
    setSection((prev) => ({ ...prev, [field]: value }));
  };

  const updateCard = (index: number, field: keyof IndustryCard, value: string) => {
    const next = [...section.cards];
    next[index] = {
      ...next[index],
      [field]: field === "iconName" ? (value as IndustriesIconName) : value,
    };
    updateField("cards", next);
  };

  const moveCard = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= section.cards.length) return;

    const next = [...section.cards];
    const [card] = next.splice(index, 1);
    next.splice(targetIndex, 0, card);
    updateField("cards", next);
  };

  return (
    <div className="w-full min-w-0 max-w-5xl space-y-6 md:ml-8 xl:ml-10">
      {showSavedToast && (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm text-green-800 shadow-xl">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="min-w-0">
            <p className="font-semibold">Industries section saved</p>
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
                Industries Section
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Edit the homepage industries grid, icons, descriptions, and example links.
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

      <form action={updateIndustriesSection} className="admin-premium-form min-w-0 space-y-6">
        <input type="hidden" name="content" value={JSON.stringify(section)} />

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Section Header</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="space-y-2">
              <Label htmlFor="industries-title">Title</Label>
              <Input
                id="industries-title"
                value={section.title}
                onChange={(event) => updateField("title", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industries-description">Description</Label>
              <Textarea
                id="industries-description"
                rows={4}
                value={section.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={`${cardHeaderClass} flex flex-row items-center justify-between`}>
            <CardTitle className={sectionTitleClass}>Industry Cards</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateField("cards", [...section.cards, { ...emptyCard }])}
            >
              <Plus className="h-4 w-4" />
              Add Card
            </Button>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-5`}>
            {section.cards.map((card, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Card {index + 1}</h3>
                    <p className="text-xs text-slate-500">
                      Controls one item in the homepage industries grid.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={index === 0}
                      onClick={() => moveCard(index, -1)}
                      aria-label="Move card up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={index === section.cards.length - 1}
                      onClick={() => moveCard(index, 1)}
                      aria-label="Move card down"
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
                          "cards",
                          section.cards.filter((_, i) => i !== index)
                        )
                      }
                      aria-label="Remove card"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <select
                      value={card.iconName}
                      onChange={(event) => updateCard(index, "iconName", event.target.value)}
                      className="h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                    >
                      {industriesIconNames.map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={card.title}
                      onChange={(event) => updateCard(index, "title", event.target.value)}
                      placeholder="Real Estate"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      rows={3}
                      value={card.description}
                      onChange={(event) => updateCard(index, "description", event.target.value)}
                      placeholder="Short industry description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Link label</Label>
                    <Input
                      value={card.linkLabel}
                      onChange={(event) => updateCard(index, "linkLabel", event.target.value)}
                      placeholder="View Example"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Display link text</Label>
                    <Input
                      value={card.linkText}
                      onChange={(event) => updateCard(index, "linkText", event.target.value)}
                      placeholder="Land Sathi"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Link URL</Label>
                    <Input
                      value={card.linkUrl}
                      onChange={(event) => updateCard(index, "linkUrl", event.target.value)}
                      placeholder="https://example.com/"
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
              Save Industries Section
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
