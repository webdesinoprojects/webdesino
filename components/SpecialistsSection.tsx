"use client";

import { Linkedin, Globe, Award, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SpecialistsSection() {
	return (
		<section className="py-10 lg:py-16 bg-slate-50 relative overflow-hidden">
			{/* Animated background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-[#02066F]/5 rounded-full blur-3xl animate-float" />
				<div
					className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#02066F]/5 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "2s" }}
				/>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-5xl mx-auto">
					{/* Header */}
					<div className="text-center mb-10">
						<div className="inline-flex items-center gap-4 mb-6 animate-scale-in">
							<div className="w-16 h-1 bg-[#02066F]/20 rounded-full" />
							<span className="text-sm font-bold text-[#02066F] uppercase tracking-wider">
								Leadership
							</span>
							<div className="w-16 h-1 bg-[#02066F]/20 rounded-full" />
						</div>

						<h2 className="text-4xl lg:text-6xl font-bold mb-4 animate-slide-up text-slate-900">
							<span className="text-slate-900">
								Meet The Founder
							</span>
						</h2>
					</div>

					{/* Founder Card */}
					<div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 hover:border-[#02066F]/20 transition-all duration-500 shadow-xl">
						<div className="flex flex-col lg:flex-row items-center gap-12">
							{/* Image Column */}
							<div className="w-full lg:w-1/3">
								<div className="relative group">
									<div className="absolute inset-0 bg-[#02066F] rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
									<div className="relative rounded-3xl overflow-hidden border-2 border-slate-100 group-hover:border-[#02066F] transition-colors duration-300 aspect-[4/5]">
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
											className="p-3 bg-[#02066F] border border-white/20 rounded-full text-white hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
										>
											<Linkedin size={20} />
										</Link>
										<Link
											href="https://www.google.com/search?q=Rohit+Tiwari+-+Web+Developer+and+designer&oq=ro&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg8Mg0IAhAuGIMBGLEDGIAEMggIAxBFGCcYOzIGCAQQRRg5MgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMTg4M2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
											target="_blank"
											className="p-3 bg-[#02066F] border border-white/20 rounded-full text-white hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
										>
											<Globe size={20} />
										</Link>
									</div>
								</div>
							</div>

							{/* Content Column */}
							<div className="w-full lg:w-2/3 text-center lg:text-left">
								<div className="mb-6">
									<h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
										Rohit Tiwari
									</h3>
									<p className="text-xl text-[#02066F] font-medium">
										Founder & CEO
									</p>
								</div>

								<p className="text-slate-600 text-lg leading-relaxed mb-8">
									"At WebDesino, we don't just build websites; we build
									digital legacies. My mission is to empower businesses and beyond with technology that drives real
									growth. From a single line of code to a full-scale digital
									transformation, we are committed to excellence."
								</p>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
									<div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
										<div className="p-3 bg-[#02066F]/10 rounded-lg text-[#02066F]">
											<Award size={24} />
										</div>
										<div className="text-left">
											<div className="text-slate-900 font-bold">5+ Years</div>
											<div className="text-slate-500 text-sm">
												Industry Experience
											</div>
										</div>
									</div>
									<div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
										<div className="p-3 bg-[#02066F]/10 rounded-lg text-[#02066F]">
											<CheckCircle size={24} />
										</div>
										<div className="text-left">
											<div className="text-slate-900 font-bold">100+ Projects</div>
											<div className="text-slate-500 text-sm">
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
												className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-slate-600 text-sm"
											>
												{skill}
											</span>
										)
									)}
								</div>

								<div className="mt-8 flex justify-center lg:justify-start">
									<Link
										href="/rohit-tiwari"
										className="inline-flex items-center gap-2 px-6 py-3 bg-[#02066F] text-white rounded-full font-semibold hover:bg-black transition-all hover:-translate-y-1 shadow-lg shadow-[#02066F]/20"
									>
										Read Full Story <ArrowRight size={18} />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

