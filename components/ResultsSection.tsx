"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import type { Result } from "@/lib/data";

interface ResultsSectionProps {
  results: Result[];
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    setParticles(
      [...Array(15)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${3 + Math.random() * 4}s`,
      }))
    );
  }, []);

  if (results.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-600/10 rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-6 animate-scale-in">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Proven Impact</span>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up text-slate-900" style={{ animationDelay: '0.1s' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Remarkable Results</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              See how we've helped businesses achieve 100%+ growth in traffic, leads, and sales through our data-driven strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {results.map((result, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-slate-100 hover:border-blue-200 transition-all duration-500 animate-scale-in overflow-hidden"
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                {/* Background Decoration */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 opacity-50" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-bold border border-slate-200 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                      {result.industry}
                    </div>
                    <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full border border-green-100 shadow-sm">
                      <TrendingUp size={18} />
                      {result.growth} Growth
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {result.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {result.description}
                  </p>
                  
                  {/* Visual Data Representation */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 group-hover:border-blue-100 transition-colors">
                    <div className="flex items-end justify-between gap-2 h-24">
                      {[35, 55, 45, 70, 60, 85, 75, 95, 80, 100].map((h, i) => (
                        <div 
                          key={i} 
                          className="w-full bg-blue-200 rounded-t-sm relative overflow-hidden group-hover:bg-blue-500 transition-colors duration-500"
                          style={{ height: `${h}%`, opacity: 0.3 + (i * 0.07) }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      <span>Before</span>
                      <span>After Optimization</span>
                    </div>
                  </div>

                  {result.slug && (
                    <div className="mt-8 flex justify-end">
                      <Link 
                        href={`/case-studies/${result.slug}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                      >
                        View Case Study <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
