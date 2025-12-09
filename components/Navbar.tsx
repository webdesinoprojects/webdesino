"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, Menu, X, ChevronDown, ArrowRight, ChevronLeft, ChevronRight, Code, Brush, Smartphone, Rocket, Briefcase, ShoppingCart, PenTool, Target, MapPin, Power, BarChart, Search, Home, Users, BookOpen, Info, GraduationCap, Pill, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { servicesData } from "@/lib/services-data";

// Work dropdown content
const workDropdown = [
  { icon: <BookOpen className="w-4 h-4" />, name: "BookBuzzz", href: "/case-studies/bookbuzzz" },
  { icon: <Pill className="w-4 h-4" />, name: "LuckyNutra", href: "/case-studies/luckynutra" },
  { icon: <ShoppingBag className="w-4 h-4" />, name: "BuyKhariBauli", href: "/case-studies/buykharibauli" },
  { icon: <GraduationCap className="w-4 h-4" />, name: "Meritshot", href: "/case-studies/meritshot" },
];

// Clients dropdown content
const clientsDropdown = [
  { name: "Our Websites", href: "/our-clients?category=Our%20Websites" },
  { name: "Our Apps", href: "/our-clients?category=Our%20Apps" },
  { name: "Digital Marketing", href: "/our-clients?category=Digital%20Marketing" },
  { name: "Graphic Designing", href: "/our-clients?category=Graphic%20Designing" },
];

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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

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
      <div className="bg-[#02066F] text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-gray-200 transition">
              {/* <span>Webdesino<span className="text-white">.com</span></span> */}
              <Image 
                src="https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/1765225653351-9gxe3n.png" 
                alt="Webdesino.com" 
                width={120} 
                height={40} 
                className="object-contain" 
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
              <a href="tel:+919310851557" className="flex items-center gap-2 hover:text-white transition">
                <Phone size={16} />
                <span>+91 93108 51557</span>
              </a>
              <a href="mailto:info@webdesino.com" className="flex items-center gap-2 hover:text-white transition">
                <Mail size={16} />
                <span>info@webdesino.com</span>
              </a>
            </div>
          </div>
          <Link
            href="/contact"
            className="bg-white text-[#02066F] px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition flex items-center gap-2 hover-lift shadow-lg"
          >
            Get Proposal
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Navigation - Tier 2 */}
      <nav ref={navRef} className="bg-white border-b border-slate-200 hidden md:block">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              
              {/* Home */}
              <Link href="/" className="flex items-center gap-2 text-slate-700 hover:text-[#02066F] transition font-medium">
                <Home size={18} />
                <span>Home</span>
              </Link>

              {/* Our Services */}
              <button
                className={`flex items-center gap-2 transition font-medium ${activeDropdown === 'services' ? 'text-[#02066F]' : 'text-slate-700 hover:text-[#02066F]'}`}
                onClick={() => toggleDropdown('services')}
              >
                <Code size={18} />
                <span>Our Services</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>

              {/* Our Work */}
              <div className="relative">
                <button
                  className={`flex items-center gap-2 transition font-medium ${activeDropdown === 'work' ? 'text-[#02066F]' : 'text-slate-700 hover:text-[#02066F]'}`}
                  onClick={() => toggleDropdown('work')}
                >
                  <Briefcase size={18} />
                  <span>Our Work</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'work' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'work' && (
                   <div className="absolute top-full left-0 mt-4 w-64 bg-white shadow-xl border border-slate-100 z-50 rounded-2xl p-2 animate-fade-in-up">
                      {workDropdown.map((item, idx) => (
                        <Link key={idx} href={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-[#02066F] transition group">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#02066F]/10 group-hover:text-[#02066F] transition">
                            {item.icon}
                          </div>
                          <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                      ))}
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <Link href="/portfolio" className="flex items-center justify-center gap-2 p-2 text-sm font-bold text-[#02066F] hover:bg-[#02066F]/5 rounded-lg transition">
                          View All Work <ArrowRight size={14} />
                        </Link>
                      </div>
                   </div>
                )}
              </div>

              {/* Our Clients */}
              <div className="relative">
                <button
                  className={`flex items-center gap-2 transition font-medium ${activeDropdown === 'clients' ? 'text-[#02066F]' : 'text-slate-700 hover:text-[#02066F]'}`}
                  onClick={() => toggleDropdown('clients')}
                >
                  <Users size={18} />
                  <span>Our Clients</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'clients' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'clients' && (
                   <div className="absolute top-full left-0 mt-4 w-64 bg-white shadow-xl border border-slate-100 z-50 rounded-2xl p-2 animate-fade-in-up">
                      {clientsDropdown.map((item, idx) => (
                        <Link key={idx} href={item.href} className="block p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-[#02066F] transition font-medium text-sm">
                          {item.name}
                        </Link>
                      ))}
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <Link href="/our-clients" className="flex items-center justify-center gap-2 p-2 text-sm font-bold text-[#02066F] hover:bg-[#02066F]/5 rounded-lg transition">
                          View All Clients <ArrowRight size={14} />
                        </Link>
                      </div>
                   </div>
                )}
              </div>

              {/* Blog */}
              <Link href="/blog" className="flex items-center gap-2 text-slate-700 hover:text-[#02066F] transition font-medium">
                <BookOpen size={18} />
                <span>Blog</span>
              </Link>

              {/* About */}
              <Link href="/about" className="flex items-center gap-2 text-slate-700 hover:text-[#02066F] transition font-medium">
                <Info size={18} />
                <span>About</span>
              </Link>

              {/* Contact */}
              <Link href="/contact" className="flex items-center gap-2 text-slate-700 hover:text-[#02066F] transition font-medium">
                <Phone size={18} />
                <span>Contact Us</span>
              </Link>
            </div>

            {/* Mega Menu */}
            {activeDropdown === 'services' && (
              <div
                className="hidden lg:block absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 z-50 animate-fade-in-up"
              >
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-4 gap-8">
                    {megaMenuItems.map((category, idx) => (
                      <div key={idx}>
                        <h3 className="font-bold text-slate-900 mb-4 text-lg border-b border-slate-100 pb-2">
                          <Link href={`/services/${category.slug}`} className="hover:text-[#02066F] transition">
                            {category.title}
                          </Link>
                        </h3>
                        <ul className="space-y-3">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                href={`/services/${category.slug}/${item.slug}`}
                                className="text-slate-600 hover:text-[#02066F] transition text-sm block hover:translate-x-1 transform duration-200"
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
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 hover:border-[#02066F] hover:bg-[#02066F] hover:text-white text-slate-600 font-medium text-xs md:text-sm whitespace-nowrap transition-all flex-shrink-0 group"
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
