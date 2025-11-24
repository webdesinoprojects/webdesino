import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Get Free Consultation | Webdesino",
  description: "Contact Webdesino for web development, SEO, and digital marketing services in Delhi NCR. Call +91 93108 51557 or email info@webdesino.com for a free consultation.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cream via-white to-cream py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-teal mb-6 animate-fade-in">
              Let's Work <span className="gradient-text">Together</span>
            </h1>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Get in touch with WebDesino for a free consultation. We're here to help your business grow online.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-strong rounded-3xl p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-teal mb-6">Send Us a Message</h2>
              <form 
                action="https://webdesino.com/contact-form-submit" 
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange/50 transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange/50 transition-all"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="seo">SEO Services</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="content-writing">Content Writing</option>
                    <option value="ecommerce">E-commerce Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange/50 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-orange text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover-lift flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send size={20} />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="glass-strong rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-teal mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <a 
                    href="tel:+919310851557"
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange group-hover:text-white transition-all">
                      <Phone size={24} className="text-orange group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">+91 93108 51557</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:info@webdesino.com"
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-teal group-hover:text-white transition-all">
                      <Mail size={24} className="text-teal group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">info@webdesino.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-orange" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Office Address</h3>
                      <p className="text-gray-600">
                        M, 54/H, Block Z, Krishan Vihar,<br />
                        New Delhi, Delhi, 110086
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-strong rounded-3xl p-8">
                <h3 className="text-xl font-bold text-teal mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  * Emergency support available 24/7 for existing clients
                </p>
              </div>

              <div className="glass-strong rounded-3xl p-8 bg-gradient-to-br from-teal to-teal/90 text-white">
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
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-teal mb-12">
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
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-teal mb-12">
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
                  <MapPin className="mx-auto mb-3 text-orange" size={32} />
                  <h3 className="font-bold text-teal text-lg">{location.name}</h3>
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
