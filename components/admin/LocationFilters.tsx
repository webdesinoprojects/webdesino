"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

export interface LocationFilterOption {
  value: string;
  label: string;
}

interface LocationFiltersProps {
  /** Curated + DB-distinct; sorted by label */
  stateOptions: LocationFilterOption[];
}

function buildQuery(
  searchParams: URLSearchParams,
  updates: { state?: string; service?: string; search?: string }
) {
  const params = new URLSearchParams(searchParams.toString());
  params.delete("page");

  if (updates.state !== undefined) {
    if (updates.state) params.set("state", updates.state);
    else params.delete("state");
  }
  if (updates.service !== undefined) {
    if (updates.service) params.set("service", updates.service);
    else params.delete("service");
  }
  if (updates.search !== undefined) {
    if (updates.search) params.set("search", updates.search);
    else params.delete("search");
  }

  const s = params.toString();
  return s ? `/admin/locations?${s}` : "/admin/locations";
}

export default function LocationFilters({ stateOptions }: LocationFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentState = searchParams.get("state") || "";
  const currentService = searchParams.get("service") || "";
  const currentSearch = searchParams.get("search") || "";
  
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Sync search input with URL params
  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const services = [
    { value: "all-services", label: "All Services" },
    { value: "web-development", label: "Web Development" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "seo-services", label: "SEO Services" },
    { value: "graphic-designing", label: "Graphic Designing" },
    { value: "content-writing", label: "Content Writing" },
  ];

  const handleStateChange = (value: string) => {
    router.push(buildQuery(searchParams, { state: value }));
  };

  const handleServiceChange = (value: string) => {
    router.push(buildQuery(searchParams, { service: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(buildQuery(searchParams, { search: searchInput.trim() }));
  };

  const handleClearSearch = () => {
    setSearchInput("");
    router.push(buildQuery(searchParams, { search: "" }));
  };

  const hasActiveFilters = currentState || currentService || currentSearch;

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="w-full">
        <label
          htmlFor="search-input"
          className="text-sm font-medium text-slate-700 mb-1 block"
        >
          Search locations
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="search-input"
            type="text"
            placeholder="Search by location name or slug..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 pr-20"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-16 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <Button
            type="submit"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="state-filter"
            className="text-sm font-medium text-slate-700 mb-1 block"
          >
            Filter by state
          </label>
          <select
            id="state-filter"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#111184] text-sm"
            value={currentState}
            onChange={(e) => handleStateChange(e.target.value)}
          >
            <option value="">All states</option>
            {stateOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="service-filter"
            className="text-sm font-medium text-slate-700 mb-1 block"
          >
            Filter by service
          </label>
          <select
            id="service-filter"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#111184] text-sm"
            value={currentService}
            onChange={(e) => handleServiceChange(e.target.value)}
          >
            <option value="">All services</option>
            {services.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <div className="sm:pb-0">
            <Link href="/admin/locations">
              <Button variant="outline" size="sm" type="button">
                Clear all
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
