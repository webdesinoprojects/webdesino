"use client";

import { Code, Database, Globe, Layout, Server, Smartphone, ShoppingCart, BarChart, Search, Share2, PenTool, Image, Video, Mail } from "lucide-react";

interface ServiceTechStackProps {
  categorySlug: string;
}

export default function ServiceTechStack({ categorySlug }: ServiceTechStackProps) {
  const getTechStack = () => {
    switch (categorySlug) {
      case "website-solutions":
        return [
          { name: "Next.js", icon: Globe },
          { name: "React", icon: Code },
          { name: "Node.js", icon: Server },
          { name: "WordPress", icon: Layout },
          { name: "Shopify", icon: ShoppingCart },
          { name: "MongoDB", icon: Database },
          { name: "Tailwind", icon: PenTool },
          { name: "AWS", icon: Server },
        ];
      case "digital-marketing":
        return [
          { name: "Google Ads", icon: Search },
          { name: "Facebook Ads", icon: Share2 },
          { name: "Google Analytics", icon: BarChart },
          { name: "SEMrush", icon: Search },
          { name: "Mailchimp", icon: Mail },
          { name: "HubSpot", icon: Database },
          { name: "Canva", icon: Image },
          { name: "LinkedIn", icon: Share2 },
        ];
      case "graphic-design":
        return [
          { name: "Photoshop", icon: Image },
          { name: "Illustrator", icon: PenTool },
          { name: "Figma", icon: Layout },
          { name: "After Effects", icon: Video },
          { name: "InDesign", icon: Layout },
          { name: "Canva", icon: Image },
          { name: "CorelDRAW", icon: PenTool },
          { name: "Premiere Pro", icon: Video },
        ];
      default:
        return [
          { name: "Latest Tech", icon: Code },
          { name: "Industry Standards", icon: Layout },
          { name: "Premium Tools", icon: Settings },
          { name: "Secure Systems", icon: Shield },
        ];
    }
  };

  const techStack = getTechStack();
  
  // Import icons dynamically or use a mapping if needed, but for now using Lucide icons as placeholders for logos
  // In a real scenario, you'd use actual SVG logos for these brands.

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#111184] font-semibold text-sm uppercase tracking-wider mb-2 block">Technology First</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Powered by <span className="text-[#111184]">Modern Technology</span>
          </h2>
          <p className="text-gray-600 text-lg">
            We stay ahead of the curve by leveraging the most advanced frameworks, tools, and platforms to build secure, scalable, and high-performance solutions for your business.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {techStack.map((tech, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md text-[#111184] group-hover:text-[#111184] transition-colors">
                <tech.icon size={24} />
              </div>
              <span className="font-semibold text-gray-700 text-sm group-hover:text-gray-900">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Settings, Shield } from "lucide-react";
