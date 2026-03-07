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
					<span className="text-[#111184] font-bold tracking-wider uppercase text-sm mb-2 block">
						What We Do
					</span>
					<h2 className="text-3xl lg:text-5xl font-bold text-[#111184] mb-6">
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
						<Link
							key={category.id}
							href={`/services/${category.slug}`}
							className={`group block p-8 rounded-2xl border border-[#111184]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white relative overflow-hidden`}
						>
							<div
								className={`absolute top-0 right-0 w-32 h-32 bg-[#111184]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500`}
							/>

							<div
								className={`w-14 h-14 rounded-xl bg-[#111184]/5 text-[#111184] flex items-center justify-center mb-6 relative z-10`}
							>
								{Icon && <Icon size={28} />}
							</div>

							<h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10 group-hover:text-[#111184] transition-colors">
								{category.title}
							</h3>

                                                       <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
                                                               {category.description}
                                                       </p>							<div
								className={`inline-flex items-center gap-2 font-semibold text-[#111184] group-hover:gap-3 transition-all relative z-10`}
							>
								Learn More <ArrowRight size={18} />
							</div>
						</Link>
					)})}
				</div>
			</div>
		</section>
	);
}
