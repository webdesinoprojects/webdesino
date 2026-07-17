"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUp, CheckCircle2, Plus, Trash2, X } from "lucide-react";
import { updateAwardsSection } from "@/lib/actions";
import {
  awardsIconNames,
  type AwardCard,
  type AwardsIconName,
  type AwardsSectionContent,
} from "@/lib/awards-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AwardsSectionFormProps {
  content: AwardsSectionContent;
  saved?: boolean;
}

const emptyCard: AwardCard = {
  iconName: "Trophy",
  title: "",
  organization: "",
};

const cardClass = "min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden";
const cardHeaderClass = "border-b border-slate-100 bg-slate-50/70 px-6 py-4";
const cardContentClass = "p-6";
const sectionTitleClass = "text-base font-semibold text-slate-900";

export default function AwardsSectionForm({
  content,
  saved = false,
}: AwardsSectionFormProps) {
  const [section, setSection] = useState<AwardsSectionContent>(content);
  const [showSavedToast, setShowSavedToast] = useState(saved);

  useEffect(() => {
    if (!saved) return;

    setShowSavedToast(true);
    const timeout = window.setTimeout(() => {
      setShowSavedToast(false);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [saved]);

  const updateField = <K extends keyof AwardsSectionContent>(
    field: K,
    value: AwardsSectionContent[K]
  ) => {
    setSection((prev) => ({ ...prev, [field]: value }));
  };

  const updateCard = (index: number, field: keyof AwardCard, value: string) => {
    const next = [...section.cards];
    next[index] = {
      ...next[index],
      [field]: field === "iconName" ? (value as AwardsIconName) : value,
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
            <p className="font-semibold">Awards section saved</p>
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
                Awards Section
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Edit the homepage awards heading, background word, and award cards.
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

      <form action={updateAwardsSection} className="admin-premium-form min-w-0 space-y-6">
        <input type="hidden" name="content" value={JSON.stringify(section)} />

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Section Header</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Background word</Label>
                <Input
                  value={section.backgroundWord}
                  onChange={(event) => updateField("backgroundWord", event.target.value)}
                  placeholder="Awards"
                />
              </div>
              <div className="space-y-2">
                <Label>Title line 1</Label>
                <Input
                  value={section.titleLineOne}
                  onChange={(event) => updateField("titleLineOne", event.target.value)}
                  placeholder="Our Work Speaks Louder"
                />
              </div>
              <div className="space-y-2">
                <Label>Title line 2</Label>
                <Input
                  value={section.titleLineTwo}
                  onChange={(event) => updateField("titleLineTwo", event.target.value)}
                  placeholder="with Awards"
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
          <CardHeader className={`${cardHeaderClass} flex flex-row items-center justify-between`}>
            <CardTitle className={sectionTitleClass}>Award Cards</CardTitle>
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
                    <h3 className="font-semibold text-slate-900">Award {index + 1}</h3>
                    <p className="text-xs text-slate-500">
                      Controls one award card in the homepage section.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={index === 0}
                      onClick={() => moveCard(index, -1)}
                      aria-label="Move award up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={index === section.cards.length - 1}
                      onClick={() => moveCard(index, 1)}
                      aria-label="Move award down"
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
                      aria-label="Remove award"
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
                      {awardsIconNames.map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Award title</Label>
                    <Input
                      value={card.title}
                      onChange={(event) => updateCard(index, "title", event.target.value)}
                      placeholder="Best Web Development Agency 2024"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Organization</Label>
                    <Input
                      value={card.organization}
                      onChange={(event) => updateCard(index, "organization", event.target.value)}
                      placeholder="Delhi Business Awards"
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
              Save Awards Section
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
