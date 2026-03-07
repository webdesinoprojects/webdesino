import type { Feature } from "@/lib/data";
import Image from "next/image";
import { Target } from "lucide-react";
import { getStorageUrl } from "@/lib/utils";

const WHY_CHOOSE_IMAGE = "/images/home/why-choose/vision.jpg";

interface WhyChooseUsProps {
  features: Feature[];
}

export default function WhyChooseUs({ features }: WhyChooseUsProps) {
  if (features.length === 0) return null;
  const bgPattern = getStorageUrl("/grid-pattern.svg");

  return (
    <section className="py-10 lg:py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-20 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Why Choose <span className="text-[#111184]">WebDesino?</span>
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
                className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-gray-200 group-hover:text-[#111184] transition-colors duration-300 leading-none">
                    {feature.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#111184] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center - Vision Card */}
          <div className="flex flex-col items-center justify-center relative h-full">
            <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-[#111184] to-[#000040] rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl group hover:scale-[1.02] transition-transform duration-500">
              {/* Animated Background Elements */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: `url('${bgPattern}')` }}
              ></div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#111184]/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#0EA5E9]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative z-10 text-center p-10 flex flex-col items-center justify-center h-full">
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white relative z-10 tracking-tight">
                    Our Vision
                  </h3>
                </div>
                
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mb-8"></div>

                <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 border border-white/20 mb-8">
                  <Image
                    src={WHY_CHOOSE_IMAGE}
                    alt="Why choose WebDesino visual"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>

                <p className="text-blue-100 text-lg lg:text-xl leading-relaxed font-light max-w-xs mx-auto">
                  "To empower businesses with <span className="text-white font-semibold">digital excellence</span> and <span className="text-white font-semibold">innovative technology</span> solutions."
                </p>

                <div className="mt-10 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 3 items */}
          <div className="space-y-8">
            {features.slice(3, 6).map((feature, idx) => (
              <div
                key={idx + 3}
                className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${(idx + 3) * 0.15}s` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-gray-200 group-hover:text-[#111184] transition-colors duration-300 leading-none">
                    {feature.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#111184] transition-colors">
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
