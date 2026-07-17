"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, X } from "lucide-react";
import { updateWhyChoose } from "@/lib/actions";
import type { WhyChooseContent } from "@/lib/why-choose";
import type { Feature } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";

interface WhyChooseFormProps {
  content: WhyChooseContent;
  saved?: boolean;
}

const cardClass = "min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden";
const cardHeaderClass = "border-b border-slate-100 bg-slate-50/70 px-6 py-4";
const cardContentClass = "p-6";
const sectionTitleClass = "text-base font-semibold text-slate-900";

export default function WhyChooseForm({ content, saved = false }: WhyChooseFormProps) {
  const [section, setSection] = useState<WhyChooseContent>(content);
  const [showSavedToast, setShowSavedToast] = useState(saved);

  useEffect(() => {
    if (!saved) return;

    setShowSavedToast(true);
    const timeout = window.setTimeout(() => {
      setShowSavedToast(false);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [saved]);

  const updateField = <K extends keyof WhyChooseContent>(
    field: K,
    value: WhyChooseContent[K]
  ) => {
    setSection((prev) => ({ ...prev, [field]: value }));
  };

  const updateCard = (index: number, field: keyof Feature, value: string) => {
    const nextCards = [...section.cards];
    nextCards[index] = { ...nextCards[index], [field]: value };
    updateField("cards", nextCards);
  };

  return (
    <div className="w-full min-w-0 max-w-5xl space-y-6 md:ml-8 xl:ml-10">
      {showSavedToast && (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm text-green-800 shadow-xl">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="min-w-0">
            <p className="font-semibold">Why choose section saved</p>
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
                Why Choose Section
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Edit the homepage Why Choose copy, six fixed cards, and vision card image.
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

      <form action={updateWhyChoose} className="admin-premium-form min-w-0 space-y-6">
        <input type="hidden" name="content" value={JSON.stringify(section)} />

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Main Copy</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="why-title-prefix">Title prefix</Label>
                <Input
                  id="why-title-prefix"
                  value={section.titlePrefix}
                  onChange={(event) => updateField("titlePrefix", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="why-title-highlight">Blue title text</Label>
                <Input
                  id="why-title-highlight"
                  value={section.titleHighlight}
                  onChange={(event) => updateField("titleHighlight", event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="why-subtitle">Subtitle</Label>
              <Textarea
                id="why-subtitle"
                rows={3}
                value={section.subtitle}
                onChange={(event) => updateField("subtitle", event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Vision Card</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vision-title">Title</Label>
                <Input
                  id="vision-title"
                  value={section.visionTitle}
                  onChange={(event) => updateField("visionTitle", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision-alt">Image alt text</Label>
                <Input
                  id="vision-alt"
                  value={section.visionImageAlt}
                  onChange={(event) => updateField("visionImageAlt", event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vision-quote">Quote</Label>
              <Textarea
                id="vision-quote"
                rows={3}
                value={section.visionQuote}
                onChange={(event) => updateField("visionQuote", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <ImageUpload
                name="vision_image"
                label="Upload Vision Image"
                defaultValue={section.visionImage}
                onUploadComplete={(url: string) => updateField("visionImage", url)}
              />
              <Input
                value={section.visionImage}
                onChange={(event) => updateField("visionImage", event.target.value)}
                placeholder="/images/home/why-choose/vision.jpg or uploaded URL"
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Six Feature Cards</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} grid gap-4 md:grid-cols-2`}>
            {section.cards.slice(0, 6).map((card, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-4 font-semibold text-slate-900">Card {index + 1}</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Number</Label>
                    <Input
                      value={card.number}
                      onChange={(event) => updateCard(index, "number", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={card.title}
                      onChange={(event) => updateCard(index, "title", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      rows={4}
                      value={card.description}
                      onChange={(event) => updateCard(index, "description", event.target.value)}
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
              Save Why Choose Section
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
