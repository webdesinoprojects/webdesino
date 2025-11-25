"use client";

import { Linkedin, Globe, Award, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SpecialistsSection() {
	return (
		<section className="py-10 lg:py-16 bg-slate-900 relative overflow-hidden">
			{/* Animated background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float" />
				<div
					className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "2s" }}
				/>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-5xl mx-auto">
					{/* Header */}
					<div className="text-center mb-10">
						<div className="inline-flex items-center gap-4 mb-6 animate-scale-in">
							<div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
							<span className="text-sm font-bold text-blue-400 uppercase tracking-wider">
								Leadership
							</span>
							<div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
						</div>

						<h2 className="text-4xl lg:text-6xl font-bold mb-4 animate-slide-up text-white">
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
								Meet The Founder
							</span>
						</h2>
					</div>

					{/* Founder Card */}
					<div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-8 lg:p-12 hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
						<div className="flex flex-col lg:flex-row items-center gap-12">
							{/* Image Column */}
							<div className="w-full lg:w-1/3">
								<div className="relative group">
									<div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
									<div className="relative rounded-3xl overflow-hidden border-2 border-slate-600 group-hover:border-blue-500 transition-colors duration-300 aspect-[4/5]">
										<Image
											src="/rohittiwari.png"
											alt="Rohit Tiwari - Founder & CEO"
											fill
											className="object-cover transform group-hover:scale-105 transition-transform duration-500"
										/>
									</div>

									{/* Social Links Floating */}
									<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
										<Link
											href="https://www.linkedin.com/in/irohittiwari/"
											target="_blank"
											className="p-3 bg-slate-900 border border-slate-700 rounded-full text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-lg"
										>
											<Linkedin size={20} />
										</Link>
										<Link
											href="https://www.google.com/search?q=Rohit+Tiwari+-+Web+Developer+and+designer&oq=ro&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg8Mg0IAhAuGIMBGLEDGIAEMggIAxBFGCcYOzIGCAQQRRg5MgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMTg4M2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
											target="_blank"
											className="p-3 bg-slate-900 border border-slate-700 rounded-full text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-lg"
										>
											<Globe size={20} />
										</Link>
									</div>
								</div>
							</div>

							{/* Content Column */}
							<div className="w-full lg:w-2/3 text-center lg:text-left">
								<div className="mb-6">
									<h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
										Rohit Tiwari
									</h3>
									<p className="text-xl text-blue-400 font-medium">
										Founder & CEO
									</p>
								</div>

								<p className="text-slate-300 text-lg leading-relaxed mb-8">
									"At WebDesino, we don't just build websites; we build
									digital legacies. My mission is to empower businesses in
									Delhi NCR and beyond with technology that drives real
									growth. From a single line of code to a full-scale digital
									transformation, we are committed to excellence."
								</p>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
									<div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
										<div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
											<Award size={24} />
										</div>
										<div className="text-left">
											<div className="text-white font-bold">3+ Years</div>
											<div className="text-slate-400 text-sm">
												Industry Experience
											</div>
										</div>
									</div>
									<div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
										<div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
											<CheckCircle size={24} />
										</div>
										<div className="text-left">
											<div className="text-white font-bold">100+ Projects</div>
											<div className="text-slate-400 text-sm">
												Successfully Delivered
											</div>
										</div>
									</div>
								</div>

								<div className="flex flex-wrap justify-center lg:justify-start gap-3">
									{["Web Development", "UI/UX Design", "Digital Strategy", "SEO Expert"].map(
										(skill) => (
											<span
												key={skill}
												className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-slate-300 text-sm"
											>
												{skill}
											</span>
										)
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

