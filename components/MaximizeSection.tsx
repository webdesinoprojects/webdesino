"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Award, Zap, Rocket, Star, Trophy } from "lucide-react";

const certifications = [
  { name: "Google Partner", icon: <TrendingUp className="w-6 h-6" />, description: "Certified Partner Delhi NCR" },
  { name: "WordPress", icon: <Zap className="w-6 h-6" />, description: "Certified Agency Delhi NCR" },
  { name: "Shopify", icon: <Rocket className="w-6 h-6" />, description: "Partner Web Development" },
  { name: "SEMRush", icon: <TrendingUp className="w-6 h-6" />, description: "Certified Digital Marketing" },
  { name: "DesignRush", icon: <Trophy className="w-6 h-6" />, description: "Accredited Web Company" },
];

export default function MaximizeSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="py-10 lg:py-16 bg-gradient-to-br from-[#02066F]/5 via-white to-[#02066F]/5 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-radial from-[#02066F]/10 to-transparent rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-radial from-[#02066F]/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading with Animated Gradient Text */}
          <div className="mb-0 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-[#02066F]/10 rounded-full mb-6 animate-fade-in">
              <span className="text-sm font-bold text-[#02066F] uppercase tracking-wide flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Why WebDesino Ranks #1 in Delhi NCR
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold mb-6">
              <span className="block text-[#02066F] animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                Web Design And Development
              </span>
              <span className="block animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                Company In{" "}
                <span
                  className="text-[#02066F] inline-block cursor-pointer relative"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <span className={`inline-block transition-all duration-500 ${hovered ? "scale-110 animate-wave" : ""}`}>
                    Delhi
                  </span>
                  {hovered && (
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#02066F] rounded-full animate-scale-in" />
                  )}
                </span>
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl animate-fade-in leading-relaxed" style={{ animationDelay: '0.4s' }}>
              At our web design and development company in Delhi, we focus on attracting new customers through responsive, user-friendly websites tailored to your audience. Our digital marketing strategies—SEO, social media, and targeted ads—drive traffic and convert visitors into loyal customers.
            </p>

            <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#02066F] text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105 hover-lift shadow-lg hover-glow"
                aria-label="Start Your Project - Web Development Services Delhi"
              >
                Start Your Project
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 glass-strong border-2 border-[#02066F] text-[#02066F] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#02066F] hover:text-white transition-all duration-300 transform hover:scale-105"
                aria-label="See Our Work - Portfolio Projects"
              >
                See Our Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Trusted Certifications & Recognition */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.6s' }}>
            {/* <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#02066F] mb-2">Trusted Web Development Company in Delhi NCR</h3>
              <p className="text-sm text-gray-600">Recognized by global leaders and trusted by 50+ clients</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {certifications.map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.name === "Google Partner" ? "https://www.google.com/partners/" : 
                        cert.name === "WordPress" ? "https://wordpress.org/" :
                        cert.name === "Shopify" ? "https://www.shopify.com/partners" :
                        cert.name === "SEMRush" ? "https://www.semrush.com/" :
                        "https://www.designrush.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-strong rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover-lift group text-center border border-white/20"
                >
                  <div className="text-[#02066F] mb-3 group-hover:scale-110 transition-transform flex justify-center">{cert.icon}</div>
                  <div className="font-bold text-[#02066F] text-sm mb-1 group-hover:text-[#02066F] transition-colors">{cert.name}</div>
                  <div className="text-xs text-gray-600">{cert.description}</div>
                </a>
              ))}
            </div> */}

            {/* Quick Stats Banner */}
            <div className="glass-strong rounded-2xl p-6 text-center">
              <p className="text-md text-gray-600 mb-3">Recognized for professional work and high-quality digital solutions</p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-10 h-10 text-[#02066F]" />
                  <div>
                    <div className="font-bold text-[#02066F]">4.9/5</div>
                    <div className="text-xs text-gray-600">Client Rating</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-10 h-10 text-[#02066F]" />
                  <div>
                    <div className="font-bold text-[#02066F]">10+</div>
                    <div className="text-xs text-gray-600">Certifications</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="w-10 h-10 text-[#02066F]" />
                  <div>
                    <div className="font-bold text-[#02066F]">100%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="text-center p-6 glass rounded-2xl hover-lift cursor-pointer">
              <div className="text-4xl font-bold gradient-text mb-2">₹6.3 Cr+</div>
              <div className="text-gray-600 font-medium">Sales Generated for Clients</div>
            </div>
            <div className="text-center p-6 glass rounded-2xl hover-lift cursor-pointer">
              <div className="text-4xl font-bold gradient-text mb-2">100+</div>
              <div className="text-gray-600 font-medium">Projects Completed</div>
            </div>
            <div className="text-center p-6 glass rounded-2xl hover-lift cursor-pointer">
              <div className="text-4xl font-bold gradient-text mb-2">50+</div>
              <div className="text-gray-600 font-medium">Happy Clients</div>
            </div>
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

