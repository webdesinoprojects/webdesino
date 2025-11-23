"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { ArrowRight, Search, Award, Briefcase, BarChart, Store, Code, Star } from "lucide-react";
import Google from "@/public/google.jpg";
import WordPress from "@/public/wordpress.jpg";
import Shopify from "@/public/shopify.jpg";
import SEMRush from "@/public/semrush.png";
import DesignRush from "@/public/designrush.jpg";

// Real Client Brands & Trusted Platforms
const trustedBrands = [
	{ name: "BookBuzzz", category: "E-commerce", sales: "₹25L+ Monthly" },
	{ name: "LuckyNutra", category: "Health & Wellness", sales: "₹10L+ Monthly" },
	{ name: "BuyKhariBauli", category: "E-commerce", sales: "₹6L+ Monthly" },
	{ name: "Meritshot", category: "Education", achievement: "Global Rankings" },
	{ name: "Land Sathi", category: "Real Estate", achievement: "High Traffic" },
	{ name: "Mentok Healthcare", category: "Healthcare", achievement: "Online Growth" },
	{ name: "CS Hub", category: "Corporate", achievement: "Lead Generation" },
	{ name: "Nourish Mantra", category: "Fashion", achievement: "Brand Visibility" },
];

// Certification Badges
const certifications = [
	{ name: "Google Partner", logo: Google, icon: <Search />, url: "https://www.google.com/partners/" },
	{ name: "WordPress Certified", logo: WordPress, icon: <Code />, url: "https://wordpress.org/" },
	{ name: "Shopify Partner", logo: Shopify, icon: <Store />, url: "https://www.shopify.com/partners" },
	{ name: "SEMRush Certified", logo: SEMRush, icon: <BarChart />, url: "https://www.semrush.com/" },
	{ name: "DesignRush Accredited", logo: DesignRush, icon: <Award />, url: "https://www.designrush.com/" },
];

// Animated words that rotate - Web Development focused
const rotatingWords = [
	"Website Design",
	"SEO Services",
	"Digital Marketing",
	"E-commerce",
	"Mobile Apps",
	"Branding",
];

export default function Hero() {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [currentWordIndex, setCurrentWordIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
		}
	};

	return (
		<section
			className="relative bg-slate-50 py-20 lg:py-32 overflow-hidden"
			itemScope
			itemType="https://schema.org/Organization"
		>
			{/* Floating background elements */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl animate-float" />
				<div
					className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-slate-900/5 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "1s" }}
				/>
			</div>

			<div className="container mx-auto px-4 sm:px-6 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* Left Content */}
					<div className="space-y-8" itemScope itemType="https://schema.org/Service">
						{/* Rotating words ticker */}
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-4 animate-fade-in">
							<span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
							<span className="text-sm font-medium text-slate-600 min-w-[140px] transition-all duration-300">
								{rotatingWords[currentWordIndex]}
							</span>
						</div>

						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-900">
							<span
								className="block animate-slide-up"
								style={{ animationDelay: "0.1s" }}
							>
								Stunning Websites By
							</span>
							<span
								className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 animate-slide-up"
								style={{ animationDelay: "0.2s" }}
							>
								Top Web Development
							</span>
							<span
								className="block animate-slide-up"
								style={{ animationDelay: "0.3s" }}
							>
								Agency
							</span>
						</h1>

						<p
							className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed animate-slide-up"
							style={{ animationDelay: "0.4s" }}
						>
							We build high-performance websites and digital strategies that drive growth, engagement, and revenue for your business.
						</p>

						{/* Search Bar */}
						<form onSubmit={handleSearch} className="relative max-w-md animate-slide-up" style={{ animationDelay: "0.45s" }}>
							<div className="relative">
								<input
									type="text"
									placeholder="Search services (e.g., SEO, Web Design)..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full px-6 py-4 rounded-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm pr-12 text-slate-700 placeholder:text-slate-400"
								/>
								<button
									type="submit"
									className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
									aria-label="Search"
								>
									<Search size={20} />
								</button>
							</div>
						</form>

						<div
							className="flex flex-col sm:flex-row gap-4 animate-slide-up"
							style={{ animationDelay: "0.5s" }}
						>
							<Link
								href="/contact"
								className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 group"
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
						<div className="pt-8 border-t border-slate-200 animate-fade-in" style={{ animationDelay: "0.6s" }}>
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

					{/* Right Content - Hero Image/Graphic */}
					<div className="relative lg:h-[600px] hidden lg:block animate-scale-in">
						<div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5 rounded-3xl transform rotate-3"></div>
						<div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-700">
							{/* Abstract UI Representation */}
							<div className="absolute top-0 left-0 right-0 h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
								<div className="w-3 h-3 rounded-full bg-red-400"></div>
								<div className="w-3 h-3 rounded-full bg-yellow-400"></div>
								<div className="w-3 h-3 rounded-full bg-green-400"></div>
								<div className="ml-4 w-64 h-6 bg-white rounded-md border border-slate-200"></div>
							</div>
							<div className="p-8 pt-20 h-full bg-slate-50/50">
								<div className="grid grid-cols-2 gap-6 h-full">
									<div className="space-y-6">
										<div className="h-40 bg-white rounded-xl shadow-sm p-4 animate-pulse">
											<div className="w-12 h-12 bg-blue-100 rounded-lg mb-4"></div>
											<div className="h-4 bg-slate-100 rounded w-3/4 mb-2"></div>
											<div className="h-4 bg-slate-100 rounded w-1/2"></div>
										</div>
										<div className="h-56 bg-white rounded-xl shadow-sm p-4 animate-pulse" style={{ animationDelay: "0.2s" }}>
											<div className="w-full h-32 bg-slate-100 rounded-lg mb-4"></div>
											<div className="h-4 bg-slate-100 rounded w-full mb-2"></div>
											<div className="h-4 bg-slate-100 rounded w-2/3"></div>
										</div>
									</div>
									<div className="space-y-6 mt-12">
										<div className="h-56 bg-white rounded-xl shadow-sm p-4 animate-pulse" style={{ animationDelay: "0.4s" }}>
											<div className="w-full h-32 bg-slate-100 rounded-lg mb-4"></div>
											<div className="h-4 bg-slate-100 rounded w-full mb-2"></div>
											<div className="h-4 bg-slate-100 rounded w-2/3"></div>
										</div>
										<div className="h-40 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg p-6 text-white flex flex-col justify-between animate-float">
											<div className="w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
												<BarChart size={20} />
											</div>
											<div>
												<div className="text-3xl font-bold mb-1">+150%</div>
												<div className="text-white/80 text-sm">Growth Rate</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

