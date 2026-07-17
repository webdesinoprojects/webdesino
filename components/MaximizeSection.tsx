"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { ArrowRight, TrendingUp, Award, Zap, Rocket, Star, Trophy } from "lucide-react";
import { getStorageUrl } from "@/lib/utils";
import {
  defaultMaximizeSectionContent,
  type MaximizeIconName,
  type MaximizeSectionContent,
} from "@/lib/maximize-section";

const iconMap: Record<MaximizeIconName, typeof Rocket> = {
  Rocket,
  Star,
  Trophy,
  Award,
  TrendingUp,
  Zap,
};

interface MaximizeSectionProps {
  content?: MaximizeSectionContent;
}

export default function MaximizeSection({
  content = defaultMaximizeSectionContent,
}: MaximizeSectionProps) {
  const [hovered, setHovered] = useState(false);
  const BadgeIcon = iconMap[content.badgeIconName] || Rocket;

  return (
    <section className="py-10 lg:py-16 bg-gradient-to-br from-[#111184]/5 via-white to-[#111184]/5 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 animate-float" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Main Heading with Animated Gradient Text */}
            <div className="mb-0 text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-[#111184]/10 rounded-full mb-6 animate-fade-in">
                <span className="text-sm font-bold text-[#111184] uppercase tracking-wide flex items-center gap-2">
                  <BadgeIcon className="w-4 h-4" />
                  {content.badgeText}
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold mb-6">
                <span className="block text-[#111184] animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                  {content.headingBlueLine}
                </span>
                <span className="block animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                  {content.headingBlackPrefix}{" "}
                  <span
                    className="text-[#111184] inline-block cursor-pointer relative"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <span className={`inline-block transition-all duration-500 ${hovered ? "scale-110 animate-wave" : ""}`}>
                      {content.headingBlueWord}
                    </span>
                    {hovered && (
                      <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#111184] rounded-full animate-scale-in" />
                    )}
                  </span>
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl animate-fade-in leading-relaxed" style={{ animationDelay: "0.4s" }}>
                {content.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <Link
                  href={content.primaryCta.href}
                  className="inline-flex items-center gap-2 bg-[#111184] text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105 hover-lift shadow-lg hover-glow"
                  aria-label={content.primaryCta.ariaLabel}
                >
                  {content.primaryCta.text}
                </Link>
                <Link
                  href={content.secondaryCta.href}
                  className="inline-flex items-center gap-2 glass-strong border-2 border-[#111184] text-[#111184] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#111184] hover:text-white transition-all duration-300 transform hover:scale-105"
                  aria-label={content.secondaryCta.ariaLabel}
                >
                  {content.secondaryCta.text}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative hidden lg:flex items-center justify-center animate-fade-in-right">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 border-4 border-white/20 group">
                <NextImage
                  src={getStorageUrl(content.image)}
                  alt={content.imageAlt}
                  width={600}
                  height={450}
                  className="object-contain w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#111184]/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>

          {/* Trusted Certifications & Recognition */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.6s" }}>
            {/* Quick Stats Banner */}
            <div className="glass-strong rounded-2xl p-6 text-center">
              <p className="text-md text-gray-600 mb-3">{content.recognitionText}</p>
              <div className="flex flex-wrap justify-center gap-6">
                {content.recognitionItems.map((item, index) => {
                  const Icon = iconMap[item.iconName] || Star;

                  return (
                    <div key={index} className="flex items-center gap-2">
                      <Icon className="w-10 h-10 text-[#111184]" />
                      <div>
                        <div className="font-bold text-[#111184]">{item.value}</div>
                        <div className="text-xs text-gray-600">{item.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center p-6 glass rounded-2xl hover-lift cursor-pointer">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-vertical-slow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }
        .animate-scroll-vertical-slow {
          animation: scroll-vertical-slow 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
