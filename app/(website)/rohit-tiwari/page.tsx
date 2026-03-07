import Image from "next/image";
import Link from "next/link";
import { Linkedin, Globe, Mail, Award, Code, Rocket, Target, CheckCircle2, ArrowRight } from "lucide-react";
import { BASE_URL } from "@/lib/seo";
import prisma from "@/lib/prisma";
import { getStorageUrl } from "@/lib/utils";

const Rohit = getStorageUrl("/rohittiwari2.jpeg");

export const metadata = {
  title: "Rohit Tiwari | Founder & CEO of WebDesino | Top Web Developer in Delhi",
  description: "Meet Rohit Tiwari, the visionary founder of WebDesino. With 5+ years of experience, Rohit helps businesses in Delhi NCR grow with cutting-edge web development and SEO strategies.",
  openGraph: {
    title: "Rohit Tiwari | Founder & CEO of WebDesino",
    description: "Meet Rohit Tiwari, the visionary founder of WebDesino. Expert Web Developer and Digital Strategist.",
    url: `${BASE_URL}/rohit-tiwari`,
    images: [
      {
        url: Rohit,
        width: 800,
        height: 800,
        alt: "Rohit Tiwari - Founder WebDesino",
      },
    ],
  },
};

export default async function FounderPage() {
  const page = await prisma.page.findUnique({
    where: { slug: 'rohit-tiwari' },
  });

  const content = (page?.content as any) || {};

  // Helper to get icon component
  const getIcon = (name: string) => {
    switch(name) {
      case 'Code': return Code;
      case 'Target': return Target;
      case 'Rocket': return Rocket;
      default: return Code;
    }
  };

  // Fallback data (Hardcoded original content)
  const hero = content.hero || {
    title: "Hi, I'm Rohit Tiwari",
    description: "My name is Rohit Tiwari, and I am a professional Web Developer and Digital Marketing Specialist dedicated to building high-performing online identities for businesses, startups, and brands. Over the years, I have gained extensive experience in WordPress, Shopify, custom-coded web development, SEO, social media marketing, Google Ads, Meta Ads, and brand communication. My focus is to combine technical precision with strategic marketing to create websites and digital assets that deliver measurable business growth.",
    image: "/rohit-tiwari.png",
    stats: [
      { label: "Projects Delivered", value: "150+" },
      { label: "Years Experience", value: "5+" }
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/irohittiwari/",
      contact: "/contact"
    }
  };

  const professionalApproach = content.professionalApproach || {
    title: "My Professional Approach",
    description: "I believe that a website is not only a digital representation of a business, but also a powerful tool to generate leads, improve sales, and build trust. I prioritise:",
    points: [
      "Return on investment and business results",
      "Clean and modern design with strong functionality",
      "Transparent communication and a client-first approach",
      "On-time delivery with uncompromised quality",
      "Long-term support for continuous growth"
    ]
  };

  const expertise = content.expertise || {
    title: "My Expertise",
    items: [
      {
        title: "Full-Stack Development",
        desc: "Expertise in Next.js, React, Node.js, and modern web technologies to build scalable applications.",
        icon: "Code"
      },
      {
        title: "SEO Strategy",
        desc: "Deep understanding of search engine algorithms to help businesses rank #1 on Google.",
        icon: "Target"
      },
      {
        title: "Digital Growth",
        desc: "Holistic approach to digital marketing, focusing on conversion rate optimization and ROI.",
        icon: "Rocket"
      }
    ]
  };

  const achievements = content.achievements || {
    title: "Achievements and Experience",
    points: [
      "Successfully delivered more than 150 website development projects across various industries",
      "Worked with clients across India and international markets",
      "Trusted by startups, SMEs, agencies, and high-net-worth professionals",
      "Expertise in complete digital growth solutions, from branding to marketing execution"
    ]
  };

  const vision = content.vision || {
    title: "Vision",
    description: "My objective is to help businesses build a strong digital presence that enhances credibility, supports long-term scalability, and creates real business opportunities. I believe in partnerships, not transactions, and I strive to add value beyond just development and marketing services."
  };

  const cta = content.cta || {
    title: "Let's Build Something Amazing Together",
    description: "Whether you have a specific project in mind or just want to discuss your digital strategy, I'm always open to a conversation.",
    buttons: [
      { label: "Start a Project", link: "/contact", primary: true },
      { label: "Follow on LinkedIn", link: "https://www.linkedin.com/in/irohittiwari/", primary: false }
    ]
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-slate-50 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#111184]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#111184]/20 rounded-full blur-3xl animate-float" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image Column */}
            <div className="w-full lg:w-1/3 order-2 lg:order-1">
              <div className="relative group mx-auto max-w-md lg:max-w-none">
                <div className="absolute inset-0 bg-[#111184] rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative rounded-3xl overflow-hidden border-2 border-gray-800 group-hover:border-white transition-colors duration-300 aspect-[4/5]">
                  <Image
                    src={Rohit}
                    alt="Rohit Tiwari - Founder & CEO"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain transform group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* Floating Stats */}
                {hero.stats && hero.stats.length > 0 && (
                  <>
                    <div className="absolute -right-6 top-10 bg-white p-4 rounded-xl shadow-xl hidden md:block animate-float" style={{ animationDelay: '1s' }}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg text-[#111184]">
                          <Rocket size={24} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 font-medium">{hero.stats[0].label}</div>
                          <div className="text-xl font-bold text-gray-900">{hero.stats[0].value}</div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -left-6 bottom-20 bg-white p-4 rounded-xl shadow-xl hidden md:block animate-float" style={{ animationDelay: '2s' }}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg text-[#111184]">
                          <Award size={24} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 font-medium">{hero.stats[1].label}</div>
                          <div className="text-xl font-bold text-gray-900">{hero.stats[1].value}</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Content Column */}
            <div className="w-full lg:w-2/3 order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[#111184] font-medium text-sm mb-6 border border-[#111184]/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#111184]"></span>
                </span>
                Founder & CEO
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                {hero.title.includes("Rohit Tiwari") ? (
                  <>Hi, I'm <span className="text-[#111184]">Rohit Tiwari</span></>
                ) : (
                  hero.title
                )}
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {hero.description}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  href={hero.socials.linkedin}
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all hover:-translate-y-1"
                >
                  <Linkedin size={20} />
                  Connect on LinkedIn
                </Link>
                <Link
                  href={hero.socials.contact}
                  className="flex items-center gap-2 px-6 py-3 bg-[#111184] text-white border border-[#111184] rounded-full font-semibold hover:bg-[#111184]/90 transition-all hover:-translate-y-1"
                >
                  <Mail size={20} />
                  Work With Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* My Professional Approach */}
            <div>
              <h2 className="text-3xl font-bold text-[#111184] mb-6">{professionalApproach.title}</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {professionalApproach.description}
              </p>
              <ul className="space-y-4">
                {professionalApproach.points.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="text-[#111184] mt-1 flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expertise Grid */}
            <div>
              <div className=" mb-6">
                <h2 className="text-3xl font-bold text-[#111184] mb-3">{expertise.title}</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {expertise.items.map((item: any, idx: number) => {
                  const IconComponent = getIcon(item.icon);
                  return (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100">
                      <div className="w-12 h-12 bg-gray-100 text-[#111184] rounded-xl flex items-center justify-center mb-6">
                        <IconComponent size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements and Experience */}
            <div>
              <h2 className="text-3xl font-bold text-[#111184] mb-6">{achievements.title}</h2>
              <ul className="space-y-4">
                {achievements.points.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <Award className="text-[#111184] mt-1 flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div>
              <h2 className="text-3xl font-bold text-[#111184] mb-6">{vision.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {vision.description}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20 bg-slate-50 text-[#111184] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8">{cta.title}</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            {cta.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {cta.buttons.map((btn: any, idx: number) => (
              <Link
                key={idx}
                href={btn.link}
                target={btn.link.startsWith('http') ? "_blank" : undefined}
                className={`px-8 py-4 rounded-full font-bold transition-all ${
                  btn.primary 
                    ? "bg-white text-[#111184] hover:bg-gray-50 shadow-lg" 
                    : "bg-[#111184] text-white border border-white hover:bg-black"
                }`}
              >
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
