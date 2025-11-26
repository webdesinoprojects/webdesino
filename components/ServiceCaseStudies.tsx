"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp } from "lucide-react";
import { getCaseStudies } from "@/lib/case-studies";

export default function ServiceCaseStudies() {
  // Get top 3 case studies
  const caseStudies = getCaseStudies().slice(0, 3);

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Top Case Studies
            </h2>
            <p className="text-lg text-slate-600">
              With great work come great clients! See how we've helped businesses achieve remarkable growth.
            </p>
          </div>
          <Link 
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[#02066F] font-bold hover:gap-3 transition-all"
          >
            View All Case Studies <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => (
            <Link 
              key={idx}
              href={`/case-studies/${study.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                {/* Placeholder for image if not available in study object, or use a pattern */}
                <div className="absolute inset-0 bg-[#02066F]/10 group-hover:scale-105 transition-transform duration-700" />
                
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <span className="inline-block px-3 py-1 bg-[#02066F] text-white text-xs font-bold rounded-full mb-3">
                    {study.industry}
                  </span>
                  <h3 className="text-xl font-bold text-white leading-tight mb-2">
                    {study.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                  {study.background}
                </p>
                
                <div className="flex items-center gap-2 text-[#02066F] font-bold text-sm group-hover:translate-x-2 transition-transform">
                  Read Case Study <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
