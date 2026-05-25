"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Globe, Layers, MapPin, ImageIcon, Mail, Megaphone, MessageSquare, HelpCircle, Users, LogOut } from "lucide-react";
import { EMPLOYEE_PERMISSION_LABELS, EMPLOYEE_SECTION_PATHS, type EmployeePermissionKey } from "@/lib/employee-permissions";
import { getEmployeeDashboardBase, getEmployeeSectionPath } from "@/lib/employee-paths";
import { employeeLogout } from "@/lib/employee-auth-actions";

const ICONS: Record<EmployeePermissionKey, ReactNode> = {
  blogs: <FileText size={16} />,
  clients: <Globe size={16} />,
  services: <Layers size={16} />,
  locations: <MapPin size={16} />,
  pages: <FileText size={16} />,
  media: <ImageIcon size={16} />,
  enquiries: <Mail size={16} />,
  "ads-enquiries": <Megaphone size={16} />,
  testimonials: <MessageSquare size={16} />,
  faqs: <HelpCircle size={16} />,
  team: <Users size={16} />,
};

export default function EmployeeSidebar({
  name,
  permissions,
}: {
  name: string;
  permissions: EmployeePermissionKey[];
}) {
  const pathname = usePathname();
  const dashboardPath = getEmployeeDashboardBase(name);

  return (
    <div className="flex h-full flex-col bg-[#0f1623] border-r border-white/[0.06] text-white">
      <div className="h-16 flex items-center px-5 border-b border-white/[0.06] shrink-0">
        <div>
          <p className="text-sm font-bold tracking-wide text-white/90">WEBDESINO</p>
          <p className="text-[11px] text-white/40">Employee Panel</p>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-white/[0.06]">
        <p className="text-xs text-white/40 uppercase tracking-wider">Signed in as</p>
        <p className="text-sm font-semibold mt-1">{name}</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <NavItem href={dashboardPath} label="Dashboard" icon={<LayoutDashboard size={16} />} active={pathname === dashboardPath} />
        {permissions.map((permission) => (
          <NavItem
            key={permission}
            href={getEmployeeSectionPath(name, permission)}
            label={EMPLOYEE_PERMISSION_LABELS[permission]}
            icon={ICONS[permission]}
            active={pathname === getEmployeeSectionPath(name, permission)}
          />
        ))}
      </nav>

      <div className="p-3 border-t border-white/[0.06]">
        <form action={employeeLogout}>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-150">
            <LogOut size={16} />
            <span className="font-medium">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}

function NavItem({ href, label, icon, active }: { href: string; label: string; icon: ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${active ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/[0.06] hover:text-white/85"}`}
    >
      {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-full bg-blue-400" />}
      <span className={active ? "text-blue-300" : "text-white/40 group-hover:text-white/70 transition-colors"}>{icon}</span>
      {label}
    </Link>
  );
}
