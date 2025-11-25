"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function SaaSSection() {
  return (
    <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-sm font-bold mb-6 border border-blue-500/30">
              SAAS SOLUTIONS
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Take Control Of Your Business Processes With Our SaaS
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
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
                  <div className="w-12 h-12 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all hover:scale-105"
            >
              Get Started Now <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20 animate-pulse-glow"></div>
            <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
              {/* Abstract UI Representation */}
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-32 h-8 bg-slate-700 rounded-lg animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                    <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="h-24 bg-slate-700/50 rounded-xl border border-slate-700 p-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg mb-3"></div>
                    <div className="w-16 h-2 bg-slate-600 rounded mb-2"></div>
                    <div className="w-10 h-2 bg-slate-700 rounded"></div>
                  </div>
                  <div className="h-24 bg-slate-700/50 rounded-xl border border-slate-700 p-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg mb-3"></div>
                    <div className="w-16 h-2 bg-slate-600 rounded mb-2"></div>
                    <div className="w-10 h-2 bg-slate-700 rounded"></div>
                  </div>
                  <div className="h-24 bg-slate-700/50 rounded-xl border border-slate-700 p-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg mb-3"></div>
                    <div className="w-16 h-2 bg-slate-600 rounded mb-2"></div>
                    <div className="w-10 h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-12 bg-slate-700/30 rounded-lg w-full"></div>
                  <div className="h-12 bg-slate-700/30 rounded-lg w-full"></div>
                  <div className="h-12 bg-slate-700/30 rounded-lg w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
