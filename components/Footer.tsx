"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";
import { servicesData } from "@/lib/services-data";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-teal via-teal/95 to-teal/90 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-orange/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Newsletter Section */}
        <div className="mb-16 text-center animate-fade-in">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text-orange">
            Stay Updated with WebDesino
          </h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest web development tips, SEO strategies, and exclusive offers
          </p>
          <form 
            action="https://webdesino.com/newsletter-subscribe" 
            method="POST"
            className="flex gap-3 max-w-xl mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange/50 transition-all"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-gradient-orange text-white rounded-full font-semibold hover-lift hover-glow transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Subscribe
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>Webdesino</span>
              <span className="text-orange">.com</span>
            </h3>
            <p className="text-gray-200 mb-6 leading-relaxed">
              Leading Digital Marketing Agency Delhi and web development
              company helping businesses grow online with creative websites, SEO, and digital marketing solutions.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/webdesino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-orange hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/webdesino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-orange hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.twitter.com/webdesino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-orange hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.instagram.com/webdesino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-orange hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@webdesino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-orange hover:scale-110 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-orange rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Our Clients", href: "/our-clients" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-gray-200 hover:text-orange transition-all duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-orange rounded-full" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {servicesData.flatMap(cat => cat.subtypes).slice(0, 6).map((service, idx) => {
                // Find parent category for slug construction
                const parentCategory = servicesData.find(cat => cat.subtypes.includes(service));
                return (
                  <li key={idx}>
                    <Link
                      href={`/services/${parentCategory?.slug}/${service.slug}`}
                      className="text-gray-200 hover:text-orange transition-all duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                      {service.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-orange rounded-full" />
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0 group-hover:bg-orange transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-300 mb-1">Call Us</div>
                  <a
                    href="tel:+919310851557"
                    className="text-white hover:text-orange transition font-medium"
                  >
                    +91 93108 51557
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0 group-hover:bg-orange transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-300 mb-1">Email Us</div>
                  <a
                    href="mailto:info@webdesino.com"
                    className="text-white hover:text-orange transition font-medium"
                  >
                    info@webdesino.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0 group-hover:bg-orange transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-300 mb-1">Visit Us</div>
                  <span className="text-white font-medium">
                    Delhi NCR, India
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="py-8 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange mb-1">100+</div>
            <div className="text-sm text-gray-300">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange mb-1">₹6.3 Cr+</div>
            <div className="text-sm text-gray-300">Revenue Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange mb-1">50+</div>
            <div className="text-sm text-gray-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange mb-1">20k+</div>
            <div className="text-sm text-gray-300">Specialists</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center text-gray-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
            <Link href="/privacy" className="hover:text-orange transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-orange transition">Terms & Conditions</Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:text-orange transition">Sitemap</Link>
          </div>
          <p className="text-sm">
            &copy; 2025 <span className="font-bold text-white">Webdesino</span>, All Rights Reserved
          </p>
          <p className="text-xs mt-2 text-gray-400 mb-8">
            Crafted with <span className="text-red-400">❤</span> in Delhi NCR
          </p>
        </div>
      </div>
    </footer>
  );
}

