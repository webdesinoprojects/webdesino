import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, ArrowUpRight, FileText, Globe, Layers, MapPin, ImageIcon, Mail, Megaphone, MessageSquare, HelpCircle, Users } from "lucide-react";
import prisma from "@/lib/prisma";
import { requireEmployee } from "@/lib/employee-session";
import { EMPLOYEE_PERMISSION_LABELS, type EmployeePermissionKey } from "@/lib/employee-permissions";
import { getEmployeeSectionPath } from "@/lib/employee-paths";

const ICONS: Record<EmployeePermissionKey, ReactNode> = {
  blogs: <FileText size={18} />,
  clients: <Globe size={18} />,
  services: <Layers size={18} />,
  locations: <MapPin size={18} />,
  pages: <FileText size={18} />,
  media: <ImageIcon size={18} />,
  enquiries: <Mail size={18} />,
  "ads-enquiries": <Megaphone size={18} />,
  testimonials: <MessageSquare size={18} />,
  faqs: <HelpCircle size={18} />,
  team: <Users size={18} />,
};

export default async function EmployeeDashboardPage() {
  const employee = await requireEmployee();

  const counts = {
    blogs: await prisma.blogPost.count(),
    clients: await prisma.client.count(),
    services: await prisma.serviceCategory.count(),
    locations: await prisma.locationPage.count(),
    pages: await prisma.page.count(),
    media: await prisma.media.count(),
    enquiries: await prisma.enquiry.count({
      where: { source: { not: "ads-landing" } },
    }),
    "ads-enquiries": await prisma.enquiry.count({
      where: { source: "ads-landing" },
    }),
    testimonials: await prisma.testimonial.count(),
    faqs: await prisma.faq.count(),
    team: await prisma.teamMember.count(),
  } satisfies Record<EmployeePermissionKey, number>;

  const allowed = employee.permissions as EmployeePermissionKey[];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
          <LayoutDashboard size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Welcome, {employee.name}</h1>
          <p className="text-xs text-slate-400 mt-0.5">You can access {allowed.length} CMS sections.</p>
        </div>
      </div>

      {employee.note && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3">
          <p className="text-sm font-semibold text-amber-900">Note from admin</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-amber-800">{employee.note}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {allowed.map((permission) => (
          <Link
            key={permission}
            href={getEmployeeSectionPath(employee.name, permission)}
            className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">{ICONS[permission]}</div>
              <ArrowUpRight size={15} className="text-slate-300 group-hover:text-slate-500 transition-all duration-150" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{counts[permission]}</p>
              <p className="text-xs font-medium text-slate-400 mt-0.5">{EMPLOYEE_PERMISSION_LABELS[permission]}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
