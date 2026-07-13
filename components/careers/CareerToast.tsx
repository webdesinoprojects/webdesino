"use client";

import { useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export type CareerToastState = {
  kind: "success" | "error";
  message: string;
} | null;

export default function CareerToast({
  toast,
  onDismiss,
}: {
  toast: CareerToastState;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(onDismiss, toast.kind === "success" ? 5000 : 6000);
    return () => window.clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isSuccess = toast.kind === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[60] max-w-sm animate-[toastIn_0.25s_ease-out]"
    >
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div
        className={`flex items-start gap-3 rounded-xl border shadow-[0_10px_30px_rgba(0,0,0,0.12)] px-4 py-3 backdrop-blur ${
          isSuccess
            ? "border-emerald-200 bg-emerald-50/95 text-emerald-900"
            : "border-rose-200 bg-rose-50/95 text-rose-900"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
        ) : (
          <XCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
        )}
        <div className="flex-1 text-sm leading-snug">
          <p className={`font-semibold ${isSuccess ? "text-emerald-800" : "text-rose-800"}`}>
            {isSuccess ? "Application submitted" : "Couldn't submit"}
          </p>
          <p className="mt-0.5">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className={`shrink-0 rounded-md p-1 transition-colors ${
            isSuccess ? "hover:bg-emerald-100" : "hover:bg-rose-100"
          }`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
