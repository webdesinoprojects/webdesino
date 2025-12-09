import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Get Free Consultation | Webdesino",
  description: "Contact Webdesino for web development, SEO, and digital marketing services in Delhi NCR. Call +91 93108 51557 or email info@webdesino.com for a free consultation.",
};

export default async function ContactPage() {
  const page = await prisma.page.findUnique({ where: { slug: "contact" } });
  const content = (page?.content as any) || {};
  const hero = content.hero || {};

  const settings = await prisma.companySettings.findMany();
  const getSetting = (key: string) => settings.find(s => s.key === key)?.value || "";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#02066F]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#02066F]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-[#02066F] mb-6 animate-fade-in">
              {hero.title || <>Let's Work <span className="text-[#02066F]">Together</span></>}
            </h1>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {hero.subtitle || "Get in touch with WebDesino for a free consultation. We're here to help your business grow online."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="glass-strong rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-[#02066F] mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <a 
                    href={`tel:${getSetting('phone').replace(/\s/g, '')}`}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#02066F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#02066F] group-hover:text-white transition-all">
                      <Phone size={24} className="text-[#02066F] group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">{getSetting('phone')}</p>
                    </div>
                  </a>

                  <a 
                    href={`mailto:${getSetting('email')}`}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#02066F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#02066F] group-hover:text-white transition-all">
                      <Mail size={24} className="text-[#02066F] group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">{getSetting('email')}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-[#02066F]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-[#02066F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Office Address</h3>
                      <p className="text-gray-600">
                        {getSetting('address')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-strong rounded-3xl p-8">
                <h3 className="text-xl font-bold text-[#02066F] mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">{getSetting('businessHours_weekdays')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold">{getSetting('businessHours_saturday')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">{getSetting('businessHours_sunday')}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  * Emergency support available 24/7 for existing clients
                </p>
              </div>

              <div className="glass-strong rounded-3xl p-8 bg-[#02066F] text-white">
                <h3 className="text-xl font-bold mb-3">Quick Response Guarantee</h3>
                <p className="opacity-90">
                  We respond to all inquiries within 24 hours on business days. For urgent matters, call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#02066F] mb-12">
            Visit Our Office
          </h2>
          <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-lg border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d437.42263208577924!2d77.078731!3d28.708156!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d07a48393eb81%3A0x1ad6b22a2676a6e9!2sRohit%20Tiwari%20-%20Web%20Developer%20and%20designer!5e0!3m2!1sen!2sus!4v1763955823882!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#02066F] mb-12">
              Our Service Locations
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Uttam Nagar", link: "https://share.google/7bfsoSDMcdKosq9H4" },
                { name: "Kamla Nagar", link: "https://share.google/HamoWu7AFPzS3TEoh" },
                { name: "Krishan Vihar", link: "https://share.google/1oqOSK2n3UvhKbHu5" },
                { name: "Karol Bagh", link: "https://www.google.com/maps/place/Karol+Bagh,+Delhi" },
                { name: "Hauz Khas", link: "https://share.google/c7gS6rqXBDvqMimZ8" },
                { name: "DLF Camellias", link: "https://share.google/OEllDuOFBQkSiWfF6" },
              ].map((location, idx) => (
                <Link
                  key={idx}
                  href={location.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl glass hover:glass-strong transition-all duration-300 hover-lift text-center"
                >
                  <MapPin className="mx-auto mb-3 text-[#02066F]" size={32} />
                  <h3 className="font-bold text-[#02066F] text-lg">{location.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">View on Google Maps →</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
