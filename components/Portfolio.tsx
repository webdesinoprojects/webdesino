"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/generated/prisma";
import { GoalIcon } from "lucide-react";
import { getStorageUrl } from "@/lib/utils";

interface PortfolioProps {
  projects: Project[];
}

export default function Portfolio({ projects }: PortfolioProps) {
  const industries = ["All", ...Array.from(new Set(projects.map(p => p.industry)))];
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(0);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.industry === activeFilter);

  return (
    <section className="py-10 lg:py-16 bg-white" itemScope itemType="https://schema.org/ItemList">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#111184] mb-4">
            Our Success Stories
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Real results from real businesses. See how we&apos;ve helped clients achieve extraordinary growth.
          </p>
          <Link 
            href="/case-studies" 
            className="inline-block bg-[#111184] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#111184]/90 transition"
          >
            View Detailed Case Studies →
          </Link>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => {
                setActiveFilter(industry);
                setActiveProject(0);
              }}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition ${
                activeFilter === industry
                  ? "bg-[#111184] text-white shadow-md"
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
                  } bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group flex flex-col min-h-[380px]`}
                >
                  <div className="relative aspect-[16/9] min-h-[220px] bg-gray-100 overflow-hidden">
                    {project.image ? (
                      <Image
                        src={getStorageUrl(project.image)}
                        alt={`${project.title} - Webdesino Portfolio Project - ${project.industry} Website Development`}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <GoalIcon className="w-12 h-12 text-[#111184]" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1" itemScope itemType="https://schema.org/CreativeWork">
                    <h3 className="text-xl font-bold text-[#111184] mb-2 group-hover:text-[#111184]/80 transition" itemProp="name">
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
