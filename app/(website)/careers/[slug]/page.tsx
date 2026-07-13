import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Briefcase } from "lucide-react";
import { ensureDefaultCareerFields } from "@/lib/career-actions";
import CareerApplicationForm from "@/components/careers/CareerApplicationForm";
import CareerShareButton from "@/components/careers/CareerShareButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = (await prisma.careerCategory.findFirst({
    where: { slug: params.slug, active: true },
  })) as any;

  if (!category) return { title: "Careers | Webdesino" };

  return {
    title: `${category.name} — Careers at Webdesino`,
    description: category.description || `Apply for ${category.name} at Webdesino.`,
    alternates: { canonical: `/careers/${category.slug}` },
  };
}

export default async function CareerCategoryPage({ params }: { params: { slug: string } }) {
  await ensureDefaultCareerFields();

  const category = (await prisma.careerCategory.findFirst({
    where: { slug: params.slug, active: true },
  })) as any;

  if (!category) notFound();

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
            <radialGradient id="careersDetailGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111184" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#111184" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="300" fill="url(#careersDetailGlow)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-14 md:py-20 max-w-3xl">
        <div className="rounded-3xl bg-white/85 backdrop-blur border border-slate-200 shadow-[0_10px_40px_rgba(17,17,132,0.05)] p-6 md:p-10">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#111184]/10 flex items-center justify-center text-[#111184] shrink-0">
                <Briefcase size={22} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest font-semibold text-[#111184]/70 mb-1">
                  Now hiring
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{category.name}</h1>
              </div>
            </div>
            <CareerShareButton categoryName={category.name} />
          </div>

          {category.description && (
            <p className="text-slate-600 leading-relaxed mb-8 whitespace-pre-wrap">
              {category.description}
            </p>
          )}

          <div className="border-t border-slate-200 pt-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Apply now</h2>
            <p className="text-sm text-slate-500 mb-6">
              Fill in the form below. We'll review your application and get back to you at the email you provide.
            </p>
            <CareerApplicationForm
              fields={fields as any}
              categories={categories}
              defaultCategorySlug={category.slug}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
