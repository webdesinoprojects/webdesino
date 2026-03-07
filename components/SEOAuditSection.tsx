"use client";

import { useState } from "react";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { getStorageUrl } from "@/lib/utils";

export default function SEOAuditSection() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const bgPattern = getStorageUrl("/grid-pattern.svg");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    // Simulate analysis
    setTimeout(() => {
      setLoading(false);
      window.open(`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}`, '_blank');
    }, 1500);
  };

  return (
    <section className="py-10 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div 
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `url('${bgPattern}')` }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-900">
            Free Website SEO Audit Tool
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Enter your website URL below and get an instant SEO analysis including speed, meta tags, mobile optimization, and ranking opportunities.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-6 text-slate-400" size={24} />
              <input
                type="url"
                placeholder="Enter your website URL (e.g., https://example.com)"
                className="w-full pl-16 pr-48 py-6 rounded-full text-slate-900 text-lg focus:outline-none focus:ring-4 focus:ring-[#111184]/20 shadow-xl border border-slate-200"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 bg-[#111184] hover:bg-black text-white px-8 rounded-full font-bold transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Run Audit"}
                {!loading && <ArrowRight size={20} />}
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              * We use Google PageSpeed Insights for accurate performance metrics
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
