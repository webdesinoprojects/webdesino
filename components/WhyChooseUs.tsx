

import type { Feature } from "@/lib/data";
import { GoalIcon, Target } from "lucide-react";

interface WhyChooseUsProps {
  features: Feature[];
}

export default function WhyChooseUs({ features }: WhyChooseUsProps) {
  if (features.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-20 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Why Choose <span className="text-blue-600">WebDesino?</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We combine technical expertise with creative innovation to deliver digital solutions that stand out.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Column - 3 items */}
          <div className="space-y-8">
            {features.slice(0, 3).map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-blue-100 group-hover:text-blue-600 transition-colors duration-300 leading-none">
                    {feature.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center - Graphic/3D Element */}
          <div className="flex flex-col items-center justify-center relative">
            <div className="w-full aspect-[4/5] bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative z-10 text-center p-8">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-lg animate-float">
                  <GoalIcon className="text-4xl text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Our Vision</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  To empower businesses with digital excellence and innovative technology solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - 3 items */}
          <div className="space-y-8">
            {features.slice(3, 6).map((feature, idx) => (
              <div
                key={idx + 3}
                className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${(idx + 3) * 0.15}s` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-blue-100 group-hover:text-blue-600 transition-colors duration-300 leading-none">
                    {feature.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
