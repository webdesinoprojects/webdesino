"use client";

import Link from "next/link";
import NextImage from "next/image";
import { Award, Users, Briefcase, Shield } from "lucide-react";
import React from 'react';
import { getStorageUrl } from "@/lib/utils";

const Google = getStorageUrl("/google.jpg");
const WordPress = getStorageUrl("/wordpress.jpg");
const Shopify = getStorageUrl("/shopify.jpg");
const SEMRush = getStorageUrl("/semrush.png");
const DesignRush = getStorageUrl("/designrush.jpg");
const Aadiva = getStorageUrl("/aadiva.png");
const Bulkwala = getStorageUrl("/bulkwala.jpg");
const Bookbuzz = getStorageUrl("/bookbuzz.png");
const BuyKhariBauli = getStorageUrl("/buykharibauli.png");
const Landsaathi = getStorageUrl("/landsaathi.png");
const Agnishila = getStorageUrl("/agnishila.png");
const Maxlift = getStorageUrl("/maxlift.png");
const UAG = getStorageUrl("/uag.png");

const stats = [
  { icon: Users, label: "Happy Clients", value: "100+" },
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

const clientSpotlights = [
  {
    src: UAG,
    name: "UAG",
    url: "https://www.urbanarmorgear.com/",
    rating: 5
  },
  { 
    src: Aadiva,
    name: "Aadiva",
    url: "https://aadiva.com/",
    rating: 5
  },
  { 
    src: Bulkwala,
    name: "Bulkwala",
    url: "https://bulkwala.com/",
    rating: 5
  },
  { 
    src: Bookbuzz,
    name: "Bookbuzz",
    url: "https://www.thebookbuzz.in/",
    rating: 5
  },
  { 
    src: BuyKhariBauli,
    name: "BuyKhariBauli",
    url: "https://buykharibaoli.com/",
    rating: 5
  },
  { 
    src: Landsaathi,
    name: "Landsaathi",
    url: "https://landsathi.com/",
    rating: 5
  },
  { 
    src: Agnishila,
    name: "Agnishila",
    url: "https://agnishila.in/",
    rating: 5
  },
  { 
    src: Maxlift,
    name: "Maxlift",
    url: "https://www.maxlift.in/",
    rating: 5
  },
];

export default function TrustedSection() {
  return (
    <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#111184]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 animate-fade-in">
            Trusted Web Development Company in Delhi NCR
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            At WebDesino, we are trusted by 100+ clients across Delhi NCR for delivering modern websites, SEO strategies, and digital marketing solutions. Recognized by global leaders, we ensure every project is SEO-optimized, professional, and result-driven.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-xl hover:border-[#111184]/20 text-center hover-lift transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
              >
                <Icon className="mx-auto mb-4 text-[#111184]" size={48} />
                <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Certifications Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
              Certified Partners
            </h3>
            <p className="text-slate-600">
              Recognized and certified by global industry leaders
            </p>
          </div>
          
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
                <div className="text-xs text-gray-600 group-hover:text-[#111184] transition-colors font-medium">
                  {cert.name.replace(" Delhi NCR", "")}
                </div>
              </Link>
            ))}
          </div>

          {/* Optimize Your Marketing Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-strong animate-fade-in" style={{ animationDelay: '1s' }}>
              <Award className="text-[#111184]" size={24} />
              <span className="text-sm font-bold text-[#111184] uppercase tracking-wider">
                Optimize Your Marketing
              </span>
            </div>
          </div>
        </div>

        {/* Trusted by Leading Brands - Premium Carousel */}
        <div className="py-16 md:py-24 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-12 text-center">
              Trusted by leading brands
            </h2>
            
            {/* Testimonial Cards Carousel */}
            <div className="relative group/carousel">
              <div className="overflow-hidden pb-4">
                <div className="flex gap-6 md:gap-8 animate-carousel-scroll group-hover/carousel:pause-animation">
                  {/* First Set */}
                  {clientSpotlights.map((client, index) => (
                    <Link
                      key={`set1-${index}`}
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${client.name}`}
                      className="flex-shrink-0 w-[85vw] sm:w-[45%] lg:w-[30%] xl:w-[23%] group cursor-pointer"
                    >
                      {/* Card Container */}
                      <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1 group-hover:shadow-2xl border-2 border-[#111184]/30 group-hover:border-[#111184]/60 bg-white/85 group-hover:bg-white/95 backdrop-blur-md">
                        {/* Client Image/Logo Background */}
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/95">
                          <NextImage
                            src={client.src}
                            alt={client.name}
                            fill
                            className="object-contain p-12 transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Bottom Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111184]/80 via-[#111184]/30 to-transparent" />
                        
                        {/* Glassmorphism Bottom Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-xl bg-[#111184]/90 border-t border-white/30">
                          {/* 5 Star Rating */}
                          <div className="flex gap-1 mb-3">
                            {[...Array(client.rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 text-yellow-400 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          
                          {/* Client Info */}
                          <h3 className="text-xl font-bold text-white mb-1">
                            {client.name}
                          </h3>
                          
                          {/* Arrow Icon with Animation */}
                          <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  
                  {/* Second Set (Duplicate for seamless loop) */}
                  {clientSpotlights.map((client, index) => (
                    <Link
                      key={`set2-${index}`}
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${client.name}`}
                      className="flex-shrink-0 w-[85vw] sm:w-[45%] lg:w-[30%] xl:w-[23%] group cursor-pointer"
                    >
                      {/* Card Container */}
                      <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1 group-hover:shadow-2xl border-2 border-[#111184]/30 group-hover:border-[#111184]/60 bg-white/85 group-hover:bg-white/95 backdrop-blur-md">
                        {/* Client Image/Logo Background */}
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/95">
                          <NextImage
                            src={client.src}
                            alt={client.name}
                            fill
                            className="object-contain p-12 transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Bottom Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111184]/80 via-[#111184]/30 to-transparent" />
                        
                        {/* Glassmorphism Bottom Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-xl bg-[#111184]/90 border-t border-white/30">
                          {/* 5 Star Rating */}
                          <div className="flex gap-1 mb-3">
                            {[...Array(client.rating)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 text-yellow-400 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          
                          {/* Client Info */}
                          <h3 className="text-xl font-bold text-white mb-1">
                            {client.name}
                          </h3>
                          
                          {/* Arrow Icon with Animation */}
                          <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
