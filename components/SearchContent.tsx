"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Faq } from "@/lib/generated/prisma";
import FAQComponent from "@/components/FAQ";
import { replaceLocationPlaceholder } from "@/lib/utils";

interface SearchContentProps {
  faqs: Faq[];
}

export default function SearchContent({ faqs }: SearchContentProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter FAQs based on search query
  const filteredFaqs = query 
    ? faqs.filter(faq => 
        replaceLocationPlaceholder(faq.question).toLowerCase().includes(query.toLowerCase()) || 
        replaceLocationPlaceholder(faq.answer).toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream via-white to-cream pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#111184] mb-8 text-center">
            Search Results
          </h1>

          <div className="relative mb-12">
            <label htmlFor="site-search" className="sr-only">
              Search services, blogs, or FAQs
            </label>
            <Input
              id="site-search"
              type="text"
              placeholder="Search for services, blogs, or FAQs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 py-6 text-lg rounded-full shadow-lg border-gray-200 focus:border-[#111184] focus:ring-[#111184]"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>

          {query && (
            <div className="space-y-12">
              {/* FAQ Results */}
              {filteredFaqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#111184] mb-6">
                    Frequently Asked Questions
                  </h2>
                  <FAQComponent faqs={filteredFaqs} />
                </div>
              )}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">
                    No results found for "{query}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
