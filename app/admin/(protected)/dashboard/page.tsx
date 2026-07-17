import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  Mail,
  MapPin,
  ArrowUpRight,
  LayoutDashboard,
} from "lucide-react";

export default async function DashboardPage() {
  try {
    const projectCount = await prisma.project.count();
    const blogCount = await prisma.blogPost.count();
    const enquiryCount = await prisma.enquiry.count({
      where: { source: { not: "ads-landing" } },
    });
    const locationCount = await prisma.locationPage.count();

    return (
      <div className="space-y-8">
        {/* Page header */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
            <p className="text-xs text-slate-400 mt-0.5">Overview of your website content</p>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Projects"
            value={projectCount}
            href="/admin/case-studies"
            icon={<Briefcase size={18} />}
            accent="from-blue-500 to-blue-600"
            bg="bg-blue-50"
            iconColor="text-blue-500"
          />
          <StatCard
            title="Active Blogs"
            value={blogCount}
            href="/admin/blogs"
            icon={<FileText size={18} />}
            accent="from-violet-500 to-purple-600"
            bg="bg-violet-50"
            iconColor="text-violet-500"
          />
          <StatCard
            title="Enquiries"
            value={enquiryCount}
            href="/admin/enquiries"
            icon={<Mail size={18} />}
            accent="from-emerald-500 to-teal-600"
            bg="bg-emerald-50"
            iconColor="text-emerald-500"
          />
          <StatCard
            title="Locations"
            value={locationCount}
            href="/admin/locations"
            icon={<MapPin size={18} />}
            accent="from-orange-400 to-rose-500"
            bg="bg-rose-50"
            iconColor="text-rose-500"
          />
        </div>

        {/* Welcome card */}
        <div className="rounded-2xl bg-white border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Welcome to WebDesino Admin</h2>
          <p className="text-sm text-slate-500">
            Use the sidebar to manage your projects, blog posts, enquiries, and more.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Dashboard Error:", error);
    return (
      <div className="rounded-2xl bg-white border border-red-200 p-6 text-red-500">
        <h1 className="text-lg font-bold mb-1">Error Loading Dashboard</h1>
        <p className="text-sm">Please check the server logs for more details.</p>
      </div>
    );
  }
}

function StatCard({
  title,
  value,
  href,
  icon,
  accent,
  bg,
  iconColor,
}: {
  title: string;
  value: number;
  href: string;
  icon: React.ReactNode;
  accent: string;
  bg: string;
  iconColor: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className={`h-10 w-10 rounded-xl ${bg} ${iconColor} flex items-center justify-center`}>
          {icon}
        </div>
        <ArrowUpRight
          size={15}
          className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
        />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs font-medium text-slate-400 mt-0.5">{title}</p>
      </div>
      {/* Bottom accent bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
    </Link>
  );
}
