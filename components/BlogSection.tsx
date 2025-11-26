import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getBlogPosts } from "@/lib/data";

export default function BlogSection() {
  const posts = getBlogPosts().slice(0, 3); // Get latest 3 posts

  return (
    <section className="py-10 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-[#02066F] font-bold tracking-wider uppercase text-sm mb-2 block">
            Our Blog
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Latest Blogs on Web Development
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Stay updated with insights from WebDesino. Our latest blogs focus on local web development in Delhi NCR, SEO strategies, and digital marketing growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-slate-100">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || `https://placehold.co/600x400?text=${encodeURIComponent(post.title)}`}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#02066F]">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    WebDesino Team
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-[#02066F] transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-600 mb-6 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#02066F] font-semibold hover:gap-3 transition-all"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-50 transition-all hover:shadow-md"
          >
            View All Posts <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
