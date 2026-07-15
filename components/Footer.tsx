import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter, Instagram, Youtube, ArrowRight, FileText } from "lucide-react";
import { servicesData } from "@/lib/services-data";
import Image from "next/image";
import { getStorageUrl } from "@/lib/utils";

interface FooterProps {
  locations?: { name: string; slug: string }[];
  phoneNumbers?: { display: string; href: string }[];
  whatsappHref?: string;
  disableServiceLinks?: boolean;
}

const defaultPhoneNumbers = [
  { display: "+91 93108 51557", href: "tel:9310851557" },
  { display: "+91 93508 87828", href: "tel:9350887828" },
];

export default function Footer({
  locations = [],
  phoneNumbers = defaultPhoneNumbers,
  whatsappHref = "https://wa.me/919310851557",
  disableServiceLinks = false,
}: FooterProps) {
  return (
    <footer className="relative bg-[#111184] text-white overflow-hidden">
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
            className="flex w-full max-w-xl flex-col gap-3 mx-auto sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address for newsletter updates
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="w-full min-w-0 flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
            <button
              type="submit"
              className="w-full justify-center px-8 py-4 bg-white text-[#111184] rounded-full font-semibold hover-lift hover-glow transition-all duration-300 transform hover:scale-105 flex items-center gap-2 whitespace-nowrap sm:w-auto sm:flex-shrink-0"
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
            <span className="relative block w-[150px] h-10 overflow-hidden rounded mb-4">
              <Image
                src={getStorageUrl("/WebDesino.png")}
                alt="Webdesino.com"
                fill
                sizes="150px"
                className="object-cover object-left"
              />
            </span>
            <p className="text-gray-200 mb-6 leading-relaxed text-sm">
              Leading Digital Marketing Agency Delhi and web development
              company helping businesses grow online with creative websites, SEO, and digital marketing solutions.
            </p>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.facebook.com/thewebdiseno/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white hover:text-[#111184] hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/webdesino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white hover:text-[#111184] hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/the_webdesino/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white hover:text-[#111184] hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@webdesino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white hover:text-[#111184] hover:scale-110 transition-all duration-300"
                aria-label="Youtube"
              >
                <Youtube size={18} />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white hover:text-[#111184] hover:scale-110 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>

            {/* Get In Touch */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Get In Touch</h4>
              <p className="text-sm text-gray-200 mb-3">
                <span className="font-semibold text-white">Webdesino</span> 
                <span className="ml-1">Serving Delhi NCR businesses</span>
              </p>
              <ul className="space-y-2 text-sm text-gray-200">
                {phoneNumbers.map((phone) => (
                  <li key={phone.href} className="flex items-start gap-3">
                    <Phone className="text-white mt-1 flex-shrink-0" size={16} />
                    <a href={phone.href} aria-label={`Call ${phone.display}`} className="hover:text-white transition-colors">
                      {phone.display}
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <Mail className="text-white mt-1 flex-shrink-0" size={16} />
                  <a href="mailto:info@webdesino.com" className="hover:text-white transition-colors">
                    info@webdesino.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="text-white mt-1 flex-shrink-0" size={16} />
                  <span>Service Area: Delhi NCR, India</span>
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
                  <Link href="/careers" className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Careers
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
                  <Link href="/our-websites" className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
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
                      {disableServiceLinks ? category.title : <Link href={`/services/${category.slug}`}>{category.title}</Link>}
                    </h5>
                    <ul className="space-y-1.5 text-sm">
                      {category.subtypes.map((subtype) => (
                        <li key={subtype.slug}>
                          {disableServiceLinks ? (
                            <span className="text-gray-300 inline-block">{subtype.title}</span>
                          ) : (
                            <Link
                              href={`/services/${category.slug}/${subtype.slug}`}
                              className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                            >
                              {subtype.title}
                            </Link>
                          )}
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
                      {disableServiceLinks ? category.title : <Link href={`/services/${category.slug}`}>{category.title}</Link>}
                    </h5>
                    <ul className="space-y-1.5 text-sm">
                      {category.subtypes.map((subtype) => (
                        <li key={subtype.slug}>
                          {disableServiceLinks ? (
                            <span className="text-gray-300 inline-block">{subtype.title}</span>
                          ) : (
                            <Link
                              href={`/services/${category.slug}/${subtype.slug}`}
                              className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                            >
                              {subtype.title}
                            </Link>
                          )}
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
                      {disableServiceLinks ? category.title : <Link href={`/services/${category.slug}`}>{category.title}</Link>}
                    </h5>
                    <ul className="space-y-1.5 text-sm">
                      {category.subtypes.map((subtype) => (
                        <li key={subtype.slug}>
                          {disableServiceLinks ? (
                            <span className="text-gray-300 inline-block">{subtype.title}</span>
                          ) : (
                            <Link
                              href={`/services/${category.slug}/${subtype.slug}`}
                              className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                            >
                              {subtype.title}
                            </Link>
                          )}
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
            <div className="text-3xl font-bold text-white mb-1">₹16.8 Cr+</div>
            <div className="text-sm text-gray-300">Revenue Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">100+</div>
            <div className="text-sm text-gray-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-sm text-gray-300">Support</div>
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
            &copy; 2026 <span className="font-bold text-white">Webdesino</span>, All Rights Reserved
          </p>
          <p className="text-xs mt-2 text-gray-400 mb-8">
            Crafted with <span className="text-red-400">❤</span> in Delhi NCR
          </p>
        </div>
      </div>
    </footer>
  );
}

