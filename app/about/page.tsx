import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Target, TrendingUp, ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import WhyChooseUs from "@/components/WhyChooseUs";
import IndustriesSection from "@/components/IndustriesSection";

const teamMembers = [
  { name: "Rohit Tiwari", role: "Founder & CEO", image: "/rohittiwari.png" },
  { name: "Vishnu Sharma", role: "Co-Founder", image: "/vishnusharma.png" },
  { name: "Akash Tiwari", role: "Digital Marketer", image: "/akashtiwari.png" },
  { name: "Rajeev Ranjan", role: "Web Developer", image: "/rajeevranjan.png" },
  { name: "Ankit Tiwari", role: "Digital Marketer", image: "/ankittiwari.png" },
  { name: "Shubham", role: "Management", image: "/shubham.png" },
];

const certifications = [
  { name: "Google", image: "/google.jpg" },
  { name: "WordPress", image: "/wordpress.jpg" },
  { name: "Shopify", image: "/shopify.jpg" },
  { name: "SEMRush", image: "/semrush.png" },
  { name: "DesignRush", image: "/designrush.jpg" },
];

export const metadata: Metadata = {
  title: "About Us - Web Development Company in Delhi NCR | Webdesino",
  description: "Learn about Webdesino - A leading web development and digital marketing company in Delhi NCR. 50+ happy clients, 100+ projects delivered, and proven results.",
};

const stats = [
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: Target, value: "100+", label: "Projects Completed" },
  { icon: TrendingUp, value: "₹6.3 Cr+", label: "Sales Generated" },
  { icon: Award, value: "10+", label: "Certifications" },
];

const whyChooseUsFeatures = [
  { number: "01", title: "Proven Results", description: "Trusted by businesses across Delhi NCR with measurable growth in traffic, leads, and sales." },
  { number: "02", title: "Timely Delivery", description: "We respect deadlines and deliver fully tested, functional websites on time, every time." },
  { number: "03", title: "Award Winning", description: "Recognized for professional work and high-quality digital solutions that set industry benchmarks." },
  { number: "04", title: "Highest Rankings", description: "Our SEO-first approach ensures your business ranks on top of Google searches in Delhi NCR." },
  { number: "05", title: "SEO-Optimized", description: "Every site we build is mobile-friendly, fast-loading, and built to perform on Google search." },
  { number: "06", title: "24/7 Support", description: "Our dedicated team is available round the clock for maintenance, updates, and assistance." },
];

const serviceAreas = [
  "Uttam Nagar", "Kamla Nagar", "Krishan Vihar", "Karol Bagh", 
  "Hauz Khas", "DLF Camellias", "Dwarka", "Janakpuri", 
  "Rajouri Garden", "Govindpuri", "Kalkaji", "Civil Lines"
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
              About <span className="text-blue-500">Webdesino</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed animate-slide-up">
              Building Your Online Presence. Find a team of Web Developers you can rely on. Every day, we build trust through communication, transparency, and results.
            </p>
            
            <div className="relative w-full aspect-[4/1] mt-12 rounded-xl overflow-hidden shadow-2xl animate-fade-in border border-slate-700">
              <Image
                src="/rohittiwaribanner.png"
                alt="Rohit Tiwari Web Developer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h6 className="text-blue-600 font-bold tracking-wider uppercase mb-2">Our Team</h6>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Meet The Team</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Find a team of Web Developers you can rely on. Every day, we build trust through communication, transparency, and results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="aspect-[4/5] relative bg-slate-200 overflow-hidden">
                   <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Block 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
             <div className="lg:w-1/2">
                <h6 className="text-blue-600 font-bold uppercase mb-2">Our Story</h6>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">We Are The Best Web Development Agency</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                   Our team combines cutting-edge technology with creative expertise to deliver custom web solutions that drive results. We turn your vision into a powerful online presence, ensuring your business stands out in the digital landscape.
                </p>
             </div>
             <div className="lg:w-1/2 flex justify-center">
                <div className="w-full max-w-md aspect-video bg-blue-50 rounded-2xl flex items-center justify-center">
                   <TrendingUp size={64} className="text-blue-200" />
                </div>
             </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20">
             <div className="lg:w-1/2">
                <h6 className="text-blue-600 font-bold uppercase mb-2">Who We Are</h6>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">The Leading WEB DEVELOPMENT Company In INDIA</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                   Delivering innovative and tailored web solutions, we specialize in creating dynamic, responsive websites that elevate your brand and drive success in the digital world. Trust us to bring your vision to life with cutting-edge technology and unmatched expertise.
                </p>
             </div>
             <div className="lg:w-1/2 flex justify-center">
                <div className="w-full max-w-md aspect-video bg-blue-50 rounded-2xl flex items-center justify-center">
                   <Target size={64} className="text-blue-200" />
                </div>
             </div>
          </div>

          {/* Block 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
             <div className="lg:w-1/2">
                <h6 className="text-blue-600 font-bold uppercase mb-2">What We Do</h6>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">We Help You To 10X Your Business</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                   Elevate your business to new heights with our cutting-edge web development solutions. We specialize in crafting high-performing websites and digital strategies that multiply your growth, ensuring your online presence is not just a website, but a powerful tool for success.
                </p>
             </div>
             <div className="lg:w-1/2 flex justify-center">
                <div className="w-full max-w-md aspect-video bg-blue-50 rounded-2xl flex items-center justify-center">
                   <Award size={64} className="text-blue-200" />
                </div>
             </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</h3>
                  <p className="text-slate-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs features={whyChooseUsFeatures} />

      {/* Industries We Serve */}
      <IndustriesSection />

      {/* Certifications Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted & Certified</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Recognized by global leaders like Google, WordPress, Shopify, SEMRush, and DesignRush for professional work and high-quality digital solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {certifications.map((cert, idx) => (
              <div key={idx} className="relative h-16 w-32 lg:h-20 lg:w-40 bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-all duration-300">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Service Areas Across Delhi NCR</h2>
            <p className="text-lg text-slate-600 mb-12">
              We proudly serve businesses in key locations across Delhi NCR, helping them grow with SEO, websites, and digital marketing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {serviceAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-50 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  <MapPin size={18} className="text-blue-500" />
                  <span className="font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Online Presence?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 50+ happy clients who have scaled their business with WebDesino.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors"
          >
            Get Started Today
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
