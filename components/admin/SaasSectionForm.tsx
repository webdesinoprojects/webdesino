"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUp, CheckCircle2, Plus, Trash2, X } from "lucide-react";
import { updateSaasSection } from "@/lib/actions";
import type { SaasSectionContent, SaasStep } from "@/lib/saas-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SaasSectionFormProps {
  content: SaasSectionContent;
  saved?: boolean;
}

const emptyStep: SaasStep = {
  step: "",
  title: "",
};

const cardClass = "min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden";
const cardHeaderClass = "border-b border-slate-100 bg-slate-50/70 px-6 py-4";
const cardContentClass = "p-6";
const sectionTitleClass = "text-base font-semibold text-slate-900";

export default function SaasSectionForm({
  content,
  saved = false,
}: SaasSectionFormProps) {
  const [section, setSection] = useState<SaasSectionContent>(content);
  const [showSavedToast, setShowSavedToast] = useState(saved);

  useEffect(() => {
    if (!saved) return;

    setShowSavedToast(true);
    const timeout = window.setTimeout(() => {
      setShowSavedToast(false);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [saved]);

  const updateField = <K extends keyof SaasSectionContent>(
    field: K,
    value: SaasSectionContent[K]
  ) => {
    setSection((prev) => ({ ...prev, [field]: value }));
  };

  const updateStep = (index: number, field: keyof SaasStep, value: string) => {
    const next = [...section.steps];
    next[index] = { ...next[index], [field]: value };
    updateField("steps", next);
  };

  const moveStep = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= section.steps.length) return;

    const next = [...section.steps];
    const [step] = next.splice(index, 1);
    next.splice(targetIndex, 0, step);
    updateField("steps", next);
  };

  return (
    <div className="w-full min-w-0 max-w-5xl space-y-6 md:ml-8 xl:ml-10">
      {showSavedToast && (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm text-green-800 shadow-xl">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="min-w-0">
            <p className="font-semibold">SaaS section saved</p>
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
                SaaS Section
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Edit the homepage SaaS/process copy, CTA, and process cards.
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

      <form action={updateSaasSection} className="admin-premium-form min-w-0 space-y-6">
        <input type="hidden" name="content" value={JSON.stringify(section)} />

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>Main Copy</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-4`}>
            <div className="space-y-2">
              <Label>Eyebrow label</Label>
              <Input
                value={section.eyebrow}
                onChange={(event) => updateField("eyebrow", event.target.value)}
                placeholder="OPTIMIZE YOUR MARKETING"
              />
            </div>
            <div className="space-y-2">
              <Label>Heading</Label>
              <Input
                value={section.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Take Control Of Your Business Processes With Our SaaS"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={5}
                value={section.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className={sectionTitleClass}>CTA Button</CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} grid gap-4 md:grid-cols-2`}>
            <div className="space-y-2">
              <Label>Button text</Label>
              <Input
                value={section.ctaText}
                onChange={(event) => updateField("ctaText", event.target.value)}
                placeholder="Get Started Now"
              />
            </div>
            <div className="space-y-2">
              <Label>Button link</Label>
              <Input
                value={section.ctaHref}
                onChange={(event) => updateField("ctaHref", event.target.value)}
                placeholder="/contact"
              />
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader className={`${cardHeaderClass} flex flex-row items-center justify-between`}>
            <CardTitle className={sectionTitleClass}>Process Cards</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => updateField("steps", [...section.steps, { ...emptyStep }])}
            >
              <Plus className="h-4 w-4" />
              Add Step
            </Button>
          </CardHeader>
          <CardContent className={`${cardContentClass} space-y-5`}>
            {section.steps.map((step, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Step {index + 1}</h3>
                    <p className="text-xs text-slate-500">
                      Controls one card in the SaaS process grid.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={index === 0}
                      onClick={() => moveStep(index, -1)}
                      aria-label="Move step up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={index === section.steps.length - 1}
                      onClick={() => moveStep(index, 1)}
                      aria-label="Move step down"
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
                          "steps",
                          section.steps.filter((_, i) => i !== index)
                        )
                      }
                      aria-label="Remove step"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Step number</Label>
                    <Input
                      value={step.step}
                      onChange={(event) => updateStep(index, "step", event.target.value)}
                      placeholder="01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Step title</Label>
                    <Input
                      value={step.title}
                      onChange={(event) => updateStep(index, "title", event.target.value)}
                      placeholder="Signup"
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
              Save SaaS Section
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
