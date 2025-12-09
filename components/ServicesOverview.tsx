import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { ServiceCategory } from "@prisma/client";

interface ServicesOverviewProps {
  categories: ServiceCategory[];
}

export default function ServicesOverview({ categories }: ServicesOverviewProps) {
	return (
		<section className="py-16 lg:py-24 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<span className="text-[#02066F] font-bold tracking-wider uppercase text-sm mb-2 block">
						What We Do
					</span>
					<h2 className="text-3xl lg:text-5xl font-bold text-[#02066F] mb-6">
						Comprehensive Digital Solutions
					</h2>
					<p className="text-lg text-gray-600">
						We don't just build websites; we build digital businesses. Explore our
						wide range of services designed to help you grow online.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{categories.map((category, idx) => {
            const Icon = category.icon ? (LucideIcons as any)[category.icon] : null;
            return (
						<div
							key={category.id}
							className={`group p-8 rounded-2xl border border-[#02066F]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white relative overflow-hidden`}
						>
							<div
								className={`absolute top-0 right-0 w-32 h-32 bg-[#02066F]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500`}
							/>

							<div
								className={`w-14 h-14 rounded-xl bg-[#02066F]/5 text-[#02066F] flex items-center justify-center mb-6 relative z-10`}
							>
								{Icon && <Icon size={28} />}
							</div>

							<h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10 group-hover:text-[#02066F] transition-colors">
								{category.title}
							</h3>

                                                       <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
                                                               {category.description}
                                                       </p>							<Link
								href={`/services/${category.slug}`}
								className={`inline-flex items-center gap-2 font-semibold text-[#02066F] group-hover:gap-3 transition-all relative z-10`}
							>
								Learn More <ArrowRight size={18} />
							</Link>
						</div>
					)})}
				</div>
			</div>
		</section>
	);
}
