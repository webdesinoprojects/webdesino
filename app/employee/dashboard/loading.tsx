import { Loader2 } from "lucide-react";

export default function EmployeeDashboardLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-slate-700">Loading dashboard...</p>
      </div>
    </div>
  );
}
