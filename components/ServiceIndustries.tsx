"use client";

import { Building2, ShoppingBag, Stethoscope, GraduationCap, Plane, Utensils, Briefcase, Truck, ShieldCheck, Globe, Monitor, Scale, Handshake, Sprout, Shirt, UserSearch, BarChart3, BookOpenCheck, Bed, CloudCog, UserSquare2  } from "lucide-react";

export default function ServiceIndustries() {
  const industries = [
    { name: "Real Estate", icon: Building2 },
    { name: "E-Commerce", icon: ShoppingBag },
    { name: "Healthcare", icon: Stethoscope },
    { name: "Education", icon: GraduationCap },
    { name: "Travel & Tourism", icon: Plane },
    { name: "Food & Dining", icon: Utensils },
    { name: "Corporate", icon: Briefcase },
    { name: "Logistics", icon: Truck },
    { name: "Finance", icon: ShieldCheck },
    { name: "Immigration", icon: Globe },
    { name: "IT", icon: Monitor },
    { name: "Legal", icon: Scale }, // or Gavel
    { name: "NGO", icon: Handshake },
    { name: "Agriculture", icon: Sprout },
    { name: "Fashion", icon: Shirt },
    { name: "Recruitment", icon: UserSearch },
    { name: "Business", icon: BarChart3 },
    { name: "Edtech", icon: BookOpenCheck },
    { name: "Portfolio", icon: UserSquare2 },
    { name: "Hotel", icon: Bed },
    { name: "SaaS", icon: CloudCog },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#111184] font-semibold text-sm uppercase tracking-wider mb-2 block">Domain Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Industries We <span className="text-[#111184]">Serve</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Our diverse experience across various sectors allows us to understand unique business challenges and deliver tailored solutions that drive growth and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {industries.map((industry, idx) => (
            <div
              key={idx}
              className="group p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-[#111184]/5 rounded-full flex items-center justify-center text-[#111184] group-hover:bg-[#111184]/10 group-hover:text-[#111184] transition-colors duration-300">
                <industry.icon size={28} />
              </div>
              <h4 className="font-bold text-gray-900 group-hover:text-[#111184] transition-colors">{industry.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
