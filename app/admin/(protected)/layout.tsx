import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { SidebarContent } from "@/components/admin/SidebarContent";
import { MobileSidebar } from "@/components/admin/MobileSidebar";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = token ? await verifyToken(token) : null;
  const userInitial = session?.name ? (session.name as string).charAt(0).toUpperCase() : "A";
  const userName = session?.name ? (session.name as string) : "Admin";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 hidden md:block fixed h-full z-10">
        <SidebarContent />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 w-full">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <MobileSidebar />
            <h2 className="text-lg font-semibold text-gray-800">Admin Overview</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm font-medium text-gray-600">{userName}</span>
            <div className="h-8 w-8 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
              {userInitial}
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
