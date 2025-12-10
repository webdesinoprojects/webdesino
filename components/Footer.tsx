import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter, Instagram, Youtube, ArrowRight, FileText } from "lucide-react";
import { servicesData } from "@/lib/services-data";
import Image from "next/image";

interface FooterProps {
  locations?: { name: string; slug: string }[];
}

export default function Footer({ locations = [] }: FooterProps) {
  return (
    <footer className="relative bg-[#02066F] text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-14 relative z-10">
        {/* Newsletter Section */}
        <div className="mb-10 text-center animate-fade-in">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
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
              className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-[#02066F] rounded-full font-semibold hover-lift hover-glow transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Subscribe
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Company Info - Spans 3 columns */}
          <div className="lg:col-span-3 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            {/* <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>Webdesino<span className="text-white">.com</span></span>
            </h3> */}
            <Image 
              src="https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/1765225653351-9gxe3n.png" 
              alt="Webdesino.com" 
              width={150} 
              height={40} 
              className="object-contain mb-4" 
              style={{ width: 'auto', height: 'auto' }}
            />
            <p className="text-gray-200 mb-6 leading-relaxed text-sm">
              Leading Digital Marketing Agency Delhi and web development
              company helping businesses grow online with creative websites, SEO, and digital marketing solutions.
            </p>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.facebook.com/thewebdiseno/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white hover:text-[#02066F] hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/webdesino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white hover:text-[#02066F] hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/the_webdesino/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white hover:text-[#02066F] hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@webdesino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white hover:text-[#02066F] hover:scale-110 transition-all duration-300"
                aria-label="Youtube"
              >
                <Youtube size={18} />
              </a>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Get In Touch</h4>
              <ul className="space-y-2 text-sm text-gray-200">
                <li className="flex items-start gap-3">
                  <Phone className="text-white mt-1 flex-shrink-0" size={16} />
                  <a href="tel:+919310851557" className="hover:text-white transition-colors">
                    +91 93108 51557
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="text-white mt-1 flex-shrink-0" size={16} />
                  <a href="mailto:info@webdesino.com" className="hover:text-white transition-colors">
                    info@webdesino.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="text-white mt-1 flex-shrink-0" size={16} />
                  <span>Delhi NCR, India</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="text-white mt-1 flex-shrink-0" size={16} />
                  <span>GST: 07CCKPT2540Q1ZW</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Our Clients & Case Studies - Spans 2 columns */}
          <div className="lg:col-span-2 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>

            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-bold mb-4 text-white">Our Clients</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/our-clients?category=Our%20Websites" className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Our Websites
                  </Link>
                </li>
                <li>
                  <Link href="/our-clients?category=Our%20Apps" className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Our Apps
                  </Link>
                </li>
                <li>
                  <Link href="/our-clients?category=Digital%20Marketing" className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link href="/our-clients?category=Graphic%20Designing" className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Graphic Designing
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Our Offices moved to Services column */}

          </div>

          {/* Our Services - Spans 7 columns (Split into 3 sub-columns) */}
          <div className="lg:col-span-7 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-bold mb-4 text-white">Our Services</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Column 1 */}
              <div className="space-y-6">
                {servicesData.slice(0, 2).map((category) => (
                  <div key={category.slug}>
                    <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider border-b border-white/10 pb-1">
                      <Link href={`/services/${category.slug}`}>{category.title}</Link>
                    </h5>
                    <ul className="space-y-1.5 text-sm">
                      {category.subtypes.map((subtype) => (
                        <li key={subtype.slug}>
                          <Link
                            href={`/services/${category.slug}/${subtype.slug}`}
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                          >
                            {subtype.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                {servicesData.slice(2, 4).map((category) => (
                  <div key={category.slug}>
                    <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider border-b border-white/10 pb-1">
                      <Link href={`/services/${category.slug}`}>{category.title}</Link>
                    </h5>
                    <ul className="space-y-1.5 text-sm">
                      {category.subtypes.map((subtype) => (
                        <li key={subtype.slug}>
                          <Link
                            href={`/services/${category.slug}/${subtype.slug}`}
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                          >
                            {subtype.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Column 3 */}
              <div className="space-y-6">
                {servicesData.slice(4).map((category) => (
                  <div key={category.slug}>
                    <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider border-b border-white/10 pb-1">
                      <Link href={`/services/${category.slug}`}>{category.title}</Link>
                    </h5>
                    <ul className="space-y-1.5 text-sm">
                      {category.subtypes.map((subtype) => (
                        <li key={subtype.slug}>
                          <Link
                            href={`/services/${category.slug}/${subtype.slug}`}
                            className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                          >
                            {subtype.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="mt-8">
                  <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider border-b border-white/10 pb-1">
                    Our Locations
                  </h5>
                  <ul className="space-y-1.5 text-sm">
                    <li>
                      <a href="https://share.google/1oqOSK2n3UvhKbHu5" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                        Krishan Vihar
                      </a>
                    </li>
                    <li>
                      <a href="https://share.google/7bfsoSDMcdKosq9H4" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                        Uttam Nagar
                      </a>
                    </li>
                    <li>
                      <a href="https://share.google/HamoWu7AFPzS3TEoh" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                        Kamla Nagar
                      </a>
                    </li>
                    <li>
                      <a href="https://www.google.com/maps/place/Karol+Bagh,+Delhi" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                        Karol Bagh
                      </a>
                    </li>
                    <li>
                      <a href="https://share.google/c7gS6rqXBDvqMimZ8" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                        Hauz Khas
                      </a>
                    </li>
                    <li>
                      <a href="https://share.google/OEllDuOFBQkSiWfF6" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                        DLF Camellias
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Quick Links */}
                {/* <div className="mt-8">
                  <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider border-b border-white/10 pb-1">
                    Quick Links
                  </h5>
                  <ul className="space-y-1.5 text-xs">
                    <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                    <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
                    <li><Link href="/case-studies" className="text-gray-300 hover:text-white">Case Studies</Link></li>
                    <li><Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
                    <li><Link href="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Service Locations - SEO Section */}
        <div className="mb-12 border-t border-white/10 pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h4 className="text-lg font-bold mb-6 text-white text-center">We Serve All Across Delhi NCR</h4>
          <div className="h-64 overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {locations.map((loc, idx) => (
                <Link
                  key={idx}
                  href={`/${loc.slug}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors truncate block"
                  title={loc.name}
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="py-8 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">100+</div>
            <div className="text-sm text-gray-300">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">₹6.3 Cr+</div>
            <div className="text-sm text-gray-300">Revenue Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">100+</div>
            <div className="text-sm text-gray-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">20k+</div>
            <div className="text-sm text-gray-300">Specialists</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center text-gray-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms-conditions" className="hover:text-white transition">Terms & Conditions</Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
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

