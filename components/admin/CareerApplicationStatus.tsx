"use client";

import { useState, useTransition } from "react";
import { updateCareerApplicationStatus } from "@/lib/career-actions";

const STATUSES = [
  { key: "new", label: "New", ring: "ring-emerald-400", chip: "bg-emerald-100 text-emerald-800" },
  { key: "reviewing", label: "Reviewing", ring: "ring-amber-400", chip: "bg-amber-100 text-amber-800" },
  { key: "shortlisted", label: "Shortlisted", ring: "ring-blue-400", chip: "bg-blue-100 text-blue-800" },
  { key: "hired", label: "Hired", ring: "ring-indigo-400", chip: "bg-indigo-100 text-indigo-800" },
  { key: "rejected", label: "Rejected", ring: "ring-rose-400", chip: "bg-rose-100 text-rose-800" },
] as const;

export default function CareerApplicationStatus({
  id,
  current,
}: {
  id: string;
  current: string;
}) {
  const [status, setStatus] = useState(current);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function change(next: string) {
    setStatus(next);
    setSaved(false);
    setError(null);
    startTransition(async () => {
      const result = await updateCareerApplicationStatus(id, next);
      if (result?.success) {
        setSaved(true);
      } else {
        setError(result?.error || "Failed to update status");
        setStatus(current);
      }
    });
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-gray-500 font-medium">Update Status:</span>
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map((s) => (
          <button
            key={s.key}
            disabled={isPending || status === s.key}
            onClick={() => change(s.key)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              status === s.key
                ? `${s.chip} ring-2 ${s.ring}`
                : "bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {s.label}
          </button>
        ))}
      </div>
      {saved && <span className="text-xs text-green-600 font-medium animate-pulse">Saved</span>}
      {isPending && <span className="text-xs text-slate-400">Saving…</span>}
      {error && <span className="text-xs text-rose-600">{error}</span>}
    </div>
  );
}
