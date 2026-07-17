"use client";

import Link from "next/link";
import {
  BarChart3,
  Bed,
  BookOpenCheck,
  Briefcase,
  Building,
  Building2,
  CloudCog,
  Code,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Home,
  Landmark,
  Laptop,
  Megaphone,
  Monitor,
  Palette,
  Plane,
  Rocket,
  Scale,
  ShieldCheck,
  Shirt,
  ShoppingCart,
  Sprout,
  Store,
  Stethoscope,
  Truck,
  Users,
  UserSearch,
  UserSquare2,
  Utensils,
} from "lucide-react";
import {
  defaultIndustriesContent,
  type IndustriesContent,
  type IndustriesIconName,
} from "@/lib/industries-section";

const iconMap: Record<IndustriesIconName, typeof Building> = {
  Building,
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Rocket,
  Building2,
  Shirt,
  Globe,
  Stethoscope,
  Plane,
  Utensils,
  Truck,
  ShieldCheck,
  Monitor,
  Scale,
  Handshake,
  Sprout,
  UserSearch,
  BarChart3,
  BookOpenCheck,
  Bed,
  CloudCog,
  UserSquare2,
  Store,
  HeartPulse,
  Landmark,
  Laptop,
  Users,
  Megaphone,
  Code,
  Palette,
  Home,
};

interface IndustriesSectionProps {
  content?: IndustriesContent;
}

export default function IndustriesSection({
  content = defaultIndustriesContent,
}: IndustriesSectionProps) {
  return (
    <section className="py-10 lg:py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#111184] mb-4 animate-fade-in">
            {content.title}
          </h2>
          <p
            className="text-lg text-gray-600 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {content.description}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {content.cards.map((industry, idx) => {
            const Icon = iconMap[industry.iconName] || Building;

            return (
              <Link
                key={idx}
                href={industry.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 lg:p-8 rounded-3xl glass hover:glass-strong transition-all duration-300 hover-lift animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <Icon
                    className="text-[#111184] group-hover:text-[#111184]/80 transition-colors duration-300"
                    size={40}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#111184] mb-3 group-hover:text-[#111184]/80 transition-all">
                  {industry.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {industry.description}
                </p>

                {/* Example Link */}
                <div className="inline-flex items-center gap-2 text-[#111184] font-semibold text-sm hover:gap-3 transition-all">
                  {industry.linkLabel}
                  {industry.linkText ? ` - ${industry.linkText}` : ""}
                  <span className="text-xl">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
