import Link from "next/link";
import { servicesData } from "@/lib/services-data";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Services | Webdesino",
  description: "Explore our comprehensive range of web development, digital marketing, and SEO services designed to grow your business.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-orange">Services</span>
          </h1>
          <p className="text-lg text-gray-600">
            We offer a full spectrum of digital solutions to help your business thrive in the online world. From stunning websites to results-driven marketing campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.slug} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="p-8">
                  <div className="w-14 h-14 bg-teal/10 rounded-xl flex items-center justify-center mb-6 text-teal">
                    {Icon && <Icon size={32} />}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    <Link href={`/services/${category.slug}`} className="hover:text-orange transition-colors">
                      {category.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {category.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {category.subtypes.map((subtype) => (
                      <Link 
                        key={subtype.slug}
                        href={`/services/${category.slug}/${subtype.slug}`}
                        className="text-sm text-gray-700 hover:text-teal transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-orange rounded-full"></span>
                        {subtype.title}
                      </Link>
                    ))}
                  </div>

                  <Link 
                    href={`/services/${category.slug}`}
                    className="inline-flex items-center gap-2 text-teal font-semibold hover:text-orange transition-colors"
                  >
                    View All Services <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
