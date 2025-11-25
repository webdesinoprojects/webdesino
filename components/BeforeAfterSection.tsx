"use client";

import { useState } from "react";
import Link from "next/link";
import { getIndustries } from "@/lib/data";
import { ArrowRight, TrendingUp, Users, DollarSign, BarChart, Rocket } from "lucide-react";

interface BeforeAfterSectionProps {
  industries?: string[];
}

export default function BeforeAfterSection({ industries: propIndustries }: BeforeAfterSectionProps = { industries: undefined }) {
  const industries = propIndustries || getIndustries();
  const [activeFilter, setActiveFilter] = useState("All");
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="py-10 lg:py-16 bg-slate-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Animated scrolling ticker */}
        <div className="mb-10 overflow-hidden">
          <div className="flex gap-8 animate-scroll-horizontal-fast">
            {[
              { text: "eCommerce", href: "/services/website-solutions/ecommerce-development" },
              { text: "Web Solutions", href: "/services/website-solutions" },
              { text: "Mobile Apps", href: "/services" },
              { text: "ERP/CRM", href: "/services" },
              { text: "Digital Marketing", href: "/services/digital-marketing" },
              { text: "eCommerce", href: "/services/website-solutions/ecommerce-development" },
              { text: "Web Solutions", href: "/services/website-solutions" },
              { text: "Mobile Apps", href: "/services" }
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="flex-shrink-0 px-6 py-3 bg-white border border-slate-200 rounded-full text-blue-600 font-bold text-lg whitespace-nowrap hover:shadow-md transition-all cursor-pointer hover:bg-blue-50"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        <h2 className="text-4xl lg:text-6xl font-bold text-center mb-4 animate-scale-in text-slate-900">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Before and After</span>
        </h2>
        <p className="text-center text-slate-600 text-lg mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          See the transformation from outdated to outstanding
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setActiveFilter(industry)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeFilter === industry
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Before/After Comparison with Slider */}
        <div className="max-w-6xl mx-auto mb-16 animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-slate-200 h-[500px]">
            {/* Before Image - Wireframe/Old Look */}
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
              <div className="w-full h-full p-8 opacity-50 grayscale">
                {/* Abstract Wireframe UI */}
                <div className="w-full h-8 bg-slate-300 rounded mb-4"></div>
                <div className="flex gap-4 mb-8">
                  <div className="w-1/3 h-40 bg-slate-300 rounded"></div>
                  <div className="w-2/3 space-y-4">
                    <div className="w-full h-8 bg-slate-300 rounded"></div>
                    <div className="w-full h-4 bg-slate-300 rounded"></div>
                    <div className="w-3/4 h-4 bg-slate-300 rounded"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-32 bg-slate-300 rounded"></div>
                  <div className="h-32 bg-slate-300 rounded"></div>
                  <div className="h-32 bg-slate-300 rounded"></div>
                </div>
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-[2px]">
                <div className="bg-white/90 p-6 rounded-2xl shadow-lg text-center border border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-700 mb-2">Before</h3>
                  <p className="text-slate-500 text-sm mb-4">Outdated Design & Poor UX</p>
                  <div className="flex gap-4 text-sm">
                    <div className="text-red-500 font-bold">↓ Low Traffic</div>
                    <div className="text-red-500 font-bold">↓ High Bounce</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* After Image - Modern UI Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-900"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="w-full h-full p-8 relative overflow-hidden">
                {/* Modern UI Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
                
                {/* Modern UI Mockup */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-32 h-8 bg-white/20 rounded-full backdrop-blur-md"></div>
                    <div className="flex gap-4">
                      <div className="w-20 h-8 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex items-center gap-8">
                    <div className="w-1/2 space-y-6">
                      <div className="w-full h-12 bg-gradient-to-r from-white to-white/50 rounded-lg backdrop-blur-md"></div>
                      <div className="w-3/4 h-4 bg-white/30 rounded"></div>
                      <div className="w-1/2 h-4 bg-white/30 rounded"></div>
                      <div className="flex gap-4 mt-8">
                        <div className="w-32 h-10 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                        <div className="w-32 h-10 bg-white/10 border border-white/20 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-1/2 h-64 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl transform rotate-y-12 rotate-x-6"></div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-slate-900/80 p-6 rounded-2xl shadow-2xl text-center border border-blue-500/30 backdrop-blur-md">
                  <h3 className="text-2xl font-bold text-white mb-2">After</h3>
                  <p className="text-blue-200 text-sm mb-4">Modern, Fast & Converting</p>
                  <div className="flex gap-4 text-sm">
                    <div className="text-green-400 font-bold">↑ 300% Traffic</div>
                    <div className="text-green-400 font-bold">↑ 5x Leads</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-blue-600 border-4 border-slate-100">
                <div className="flex gap-1">
                  <ArrowRight className="rotate-180 w-3 h-3" />
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Range Input for Interaction */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="glass-strong p-8 rounded-3xl text-center hover-lift">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-orange" />
            <div className="text-4xl font-bold gradient-text mb-2">532%</div>
            <div className="text-gray-600 font-medium">Average Growth Rate</div>
          </div>
          <div className="glass-strong p-8 rounded-3xl text-center hover-lift">
            <Users className="w-12 h-12 mx-auto mb-4 text-teal" />
            <div className="text-4xl font-bold gradient-text mb-2">50+</div>
            <div className="text-gray-600 font-medium">Successful Transformations</div>
          </div>
          <div className="glass-strong p-8 rounded-3xl text-center hover-lift">
            <DollarSign className="w-12 h-12 mx-auto mb-4 text-orange" />
            <div className="text-4xl font-bold gradient-text mb-2">₹6.3 Cr+</div>
            <div className="text-gray-600 font-medium">Revenue Generated</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-horizontal-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-horizontal-fast {
          animation: scroll-horizontal-fast 20s linear infinite;
        }
      `}</style>
    </section>
  );
}

