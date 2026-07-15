import { createClient } from "@/lib/supabase/server";
import { SidebarContent } from "@/components/admin/SidebarContent";
import { MobileSidebar } from "@/components/admin/MobileSidebar";
import Link from "next/link";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "A";
  const userName = user?.email ? user.email.split("@")[0] : "Admin";
  const userEmail = user?.email ?? "admin@webdesino.com";

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* DESKTOP SIDEBAR */}
      <aside className="w-60 hidden md:block fixed h-full z-20">
        <SidebarContent />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-60 w-full min-w-0 overflow-x-hidden">
        {/* TOP NAVBAR */}
        <header className="h-14 bg-white/80 backdrop-blur-md border-b border-slate-200/70 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3">
            <MobileSidebar />
            <Link
              href="/admin/dashboard"
              className="text-sm font-semibold text-slate-800 tracking-tight hidden sm:block"
            >
              Admin Panel
            </Link>
          </div>

          {/* Right: user pill */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-xs font-semibold text-slate-700 capitalize">{userName}</span>
              <span className="text-[10px] text-slate-400">{userEmail}</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm ring-2 ring-white">
              {userInitial}
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
