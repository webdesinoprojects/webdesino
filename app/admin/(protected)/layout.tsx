import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  LogOut,
  Briefcase,
  FileText,
  Mail
} from "lucide-react";
import { logout } from "@/lib/auth-actions";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
// import { Toaster } from "@/components/ui/toaster";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = token ? await verifyToken(token) : null;
  const userInitial = session?.name ? (session.name as string).charAt(0).toUpperCase() : "A";
  const userName = session?.name ? (session.name as string) : "Admin";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block fixed h-full z-10">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-900">WEBDESINO</h1>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)]">
          <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem href="/admin/projects" icon={<Briefcase size={20} />} label="Projects" />
          <NavItem href="/admin/blogs" icon={<FileText size={20} />} label="Blogs" />
          <NavItem href="/admin/enquiries" icon={<Mail size={20} />} label="Enquiries" />
          
          <div className="pt-4 pb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</p>
          </div>
          <NavItem href="/admin/profile" icon={<Users size={20} />} label="Profile" />
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
          <form action={logout}>
            <button className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition w-full">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-800">Admin Overview</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">{userName}</span>
            <div className="h-8 w-8 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
              {userInitial}
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
      {/* <Toaster /> */}
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition">
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
