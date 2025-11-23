"use client";

import { useState } from "react";

const specialists = [
	{ name: "Rajeev", role: "Lead Developer", color: "from-blue-600 to-cyan-500" },
	{ name: "Camille", role: "Design Expert", color: "from-cyan-500 to-blue-600" },
	{ name: "James", role: "SEO Specialist", color: "from-blue-500 to-indigo-500" },
	{ name: "Priya", role: "Content Writer", color: "from-indigo-500 to-blue-500" },
	{ name: "Amit", role: "Digital Marketer", color: "from-blue-600 to-cyan-500" },
	{ name: "Sarah", role: "UI/UX Designer", color: "from-cyan-500 to-blue-600" },
];

export default function SpecialistsSection() {
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);

	return (
		<section className="py-16 lg:py-24 bg-slate-900 relative overflow-hidden">
			{/* Animated background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float" />
				<div
					className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "2s" }}
				/>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-6xl mx-auto">
					{/* Header with animated stats */}
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-4 mb-6 animate-scale-in">
							<div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
							<span className="text-sm font-bold text-blue-400 uppercase tracking-wider">
								Our Team
							</span>
							<div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
						</div>

						<h2 className="text-4xl lg:text-6xl font-bold mb-4 animate-slide-up text-white" style={{ animationDelay: "0.1s" }}>
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">20k+ Specialists</span>
						</h2>

						<p className="text-xl lg:text-2xl text-slate-400 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
							Empowering your business with expert talent
						</p>

						{/* Stats row */}
						<div className="flex justify-center gap-8 flex-wrap mb-12 animate-fade-in" style={{ animationDelay: "0.5s" }}>
							<div className="text-center">
								<div className="text-3xl lg:text-5xl font-bold text-blue-500 mb-2">
									100+
								</div>
								<div className="text-slate-400 font-medium">
									Projects Completed
								</div>
							</div>
							<div className="w-px bg-slate-800" />
							<div className="text-center">
								<div className="text-3xl lg:text-5xl font-bold text-cyan-400 mb-2">
									₹6.3 Cr+
								</div>
								<div className="text-slate-400 font-medium">
									Sales Generated
								</div>
							</div>
							<div className="w-px bg-slate-800" />
							<div className="text-center">
								<div className="text-3xl lg:text-5xl font-bold text-blue-500 mb-2">
									50+
								</div>
								<div className="text-slate-400 font-medium">
									Happy Clients
								</div>
							</div>
						</div>
					</div>

					{/* Featured Specialists Grid */}
					<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
						{specialists.map((specialist, idx) => (
							<div
								key={idx}
								className="group relative p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-blue-500/50 cursor-pointer transition-all duration-500 animate-scale-in"
								style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
								onMouseEnter={() => setHoveredCard(idx)}
								onMouseLeave={() => setHoveredCard(null)}
							>
								{/* Animated gradient background */}
								<div
									className={`absolute inset-0 bg-gradient-to-br ${specialist.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
								/>

								<div className="relative z-10">
									{/* Avatar */}
									<div
										className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${specialist.color} flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}
									>
										{specialist.name[0]}
									</div>

									<div className="text-center">
										<h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
											{specialist.name}
										</h3>
										<p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
											{specialist.role}
										</p>
									</div>

									{/* Status indicator */}
									<div className="mt-4 flex items-center justify-center gap-2">
										<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
										<span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
											Available Now
										</span>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Team Grid - Smaller avatars */}
					{/* <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3 animate-fade-in" style={{ animationDelay: "1.2s" }}>
						{Array.from({ length: 24 }).map((_, idx) => (
							<div
								key={idx}
								className="aspect-square rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden hover:scale-110 hover:border-blue-500 transition-all duration-300 cursor-pointer"
								style={{ animationDelay: `${1.2 + idx * 0.02}s` }}
							>
								<div
									className={`w-full h-full bg-gradient-to-br ${
										idx % 2 === 0 ? "from-blue-600 to-cyan-500" : "from-cyan-500 to-blue-600"
									} opacity-20`}
								/>
								<div className="absolute text-xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">👤</div>
							</div>
						))}
					</div> */}

					{/* CTA */}
					<div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "1.4s" }}>
						<p className="text-slate-400 mb-4">
							Trusted by businesses across Delhi NCR for professional web development and digital marketing solutions
						</p>
						<button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25">
							Join Our Success Stories
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

