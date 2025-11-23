"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, ChevronDown, Menu, X, GraduationCap, BookOpen, Pill, ShoppingBag, Users } from "lucide-react";
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

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Our Services", href: "/services", hasDropdown: true },
  { label: "Our Work", href: "/portfolio", hasDropdown: true },
  { label: "Our Clients", href: "/our-clients", hasDropdown: true, icon: Users },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function BottomNav() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);

  return (

    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-slate-900/90 backdrop-blur-md rounded-full shadow-2xl px-4 py-3 flex items-center gap-2 border border-slate-800">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm whitespace-nowrap"
                  aria-label={item.label}
                >
                  {Icon && <Icon size={18} />}
                  {item.label && <span>{item.label}</span>}
                  {item.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200"
                      style={{ transform: hoveredItem === item.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  )}
                </Link>

                {/* Services Dropdown */}
                {item.label === "Our Services" && hoveredItem === item.label && (
                  <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 w-[720px] border border-slate-100 animate-fade-in-up">
                    <div className="grid grid-cols-3 gap-6">
                      {servicesData.map((category) => (
                        <div key={category.slug}>
                          <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide border-b border-slate-100 pb-2">
                            <Link href={`/services/${category.slug}`} className="hover:text-blue-600 transition-colors">
                              {category.title}
                            </Link>
                          </h3>
                          <ul className="space-y-2">
                            {category.subtypes.map((subtype) => (
                              <li key={subtype.slug}>
                                <Link
                                  href={`/services/${category.slug}/${subtype.slug}`}
                                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm block py-1 hover:translate-x-1 transform duration-200"
                                >
                                  {subtype.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work Dropdown */}
                {item.label === "Our Work" && hoveredItem === item.label && (
                  <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-5 w-[280px] border border-slate-100 animate-fade-in-up">
                    <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide border-b border-slate-100 pb-2">
                      Featured Projects
                    </h3>
                    <ul className="space-y-2">
                      {workDropdown.map((project) => (
                        <li key={project.name}>
                          <Link
                            href={project.href}
                            className="flex items-center gap-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm p-2 rounded-lg group"
                          >
                            <span className="text-slate-900 group-hover:scale-110 transition-transform">
                              {project.icon}
                            </span>
                            <span className="font-medium">{project.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/case-studies"
                      className="mt-4 block text-center text-slate-900 text-sm font-semibold hover:underline"
                    >
                      View All Projects →
                    </Link>
                  </div>
                )}

                {/* Clients Dropdown */}
                {item.label === "Our Clients" && hoveredItem === item.label && (
                  <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-5 w-[240px] border border-slate-100 animate-fade-in-up">
                    <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide border-b border-slate-100 pb-2">
                      Categories
                    </h3>
                    <ul className="space-y-2">
                      {clientsDropdown.map((client) => (
                        <li key={client.name}>
                          <Link
                            href={client.href}
                            className="block text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm p-2 rounded-lg"
                          >
                            {client.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover-lift hover-glow transition-all border border-slate-800"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="fixed bottom-24 right-6 left-6 bg-white rounded-3xl shadow-2xl p-6 max-h-[70vh] overflow-y-auto border border-slate-100 animate-scale-in">
            <div className="space-y-2">
              {navItems.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all font-medium flex-1 whitespace-nowrap"
                      onClick={() => !item.hasDropdown && setMobileMenuOpen(false)}
                    >
                      {item.icon && <item.icon size={20} />}
                      <span>{item.label}</span>
                    </Link>
                    {item.hasDropdown && (
                      <button
                        onClick={() => setMobileExpandedItem(mobileExpandedItem === item.label ? null : item.label)}
                        className="p-3 rounded-xl hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-all"
                      >
                        <ChevronDown
                          size={20}
                          className={`transition-transform ${mobileExpandedItem === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Services Dropdown */}
                  {item.label === "Our Services" && mobileExpandedItem === item.label && (
                    <div className="ml-4 mt-2 space-y-4 pl-4 border-l-2 border-blue-100">
                      {servicesData.map((category) => (
                        <div key={category.slug}>
                          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-2">
                            <Link 
                              href={`/services/${category.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {category.title}
                            </Link>
                          </h4>
                          <ul className="space-y-1">
                            {category.subtypes.map((subtype) => (
                              <li key={subtype.slug}>
                                <Link
                                  href={`/services/${category.slug}/${subtype.slug}`}
                                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors block py-1"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subtype.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Mobile Work Dropdown */}
                  {item.label === "Our Work" && mobileExpandedItem === item.label && (
                    <div className="ml-4 mt-2 space-y-2 pl-4 border-l-2 border-blue-100">
                      {workDropdown.map((project) => (
                        <Link
                          key={project.name}
                          href={project.href}
                          className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-all text-sm p-2 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="text-slate-900">{project.icon}</span>
                          <span className="font-medium">{project.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Mobile Clients Dropdown */}
                  {item.label === "Our Clients" && mobileExpandedItem === item.label && (
                    <div className="ml-4 mt-2 space-y-2 pl-4 border-l-2 border-blue-100">
                      {clientsDropdown.map((client) => (
                        <Link
                          key={client.name}
                          href={client.href}
                          className="block text-slate-600 hover:text-blue-600 transition-all text-sm p-2 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {client.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
