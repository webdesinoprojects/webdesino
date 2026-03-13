"use client";

import { useState, useTransition } from "react";
import { updateEnquiryStatus } from "@/lib/actions";

const STATUSES = ["new", "contacted", "closed"] as const;

export default function EnquiryStatusUpdater({
  id,
  current,
}: {
  id: string;
  current: string;
}) {
  const [status, setStatus] = useState(current);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleChange(next: string) {
    setStatus(next);
    setSaved(false);
    startTransition(async () => {
      await updateEnquiryStatus(id, next);
      setSaved(true);
    });
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-gray-500 font-medium">Update Status:</span>
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map((s) => (
          <button
            key={s}
            disabled={isPending || status === s}
            onClick={() => handleChange(s)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              status === s
                ? s === "new"
                  ? "bg-green-100 text-green-800 ring-2 ring-green-400"
                  : s === "contacted"
                  ? "bg-blue-100 text-blue-800 ring-2 ring-blue-400"
                  : "bg-gray-100 text-gray-800 ring-2 ring-gray-400"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>
      {saved && (
        <span className="text-xs text-green-600 font-medium animate-pulse">Saved</span>
      )}
      {isPending && (
        <span className="text-xs text-slate-400">Saving...</span>
      )}
    </div>
  );
}
