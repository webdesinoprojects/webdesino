"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function CareerShareButton({ categoryName }: { categoryName: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: `${categoryName} — Careers at Webdesino`,
      text: `Check out this role at Webdesino: ${categoryName}`,
      url,
    };

    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      // fall through to clipboard
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Share this job link"
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 backdrop-blur px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-[#111184]/40 hover:text-[#111184] transition-colors relative"
    >
      {copied ? (
        <>
          <Check size={14} className="text-emerald-600" /> Link copied
        </>
      ) : (
        <>
          <Share2 size={14} /> Share
        </>
      )}
    </button>
  );
}
