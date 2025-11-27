"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HoverSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    setParticles(
      [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${3 + Math.random() * 4}s`,
      }))
    );
  }, []);

  const title = "Hover me!";
  const subtitle = "And transform your digital presence with WebDesino";
  
  return (
    <section className="py-10 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#02066F]/20 rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main animated heading */}
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
            {title.split("").map((char, idx) => (
              <span
                key={idx}
                className="inline-block transition-all duration-300 hover:scale-125 hover:-translate-y-3 hover:text-[#02066F] cursor-pointer animate-wave"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          {/* Subtitle with gradient effect */}
          <p className="text-xl lg:text-3xl font-semibold mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {subtitle.split(" ").map((word, idx) => (
              <span
                key={idx}
                className="inline-block mx-2 transition-all duration-300 hover:scale-110 cursor-pointer hover:text-[#02066F]"
                style={{
                  animationDelay: `${0.5 + idx * 0.05}s`,
                }}
              >
                {word}
              </span>
            ))}
          </p>

          {/* Interactive card grid */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-12 animate-scale-in" style={{ animationDelay: '0.8s' }}>
            {[
              { number: "1", title: "Web Development" },
              { number: "2", title: "Modern Technologies" },
              { number: "3", title: "Digital Experiences" },
              { number: "4", title: "Responsive Design" },
              { number: "5", title: "Business Growth" },
              { number: "6", title: "Future Innovations" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative p-6 glass-strong rounded-2xl hover-lift cursor-pointer overflow-hidden transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${0.8 + idx * 0.1}s` }}
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-[#02066F] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="text-4xl font-bold mb-2 text-[#02066F] group-hover:text-white transition-colors">
                    {item.number}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors">
                    {item.title}
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 animate-pulse-glow transition-opacity" />
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#02066F] text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105 hover-lift shadow-lg hover-glow"
            >
              Start Your Project
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 glass-strong border-2 border-[#02066F] text-[#02066F] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#02066F] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              See Our Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Floating stats */}
          <div className="mt-16 flex justify-center gap-8 flex-wrap animate-fade-in" style={{ animationDelay: '1.4s' }}>
            <div className="flex items-center gap-3 px-6 py-3 glass rounded-full hover-lift">
              <div className="w-3 h-3 bg-[#02066F] rounded-full animate-pulse-glow" />
              <span className="font-bold text-gray-700">30+ Specialists</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 glass rounded-full hover-lift">
              <div className="w-3 h-3 bg-[#02066F] rounded-full animate-pulse-glow" />
              <span className="font-bold text-gray-700">Vision SiteKaro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

