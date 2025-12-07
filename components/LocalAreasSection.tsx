"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

const locations = [
	{ name: "Krishan Vihar & Nearby Areas", link: "https://share.google/1oqOSK2n3UvhKbHu5" },
	{ name: "Uttam Nagar & Nearby Areas", link: "https://share.google/7bfsoSDMcdKosq9H4" },
	{ name: "Kamla Nagar & Nearby Areas", link: "https://share.google/HamoWu7AFPzS3TEoh" },
	{ name: "Karol Bagh & Nearby Areas", link: "https://www.google.com/maps/place/Karol+Bagh,+Delhi" },
	{ name: "Hauz Khas & Nearby Areas", link: "https://share.google/c7gS6rqXBDvqMimZ8" },
	{ name: "DLF Camellias & Nearby Areas", link: "https://share.google/OEllDuOFBQkSiWfF6" },
];

const allAreas = [
	{ name: "Dwarka", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
	{ name: "Uttam Nagar", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
	{ name: "Bawana", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
	{ name: "Karol Bagh", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
	{ name: "Kalkaji", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
	{ name: "Govindpuri", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
	{ name: "Kamla Nagar", href: "https://share.google/HamoWu7AFPzS3TEoh" },
	{ name: "Shakti Nagar", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
	{ name: "Civil Lines", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
	{ name: "Rajouri Garden", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
	{ name: "Sabzi Mandi", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
	{ name: "Krishan Vihar", href: "https://share.google/1oqOSK2n3UvhKbHu5" }
];

export default function LocalAreasSection() {
	return (
		<section className="py-10 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute top-0 left-0 w-full h-full opacity-50">
				<div className="absolute top-20 left-10 w-64 h-64 bg-[#02066F]/10 rounded-full blur-3xl animate-float" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-[#02066F]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
			</div>

			<div className="container mx-auto px-4 relative z-10">
				{/* Section Header */}
				<div className="text-center max-w-4xl mx-auto mb-10 lg:mb-12">
					<h2 className="text-3xl lg:text-5xl font-bold text-[#02066F] mb-6 animate-fade-in">
						Your Local Web Development Company in Delhi NCR
					</h2>
					<div className="space-y-4 text-gray-700 text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
						<p>
							At WebDesino, we are proud to be the trusted local web development and digital marketing company in Delhi NCR. We help businesses across{" "}
							{allAreas.map((area, idx) => (
								<span key={idx}>
									<Link href={area.href} className="text-[#02066F] hover:underline font-medium">
										{area.name}
									</Link>
									{idx < allAreas.length - 1 ? ", " : ""}
								</span>
							))}
							{" "}establish a strong digital presence.
						</p>
						<p>
							Whether you run a small shop, a clinic, a real estate agency, or an ecommerce brand, our SEO-optimized websites and marketing strategies ensure higher visibility, more leads, and improved conversions. We focus on Google Maps SEO and hyperlocal strategies so your business shows up when customers in your neighborhood search online.
						</p>
						<p className="font-semibold text-[#02066F]">
							Explore our dedicated Google Business Profiles to see how we serve your area:
						</p>
					</div>
				</div>


				{/* Map Container */}
				<div className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-white/20 glass mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
					<iframe 
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.0688975472578!3d28.52728034389636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1701945000000!5m2!1sen!2sin" 
						width="100%" 
						height="100%" 
						style={{ border: 0 }}
						allowFullScreen 
						loading="lazy"
						title="WebDesino Service Areas"
					></iframe>
				</div>
				{/* Location Links */}
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
					{locations.map((location, idx) => (
						<Link
							key={idx}
							href={location.link}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-3 p-6 rounded-2xl glass hover:glass-strong transition-all duration-300 hover-lift animate-fade-in"
							style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
						>
							<MapPin className="text-[#02066F] flex-shrink-0 group-hover:scale-110 transition-transform" size={24} />
							<span className="font-semibold text-[#02066F] group-hover:text-[#02066F]/80 transition-colors">
								{location.name}
							</span>
						</Link>
					))}
				</div>


				{/* Closing Statement */}
				<div className="text-center max-w-3xl mx-auto">
					<p className="text-gray-700 text-lg leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
						By combining modern design, technical expertise, and local SEO strategies, we ensure your business ranks higher in Delhi NCR searches and attracts the right customers from your neighborhood.
					</p>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 bg-[#02066F] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in"
						style={{ animationDelay: '0.6s' }}
					>
						Get a Free Consultation →
					</Link>
				</div>
			</div>
		</section>
	);
}
