"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Briefcase,
  FileText,
  Mail,
  MapPin,
  ImageIcon,
  Globe,
  MessageSquare,
  Settings,
  HelpCircle,
  Layers,
  UserCog,
  BarChart3,
} from "lucide-react";
import { logout } from "@/lib/auth-actions";

interface SidebarContentProps {
  onNavigate?: () => void;
}

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#0f1623] border-r border-white/[0.06]">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
            <Layers size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold tracking-wide text-white/90">WEBDESINO</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-hide">
        <SectionLabel label="Main" />
        <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={16} />} label="Dashboard" active={pathname === "/admin/dashboard"} onClick={onNavigate} />
        <NavItem href="/admin/analytics" icon={<BarChart3 size={16} />} label="Analytics" active={pathname.startsWith("/admin/analytics")} onClick={onNavigate} />
        <NavItem href="/admin/enquiries" icon={<Mail size={16} />} label="Enquiries" active={pathname.startsWith("/admin/enquiries")} onClick={onNavigate} />
        <NavItem href="/admin/blogs" icon={<FileText size={16} />} label="Blogs" active={pathname.startsWith("/admin/blogs")} onClick={onNavigate} />
        <NavItem href="/admin/case-studies" icon={<Briefcase size={16} />} label="Case Studies" active={pathname.startsWith("/admin/case-studies")} onClick={onNavigate} />

        <SectionLabel label="Content" />
        <NavItem href="/admin/clients" icon={<Globe size={16} />} label="Clients" active={pathname.startsWith("/admin/clients")} onClick={onNavigate} />
        <NavItem href="/admin/services" icon={<Layers size={16} />} label="Services" active={pathname.startsWith("/admin/services")} onClick={onNavigate} />
        <NavItem href="/admin/locations" icon={<MapPin size={16} />} label="Locations" active={pathname.startsWith("/admin/locations")} onClick={onNavigate} />
        <NavItem href="/admin/pages" icon={<FileText size={16} />} label="Pages" active={pathname.startsWith("/admin/pages")} onClick={onNavigate} />
        <NavItem href="/admin/team" icon={<Users size={16} />} label="Team" active={pathname.startsWith("/admin/team")} onClick={onNavigate} />
        <NavItem href="/admin/media" icon={<ImageIcon size={16} />} label="Media" active={pathname.startsWith("/admin/media")} onClick={onNavigate} />
        <NavItem href="/admin/faqs" icon={<HelpCircle size={16} />} label="FAQs" active={pathname.startsWith("/admin/faqs")} onClick={onNavigate} />
        <NavItem href="/admin/testimonials" icon={<MessageSquare size={16} />} label="Testimonials" active={pathname.startsWith("/admin/testimonials")} onClick={onNavigate} />
        <NavItem href="/admin/employees" icon={<UserCog size={16} />} label="Employees" active={pathname.startsWith("/admin/employees")} onClick={onNavigate} />

        <SectionLabel label="Account" />
        <NavItem href="/admin/profile" icon={<Settings size={16} />} label="Settings" active={pathname.startsWith("/admin/profile")} onClick={onNavigate} />
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/[0.06] shrink-0">
        <form action={logout}>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-150">
            <LogOut size={16} />
            <span className="font-medium">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="pt-5 pb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">{label}</p>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
        active
          ? "bg-white/10 text-white"
          : "text-white/50 hover:bg-white/[0.06] hover:text-white/85"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-full bg-blue-400" />
      )}
      <span className={active ? "text-blue-300" : "text-white/40 group-hover:text-white/70 transition-colors"}>
        {icon}
      </span>
      {label}
    </Link>
  );
}
