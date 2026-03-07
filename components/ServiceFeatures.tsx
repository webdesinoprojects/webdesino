"use client";

import { CheckCircle2, Code, Layout, Smartphone, Database, Shield, Search, RefreshCw, AppWindow, Palette, Share2, Server, Zap } from "lucide-react";

interface ServiceFeaturesProps {
  serviceTitle: string;
  features: string[];
}

export default function ServiceFeatures({ serviceTitle, features }: ServiceFeaturesProps) {
  // Map common features to icons
  const getIcon = (feature: string) => {
    const lower = feature.toLowerCase();
    if (lower.includes("custom") || lower.includes("development")) return Code;
    if (lower.includes("responsive") || lower.includes("mobile")) return Smartphone;
    if (lower.includes("ecommerce") || lower.includes("shop")) return Layout;
    if (lower.includes("cms") || lower.includes("content")) return Database;
    if (lower.includes("maintenance") || lower.includes("support")) return Shield;
    if (lower.includes("seo") || lower.includes("search")) return Search;
    if (lower.includes("redesign")) return RefreshCw;
    if (lower.includes("app")) return AppWindow;
    if (lower.includes("ui") || lower.includes("ux") || lower.includes("design")) return Palette;
    if (lower.includes("api") || lower.includes("integration")) return Share2;
    if (lower.includes("hosting") || lower.includes("domain")) return Server;
    if (lower.includes("performance") || lower.includes("speed")) return Zap;
    return CheckCircle2;
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            What do <span className="text-[#111184]">{serviceTitle}</span> services include?
          </h2>
          <p className="text-lg text-slate-600">
            From initial planning to final launch, we cover every aspect to ensure your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = getIcon(feature);
            return (
              <div 
                key={idx} 
                className="group p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#111184]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#111184]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-[#111184] group-hover:bg-[#111184] group-hover:text-white transition-all duration-300 relative z-10">
                  <Icon size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10 group-hover:text-[#111184] transition-colors">
                  {feature}
                </h3>
                
                <p className="text-slate-600 text-sm relative z-10 leading-relaxed">
                  We provide professional {feature.toLowerCase()} solutions tailored to your specific business needs, ensuring scalability and performance.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
