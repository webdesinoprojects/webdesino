"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicesData } from "@/lib/services-data";

// Generate ticker categories from services data
const tickerCategories = servicesData.flatMap(category => 
  category.subtypes.map(subtype => subtype.title)
).slice(0, 10); // Take first 10 to avoid too long list

export default function ServicesPills() {
  return (
    <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-900/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Horizontal scrolling ticker */}
        <div className="mb-16 overflow-hidden">
          <div className="flex gap-6 animate-scroll-horizontal-fast">
            {[...tickerCategories, ...tickerCategories, ...tickerCategories].map((category, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm text-slate-600 font-medium text-sm whitespace-nowrap hover:border-blue-400 hover:text-blue-600 transition-colors cursor-default"
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <span className="text-slate-900">What do you want to </span>
          <span className="text-blue-600">achieve?</span>
        </h2>

        <div className="space-y-4 max-w-5xl mx-auto">
          {servicesData.map((service, idx) => (
            <Link
              key={idx}
              href={`/services/${service.slug}`}
              className="group block bg-white hover:bg-blue-600 transition-all duration-300 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl border border-slate-100 hover:border-blue-600 animate-slide-in-up"
              style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-white mb-2 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 group-hover:text-blue-100 text-sm md:text-base transition-colors line-clamp-1">
                    {service.description}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-white/20 flex items-center justify-center transition-all group-hover:scale-110 flex-shrink-0 ml-4">
                  <ArrowRight className="text-blue-600 group-hover:text-white transition-colors" size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional decorative element */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-slate-600 font-medium text-sm">100+ Projects Delivered Successfully</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-horizontal-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-scroll-horizontal-fast {
          animation: scroll-horizontal-fast 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
