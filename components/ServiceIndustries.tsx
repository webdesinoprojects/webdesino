"use client";

import { Building2, ShoppingBag, Stethoscope, GraduationCap, Plane, Utensils, Briefcase, Truck } from "lucide-react";

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
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-gray-600">
            We have extensive experience working with diverse industries, delivering tailored solutions for each sector.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry, idx) => (
            <div 
              key={idx}
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-[#02066F]/5 rounded-full flex items-center justify-center mb-4 text-[#02066F] group-hover:bg-[#02066F]/10 group-hover:text-[#02066F] transition-colors duration-300">
                <industry.icon size={28} />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-[#02066F] transition-colors">{industry.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
