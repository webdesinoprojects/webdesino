"use client";

import { FormEvent, useCallback, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

type SidebarPost = {
  title: string;
  slug: string;
};

type SidebarComment = {
  id: string;
  name: string;
  comment: string;
  postSlug: string;
  createdAt: string;
};

interface BlogSidebarProps {
  initialQuery?: string;
  recentPosts: SidebarPost[];
  recentComments?: SidebarComment[];
}

export default function BlogSidebar({ initialQuery = "", recentPosts, recentComments = [] }: BlogSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const isBlogIndex = pathname === "/blog";
  const categories = ["Digital Marketing", "SEO", "Web Development", "Social Media"];
  const archives = ["November 2025", "October 2025", "September 2025"];
  const trimmedQuery = query.trim();
  const filteredRecentPosts = trimmedQuery
    ? recentPosts.filter((post) => post.title.toLowerCase().includes(trimmedQuery.toLowerCase()))
    : recentPosts;

  const updateSearch = useCallback((value: string, method: "replace" | "push" = "replace") => {
    const nextQuery = value.trim();
    const nextUrl = nextQuery ? `/blog?q=${encodeURIComponent(nextQuery)}` : "/blog";

    startTransition(() => {
      if (method === "push") {
        router.push(nextUrl);
      } else {
        router.replace(nextUrl, { scroll: false });
      }
    });
  }, [router]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery, pathname]);

  useEffect(() => {
    if (!isBlogIndex) return;

    const timeout = window.setTimeout(() => {
      updateSearch(query);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [isBlogIndex, query, updateSearch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSearch(query, isBlogIndex ? "replace" : "push");
  };

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4">Search</h3>
        <form className="relative" onSubmit={handleSubmit}>
          <label htmlFor="blog-sidebar-search" className="sr-only">
            Search blog posts
          </label>
          <input
            id="blog-sidebar-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            className="w-full pl-4 pr-10 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#111184] transition-all"
          />
          <button type="submit" aria-label="Submit blog search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#111184]">
            <Search size={20} />
          </button>
        </form>
        {trimmedQuery && (
          <p className="mt-3 text-xs text-slate-500">
            {isPending ? "Searching..." : `Showing results for "${trimmedQuery}"`}
          </p>
        )}
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4 border-b border-slate-100 pb-2">Recent Posts</h3>
        <ul className="space-y-4">
          {filteredRecentPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="text-slate-600 hover:text-[#111184] transition-colors text-sm font-medium line-clamp-2">
                {post.title}
              </Link>
            </li>
          ))}
          {filteredRecentPosts.length === 0 && (
            <li className="text-sm text-slate-500">No recent posts match your search.</li>
          )}
        </ul>
      </div>

      {/* Recent Comments */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4 border-b border-slate-100 pb-2">Recent Comments</h3>
        {recentComments.length > 0 ? (
          <ul className="space-y-4">
            {recentComments.map((comment) => (
              <li key={comment.id}>
                <Link href={`/blog/${comment.postSlug}`} className="group block">
                  <p className="text-xs font-semibold text-[#111184] group-hover:underline">{comment.name}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{comment.comment}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 text-sm">No comments to show.</p>
        )}
      </div>

      {/* Archives */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4 border-b border-slate-100 pb-2">Archives</h3>
        <ul className="space-y-2">
          {archives.map((archive) => (
            <li key={archive}>
              <Link href="#" className="text-slate-600 hover:text-[#111184] transition-colors text-sm">
                {archive}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4 border-b border-slate-100 pb-2">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <Link href="#" className="text-slate-600 hover:text-[#111184] transition-colors text-sm flex items-center justify-between group">
                <span>{cat}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
