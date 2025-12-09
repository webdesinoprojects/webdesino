"use client";

import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  LogOut,
  Briefcase,
  FileText,
  Mail,
  MapPin,
  Image,
  Globe
} from "lucide-react";
import { logout } from "@/lib/auth-actions";

interface SidebarContentProps {
  onNavigate?: () => void;
}

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
        <div className="h-16 flex items-center justify-center border-b border-gray-200 shrink-0">
          <h1 className="text-xl font-bold text-blue-900">WEBDESINO</h1>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto flex-1 scrollbar-hide">
          <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={onNavigate} />
          <NavItem href="/admin/case-studies" icon={<Briefcase size={20} />} label="Case Studies" onClick={onNavigate} />
          <NavItem href="/admin/clients" icon={<Globe size={20} />} label="Clients" onClick={onNavigate} />
          <NavItem href="/admin/services" icon={<LayoutDashboard size={20} />} label="Services" onClick={onNavigate} />
          <NavItem href="/admin/locations" icon={<MapPin size={20} />} label="Locations" onClick={onNavigate} />
          <NavItem href="/admin/pages" icon={<FileText size={20} />} label="Pages" onClick={onNavigate} />
          <NavItem href="/admin/team" icon={<Users size={20} />} label="Team" onClick={onNavigate} />
          <NavItem href="/admin/media" icon={<Image size={20} />} label="Media" onClick={onNavigate} />
          <NavItem href="/admin/blogs" icon={<FileText size={20} />} label="Blogs" onClick={onNavigate} />
          <NavItem href="/admin/faqs" icon={<FileText size={20} />} label="FAQs" onClick={onNavigate} />
          <NavItem href="/admin/enquiries" icon={<Mail size={20} />} label="Enquiries" onClick={onNavigate} />
          
          <div className="pt-4 pb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</p>
          </div>
          <NavItem href="/admin/profile" icon={<Users size={20} />} label="Profile" onClick={onNavigate} />
        </nav>
        
        <div className="p-4 border-t border-gray-200 bg-white shrink-0">
          <form action={logout}>
            <button className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition w-full">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </form>
        </div>
    </div>
  );
}

function NavItem({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
