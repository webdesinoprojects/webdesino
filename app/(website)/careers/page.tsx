import prisma from "@/lib/prisma";
import { Briefcase, Sparkles } from "lucide-react";
import { ensureDefaultCareerFields } from "@/lib/career-actions";
import CareerApplicationForm from "@/components/careers/CareerApplicationForm";
import CareerShareButton from "@/components/careers/CareerShareButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Careers at Webdesino | Apply Online",
  description:
    "Apply to open roles at Webdesino — web development, marketing, SEO and more. Fill one form to be considered for any team.",
  alternates: { canonical: "/careers" },
};

export default async function CareersPage() {
  await ensureDefaultCareerFields();

  const [categoriesRaw, fieldsRaw] = await Promise.all([
    prisma.careerCategory.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    }),
    prisma.careerFormField.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const categories = (categoriesRaw as any[]).map((c) => ({ slug: c.slug, name: c.name }));
  const fields = (fieldsRaw as any[]).map((f) => ({
    id: f.id,
    key: f.key,
    label: f.label,
    type: f.type,
    required: !!f.required,
    placeholder: f.placeholder ?? null,
    helpText: f.helpText ?? null,
    options: f.options ?? null,
  }));

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg className="absolute -top-32 -left-32 w-[720px] h-[720px] opacity-20" viewBox="0 0 600 600" fill="none">
          <defs>
            <radialGradient id="careersGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111184" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#111184" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="300" fill="url(#careersGlow)" />
        </svg>
        <svg className="absolute top-40 right-0 w-[520px] h-[520px] opacity-15" viewBox="0 0 600 600" fill="none">
          <defs>
            <radialGradient id="careersGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="300" fill="url(#careersGlow2)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-14 md:py-20 max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#111184]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#111184] mb-5">
            <Sparkles size={14} /> We're hiring
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Build your career at <span className="text-[#111184]">Webdesino</span>
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Pick a role, tell us about yourself, and attach your CV. We read every application.
          </p>
        </div>

        <div className="rounded-3xl bg-white/85 backdrop-blur border border-slate-200 shadow-[0_10px_40px_rgba(17,17,132,0.05)] p-6 md:p-10">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#111184]/10 flex items-center justify-center text-[#111184] shrink-0">
                <Briefcase size={22} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest font-semibold text-[#111184]/70 mb-1">
                  Apply now
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Application form</h2>
              </div>
            </div>
            <CareerShareButton categoryName="Careers at Webdesino" />
          </div>

          {categories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
              <Briefcase className="mx-auto h-8 w-8 text-slate-400 mb-3" />
              <h3 className="font-semibold text-slate-800 mb-1">No open roles right now</h3>
              <p className="text-sm text-slate-500">
                We aren't actively hiring at the moment. Feel free to email your CV to{" "}
                <a href="mailto:info@webdesino.com" className="text-[#111184] font-medium hover:underline">
                  info@webdesino.com
                </a>{" "}
                and we'll get in touch when something opens up.
              </p>
            </div>
          ) : (
            <CareerApplicationForm fields={fields as any} categories={categories} />
          )}
        </div>
      </div>
    </main>
  );
}
