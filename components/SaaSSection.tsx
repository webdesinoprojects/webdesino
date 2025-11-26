"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function SaaSSection() {
  return (
    <section className="py-10 bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#02066F]/10 text-[#02066F] rounded-full text-sm font-bold mb-6 border border-[#02066F]/20">
              SAAS SOLUTIONS
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-slate-900">
              Take Control Of Your Business Processes With Our SaaS
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Streamline your business operations with our tailored SaaS solutions. Our platforms offer seamless integration and user-friendly interfaces, allowing you to manage tasks and optimize workflows efficiently.
            </p>
            
            <div className="space-y-6 mb-8">
              {[
                { step: "01", title: "Signup", desc: "Create your account in seconds" },
                { step: "02", title: "Choose A Plan", desc: "Select the best plan for your needs" },
                { step: "03", title: "Implementation", desc: "Seamless integration with your workflow" },
                { step: "04", title: "Final Result", desc: "Watch your business grow" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#02066F] font-bold text-lg group-hover:bg-[#02066F] group-hover:text-white transition-all shadow-sm">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-slate-900 group-hover:text-[#02066F] transition-colors">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#02066F] text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-all hover:scale-105 shadow-lg shadow-[#02066F]/20"
            >
              Get Started Now <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl blur-3xl opacity-20 animate-pulse-glow"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
              {/* Abstract UI Representation */}
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-32 h-8 bg-white/10 rounded-lg animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="h-24 bg-white/5 rounded-xl border border-white/10 p-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg mb-3"></div>
                    <div className="w-16 h-2 bg-white/10 rounded mb-2"></div>
                    <div className="w-10 h-2 bg-white/10 rounded"></div>
                  </div>
                  <div className="h-24 bg-white/5 rounded-xl border border-white/10 p-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg mb-3"></div>
                    <div className="w-16 h-2 bg-white/10 rounded mb-2"></div>
                    <div className="w-10 h-2 bg-white/10 rounded"></div>
                  </div>
                  <div className="h-24 bg-white/5 rounded-xl border border-white/10 p-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg mb-3"></div>
                    <div className="w-16 h-2 bg-white/10 rounded mb-2"></div>
                    <div className="w-10 h-2 bg-white/10 rounded"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-12 bg-white/5 rounded-lg w-full"></div>
                  <div className="h-12 bg-white/5 rounded-lg w-full"></div>
                  <div className="h-12 bg-white/5 rounded-lg w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
