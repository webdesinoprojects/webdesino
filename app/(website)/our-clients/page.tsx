import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStorageUrl } from "@/lib/utils";

export const metadata = {
  title: "Our Clients | WebDesino - Trusted by Innovative Companies",
  description: "See the amazing websites we've built for our valued clients across various industries including Real Estate, E-commerce, Healthcare, and more.",
  alternates: {
    canonical: "/our-clients",
  },
};

export default async function OurClientsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCategory = searchParams.category;

  // Define which data categories to show based on the selected dropdown category
  let categoriesToShow: string[] = [];
  let content = {
    title: selectedCategory || "Our Clients",
    description: "Trusted by innovative companies worldwide. Here’s a showcase of the amazing projects we've delivered.",
    features: [] as string[],
    subSection: null as { title: string; description: string } | null,
    extraSections: [] as { title: string; text: string }[],
    whyChooseUs: [] as { title: string; text: string }[]
  };

  if (!selectedCategory || selectedCategory === "Our Websites") {
    categoriesToShow = ["Our Clients", "Querky", "Shopify Websites"];
  } else if (selectedCategory === "Our Apps") {
    categoriesToShow = ["Our Apps"];
    content = {
      title: "Our Premium Apps",
      description: "Explore our suite of beautifully crafted mobile apps, available on both the Apple App Store and Google Play Store.",
      features: [],
      subSection: null,
      extraSections: [],
      whyChooseUs: []
    };
  } else if (selectedCategory === "Digital Marketing") {
    categoriesToShow = ["Digital Marketing"];
    content = {
      title: "DIGITAL MARKETING RESULTS",
      description: "Real Campaign Performance - See What We Deliver For Our Clients",
      features: [
        "Data-driven Ad Campaigns, Impressive ROI Delivered.",
        "Consistent Performance Across Multiple Niches & Budgets.",
        "High Click-Through Rates, Maximum Reach For Your Brand.",
        "Premium Ad Strategy, Optimized For Conversions.",
        "Full Transparency—Every Metric Visible To You.",
        "End-to-End Campaigns, Proven Growth For Your Business."
      ],
      subSection: {
        title: "SMM PORTFOLIO",
        description: "See Our Social Media Campaigns & Instagram Success Stories"
      },
      extraSections: [],
      whyChooseUs: []
    };
  } else if (selectedCategory === "Graphic Designing") {
    categoriesToShow = ["Graphic Designing"];
    content = {
      title: "VIDEO & POST EDITING SHOWCASE",
      description: "Transforming raw footage and creative ideas into stunning social media content, brand reels, and viral posts. Explore our editing skills, live client samples, and creative workflows!",
      features: [],
      subSection: null,
      extraSections: [
        {
          title: "Editing Services & Reel Creation",
          text: "Premium video edits, social post creation, motion graphics, ad creatives, and unique brand visuals—all tailored to your digital presence."
        },
        {
          title: "Live Portfolio Drive",
          text: "Watch our best delivered projects, final videos, and post-edit samples directly in our Google Drive portfolio—proving real quality, real results."
        }
      ],
      whyChooseUs: [
        { title: "Fast Turnaround", text: "Quick edits & on-time delivery, even for urgent campaigns and last-minute reels." },
        { title: "100% Custom Content", text: "No templates here. Every edit and post is unique and made just for your brand." },
        { title: "Premium Quality", text: "Top-tier edits, HD exports, and creative ideas that get you noticed." },
        { title: "Personal Support", text: "Direct communication with your editor. We listen and adapt to every request." }
      ]
    };
  }

  const clients = await prisma.client.findMany({
    where: {
      category: {
        in: categoriesToShow
      }
    }
  });

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#111184] text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#111184]/10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in uppercase">
            {content.title}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto animate-slide-up mb-8">
            {content.description}
          </p>
          
          {/* Features for Digital Marketing */}
          {content.features.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left mt-12">
              {content.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="w-2 h-2 bg-white rounded-full mt-2.5 flex-shrink-0"></div>
                  <p className="text-white/80">{feature}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Extra Sections for Graphic Designing */}
      {content.extraSections.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {content.extraSections.map((section, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{section.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clients Grid */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        
        {/* Special Layout for Digital Marketing */}
        {selectedCategory === "Digital Marketing" ? (
          <>
            {/* Ads Results Section */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-wider">Google Ads Results</h2>
                <p className="text-slate-600 mt-2">Proven ROI and Campaign Performance</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {clients.filter(c => c.category === "Digital Marketing" && c.name.includes("Google Ads")).map((client, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                    <div className="relative aspect-[16/9] min-h-[220px] bg-slate-100">
                      <Image
                        src={getStorageUrl(client.image)}
                        alt={client.name}
                        fill
                        className="object-contain"
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SMM Portfolio Section */}
            {content.subSection && (
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 uppercase">{content.subSection.title}</h2>
                <p className="text-xl text-slate-600">{content.subSection.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {clients.filter(c => c.category === "Digital Marketing" && !c.name.includes("Google Ads")).map((client, idx) => (
                <a
                  key={idx}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-center p-6 text-center"
                >
                  <div className="w-16 h-16 mb-4 relative">
                    <Image
                      src={getStorageUrl(client.image)}
                      alt="Instagram"
                      fill
                      className="object-contain"
                      loading="lazy"
                      decoding="async"
                      sizes="64px"
                    />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-[#111184] transition-colors">
                    {client.name.replace(" Instagram", "")}
                  </h3>
                  <span className="text-sm text-[#111184] mt-2 font-medium">View Profile</span>
                </a>
              ))}
            </div>
          </>
        ) : (
          /* Default Layout for other categories */
          categoriesToShow.length > 0 ? (
            categoriesToShow.map((category) => {
              const categoryClients = clients.filter((c) => c.category === category);
              if (categoryClients.length === 0) return null;

              return (
                <section key={category} className="mb-20 last:mb-0">
                  {/* Only show category header if we are showing multiple categories (Websites) */}
                  {categoriesToShow.length > 1 && (
                    <div className="flex items-center gap-4 mb-12">
                      <div className="h-px flex-1 bg-slate-200"></div>
                      <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-wider">
                        {category}
                      </h2>
                      <div className="h-px flex-1 bg-slate-200"></div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryClients.map((client, idx) => (
                      <div
                        key={idx}
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col md:min-h-[360px]"
                      >
                            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 md:min-h-[220px]">
                          <Image
                            src={getStorageUrl(client.image)}
                            alt={`${client.name} Screenshot`}
                            fill
                            className="object-contain object-top group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            decoding="async"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          />
                          <div className="absolute inset-0 bg-[#111184]/0 group-hover:bg-[#111184]/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <a
                              href={client.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white text-[#111184] px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 hover:bg-white/90"
                            >
                              View Project
                              <ArrowRight size={18} />
                            </a>
                          </div>
                        </div>
                        <div className="p-6 flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#111184] transition-colors">
                            {client.name}
                          </h3>
                          <a
                            href={client.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-slate-500 hover:text-[#111184] transition-colors truncate block"
                          >
                            {client.url}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Coming Soon</h3>
              <p className="text-slate-600">
                We are currently updating our portfolio for {selectedCategory}. Please check back later!
              </p>
            </div>
          )
        )}
      </div>

      {/* Why Choose Us for Graphic Designing */}
      {content.whyChooseUs.length > 0 && (
        <section className="bg-[#111184] text-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 uppercase">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.whyChooseUs.map((item, idx) => (
                <div key={idx} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
