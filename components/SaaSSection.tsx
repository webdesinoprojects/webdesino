"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStorageUrl } from "@/lib/utils";
import {
  defaultSaasSectionContent,
  type SaasSectionContent,
} from "@/lib/saas-section";

interface SaaSSectionProps {
  content?: SaasSectionContent;
}

export default function SaaSSection({
  content = defaultSaasSectionContent,
}: SaaSSectionProps) {
  const bgPattern = getStorageUrl("/grid-pattern.svg");

  return (
    <section className="py-20 bg-[#111184] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url('${bgPattern}')` }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-yellow-500 font-bold tracking-wider text-sm uppercase mb-4 block">
              {content.eyebrow}
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {content.title}
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
              {content.description}
            </p>
            
            <Link 
              href={content.ctaHref}
              className="inline-flex items-center gap-2 bg-white text-[#111184] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg shadow-black/20"
            >
              {content.ctaText} <ArrowRight size={20} />
            </Link>
          </div>
          
          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.steps.map((item, idx) => (
              <div 
                key={idx} 
                className="border border-white/20 rounded-2xl p-8 bg-slate-50 hover:shadow-md transition-colors duration-300 flex flex-col justify-center min-h-[180px]"
              >
                <div className="text-4xl font-bold text-[#111184] mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
