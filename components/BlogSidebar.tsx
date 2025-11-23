import Link from "next/link";
import { Search } from "lucide-react";
import { getBlogPosts } from "@/lib/data";

export default function BlogSidebar() {
  const recentPosts = getBlogPosts().slice(0, 5);
  const categories = ["Digital Marketing", "SEO", "Web Development", "Social Media"];
  const archives = ["November 2025", "October 2025", "September 2025"];

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4">Search</h3>
        <form className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-4 pr-10 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4 border-b border-slate-100 pb-2">Recent Posts</h3>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`} className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium line-clamp-2">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Comments */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4 border-b border-slate-100 pb-2">Recent Comments</h3>
        <p className="text-slate-500 text-sm">No comments to show.</p>
      </div>

      {/* Archives */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4 border-b border-slate-100 pb-2">Archives</h3>
        <ul className="space-y-2">
          {archives.map((archive) => (
            <li key={archive}>
              <Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors text-sm">
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
              <Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors text-sm flex items-center justify-between group">
                <span>{cat}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
