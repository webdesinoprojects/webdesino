import EmployeeSidebar from "@/components/employee/EmployeeSidebar";
import { requireEmployee } from "@/lib/employee-session";

export default async function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
  const employee = await requireEmployee();

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <aside className="hidden md:block fixed h-full w-60 z-20">
        <EmployeeSidebar name={employee.name} permissions={employee.permissions as any} />
      </aside>

      <main className="flex-1 md:ml-60 min-w-0">
        <header className="h-14 bg-white/80 backdrop-blur-md border-b border-slate-200/70 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Employee Dashboard</h2>
            <p className="text-[11px] text-slate-400">Role-based CMS workspace</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm ring-2 ring-white">
            {employee.name.charAt(0).toUpperCase()}
          </div>
        </header>

        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}