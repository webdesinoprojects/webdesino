"use client";

import Link from "next/link";
import type { CaseStudy } from "@/lib/data";

interface CaseStudiesListProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudiesList({ caseStudies }: CaseStudiesListProps) {
  if (caseStudies.length === 0) return null;

  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-[#02066F] mb-10 animate-fade-in">
            Client Success Stories
          </h2>
          
          <div className="space-y-6">
            {caseStudies.map((study, idx) => {
              const content = (
                <div
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-l-4 border-[#02066F] animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold text-[#02066F] mb-2">{study.title}</h3>
                  <p className="text-gray-700">{study.result}</p>
                </div>
              );

              return study.slug ? (
                <Link key={idx} href={`/case-studies/${study.slug}`} className="block">
                  {content}
                </Link>
              ) : (
                <div key={idx}>{content}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
