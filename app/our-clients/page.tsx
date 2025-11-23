import { getClients } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Clients | WebDesino - Trusted by Innovative Companies",
  description: "See the amazing websites we've built for our valued clients across various industries including Real Estate, E-commerce, Healthcare, and more.",
};

export default function OurClientsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const clients = getClients();
  // Existing data categories
  const dataCategories = ["Our Clients", "Querky", "Shopify Websites"] as const;
  
  // Map dropdown categories to data categories
  // "Our Websites" -> Show all existing data categories
  // "Our Apps" -> Show nothing (placeholder)
  // "Digital Marketing" -> Show nothing (placeholder)
  // "Graphic Designing" -> Show nothing (placeholder)

  const selectedCategory = searchParams.category;

  // If "Our Websites" or undefined, show all web projects
  const showWebsites = !selectedCategory || selectedCategory === "Our Websites";

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
            {selectedCategory || "Our Clients"}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto animate-slide-up">
            Trusted by innovative companies worldwide. Here’s a showcase of the amazing projects we've delivered.
          </p>
        </div>
      </section>

      {/* Clients Grid */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {showWebsites ? (
          dataCategories.map((category) => {
            const categoryClients = clients.filter((c) => c.category === category);
            if (categoryClients.length === 0) return null;

            return (
              <section key={category} className="mb-20 last:mb-0">
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px flex-1 bg-slate-200"></div>
                  <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-wider">
                    {category}
                  </h2>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryClients.map((client, idx) => (
                    <div
                      key={idx}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
                    >
                      <div className="aspect-video relative overflow-hidden bg-slate-100">
                        <Image
                          src={client.image}
                          alt={`${client.name} Website Screenshot`}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          unoptimized // Since we are using external microlink images
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <a
                            href={client.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 hover:bg-blue-50"
                          >
                            Visit Website
                            <ArrowRight size={18} />
                          </a>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {client.name}
                        </h3>
                        <a
                          href={client.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-500 hover:text-blue-600 transition-colors truncate block"
                        >
                          {client.url}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Coming Soon</h3>
            <p className="text-slate-600">
              We are currently updating our portfolio for {selectedCategory}. Please check back later!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
