import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";
import Link from "next/link";
import {
    Megaphone, CheckCircle2,
    BarChart3, Users, Clock, Globe, Phone, Mail,
    Zap
} from "lucide-react";
import { generateLocalBusinessSchema } from "@/lib/seo";
import FAQ from "@/components/FAQ";
import { getStorageUrl, replaceLocationPlaceholder } from "@/lib/utils";

interface PageProps {
    params: {
        slug: string;
    };
}

// Allow static generation with fallback for missing pages
export const dynamicParams = true; // Allow dynamic params not in generateStaticParams

export async function generateStaticParams() {
    try {
        const locations = await prisma.locationPage.findMany({
            select: { slug: true },
        });

        const reservedRoutes = [
            "about", "blog", "case-studies", "contact", "our-clients", 
            "portfolio", "pricing", "privacy-policy", "refund-policy", 
            "rohit-tiwari", "search", "services", "terms-conditions", 
            "testimonials"
        ];

        return locations
            .filter((loc) => loc.slug && loc.slug !== "index" && loc.slug !== "" && !reservedRoutes.includes(loc.slug))
            .map((loc) => ({
                slug: loc.slug,
            }));
    } catch (error) {
        console.error("Error generating static params for location pages:", error);
        // Return empty array to prevent build failure, pages will be generated on-demand
        return [];
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const page = await prisma.locationPage.findUnique({
            where: { slug: params.slug },
        });

        if (!page) return { title: "Page Not Found" };

        return {
            title: page.title,
            description: page.description || `Best Web Development Services in ${page.location}`,
        };
    } catch (error) {
        console.error("Error generating metadata for location page:", error);
        return { title: "Page Not Found" };
    }
}

export default async function LocationPage({ params }: PageProps) {
    let page;
    try {
        page = await prisma.locationPage.findUnique({
            where: { slug: params.slug },
        });
    } catch (error) {
        console.error("Error fetching location page:", error);
        notFound();
    }

    if (!page) {
        notFound();
    }

    const locationName = page.location;
    const jsonLd = generateLocalBusinessSchema(locationName, params.slug);

    let processedFaqs: Array<{
        id: string;
        question: string;
        answer: string;
        category: string;
        order: number;
    }> = [];
    try {
        const faqsData = await prisma.faq.findMany({
            where: {
                category: { in: ["Location", "General"] }
            },
            orderBy: { order: 'asc' }
        });

        processedFaqs = faqsData.map(faq => ({
            ...faq,
            question: replaceLocationPlaceholder(faq.question, locationName),
            answer: replaceLocationPlaceholder(faq.answer, locationName)
        }));
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        // Continue with empty FAQs array
    }

    // Fetch other locations for the footer grid
    let otherLocations: Array<{
        title: string;
        slug: string;
        location: string;
    }> = [];
    try {
        otherLocations = await prisma.locationPage.findMany({
            take: 20,
            select: { title: true, slug: true, location: true },
            where: { slug: { not: params.slug } }
        });
    } catch (error) {
        console.error("Error fetching other locations:", error);
        // Continue with empty array
    }

    const content = (page.content as any) || {};

    const story = {
        content: content.story?.content || [
            `In today's digital landscape, your customers are actively engaged online, whether they are exploring the vibrant market in ${locationName}. A professionally crafted website does more than just provide information; it serves as a powerful tool for your business.`,
            "A captivating website design establishes trust with potential clients, featuring a sleek, modern aesthetic that reflects your brand's values. It effectively generates leads by incorporating clear and compelling calls to action that guide visitors towards taking the next step. Additionally, a well-structured website opens up a realm of new marketing opportunities, allowing you to connect through various channels such as social media, Google Ads, and email marketing.",
            `Whether you run a charming boutique, a dynamic coaching center, a caring clinic, or a home-based service, a local website tailored for the ${locationName} audience will enable you to differentiate yourself from your competitors and attract the clientele you desire.`
        ],
        image: getStorageUrl(content.story?.image || "/location-story.png")
    };

    const services = (content.services || [
        {
            title: "Website Design & Development",
            items: [
                "Mobile-responsive layouts using WordPress, custom HTML/CSS, and popular CMS platforms",
                "SEO-structured, fast-loading code for better rankings and user experience",
                "Custom templates designed for clinics, shops, real estate agents, and startups",
                "Before/After design comparisons to showcase how we transform your online presence"
            ],
            image: "/location-service-1.png"
        },
        {
            title: "SEO & Google My Business Optimization",
            items: [
                `On-page SEO targeting high-value keywords like "web designer ${locationName}" and "SEO service in West Delhi"`,
                "Google My Business setup with accurate categories, operating hours, photos, and keyword-rich descriptions",
                "Citation building and weekly posts to maintain high visibility in local searches"
            ],
            image: "/location-service-2.png"
        },
        {
            title: "Local Targeting & Fast Support",
            items: [
                `In-person consultations in ${locationName}, Janakpuri, Tilak Nagar, Uttam Nagar, and Hari Nagar`,
                "Quick call/WhatsApp support for urgent changes or troubleshooting",
                "A dedicated local account manager who understands the West Delhi business ecosystem"
            ],
            image: "/location-service-3.png"
        }
    ]).map((s: any) => ({
        ...s,
        image: getStorageUrl(s.image)
    }));

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* 1. Hero Section */}
            <section className="relative bg-[#111184] text-white py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${getStorageUrl('/grid-pattern.svg')})` }}></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/20 to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className={`flex flex-col lg:flex-row items-center gap-12 ${!content.hero?.image ? 'justify-center' : ''}`}>
                        <div className={`w-full ${content.hero?.image ? 'lg:w-1/2 text-left' : 'max-w-4xl mx-auto text-center'}`}>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                {page.title}
                            </h1>
                            <p className="text-xl text-gray-200 mb-8">
                                {content.hero?.subtitle || `Are you searching for a reliable website designer in ${locationName}? At WebDesino, we help local businesses create modern, fast, and SEO-friendly websites that generate genuine leads and rank well on Google.`}
                            </p>
                            <div className={`flex flex-col sm:flex-row gap-4 ${content.hero?.image ? 'justify-start' : 'justify-center'}`}>
                                <Link href={content.hero?.ctaLink || "#contact"} className="px-8 py-4 bg-white text-[#111184] rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
                                    {content.hero?.ctaText || "Get a Free Quote"}
                                </Link>
                                <Link href={content.hero?.secondaryCtaLink || "tel:+919310851557"} className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
                                    {content.hero?.secondaryCtaText || "Call Us Now"}
                                </Link>
                            </div>
                        </div>
                        {content.hero?.image && (
                            <div className="w-full lg:w-1/2 flex justify-center">
                                <img 
                                    src={getStorageUrl(content.hero.image)} 
                                    alt={page.title} 
                                    className="w-full max-w-lg h-auto object-contain rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 2. Story / Intro Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <span className="text-[#111184] font-bold tracking-wider text-sm uppercase mb-2 block">OUR STORY</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                                {content.story?.title || `Why Your ${locationName} Business Needs a Website Today`}
                            </h2>
                            <div className="prose prose-lg text-slate-600">
                                {story.content?.map((paragraph: string, index: number) => (
                                    <p key={index} className="mb-4">{paragraph}</p>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative">
                                {/* Placeholder for illustration */}
                                <div className="bg-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                                    <img src={story.image} className="w-full h-auto object-contain" alt="Web Development" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Leading Company Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-[#111184] font-bold tracking-wider text-sm uppercase mb-2 block">WHO ARE WE</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 max-w-3xl mx-auto">
                        {content.leadingCompany?.title || `The Leading Web Development Company in ${locationName}`}
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        {content.leadingCompany?.content || (
                            <>
                                Located in the heart of West Delhi, WebDesino is known for delivering high-converting websites for small businesses and startups. We're the go-to <strong>web developer in {locationName}</strong> for WordPress, Shopify, and custom-built platforms.
                            </>
                        )}
                    </p>
                </div>
            </section>

            {/* 4. Services Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#111184] font-bold tracking-wider text-sm uppercase mb-2 block">WHAT WE DO</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Our Service in {locationName}</h2>
                    </div>

                    <div className="space-y-20">
                        {services.map((service: any, index: number) => (
                            <div key={index} className="flex flex-col md:flex-row items-center gap-12">
                                {index % 2 === 0 ? (
                                    <>
                                        <div className="md:w-1/2 order-2 md:order-1">
                                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                                            <ul className="space-y-3 text-slate-600">
                                                {service.items?.map((item: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <CheckCircle2 className="text-[#111184] mt-1 flex-shrink-0" size={20} />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="md:w-1/2 order-1 md:order-2 flex justify-center">
                                            <div className="bg-blue-50 p-8 rounded-2xl w-full max-w-md flex items-center justify-center">
                                                <div className="bg-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                                                    <img src={service.image} className="w-full h-auto object-contain" alt={service.title} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="md:w-1/2 flex justify-center">
                                            <div className="bg-blue-50 p-8 rounded-2xl w-full max-w-md flex items-center justify-center">
                                                <div className="bg-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                                                    <img src={service.image} className="w-full h-auto object-contain" alt={service.title} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:w-1/2">
                                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                                            <ul className="space-y-3 text-slate-600">
                                                {service.items?.map((item: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <CheckCircle2 className="text-[#111184] mt-1 flex-shrink-0" size={20} />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Contact Form Section */}
            <section id="contact" className="py-16 lg:py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Build a Stunning Website in {locationName}?</h2>
                        <p className="text-slate-600">Fill out this form and get a free consultation with the top web development agency in {locationName}.</p>
                    </div>
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-1/2 bg-[#111184] p-8 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${getStorageUrl('/grid-pattern.svg')})` }}></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                                <p className="mb-8 text-blue-100">
                                    We are here to help you grow your business online. Reach out to us for a free quote or consultation.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Phone className="text-yellow-400" size={20} />
                                        <span>+91 93108 51557</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="text-yellow-400" size={20} />
                                        <span>info@webdesino.com</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-yellow-400" size={20} />
                                        <span>www.webdesino.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 p-4">
                            <ContactForm locationName={locationName} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Why Choose Us (Stats) */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl lg:text-5xl font-bold text-center text-[#111184] mb-16">Why Choose WebDesino?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Globe, title: "800+ Websites Delivered", desc: "Powering brands across India with 800+ custom WordPress & eCommerce sites. 90% built on Elementor & Divi for stunning, high-performance results." },
                            { icon: BarChart3, title: "₹1 Crore+ in Meta Ad Spend", desc: "Managed ₹1 Crore+ in high-ROI Meta campaigns—driving 15,000+ conversions with an average CPA below ₹600, and robust WhatsApp automation." },
                            { icon: Zap, title: "₹70 Lakhs in Organic Revenue", desc: "Advanced SEO & GMB strategies that generated ₹70L+ in sales organically. Our clients outrank and outsell—no ad spend required." },
                            { icon: Megaphone, title: "8,000+ Blogs + 350M+ Impressions", desc: "8,000+ SEO blogs crafted by our team, delivering 350 million impressions and 27 million organic clicks from Google." },
                            { icon: Users, title: "98% Client Retention", desc: "WebDesino clients stay for years. Our 98% retention rate reflects a commitment to results, transparency, and real partnership." },
                            { icon: Clock, title: "Fastest Support in Industry", desc: "Most queries resolved in under 3 hours (guaranteed 24h max)—with a dedicated, real human support team for your peace of mind." }
                        ].map((stat, idx) => (
                            <div key={idx} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all bg-white">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg text-[#111184]">
                                        <stat.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">{stat.title}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">{stat.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Process Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#111184] mb-4">Our Proven Process</h2>
                        <p className="text-slate-600">A transparent workflow that delivers exceptional results every time</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Discovery Session", desc: "We dive deep to understand your business goals, target audience, and unique requirements." },
                            { step: "2", title: "Strategy & Planning", desc: "Crafting a detailed roadmap with milestones, timelines, and success metrics." },
                            { step: "3", title: "Design Phase", desc: "Creating stunning, user-centric designs that reflect your brand identity." },
                            { step: "4", title: "Development", desc: "Building your digital solution with clean, efficient code and modern technologies." },
                            { step: "5", title: "Testing & Refinement", desc: "Rigorous quality assurance across devices and user scenarios." },
                            { step: "6", title: "Launch & Support", desc: "Deploying your project and providing ongoing maintenance and optimization." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                                <div className="absolute top-0 right-0 bg-[#111184] text-white w-12 h-12 flex items-center justify-center rounded-bl-2xl font-bold text-lg">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 mt-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Why Local Business Choose Us */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <span className="text-[#111184] font-bold tracking-wider text-sm uppercase mb-2 block">OUR STORY</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                                Why {locationName} Businesses Choose WebDesino
                            </h2>
                            <p className="text-slate-600 mb-6">Our clients appreciate working with us because we deliver websites that:</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#111184] rounded-full mt-2.5"></div>
                                    <span className="text-slate-700">Convert visitors into paying customers through clear messaging and intuitive design</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#111184] rounded-full mt-2.5"></div>
                                    <span className="text-slate-700">Load quickly on all devices, improving bounce rates and SEO</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#111184] rounded-full mt-2.5"></div>
                                    <span className="text-slate-700">Align with local branding—we communicate in a way that resonates with your audience</span>
                                </li>
                            </ul>

                            <h3 className="font-bold text-slate-900 mb-4">How It Works: Our Simple 4-Step Process</h3>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li><strong>• Free Consultation (call or WhatsApp):</strong> We discuss your goals, budget, and timeline.</li>
                                <li><strong>• Demo & Revision:</strong> You review an initial design mockup, and we refine it until it's perfect.</li>
                                <li><strong>• Development & Testing:</strong> We build your site, optimize it for speed and mobile, and run SEO checks.</li>
                                <li><strong>• Launch & Grow:</strong> We go live, set up Google My Business, and, if you choose, provide ongoing SEO and maintenance.</li>
                            </ul>
                        </div>
                        <div className="lg:w-1/2 flex justify-center">
                            <div className="bg-green-50 p-8 rounded-full w-80 h-80 flex items-center justify-center relative">
                                <Globe size={100} className="text-green-600" />
                                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                                    <BarChart3 className="text-[#111184]" size={32} />
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                                    <Users className="text-[#111184]" size={32} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. Industries Served */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 flex justify-center order-2 lg:order-1">
                            <div className="bg-blue-50 p-8 rounded-2xl w-full max-w-md flex items-center justify-center">
                                <div className="bg-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                                    <img src={getStorageUrl("/location-service-3.png")} className="w-full h-auto object-contain" alt="Industries We Serve" />
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 order-1 lg:order-2">
                            <span className="text-[#111184] font-bold tracking-wider text-sm uppercase mb-2 block">WHO ARE WE</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                                Industries We Serve In {locationName}
                            </h2>
                            <p className="text-slate-600 mb-6">We've successfully assisted:</p>
                            <ul className="space-y-4">
                                {[
                                    "Coaching institutes with student inquiry forms and course showcases",
                                    "Boutiques and retail stores with catalog-style e-commerce setups",
                                    "Clinics and therapists with appointment booking and patient resources",
                                    "Real estate agencies with property galleries and lead capture forms",
                                    "Freelancers and artists with portfolio websites that showcase their creative work"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5"></div>
                                        <span className="text-slate-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-slate-600 text-sm">
                                No matter your sector, our local experience ensures your website resonates with {locationName} customers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. Local SEO */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <span className="text-[#111184] font-bold tracking-wider text-sm uppercase mb-2 block">OUR STORY</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                                How We Help You Rank Locally
                            </h2>
                            <p className="text-slate-600 mb-6">Beyond just setting up a Google My Business listing, we:</p>
                            <ul className="space-y-4">
                                {[
                                    `Integrate location keywords (e.g., "web developer ${locationName}") naturally into your content`,
                                    "Ensure consistent NAP (Name, Address, Phone) data across all directories",
                                    "Publish location-focused blogs to build topical authority",
                                    "Earn local backlinks from directories like JustDial, Sulekha, IndiaMART, and StartupTalky"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5"></div>
                                        <span className="text-slate-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-slate-600 text-sm">
                                This holistic approach increases your chances of appearing in Google's Local 3-Pack.
                            </p>
                        </div>
                        <div className="lg:w-1/2 sticky top-24">
                            <div className="bg-blue-50 p-8 rounded-2xl w-full max-w-md flex items-center justify-center">
                                <div className="bg-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                                    <img src={getStorageUrl("/location-service-2.png")} className="w-full h-auto object-contain" alt="Local SEO Strategies" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. Commitment */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-[#111184] font-bold tracking-wider text-sm uppercase mb-2 block">WHAT WE PROMISE</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                        WebDesino's Commitment To {locationName} Clients
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
                        We're more than just a marketplace; we're part of your community!
                    </p>
                    <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        We focus on building lasting partnerships and truly listening to your needs, adapting as your business evolves. Whether you're a local startup or an established clinic, we've proudly helped countless entrepreneurs in {locationName} expand their online presence and thrive. Let's grow together!
                    </p>
                </div>
            </section>

            {/* 12. Final CTA */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="lg:w-1/2">
                            <span className="text-[#111184] font-bold tracking-wider text-sm uppercase mb-2 block">OUR STORY</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                                Ready To Transform Your Online Presence?
                            </h2>
                            <p className="text-slate-600 mb-8">Contact WebDesino today for a free consultation!</p>
                            <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Globe size={16} className="text-[#111184]" />
                                    <a href="https://www.webdesino.com" className="hover:underline">www.webdesino.com</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-[#111184]" />
                                    <a href="mailto:info@webdesino.com" className="hover:underline">info@webdesino.com</a>
                                </div>
                            </div>
                            <p className="mt-6 text-xs text-slate-500 max-w-md">
                                Let's create a website that not only looks great but also drives real results for your {locationName} business.
                            </p>
                        </div>
                        <div className="lg:w-1/2 flex justify-center">
                            <div className="bg-blue-50 p-8 rounded-2xl w-full max-w-md flex items-center justify-center">
                                <div className="bg-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                                    <img src={getStorageUrl("/location-hero.png")} className="w-full h-auto object-contain" alt="Transform Your Online Presence" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 13. Let's Connect Card */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 lg:p-12 text-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Let's Connect</h2>
                        <p className="text-slate-600 mb-8 text-sm">
                            Email, call, or WhatsApp—we're here to help. Coffee on us if we meet in person! ☕
                        </p>
                        <Link href="#contact" className="inline-block bg-[#111184] text-white px-8 py-3 rounded-lg font-bold mb-10 hover:bg-blue-900 transition-colors">
                            Schedule a Free Consultation
                        </Link>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="p-4 border border-slate-100 rounded-xl">
                                <Mail className="text-[#111184] mb-3" size={24} />
                                <h3 className="font-bold text-slate-900 text-sm mb-1">Email Us</h3>
                                <p className="text-xs text-slate-500 mb-2">Have questions? Our team responds within 24 hours.</p>
                                <a href="mailto:info@webdesino.com" className="text-[#111184] font-bold text-sm">info@webdesino.com</a>
                            </div>
                            <div className="p-4 border border-slate-100 rounded-xl">
                                <Phone className="text-[#111184] mb-3" size={24} />
                                <h3 className="font-bold text-slate-900 text-sm mb-1">Call Us</h3>
                                <p className="text-xs text-slate-500 mb-2">Mon-Sun, 9AM-9PM IST. Talk directly with our experts.</p>
                                <a href="tel:+919310851557" className="text-[#111184] font-bold text-sm">+91 93108 51557</a>
                            </div>
                            <div className="p-4 border border-slate-100 rounded-xl">
                                <MessageCircleIcon className="text-[#111184] mb-3" size={24} />
                                <h3 className="font-bold text-slate-900 text-sm mb-1">WhatsApp</h3>
                                <p className="text-xs text-slate-500 mb-2">Instant replies for quick queries. Tap to chat!</p>
                                <a href="https://wa.me/919310851557" className="text-[#111184] font-bold text-sm">+91 93108 51557</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 14. FAQ Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* <div className="text-center mb-12">
                        <span className="text-[#111184] font-bold tracking-wider text-sm uppercase mb-2 block">FAQS</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Find a team of Web Designers you can rely on. Every day, we build trust through communication, transparency, and results.
                        </p>
                    </div> */}
                    {/* <div className="max-w-3xl mx-auto"> */}
                        <FAQ faqs={processedFaqs} location={locationName} />
                    </div>
                {/* </div> */}
            </section>

            {/* 15. People Also Search Us */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-red-500 mb-2">People also search us</h2>
                    <p className="text-center text-slate-600 text-sm mb-8">Frequently searched queries about our <span className="text-[#111184] font-bold">website design & development services in Delhi NCR.</span></p>

                    <div className="overflow-x-auto">
                        <table className="w-full max-w-4xl mx-auto bg-white border border-slate-200 text-sm">
                            <thead>
                                <tr className="bg-[#111184] text-white">
                                    <th className="p-3 text-left border-r border-blue-800">Website Design in Delhi</th>
                                    <th className="p-3 text-left border-r border-blue-800">Website Design in South Delhi</th>
                                    <th className="p-3 text-left border-r border-blue-800">Web Development in Delhi NCR</th>
                                    <th className="p-3 text-left">E-commerce Website Design</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                <tr className="border-b border-slate-100">
                                    <td className="p-3 border-r border-slate-100">Best website design company in Delhi</td>
                                    <td className="p-3 border-r border-slate-100">Website design company in Green Park</td>
                                    <td className="p-3 border-r border-slate-100">Top web development company Delhi NCR</td>
                                    <td className="p-3">Affordable e-commerce web design Delhi</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <td className="p-3 border-r border-slate-100">Professional website designer in Delhi</td>
                                    <td className="p-3 border-r border-slate-100">Website designer in Hauz Khas</td>
                                    <td className="p-3 border-r border-slate-100">Custom web development services NCR</td>
                                    <td className="p-3">Shopify website developer Delhi NCR</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <td className="p-3 border-r border-slate-100">WordPress developer Delhi</td>
                                    <td className="p-3 border-r border-slate-100">Freelance website designer South Delhi</td>
                                    <td className="p-3 border-r border-slate-100">Top 10 website developers Delhi NCR</td>
                                    <td className="p-3">WooCommerce website designer Delhi</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <td className="p-3 border-r border-slate-100">SEO-friendly website design Delhi</td>
                                    <td className="p-3 border-r border-slate-100">Website redesign services South Delhi</td>
                                    <td className="p-3 border-r border-slate-100">Website maintenance company in NCR</td>
                                    <td className="p-3">Custom e-commerce solutions Delhi NCR</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-r border-slate-100">Affordable website developer Delhi</td>
                                    <td className="p-3 border-r border-slate-100">WordPress developer in Dwarka</td>
                                    <td className="p-3 border-r border-slate-100">Website AMC services in Delhi NCR</td>
                                    <td className="p-3">Online store development Delhi NCR</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 16. Services by Location Grid */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl lg:text-3xl font-bold text-[#111184] mb-4">WebDesino Services by Location & Category</h2>
                        <p className="text-slate-600 text-sm max-w-2xl mx-auto">
                            Explore our web development, SEO, PPC, and digital marketing services across Delhi, NCR, and Gurgaon. Each service page is designed to help your business grow.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {otherLocations.map((loc, idx) => (
                            <Link key={idx} href={`/${loc.slug}`} className="block p-4 border border-slate-100 rounded-lg hover:shadow-md transition-all bg-white group">
                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Location</div>
                                <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#111184] transition-colors line-clamp-2">
                                    {loc.title}
                                </h3>
                                <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                                    {loc.location} based services for local businesses.
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}

function MessageCircleIcon({ className, size }: { className?: string, size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    )
}
