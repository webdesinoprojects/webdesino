"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { ArrowRight, Search, Award, Briefcase, BarChart, Store, Code, Star, TrendingUp, Users, Globe, Smartphone, Palette, Megaphone } from "lucide-react";
import { HeroShowcaseItem } from "@/lib/data";
import { getStorageUrl } from "@/lib/utils";

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

const HERO_CARD_IMAGES = [
	"/images/home/hero/bookbuzz.jpg",
	"/agnishila.png",
	"/images/home/hero/growth-campaign.jpg",
	"/images/home/hero/brand-identity.jpg",
	"/images/home/hero/meritshot.jpg",
	"/images/home/services/digital-marketing.jpg",
	"/images/home/services/seo-services.jpg",
];

// Keep phrase list stable across renders to avoid unnecessary typing-effect resets.
const HERO_TYPING_PHRASES = [
	"Web Development Agency",
	"SEO Company",
	"Digital Marketing Agency",
	"E-commerce Experts",
];

const getHeroImageByIndex = (index: number) =>
	HERO_CARD_IMAGES[index % HERO_CARD_IMAGES.length];

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

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
		}, 2000);
		return () => clearInterval(interval);
	}, []);

    useEffect(() => {
        const handleTyping = () => {
			const i = loopNum % HERO_TYPING_PHRASES.length;
			const fullText = HERO_TYPING_PHRASES[i];

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
	}, [text, isDeleting, loopNum, typingSpeed]);

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
				<div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#111184]/5 rounded-full blur-3xl animate-float" />
				<div
					className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#111184]/5 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "1s" }}
				/>
			</div>

			<div className="container mx-auto px-4 sm:px-6 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* Left Content */}
					<div className="space-y-8" itemScope itemType="https://schema.org/Service">
						
						{/* Rotating words ticker */}
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-4 animate-fade-in">
							<span className="w-2 h-2 rounded-full bg-[#111184] animate-pulse"></span>
							<Link 
								href={rotatingWords[currentWordIndex].href}
								className="text-sm font-medium text-slate-600 min-w-[140px] transition-all duration-300 hover:text-[#111184]"
							>
								{rotatingWords[currentWordIndex].text}
							</Link>
						</div>

						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-900 min-h-[160px] sm:min-h-[200px] lg:min-h-[240px]">
							<span className="block">
								Stunning Websites By Top
							</span>
							<span className="block text-[#111184]">
								{/* CLS fix: reserve consistent inline width for rotating typed text. */}
								<span className="inline-block min-w-[24ch]">{text}</span>
								{/* CLS fix: cursor keeps fixed width so pulse animation doesn't reflow text. */}
								<span className="inline-block w-[0.6ch] animate-pulse text-[#111184]" aria-hidden="true">|</span>
							</span>
						</h1>

						<p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
							We build high-performance websites and digital strategies that drive growth, engagement, and revenue for your business.
						</p>

						{/* Search Bar */}
						<form onSubmit={handleSearch} className="relative max-w-xl">
							<div className="relative">
								<label htmlFor="hero-service-search" className="sr-only">
									Search web services
								</label>
								<input
									id="hero-service-search"
									type="text"
									placeholder="Search services (e.g., SEO, Web Design)..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full px-6 py-4 rounded-full bg-white border border-slate-200 focus:border-[#111184] focus:ring-2 focus:ring-[#111184]/20 outline-none transition-all shadow-sm pr-12 text-slate-700 placeholder:text-slate-400"
								/>
								<button
									type="submit"
									className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#111184] text-white rounded-full hover:bg-[#111184]/90 transition-colors"
									aria-label="Search"
								>
									<Search size={20} />
								</button>
							</div>
						</form>

						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								href="/contact"
								className="px-8 py-4 bg-[#111184] text-white rounded-full font-bold hover:bg-[#111184]/90 transition-all hover:scale-105 shadow-lg shadow-[#111184]/25 flex items-center justify-center gap-2 group"
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

						{/* Mobile Scrolling Carousel */}
						<div className="relative w-full h-[260px] rounded-2xl overflow-hidden lg:hidden">
							{/* Gradient Overlays */}
							<div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none" />
							<div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />

							{/* CLS fix: absolute scroller is wrapped by fixed-height parent (`h-[260px]`) to reserve layout space. */}
							<div className="absolute inset-0 overflow-hidden">
								<div className="animate-scroll-y space-y-4 py-2">
									{/* First Set */}
									{showcaseItems.map((item, idx) => {
										const Icon = iconMap[item.iconName];
										return (
											<div
												key={`mobile-1-${idx}`}
												className="relative min-h-[88px] bg-white/90 backdrop-blur-sm border border-slate-100 px-4 py-3 rounded-2xl shadow-md flex items-center gap-3 cursor-pointer"
												onClick={() => router.push('/portfolio')}
											>
												<div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
													<NextImage
														src={getStorageUrl(getHeroImageByIndex(idx))}
														alt={item.name}
														width={64}
														height={64}
														className="object-cover"
													/>
												</div>
												<div className="min-w-0">
													<div className="flex items-center gap-2 mb-0.5">
														<Icon className={`${item.iconColor} w-3.5 h-3.5 shrink-0`} />
														<span className="text-xs font-bold text-slate-500 truncate">{item.category}</span>
													</div>
													<p className="text-sm font-bold text-slate-900 truncate">{item.name}</p>
													<span className="text-xs font-semibold text-[#111184]">{item.stat}</span>
												</div>
											</div>
										);
									})}
									{/* Duplicate Set for seamless loop */}
									{showcaseItems.map((item, idx) => {
										const Icon = iconMap[item.iconName];
										return (
											<div
												key={`mobile-2-${idx}`}
												className="relative min-h-[88px] bg-white/90 backdrop-blur-sm border border-slate-100 px-4 py-3 rounded-2xl shadow-md flex items-center gap-3 cursor-pointer"
												onClick={() => router.push('/portfolio')}
											>
												<div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
													<NextImage
														src={getStorageUrl(getHeroImageByIndex(idx + showcaseItems.length))}
														alt={item.name}
														width={64}
														height={64}
														className="object-cover"
													/>
												</div>
												<div className="min-w-0">
													<div className="flex items-center gap-2 mb-0.5">
														<Icon className={`${item.iconColor} w-3.5 h-3.5 shrink-0`} />
														<span className="text-xs font-bold text-slate-500 truncate">{item.category}</span>
													</div>
													<p className="text-sm font-bold text-slate-900 truncate">{item.name}</p>
													<span className="text-xs font-semibold text-[#111184]">{item.stat}</span>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Scrolling Cards */}
					<div className="hidden lg:flex flex-col gap-8 h-full justify-center">
						{/* CLS fix: desktop carousel keeps a fixed-height viewport before images and cards load. */}
						<div className="relative h-[500px] min-h-[500px] w-full">
							{/* Background Blob for Depth */}
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#111184]/10 rounded-full blur-3xl" />

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
												className="relative min-h-[340px] bg-white/90 backdrop-blur-sm border border-slate-100 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(2,6,111,0.15)] hover:-translate-y-1 hover:border-[#111184]/30 transition-all duration-300 group cursor-pointer"
												onClick={() => router.push('/portfolio')}
											>
												<div className="flex items-start justify-between mb-4">
													<div className="p-3 bg-gray-50 rounded-xl border border-gray-200 group-hover:scale-110 transition-transform duration-300">
														<Icon className={`${item.iconColor} w-6 h-6`} />
													</div>
													<div className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold group-hover:bg-[#111184]/5 group-hover:text-[#111184] group-hover:border-[#111184]/20 transition-colors">
														{item.stat}
													</div>
												</div>

													<div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-4">
														<NextImage
															src={getStorageUrl(getHeroImageByIndex(idx))}
															alt={`${item.name} showcase image`}
															fill
															className="object-cover"
															sizes="(max-width: 1024px) 100vw, 40vw"
														/>
													</div>
												
												<h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#111184] transition-colors">
													{item.name}
												</h3>
												<div className="text-sm font-medium text-slate-500 mb-3 group-hover:text-[#111184] transition-colors">{item.category}</div>
												
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
												className="relative min-h-[340px] bg-white/90 backdrop-blur-sm border border-slate-100 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(2,6,111,0.15)] hover:-translate-y-1 hover:border-[#111184]/30 transition-all duration-300 group cursor-pointer"
												onClick={() => router.push('/portfolio')}
											>
												<div className="flex items-start justify-between mb-4">
													<div className="p-3 bg-gray-50 rounded-xl border border-gray-200 group-hover:scale-110 transition-transform duration-300">
														<Icon className={`${item.iconColor} w-6 h-6`} />
													</div>
													<div className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold group-hover:bg-[#111184]/5 group-hover:text-[#111184] group-hover:border-[#111184]/20 transition-colors">
														{item.stat}
													</div>
												</div>

													<div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-4">
														<NextImage
															src={getStorageUrl(getHeroImageByIndex(idx + showcaseItems.length))}
															alt={`${item.name} showcase image`}
															fill
															className="object-cover"
															sizes="(max-width: 1024px) 100vw, 40vw"
														/>
													</div>
												
												<h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#111184] transition-colors">
													{item.name}
												</h3>
												<div className="text-sm font-medium text-slate-500 mb-3 group-hover:text-[#111184] transition-colors">{item.category}</div>
												
												<p className="text-slate-600 text-sm leading-relaxed">
													{item.description}
												</p>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

