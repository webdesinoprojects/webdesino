import { notFound } from "next/navigation";
import PermissionGuard from "@/components/employee/PermissionGuard";
import { EMPLOYEE_PERMISSION_KEYS, EMPLOYEE_PERMISSION_LABELS, type EmployeePermissionKey } from "@/lib/employee-permissions";
import { requireEmployee } from "@/lib/employee-session";

export default async function EmployeeSectionPage({ params }: { params: { section: string } }) {
  const section = params.section as EmployeePermissionKey;

  if (!EMPLOYEE_PERMISSION_KEYS.includes(section)) {
    notFound();
  }

  const employee = await requireEmployee();
  const allowed = employee.permissions.includes(section);

  return (
    <PermissionGuard
      allowed={allowed}
      fallback={<div className="rounded-2xl border border-rose-200 bg-white p-6 text-sm text-rose-600">You do not have access to this section.</div>}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">{EMPLOYEE_PERMISSION_LABELS[section]}</h1>
          <p className="text-sm text-slate-500 mt-1">This section is coming soon.</p>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col items-center text-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-400 text-2xl">🚧</div>
          <p className="text-sm text-slate-500 max-w-sm">
            The <strong>{EMPLOYEE_PERMISSION_LABELS[section]}</strong> module is being set up for the employee panel. Check back soon.
          </p>
        </div>
      </div>
    </PermissionGuard>
  );
}