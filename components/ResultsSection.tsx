"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, ArrowUpRight, ArrowRight } from "lucide-react";
import { getIndustries } from "@/lib/data";
import type { Result } from "@/lib/data";

interface ResultsSectionProps {
  results: Result[];
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  const industries = getIndustries();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredResults =
    activeFilter === "All"
      ? results
      : results.filter((r) => r.industry === activeFilter);

  if (results.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#02066F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-[#02066F] rounded-full" />
              <span className="text-sm font-bold text-[#02066F] uppercase tracking-wider">Proven Impact</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Remarkable <span className="text-[#02066F]">Results</span>
            </h2>
            <p className="text-slate-600 text-lg">
              See how we've helped businesses achieve 100%+ growth in traffic, leads, and sales through our data-driven strategies.
            </p>
          </div>
          
          <Link 
            href="/case-studies" 
            className="group flex items-center gap-2 text-[#02066F] font-bold hover:text-black transition-colors"
          >
            View Detailed Case Studies
            <span className="bg-[#02066F] text-white p-2 rounded-full group-hover:bg-black transition-colors">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setActiveFilter(industry)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 border ${
                activeFilter === industry
                  ? "bg-[#02066F] text-white border-[#02066F] shadow-lg shadow-[#02066F]/20"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#02066F] hover:text-[#02066F]"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.slice(0,3).map((result, idx) => (
            <Link
              href={result.slug ? `/case-studies/${result.slug}` : '#'}
              key={idx}
              className="group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#02066F]/10 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden"
            >
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-slate-100 rounded-bl-[100px] -z-0 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#02066F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold uppercase tracking-wide border border-slate-100 group-hover:border-[#02066F]/20 group-hover:text-[#02066F] transition-colors">
                    {result.industry}
                  </div>
                  <div className="flex items-center gap-2 text-[#02066F] font-bold bg-[#02066F]/5 px-3 py-1 rounded-full border border-[#02066F]/10 shadow-sm text-sm">
                    <TrendingUp size={14} />
                    {result.growth}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#02066F] transition-colors">
                    {result.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {result.description}
                  </p>
                </div>
                
                {/* Visual Data Representation */}
                <div className="mt-auto bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:border-[#02066F]/10 transition-colors">
                  <div className="flex items-end justify-between gap-1 h-16">
                    {[35, 55, 45, 70, 60, 85, 75, 95, 80, 100].map((h, i) => (
                      <div 
                        key={i} 
                        className="w-full bg-[#02066F]/20 rounded-t-sm relative overflow-hidden group-hover:bg-[#02066F] transition-colors duration-500"
                        style={{ height: `${h}%`, opacity: 0.3 + (i * 0.07) }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
