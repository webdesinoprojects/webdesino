import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import BlogSidebar from "@/components/BlogSidebar";
import { notFound } from "next/navigation";
import { generateBlogPostingSchema, BASE_URL } from "@/lib/seo";
import { format } from "date-fns";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });
  if (!post) return null;
  
  return {
    title: `${post.title} | WebDesino Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date.toISOString(),
      authors: ['Webdesino Team'],
      images: [
        {
          url: post.image || `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  // Convert Date to string for schema
  const postForSchema = {
    ...post,
    date: post.date.toISOString(),
  };

  const jsonLd = generateBlogPostingSchema(postForSchema);

  return (
    <main className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="bg-[#02066F] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#02066F]/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 text-sm text-white/80 mb-4 font-semibold uppercase tracking-wider">
              <span>{post.category}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
              <span>{format(post.date, "MMMM d, yyyy")}</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-[#02066F]">
                W
              </div>
              <div>
                <div className="font-semibold text-white">WebDesino Team</div>
                <div className="text-xs">Digital Marketing Experts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="lg:w-2/3">
            <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Featured Image */}
              <div className="aspect-video relative bg-slate-100">
                <Image
                  src={post.image || "https://api.microlink.io/?url=https://webdesino.com&screenshot=true&meta=false&embed=screenshot.url"}
                  alt={post.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Article Body */}
              <div className="p-8 lg:p-12 prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-[#02066F] hover:prose-a:text-[#02066F] prose-img:rounded-xl">
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <div>
                    <p className="lead text-xl text-slate-600 mb-8">{post.excerpt}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <h2>Why This Matters for Your Business</h2>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <ul>
                      <li>Strategic Planning and Execution</li>
                      <li>Data-Driven Decision Making</li>
                      <li>Continuous Optimization</li>
                    </ul>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    <blockquote>
                      "Digital marketing is not just about visibility, it's about creating meaningful connections with your audience."
                    </blockquote>
                    <h3>Key Takeaways</h3>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                  </div>
                )}
              </div>
            </article>
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
