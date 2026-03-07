import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-[#111184] mb-4">
          Project Not Found
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          The portfolio project you're looking for doesn't exist. 
        </p>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 bg-[#111184] text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-black transition"
        >
          <ArrowLeft size={20} />
          Back to Portfolio
        </Link>
      </div>
    </main>
  );
}

