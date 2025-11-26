"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Search, ArrowRight, ExternalLink } from "lucide-react";
import {
  getPortfolioProjects,
  getTestimonials,
  getFAQs,
  getFeatures,
  getServices,
  getResults,
  getCaseStudies,
  type PortfolioProject,
  type Testimonial,
  type FAQ,
  type Feature,
  type Service,
  type Result,
  type CaseStudy,
} from "@/lib/data";

interface SearchResult {
  type: "project" | "testimonial" | "faq" | "feature" | "service" | "result" | "case-study";
  title: string;
  description: string;
  link?: string;
  category?: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Fetch all data
    const portfolioProjects = getPortfolioProjects();
    const testimonials = getTestimonials();
    const faqs = getFAQs();
    const features = getFeatures();
    const services = getServices();
    const results = getResults();
    const caseStudies = getCaseStudies();

    const searchTerm = query.toLowerCase();
    const results_array: SearchResult[] = [];

    // Search in Portfolio Projects
    portfolioProjects.forEach((project: PortfolioProject) => {
      if (
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.industry.toLowerCase().includes(searchTerm) ||
        project.fullDescription?.toLowerCase().includes(searchTerm)
      ) {
        results_array.push({
          type: "project",
          title: project.title,
          description: project.description,
          link: `/portfolio/${project.slug}`,
          category: project.industry,
        });
      }
    });

    // Search in Services
    services.forEach((service: Service) => {
      if (
        service.title.toLowerCase().includes(searchTerm) ||
        service.description?.toLowerCase().includes(searchTerm)
      ) {
        results_array.push({
          type: "service",
          title: service.title,
          description: service.description || "",
          link: service.href,
        });
      }
    });

    // Search in FAQs
    faqs.forEach((faq: FAQ) => {
      if (
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm)
      ) {
        results_array.push({
          type: "faq",
          title: faq.question,
          description: faq.answer,
          link: "/#faq",
          category: faq.category,
        });
      }
    });

    // Search in Features
    features.forEach((feature: Feature) => {
      if (
        feature.title.toLowerCase().includes(searchTerm) ||
        feature.description.toLowerCase().includes(searchTerm)
      ) {
        results_array.push({
          type: "feature",
          title: feature.title,
          description: feature.description,
          link: "/#features",
        });
      }
    });

    // Search in Results/Case Studies Data
    results.forEach((result: Result) => {
      if (
        result.title.toLowerCase().includes(searchTerm) ||
        result.description.toLowerCase().includes(searchTerm) ||
        result.industry.toLowerCase().includes(searchTerm)
      ) {
        results_array.push({
          type: "result",
          title: result.title,
          description: result.description,
          link: result.slug ? `/portfolio/${result.slug}` : "/#results",
          category: result.industry,
        });
      }
    });

    // Search in Case Studies
    caseStudies.forEach((study: CaseStudy) => {
      if (
        study.title.toLowerCase().includes(searchTerm) ||
        study.result.toLowerCase().includes(searchTerm)
      ) {
        results_array.push({
          type: "case-study",
          title: study.title,
          description: study.result,
          link: study.slug ? `/portfolio/${study.slug}` : "/#case-studies",
        });
      }
    });

    // Search in Testimonials
    testimonials.forEach((testimonial: Testimonial) => {
      if (
        testimonial.name.toLowerCase().includes(searchTerm) ||
        testimonial.text.toLowerCase().includes(searchTerm) ||
        testimonial.company?.toLowerCase().includes(searchTerm)
      ) {
        results_array.push({
          type: "testimonial",
          title: `Testimonial from ${testimonial.name}`,
          description: testimonial.text,
          link: "/#testimonials",
          category: testimonial.company,
        });
      }
    });

    setSearchResults(results_array);
    setIsLoading(false);
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Search className="text-[#02066F]" size={32} />
            <h1 className="text-3xl lg:text-5xl font-bold text-[#02066F]">
              Search Results
            </h1>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative glass-strong rounded-full p-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for web design, SEO, or services in Delhi..."
                className="w-full px-6 py-4 pr-12 rounded-full bg-white/80 backdrop-blur border-none focus:outline-none focus:ring-2 focus:ring-[#02066F]/50 text-base transition-all"
                aria-label="Search for services"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#02066F] text-white rounded-full hover:bg-[#02066F]/90 transition-all hover:scale-110"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
          
          {query && (
            <p className="text-xl text-gray-600 mb-6">
              Showing results for: <span className="font-bold text-[#02066F]">"{query}"</span>
            </p>
          )}

          {/* Search Stats */}
          {!isLoading && (
            <div className="glass-strong rounded-2xl p-4 inline-block">
              <p className="text-sm text-gray-700">
                Found <span className="font-bold text-[#02066F]">{searchResults.length}</span> result{searchResults.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#02066F] mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        )}

        {/* No Query */}
        {!query && !isLoading && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="glass-strong rounded-3xl p-12">
              <Search className="text-gray-400 mx-auto mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Enter a search term
              </h2>
              <p className="text-gray-600 mb-6">
                Try searching for "web development", "SEO", "portfolio", or any service you're interested in.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#02066F] text-white px-6 py-3 rounded-full font-semibold hover-lift transition-all"
              >
                Go to Homepage
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}

        {/* No Results */}
        {query && !isLoading && searchResults.length === 0 && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="glass-strong rounded-3xl p-12">
              <Search className="text-gray-400 mx-auto mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                No results found for "{query}"
              </h2>
              <p className="text-gray-600 mb-6">
                Try different keywords or browse our services and portfolio.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 bg-[#02066F] text-white px-6 py-3 rounded-full font-semibold hover-lift transition-all"
                >
                  View Services
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 border-2 border-[#02066F] text-[#02066F] px-6 py-3 rounded-full font-semibold hover:bg-[#02066F] hover:text-white transition-all"
                >
                  View Portfolio
                  <ExternalLink size={18} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            {searchResults.map((result, index) => (
              <Link
                key={index}
                href={result.link || "/"}
                className="block glass-strong rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover-lift group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-white bg-[#02066F] px-3 py-1 rounded-full uppercase">
                        {result.type.replace("-", " ")}
                      </span>
                      {result.category && (
                        <span className="text-xs font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                          {result.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#02066F] mb-2 group-hover:text-[#02066F] transition-colors">
                      {result.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {result.description}
                    </p>
                  </div>
                  <ArrowRight 
                    className="text-[#02066F] flex-shrink-0 transform group-hover:translate-x-2 transition-transform" 
                    size={24} 
                  />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Search Tips */}
        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold text-[#02066F] mb-3">Search Tips:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Try using different keywords or synonyms</li>
                <li>• Search for specific services like "SEO", "web design", or "digital marketing"</li>
                <li>• Browse our portfolio for case studies and client success stories</li>
                <li>• Check our FAQs for common questions and answers</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#02066F]"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
