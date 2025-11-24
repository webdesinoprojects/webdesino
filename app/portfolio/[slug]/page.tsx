import { getPortfolioProjects } from "@/lib/data";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { notFound } from "next/navigation";
import { generateBreadcrumbSchema, BASE_URL } from "@/lib/seo";

// Helper function to get a single project
const getProjectBySlug = (slug: string) => {
  return getPortfolioProjects().find((project) => project.slug === slug);
};

// Generate static params for all portfolio projects
export async function generateStaticParams() {
  const projects = getPortfolioProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamic SEO metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found | Webdesino",
      description: "The requested portfolio project could not be found.",
    };
  }

  const title = `${project.title} - Webdesino Portfolio | ${project.industry} Website Development`;
  const description = project.fullDescription || project.description;

  return {
    title,
    description,
    keywords: [
      project.title,
      project.industry,
      "web development delhi",
      "SEO services delhi",
      "digital marketing delhi",
      "portfolio",
      "case study",
    ].join(", "),
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: project.image.startsWith("http")
            ? project.image
            : `https://webdesino.com${project.image}`,
          width: 1200,
          height: 630,
          alt: `${project.title} - Webdesino Portfolio Project`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        project.image.startsWith("http")
          ? project.image
          : `https://webdesino.com${project.image}`,
      ],
    },
    alternates: {
      canonical: `/portfolio/${project.slug}`,
    },
  };
}

// Page component
export default function PortfolioProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Generate JSON-LD structured data
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.fullDescription || project.description,
    image: project.image.startsWith("http")
      ? project.image
      : `https://webdesino.com${project.image}`,
    creator: {
      "@type": "Organization",
      name: "Webdesino",
      url: "https://webdesino.com",
    },
    dateCreated: new Date().toISOString(), // Ideally this should come from data
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Portfolio', item: '/portfolio' },
    { name: project.title, item: `/portfolio/${project.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([projectSchema, breadcrumbSchema]) }}
      />
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-teal hover:text-orange transition mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        <article className="container mx-auto px-4 py-12 lg:py-20">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-orange text-white rounded-full text-sm font-semibold">
                {project.industry}
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-teal mb-6">
              {project.title}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Featured Image */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} - Webdesino Portfolio Project`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange/20 to-teal/20 flex items-center justify-center">
                  <div className="text-6xl">🎯</div>
                </div>
              )}
            </div>
          </div>

          {/* Full Description */}
          {project.fullDescription && (
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg">
                <h2 className="text-3xl font-bold text-teal mb-6">Project Overview</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {project.fullDescription}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Metrics/Results */}
          {project.metrics && (
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg">
                <h2 className="text-3xl font-bold text-teal mb-6">Key Results</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {project.metrics.growth && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-orange mb-2">
                        <TrendingUp size={24} />
                        <span className="text-3xl font-bold">{project.metrics.growth}</span>
                      </div>
                      <p className="text-gray-600 font-semibold">Growth</p>
                    </div>
                  )}
                  {project.metrics.sales && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal mb-2">
                        {project.metrics.sales}
                      </div>
                      <p className="text-gray-600 font-semibold">Monthly Sales</p>
                    </div>
                  )}
                  {project.metrics.traffic && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal mb-2">
                        {project.metrics.traffic}
                      </div>
                      <p className="text-gray-600 font-semibold">Traffic Growth</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {project.results && (
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-xl p-8 lg:p-12 shadow-lg">
                <h2 className="text-3xl font-bold text-teal mb-6">Results Achieved</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{project.results}</p>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange to-teal rounded-xl p-8 lg:p-12 text-white text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Let Webdesino help you achieve similar results for your business in Delhi NCR.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-teal px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
              >
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </article>
      </main>
  );
}

