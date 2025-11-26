import { getPortfolioProjects, getIndustries } from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Goal, GoalIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio - Web Development Projects | Webdesino",
  description:
    "Explore Webdesino's portfolio of successful web development and digital marketing projects. See how we've helped businesses in Delhi NCR achieve remarkable growth through SEO, website development, and digital marketing strategies.",
  keywords:
    "web development portfolio, SEO case studies, digital marketing projects, website development delhi, portfolio projects",
  openGraph: {
    title: "Portfolio - Web Development Projects | Webdesino",
    description:
      "Explore Webdesino's portfolio of successful web development and digital marketing projects.",
    type: "website",
  },
};

export default function PortfolioPage() {
  const projects = getPortfolioProjects();
  const industries = getIndustries().filter((ind) => ind !== "All");

  return (
    <main className="min-h-screen bg-cream py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-center text-[#02066F] mb-4">
            Our Portfolio & Case Studies
          </h1>
          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Discover how Webdesino has helped businesses across Delhi NCR achieve remarkable
            growth through professional web development, SEO, and digital marketing solutions.
          </p>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/case-studies/${project.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="aspect-video bg-gradient-to-br from-[#02066F]/20 to-black/20 relative overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} - ${project.industry} Website Development`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <GoalIcon className="w-12 h-12 text-[#02066F]" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-[#02066F] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {project.industry}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#02066F] mb-2 group-hover:text-[#02066F] transition">
                    {project.title}
                  </h2>
                  <p className="text-gray-700 line-clamp-2">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Industries Served */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#02066F] mb-6 text-center">
              Industries We Serve
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="px-4 py-2 bg-gray-100 text-[#02066F] rounded-full font-semibold"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

