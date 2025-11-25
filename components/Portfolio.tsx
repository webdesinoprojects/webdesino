"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getIndustries } from "@/lib/data";
import type { PortfolioProject } from "@/lib/data";
import { GoalIcon } from "lucide-react";

interface PortfolioProps {
  projects: PortfolioProject[];
}

export default function Portfolio({ projects }: PortfolioProps) {
  const industries = getIndustries();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(0);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.industry === activeFilter);

  return (
    <section className="py-12 lg:py-20 bg-white" itemScope itemType="https://schema.org/ItemList">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-teal mb-4">
            Our Success Stories
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Real results from real businesses. See how we&apos;ve helped clients achieve extraordinary growth.
          </p>
          <Link 
            href="/case-studies" 
            className="inline-block bg-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-orange/90 transition"
          >
            View Detailed Case Studies →
          </Link>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => {
                setActiveFilter(industry);
                setActiveProject(0);
              }}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition ${
                activeFilter === industry
                  ? "bg-orange text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Project Display - Video/Iframe Area */}
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredProjects.map((project, idx) => (
                <Link
                  key={project.id}
                  href={`/case-studies/${project.slug}`}
                  className={`${
                    idx === activeProject ? "md:col-span-2" : "hidden md:block"
                  } bg-cream rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group`}
                >
                  <div className="aspect-video bg-gradient-to-br from-orange/20 to-teal/20 relative overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} - Webdesino Portfolio Project - ${project.industry} Website Development`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <GoalIcon className="w-12 h-12 text-orange" />
                      </div>
                    )}
                  </div>
                  <div className="p-6" itemScope itemType="https://schema.org/CreativeWork">
                    <h3 className="text-xl font-bold text-teal mb-2 group-hover:text-orange transition" itemProp="name">
                      {project.title}
                    </h3>
                    <p className="text-gray-700" itemProp="description">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
