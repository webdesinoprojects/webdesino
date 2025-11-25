"use client";

import { useState } from "react";
import { Search, ArrowRight, Loader2 } from "lucide-react";

export default function SEOAuditSection() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
    <section className="py-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Free Website SEO Audit Tool
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Enter your website URL below and get an instant SEO analysis including speed, meta tags, mobile optimization, and ranking opportunities.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-6 text-gray-400" size={24} />
              <input
                type="url"
                placeholder="Enter your website URL (e.g., https://example.com)"
                className="w-full pl-16 pr-48 py-6 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50 shadow-2xl"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 bg-orange hover:bg-orange/90 text-white px-8 rounded-full font-bold transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Run Audit"}
                {!loading && <ArrowRight size={20} />}
              </button>
            </div>
            <p className="mt-4 text-sm text-blue-200">
              * We use Google PageSpeed Insights for accurate performance metrics
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
