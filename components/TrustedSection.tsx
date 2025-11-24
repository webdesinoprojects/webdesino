"use client";

import Link from "next/link";
import NextImage from "next/image";
import { Award, Users, Briefcase, Shield } from "lucide-react";
import React from 'react';
import Google from "@/public/google.jpg";
import WordPress from "@/public/wordpress.jpg";
import Shopify from "@/public/shopify.jpg";
import SEMRush from "@/public/semrush.png";
import DesignRush from "@/public/designrush.jpg";
import Aadiva from "@/public/aadiva.png";
import Bookbuzz from "@/public/bookbuzz.png";
import Bulkwala from "@/public/bulkwala.jpg";
import BuyKhariBauli from "@/public/buykharibauli.png";
import Landsaathi from "@/public/landsaathi.png";
import Maxlift from "@/public/maxlift.png";
import AmbassadorPerk from "@/public/image.png";
import Uag from "@/public/uag.png";

const stats = [
  { icon: Users, label: "Happy Clients", value: "50+" },
  { icon: Briefcase, label: "Projects Delivered", value: "100+" },
  { icon: Shield, label: "Global Certifications", value: "10+" },
];

const certifications = [
  { name: "Google Certified Partner Delhi NCR", logo: Google, link: "https://www.google.com/partners/" },
  { name: "WordPress Certified Agency Delhi NCR", logo: WordPress, link: "https://wordpress.org/" },
  { name: "Shopify Partner Web Development Delhi NCR", logo: Shopify, link: "https://www.shopify.com/partners" },
  { name: "SEMRush Certified Digital Marketing Delhi NCR", logo: SEMRush, link: "https://www.semrush.com/" },
  { name: "DesignRush Accredited Web Development Company Delhi NCR", logo: DesignRush, link: "https://designrush.com/" },
];

const logos = [
  { src: Aadiva, alt: "Company Logo 1" },
  { src: Bookbuzz, alt: "Company Logo 2" },
  { src: Bulkwala, alt: "Company Logo 3" },
  { src: BuyKhariBauli, alt: "Company Logo 4" },
  { src: AmbassadorPerk, alt: "Company Logo 5" },
  { src: Landsaathi, alt: "Company Logo 6" },
  { src: Maxlift, alt: "Company Logo 7" },
  { src: Uag, alt: "Company Logo 8" },
];

export default function TrustedSection() {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 animate-fade-in">
            Trusted Web Development Company in Delhi NCR
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            At WebDesino, we are trusted by 50+ clients across Delhi NCR for delivering modern websites, SEO strategies, and digital marketing solutions. Recognized by global leaders, we ensure every project is SEO-optimized, professional, and result-driven.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-xl hover:border-blue-100 text-center hover-lift transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
              >
                <Icon className="mx-auto mb-4 text-blue-600" size={48} />
                <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
            {certifications.map((cert, idx) => (
              <Link
                key={idx}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 sm:p-6 rounded-2xl glass hover:glass-strong text-center transition-all duration-300 hover-lift animate-fade-in"
                style={{ animationDelay: `${idx * 0.1 + 0.5}s` }}
                aria-label={cert.name}
              >
                <div className="mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <NextImage
                    src={cert.logo}
                    alt={cert.name}
                    width={100}
                    height={100}
                    className="w-full h-auto object-contain max-w-[60px] sm:max-w-[70px] md:max-w-[80px] mx-auto"
                  />
                </div>
                <div className="text-xs text-gray-600 group-hover:text-teal transition-colors font-medium">
                  {cert.name.replace(" Delhi NCR", "")}
                </div>
              </Link>
            ))}
          </div>

          {/* Optimize Your Marketing Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-strong animate-fade-in" style={{ animationDelay: '1s' }}>
              <Award className="text-orange" size={24} />
              <span className="text-sm font-bold text-teal uppercase tracking-wider">
                Optimize Your Marketing
              </span>
            </div>
          </div>
        </div>

        {/* Trusted by Companies Worldwide Banner */}
        <div className="bg-gray-50 dark:bg-gray-800 py-12 md:py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Trusted by leading brands
            </h2>
            <div className="relative overflow-hidden">
              <div className="flex animate-infinite-scroll">
                {logos.map((logo, index) => (
                  <div key={index} className="flex-shrink-0 w-48 mx-6">
                    <NextImage
                      className="h-24 w-auto mx-auto"
                      src={logo.src}
                      alt={logo.alt}
                    />
                  </div>
                ))}
                {logos.map((logo, index) => (
                  <div key={`duplicate-${index}`} className="flex-shrink-0 w-48 mx-6">
                    <NextImage
                      className="h-24 w-auto mx-auto"
                      src={logo.src}
                      alt={logo.alt}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}