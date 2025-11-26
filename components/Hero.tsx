"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { ArrowRight, Search, Award, Briefcase, BarChart, Store, Code, Star, TrendingUp, Users, Globe, Smartphone, Palette, Megaphone } from "lucide-react";
import Google from "@/public/google.jpg";
import WordPress from "@/public/wordpress.jpg";
import Shopify from "@/public/shopify.jpg";
import SEMRush from "@/public/semrush.png";
import DesignRush from "@/public/designrush.jpg";
import { HeroShowcaseItem } from "@/lib/data";

const iconMap = {
  Store: Store,
  Smartphone: Smartphone,
  Megaphone: Megaphone,
  Palette: Palette,
  Globe: Globe,
  TrendingUp: TrendingUp,
};

// Animated words that rotate - Web Development focused
const rotatingWords = [
	{ text: "Website Design", href: "/services/website-solutions" },
	{ text: "SEO Services", href: "/services/seo-services" },
	{ text: "Digital Marketing", href: "/services/digital-marketing" },
	{ text: "E-commerce", href: "/services/website-solutions/ecommerce-development" },
	{ text: "Mobile Apps", href: "/services/app-development" },
	{ text: "Branding", href: "/services/branding" },
];

// Certification Badges
const certifications = [
	{ name: "Google Partner", logo: Google, icon: <Search />, url: "https://www.google.com/partners/" },
	{ name: "WordPress Certified", logo: WordPress, icon: <Code />, url: "https://wordpress.org/" },
	{ name: "Shopify Partner", logo: Shopify, icon: <Store />, url: "https://www.shopify.com/partners" },
	{ name: "SEMRush Certified", logo: SEMRush, icon: <BarChart />, url: "https://www.semrush.com/" },
	{ name: "DesignRush Accredited", logo: DesignRush, icon: <Award />, url: "https://www.designrush.com/" },
];

interface HeroProps {
  showcaseItems: HeroShowcaseItem[];
}

export default function Hero({ showcaseItems = [] }: HeroProps) {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	
    // Typewriter state
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    
    const phrases = ["Web Development Agency", "SEO Company", "Digital Marketing Agency", "E-commerce Experts"];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
		}, 2000);
		return () => clearInterval(interval);
	}, []);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

            setTypingSpeed(isDeleting ? 50 : 100);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, phrases, typingSpeed]);

	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
		}
	};

	return (
		<section
			className="relative bg-slate-50 py-10 lg:py-16 overflow-hidden"
			itemScope
			itemType="https://schema.org/Organization"
		>
			{/* Floating background elements */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#02066F]/5 rounded-full blur-3xl animate-float" />
				<div
					className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#02066F]/5 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "1s" }}
				/>
			</div>

			<div className="container mx-auto px-4 sm:px-6 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* Left Content */}
					<div className="space-y-8" itemScope itemType="https://schema.org/Service">
						
						{/* Rotating words ticker */}
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-4 animate-fade-in">
							<span className="w-2 h-2 rounded-full bg-[#02066F] animate-pulse"></span>
							<Link 
								href={rotatingWords[currentWordIndex].href}
								className="text-sm font-medium text-slate-600 min-w-[140px] transition-all duration-300 hover:text-[#02066F]"
							>
								{rotatingWords[currentWordIndex].text}
							</Link>
						</div>

						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-900 min-h-[160px] sm:min-h-[200px] lg:min-h-[240px]">
							<span className="block">
								Stunning Websites By Top
							</span>
							<span className="block text-[#02066F]">
								{text}
                                <span className="animate-pulse text-[#02066F]">|</span>
							</span>
						</h1>

						<p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
							We build high-performance websites and digital strategies that drive growth, engagement, and revenue for your business.
						</p>

						{/* Search Bar */}
						<form onSubmit={handleSearch} className="relative max-w-xl">
							<div className="relative">
								<input
									type="text"
									placeholder="Search services (e.g., SEO, Web Design)..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full px-6 py-4 rounded-full bg-white border border-slate-200 focus:border-[#02066F] focus:ring-2 focus:ring-[#02066F]/20 outline-none transition-all shadow-sm pr-12 text-slate-700 placeholder:text-slate-400"
								/>
								<button
									type="submit"
									className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#02066F] text-white rounded-full hover:bg-[#02066F]/90 transition-colors"
									aria-label="Search"
								>
									<Search size={20} />
								</button>
							</div>
						</form>

						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								href="/contact"
								className="px-8 py-4 bg-[#02066F] text-white rounded-full font-bold hover:bg-[#02066F]/90 transition-all hover:scale-105 shadow-lg shadow-[#02066F]/25 flex items-center justify-center gap-2 group"
							>
								Start Your Project
								<ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
							</Link>
							<Link
								href="/portfolio"
								className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all hover:border-slate-300 flex items-center justify-center gap-2"
							>
								View Our Work
								<Briefcase size={20} className="text-slate-400" />
							</Link>
						</div>

						{/* Trust Indicators */}
						<div className="pt-8 border-t border-slate-200 lg:hidden">
							<p className="text-sm text-slate-500 font-medium mb-4">Certified Partners</p>
							<div className="grid grid-cols-3 gap-y-4 gap-x-4 md:flex md:gap-8 items-center">
								{certifications.map((cert, idx) => (
									<a
										key={idx}
										href={cert.url}
										target="_blank"
										rel="noopener noreferrer"
										className="relative group flex justify-center md:block"
										title={cert.name}
									>
										<div className="w-24 h-24 relative transition-all duration-300 hover:scale-105">
											<NextImage
												src={cert.logo}
												alt={cert.name}
												fill
												className="object-contain object-center md:object-left"
											/>
										</div>
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Right Column - Scrolling Cards */}
					<div className="hidden lg:flex flex-col gap-8 h-full justify-center">
						<div className="relative h-[500px] w-full">
							{/* Background Blob for Depth */}
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#02066F]/10 rounded-full blur-3xl" />

							{/* Gradient Overlays - Matching Section Background */}
							<div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50 to-transparent z-10" />
							<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />

							{/* Scrolling Container */}
							<div className="absolute inset-0 overflow-hidden">
								<div className="animate-scroll-y space-y-6 py-4">
									{/* First Set */}
									{showcaseItems.map((item, idx) => {
										const Icon = iconMap[item.iconName];
										return (
											<div
												key={`item-1-${idx}`}
												className="relative bg-white/90 backdrop-blur-sm border border-slate-100 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(2,6,111,0.15)] hover:-translate-y-1 hover:border-[#02066F]/30 transition-all duration-300 group cursor-pointer"
												onClick={() => router.push('/portfolio')}
											>
												<div className="flex items-start justify-between mb-4">
													<div className="p-3 bg-gray-50 rounded-xl border border-gray-200 group-hover:scale-110 transition-transform duration-300">
														<Icon className={`${item.iconColor} w-6 h-6`} />
													</div>
													<div className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold group-hover:bg-[#02066F]/5 group-hover:text-[#02066F] group-hover:border-[#02066F]/20 transition-colors">
														{item.stat}
													</div>
												</div>
												
												<h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#02066F] transition-colors">
													{item.name}
												</h3>
												<div className="text-sm font-medium text-slate-500 mb-3 group-hover:text-[#02066F] transition-colors">{item.category}</div>
												
												<p className="text-slate-600 text-sm leading-relaxed">
													{item.description}
												</p>
											</div>
										);
									})}

									{/* Duplicate Set for Seamless Loop */}
									{showcaseItems.map((item, idx) => {
										const Icon = iconMap[item.iconName];
										return (
											<div
												key={`item-2-${idx}`}
												className="relative bg-white/90 backdrop-blur-sm border border-slate-100 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(2,6,111,0.15)] hover:-translate-y-1 hover:border-[#02066F]/30 transition-all duration-300 group cursor-pointer"
												onClick={() => router.push('/portfolio')}
											>
												<div className="flex items-start justify-between mb-4">
													<div className="p-3 bg-gray-50 rounded-xl border border-gray-200 group-hover:scale-110 transition-transform duration-300">
														<Icon className={`${item.iconColor} w-6 h-6`} />
													</div>
													<div className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold group-hover:bg-[#02066F]/5 group-hover:text-[#02066F] group-hover:border-[#02066F]/20 transition-colors">
														{item.stat}
													</div>
												</div>
												
												<h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#02066F] transition-colors">
													{item.name}
												</h3>
												<div className="text-sm font-medium text-slate-500 mb-3 group-hover:text-[#02066F] transition-colors">{item.category}</div>
												
												<p className="text-slate-600 text-sm leading-relaxed">
													{item.description}
												</p>
											</div>
										);
									})}
								</div>
							</div>
						</div>

						{/* Trust Indicators - Desktop Right Side */}
						<div className="pt-4 border-t border-slate-200/50">
							<p className="text-sm text-slate-500 font-medium mb-4 text-center">Certified Partners</p>
							<div className="flex justify-between gap-8 items-center">
								{certifications.map((cert, idx) => (
									<a
										key={idx}
										href={cert.url}
										target="_blank"
										rel="noopener noreferrer"
										className="relative group block"
										title={cert.name}
									>
										<div className="w-24 h-24 relative transition-all duration-300 hover:scale-105">
											<NextImage
												src={cert.logo}
												alt={cert.name}
												fill
												className="object-contain"
											/>
										</div>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

