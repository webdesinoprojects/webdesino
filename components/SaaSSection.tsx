"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SaaSSection() {
  const steps = [
    { step: "01", title: "Signup" },
    { step: "02", title: "Choose A Plan" },
    { step: "03", title: "Implementation" },
    { step: "04", title: "Final Result" }
  ];

  return (
    <section className="py-20 bg-[#02066F] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-yellow-500 font-bold tracking-wider text-sm uppercase mb-4 block">
              OPTIMIZE YOUR MARKETING
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Take Control Of Your Business Processes With Our SaaS
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
              Streamline your business operations with our tailored SaaS solutions. Our platforms offer seamless integration and user-friendly interfaces, allowing you to manage tasks and optimize workflows efficiently. With real-time insights, customizable features, and scalable options, our tools empower you to stay ahead in a competitive market.
            </p>
            
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#02066F] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg shadow-black/20"
            >
              Get Started Now <ArrowRight size={20} />
            </Link>
          </div>
          
          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((item, idx) => (
              <div 
                key={idx} 
                className="border border-white/20 rounded-2xl p-8 bg-slate-50 hover:shadow-md transition-colors duration-300 flex flex-col justify-center min-h-[180px]"
              >
                <div className="text-4xl font-bold text-[#02066F] mb-4">
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
