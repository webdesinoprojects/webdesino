"use client";

import {
	Award,
	BadgeCheck,
	Crown,
	Flag,
	Gem,
	Handshake,
	Medal,
	Rocket,
	ShieldCheck,
	Sparkles,
	Star,
	Target,
	ThumbsUp,
	Trophy,
	Zap,
} from "lucide-react";
import {
	defaultAwardsSectionContent,
	type AwardsIconName,
	type AwardsSectionContent,
} from "@/lib/awards-section";

const iconMap: Record<AwardsIconName, typeof Trophy> = {
	Trophy,
	Award,
	Medal,
	Star,
	BadgeCheck,
	Crown,
	Sparkles,
	ShieldCheck,
	Gem,
	Rocket,
	Flag,
	Target,
	Zap,
	ThumbsUp,
	Handshake,
};

interface AwardsSectionProps {
	content?: AwardsSectionContent;
}

export default function AwardsSection({
	content = defaultAwardsSectionContent,
}: AwardsSectionProps) {
	return (
		<section className="py-2 lg:py-4 bg-slate-50 relative overflow-hidden">
			{/* Animated background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-10 left-10 w-72 h-72 bg-[#111184]/5 rounded-full blur-3xl animate-float" />
				<div
					className="absolute bottom-10 right-10 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "1.5s" }}
				/>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-6xl mx-auto">
					{/* Animated scrolling ticker */}
					<div className="my-6 overflow-hidden">
						<div className="flex gap-8 animate-scroll-horizontal">
							{Array.from({ length: 8 }, () => content.backgroundWord).map((text, idx) => (
								<div
									key={idx}
									className="flex-shrink-0 text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#111184] to-[#111184] opacity-5"
								>
									{text}
								</div>
							))}
						</div>
					</div>

					<h2 className="text-4xl lg:text-6xl font-bold text-center mb-4 animate-scale-in text-slate-900">
						<span className="text-[#111184]">{content.titleLineOne}</span>
					</h2>
					<h2
						className="text-4xl lg:text-6xl font-bold text-center mb-6 animate-scale-in text-slate-900"
						style={{ animationDelay: "0.1s" }}
					>
						<span className="text-[#111184]">{content.titleLineTwo}</span>
					</h2>
					<p
						className="text-center text-slate-600 mb-10 text-lg max-w-3xl mx-auto animate-fade-in"
						style={{ animationDelay: "0.2s" }}
					>
						{content.description}
					</p>

					{/* Awards Grid with 3D Effect */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-0">
						{content.cards.map((award, idx) => {
							const IconComponent = iconMap[award.iconName] || Trophy;
							return (
								<div
									key={idx}
									className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover-lift cursor-pointer transition-all duration-500 animate-scale-in hover:shadow-2xl hover:border-[#111184]"
									style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
								>
									{/* Gradient background on hover */}
									<div className="absolute inset-0 bg-[#111184] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

									<div className="relative p-8 flex flex-col items-center h-full">
										{/* Icon/Image Container */}
										<div className="w-20 h-20 my-2 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500 shadow-inner">
											<IconComponent className="w-10 h-10 text-[#111184] group-hover:text-white transition-colors" />
										</div>

										<div className="text-center mt-auto">
											<h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors mb-2 leading-tight">
												{award.title}
											</h3>
											<div className="w-12 h-1 bg-gray-100 group-hover:bg-white/30 mx-auto my-3 rounded-full transition-colors" />
											<p className="text-sm font-medium text-slate-500 group-hover:text-white/90 transition-colors uppercase tracking-wide">
												{award.organization}
											</p>
										</div>
									</div>

									{/* Corner decoration */}
									<div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
										<Star className="w-6 h-6 text-white fill-white animate-pulse" />
									</div>
								</div>
							);
						})}
					</div>

					{/* Certifications Banner */}
					{/* <div
						className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 text-center animate-fade-in shadow-sm"
						style={{ animationDelay: "0.8s" }}
					> */}
					{/* </div> */}
				</div>
			</div>
			<style jsx>{`
				@keyframes scroll-horizontal {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
				.animate-scroll-horizontal {
					animation: scroll-horizontal 30s linear infinite;
				}
			`}</style>
		</section>
	);
}

