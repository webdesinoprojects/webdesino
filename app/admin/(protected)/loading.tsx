"use client";

import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

const SECTION_LABELS: Record<string, string> = {
  blogs: "Blogs",
  clients: "Clients",
  enquiries: "Enquiries",
  faqs: "FAQs",
  locations: "Locations",
  media: "Media",
  pages: "Pages",
  services: "Services",
  team: "Team",
  testimonials: "Testimonials",
  employees: "Employees",
  profile: "Profile",
  dashboard: "Dashboard",
};

function getLoadingLabel(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const adminIndex = parts.indexOf("admin");

  if (adminIndex === -1) return "Dashboard";

  const next = parts[adminIndex + 1];
  const afterNext = parts[adminIndex + 2];

  if (!next) return "Dashboard";

  // For nested routes like /admin/services/[categoryId], keep section label as Services.
  if (next === "services") return "Services";

  // For edit/new URLs like /admin/blogs/new or /admin/blogs/[id], keep section label.
  if (afterNext === "new" || afterNext) {
    return SECTION_LABELS[next] ?? "Dashboard";
  }

  return SECTION_LABELS[next] ?? "Dashboard";
}

export default function AdminProtectedLoading() {
  const pathname = usePathname();
  const label = getLoadingLabel(pathname);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-slate-700">Loading {label}...</p>
      </div>
    </div>
  );
}
