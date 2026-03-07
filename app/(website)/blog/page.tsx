import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import BlogSidebar from "@/components/BlogSidebar";
import { format } from "date-fns";

import { getStorageUrl } from "@/lib/utils";

export const metadata = {
  title: "Blog | WebDesino - Insights on Web Design & Development",
  description: "Read our latest articles on web design trends, development best practices, SEO strategies, and digital marketing insights.",
};

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 10;
  
  const totalPosts = await prisma.blogPost.count();
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  const currentPosts = await prisma.blogPost.findMany({
    orderBy: { date: 'desc' },
    skip: (currentPage - 1) * postsPerPage,
    take: postsPerPage,
  });

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#111184] text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Our Blog
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto animate-slide-up">
            Insights, thoughts, and trends from the world of web design and development.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {currentPosts.map((post, idx) => (
                <article
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
                >
                  <Link href={`/blog/${post.slug}`} className="block aspect-[16/10] relative overflow-hidden bg-slate-100 group">
                    <Image
                      src={getStorageUrl(post.image || "/location-story.png")}
                      alt={post.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#111184] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {post.category}
                    </div>
                  </Link>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{format(post.date, "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>WebDesino Team</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-[#111184] transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[#111184] font-semibold text-sm hover:gap-3 transition-all group"
                    >
                      Read More 
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                {currentPage > 1 && (
                  <Link
                    href={`/blog?page=${currentPage - 1}`}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-[#111184] hover:text-white hover:border-[#111184] transition-all"
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </Link>
                )}
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/blog?page=${page}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition-all ${
                        currentPage === page
                          ? "bg-[#111184] text-white"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                </div>

                {currentPage < totalPages && (
                  <Link
                    href={`/blog?page=${currentPage + 1}`}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-[#111184] hover:text-white hover:border-[#111184] transition-all"
                  >
                    Next
                    <ChevronRight size={18} />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <BlogSidebar />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
