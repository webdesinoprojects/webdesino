import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, CloudCog, Home, MapPin, Plus, Rocket, ShieldCheck, Sparkles, Star, Trophy } from "lucide-react";
import { deletePage } from "@/lib/actions";
import ActionsMenu from "@/components/admin/ActionsMenu";
import { HOMEPAGE_HERO_PAGE_SLUG } from "@/lib/homepage-hero";
import { TRUSTED_SECTION_PAGE_SLUG } from "@/lib/trusted-section";
import { TRUSTED_BRANDS_PAGE_SLUG } from "@/lib/trusted-brands";
import { WHY_CHOOSE_PAGE_SLUG } from "@/lib/why-choose";
import { INDUSTRIES_PAGE_SLUG } from "@/lib/industries-section";
import { MAXIMIZE_SECTION_PAGE_SLUG } from "@/lib/maximize-section";
import { LOCAL_AREAS_PAGE_SLUG } from "@/lib/local-areas-section";
import { AWARDS_SECTION_PAGE_SLUG } from "@/lib/awards-section";
import { SAAS_SECTION_PAGE_SLUG } from "@/lib/saas-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function PagesPage() {
  const allPages = await prisma.page.findMany({
    orderBy: { title: "asc" },
  });
  const protectedPageSlugs = [
    HOMEPAGE_HERO_PAGE_SLUG,
    TRUSTED_SECTION_PAGE_SLUG,
    TRUSTED_BRANDS_PAGE_SLUG,
    WHY_CHOOSE_PAGE_SLUG,
    INDUSTRIES_PAGE_SLUG,
    MAXIMIZE_SECTION_PAGE_SLUG,
    LOCAL_AREAS_PAGE_SLUG,
    AWARDS_SECTION_PAGE_SLUG,
    SAAS_SECTION_PAGE_SLUG,
  ];
  const pages = allPages.filter((page) => !protectedPageSlugs.includes(page.slug));

  type Page = typeof pages[number];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Pages</h1>
        <Link href="/admin/pages/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Page
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-[#111184] p-2 text-white">
            <Home className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Homepage Hero</h2>
            <p className="text-sm text-slate-600">
              Edit the homepage title, description, CTAs, animated words, and showcase cards.
            </p>
          </div>
        </div>
        <Link href="/admin/pages/home-hero">
          <Button variant="outline" className="bg-white">
            Edit Homepage Hero
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-[#111184] p-2 text-white">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Trusted Section</h2>
            <p className="text-sm text-slate-600">
              Edit the homepage trust headline, stats, certified partners, and badge.
            </p>
          </div>
        </div>
        <Link href="/admin/pages/trusted-section">
          <Button variant="outline" className="bg-white">
            Edit Trusted Section
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-[#111184] p-2 text-white">
            <Star className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Trusted Brands</h2>
            <p className="text-sm text-slate-600">
              Edit the homepage brand carousel cards, logos, ratings, and links.
            </p>
          </div>
        </div>
        <Link href="/admin/pages/trusted-brands">
          <Button variant="outline" className="bg-white">
            Edit Trusted Brands
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-[#111184] p-2 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Why Choose Section</h2>
            <p className="text-sm text-slate-600">
              Edit the homepage Why Choose copy, six cards, and vision image.
            </p>
          </div>
        </div>
        <Link href="/admin/pages/why-choose">
          <Button variant="outline" className="bg-white">
            Edit Why Choose
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-[#111184] p-2 text-white">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Industries Section</h2>
            <p className="text-sm text-slate-600">
              Edit the homepage industries grid, icons, descriptions, and example links.
            </p>
          </div>
        </div>
        <Link href="/admin/pages/industries">
          <Button variant="outline" className="bg-white">
            Edit Industries
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-[#111184] p-2 text-white">
            <Rocket className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Maximize Section</h2>
            <p className="text-sm text-slate-600">
              Edit the homepage web design CTA section, image, recognition row, and stats.
            </p>
          </div>
        </div>
        <Link href="/admin/pages/maximize-section">
          <Button variant="outline" className="bg-white">
            Edit Maximize Section
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-[#111184] p-2 text-white">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Local Areas Section</h2>
            <p className="text-sm text-slate-600">
              Edit homepage local area copy, map embed, location links, and CTA.
            </p>
          </div>
        </div>
        <Link href="/admin/pages/local-areas">
          <Button variant="outline" className="bg-white">
            Edit Local Areas
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-[#111184] p-2 text-white">
            <Trophy className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Awards Section</h2>
            <p className="text-sm text-slate-600">
              Edit homepage awards heading, background word, icons, and award cards.
            </p>
          </div>
        </div>
        <Link href="/admin/pages/awards-section">
          <Button variant="outline" className="bg-white">
            Edit Awards Section
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-[#111184] p-2 text-white">
            <CloudCog className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">SaaS Section</h2>
            <p className="text-sm text-slate-600">
              Edit homepage SaaS/process copy, CTA button, and process cards.
            </p>
          </div>
        </div>
        <Link href="/admin/pages/saas-section">
          <Button variant="outline" className="bg-white">
            Edit SaaS Section
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page: Page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell className="text-right">
                  <ActionsMenu
                    id={page.id}
                    editUrl={`/admin/pages/${page.id}`}
                    deleteAction={deletePage}
                  />
                </TableCell>
              </TableRow>
            ))}
            {pages.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10 text-gray-500">
                  No pages found. Add one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
