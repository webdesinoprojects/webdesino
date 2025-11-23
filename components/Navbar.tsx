"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, Menu, X, ChevronDown, ArrowRight, ChevronLeft, ChevronRight, Code, Brush, Smartphone, Rocket, Briefcase, ShoppingCart, PenTool, Target, MapPin, Power, BarChart, Search } from "lucide-react";
import Image from "next/image";
import { servicesData } from "@/lib/services-data";

// Generate scrolling categories from services data
const categories = servicesData.flatMap(category => 
  category.subtypes.map(subtype => ({
    icon: category.icon ? <category.icon size={16} /> : <Code size={16} />,
    label: subtype.title,
    href: `/services/${category.slug}/${subtype.slug}`
  }))
);

// Generate mega menu items from services data
const megaMenuItems = servicesData.map(category => ({
  title: category.title,
  slug: category.slug,
  items: category.subtypes.map(subtype => ({
    label: subtype.title,
    slug: subtype.slug
  }))
}));

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar - Tier 1 */}
      <div className="bg-slate-900 text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-blue-400 transition">
              <span>Webdesino</span>
              <span className="text-blue-500">.com</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
              <a href="tel:+919310851557" className="flex items-center gap-2 hover:text-blue-400 transition">
                <Phone size={16} />
                <span>+91 93108 51557</span>
              </a>
              <a href="mailto:info@webdesino.com" className="flex items-center gap-2 hover:text-blue-400 transition">
                <Mail size={16} />
                <span>info@webdesino.com</span>
              </a>
            </div>
          </div>
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-2 hover-lift shadow-lg shadow-blue-900/20"
          >
            Get Proposal
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Navigation - Tier 2 */}
      <nav className="bg-white border-b border-slate-200 hidden md:block">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                className="flex items-center gap-1 text-slate-700 hover:text-blue-600 transition font-medium"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                Our Services
                <ChevronDown size={16} />
              </button>

              <Link href="/portfolio" className="flex items-center gap-1 text-slate-700 hover:text-blue-600 transition font-medium">
                Our Work
                <ChevronDown size={16} />
              </Link>

              <Link href="/case-studies" className="text-slate-700 hover:text-blue-600 transition font-medium">
                Case Studies
              </Link>

              <Link href="/our-clients" className="text-slate-700 hover:text-blue-600 transition font-medium">
                Our Clients
              </Link>

              <Link href="/blog" className="text-slate-700 hover:text-blue-600 transition font-medium">
                Blog
              </Link>

              <Link href="/about" className="text-slate-700 hover:text-blue-600 transition font-medium">
                About
              </Link>

              <Link href="/contact" className="text-slate-700 hover:text-blue-600 transition font-medium">
                Contact Us
              </Link>
            </div>

            {/* Mega Menu */}
            {isMegaMenuOpen && (
              <div
                className="hidden lg:block absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 z-50 animate-fade-in-up"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-4 gap-8">
                    {megaMenuItems.map((category, idx) => (
                      <div key={idx}>
                        <h3 className="font-bold text-slate-900 mb-4 text-lg border-b border-slate-100 pb-2">
                          <Link href={`/services/${category.slug}`} className="hover:text-blue-600 transition">
                            {category.title}
                          </Link>
                        </h3>
                        <ul className="space-y-3">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                href={`/services/${category.slug}/${item.slug}`}
                                className="text-slate-600 hover:text-blue-600 transition text-sm block hover:translate-x-1 transform duration-200"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Scrolling Category Bar - Tier 3 */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 relative">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur hover:bg-slate-50 p-2 rounded-full shadow-md transition border border-slate-100"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-slate-600" />
          </button>

          {/* Scrollable Categories */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, idx) => (
              <Link
                key={idx}
                href={category.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-600 hover:text-white text-slate-600 font-medium text-xs md:text-sm whitespace-nowrap transition-all flex-shrink-0 group"
              >
                {category.icon && <span className="group-hover:text-white transition-colors">{category.icon}</span>}
                <span>{category.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur hover:bg-slate-50 p-2 rounded-full shadow-md transition border border-slate-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-slate-600" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </header>
  );
}
