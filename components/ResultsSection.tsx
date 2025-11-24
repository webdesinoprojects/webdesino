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
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Success Stories</span>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up text-slate-900" style={{ animationDelay: '0.1s' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Remarkable Results</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Discover the most iconic travel locations with real-time growth indicators. See how we've helped Delhi NCR businesses achieve 100%+ growth in traffic, leads, and sales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {results.map((result, idx) => {
              const content = (
                <div
                  className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-500 animate-scale-in"
                  style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/0 to-cyan-500/0 group-hover:from-blue-600/5 group-hover:via-blue-600/5 group-hover:to-cyan-500/5 transition-all duration-500" />
                  
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent animate-gradient" />
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TrendingUp className="w-24 h-24 text-blue-100 group-hover:text-blue-200 group-hover:scale-110 transition-all duration-500" />
                    </div>
                    
                    {/* Industry Badge */}
                    <div className="absolute top-4 left-4 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full text-sm font-bold text-blue-600 border border-white/50 shadow-sm">
                      {result.industry}
                    </div>

                    {/* Growth Badge */}
                    <div className="absolute top-4 right-4 px-4 py-2 bg-blue-600 backdrop-blur-xl rounded-full text-sm font-bold text-white shadow-lg flex items-center gap-2 animate-pulse-glow">
                      <TrendingUp size={16} />
                      {result.growth}
                    </div>
                  </div>

                  <div className="p-8 relative z-10">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{result.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{result.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                          {result.growth}
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Growth Rate</div>
                          <div className="font-bold text-blue-600">Verified Results</div>
                        </div>
                      </div>
                      <ArrowUpRight className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 animate-pulse-glow transition-opacity" />
                </div>
              );
              
              return (
                <div key={idx}>
                  {(result as any).link ? (
                    <Link href={(result as any).link}>{content}</Link>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
