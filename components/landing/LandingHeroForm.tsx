"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, Loader2, X } from "lucide-react";
import { createEnquiry } from "@/lib/actions";

const services = [
  "I want to discuss over call",
  "Website Design/Development",
  "E-commerce Website",
  "Digital Marketing",
  "Performance & Growth Marketing",
  "Search Engine Optimisation (SEO)",
  "Social Media Management",
  "Video Production",
  "AI & Automation",
  "Content Writing",
  "Graphic Designing",
  "Influencer Marketing",
  "Brand Building",
];

export default function LandingHeroForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("source", "ads-landing");
    formData.append("landingService", "general");
    const result = await createEnquiry(formData);

    setIsSubmitting(false);
    if (result.success) {
      formRef.current?.reset();
      setShowToast(true);
      timerRef.current = setTimeout(() => setShowToast(false), 4000);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-7 shadow-xl shadow-slate-200/80 lg:p-8">
      <h3 className="mb-1 text-lg font-bold text-slate-900">Get a Free Consultation</h3>
      <p className="mb-5 text-sm text-slate-500">Fill in your details and we'll reach out within 24 hours.</p>

      {showToast && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-800">Enquiry submitted!</p>
            <p className="text-xs text-green-700">Our team will reach out to you within 24 hours.</p>
          </div>
          <button type="button" onClick={() => setShowToast(false)} className="text-green-500 hover:text-green-700">
            <X size={14} />
          </button>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="hero-name" className="mb-1 block text-xs font-semibold text-slate-600">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="hero-name"
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#111184]/40 focus:outline-none focus:ring-2 focus:ring-[#111184]/10 transition"
            />
          </div>
          <div>
            <label htmlFor="hero-phone" className="mb-1 block text-xs font-semibold text-slate-600">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              id="hero-phone"
              type="tel"
              name="phone"
              required
              placeholder="Enter phone number"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#111184]/40 focus:outline-none focus:ring-2 focus:ring-[#111184]/10 transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="hero-email" className="mb-1 block text-xs font-semibold text-slate-600">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="hero-email"
            type="email"
            name="email"
            required
            placeholder="Enter your email address"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#111184]/40 focus:outline-none focus:ring-2 focus:ring-[#111184]/10 transition"
          />
        </div>

        <div>
          <label htmlFor="hero-service" className="mb-1 block text-xs font-semibold text-slate-600">
            Service you are looking for <span className="text-rose-500">*</span>
          </label>
          <select
            id="hero-service"
            name="service"
            required
            defaultValue=""
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 focus:border-[#111184]/40 focus:outline-none focus:ring-2 focus:ring-[#111184]/10 transition bg-white"
          >
            <option value="" disabled>Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="hero-message" className="mb-1 block text-xs font-semibold text-slate-600">
            Brief Requirements <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="hero-message"
            name="message"
            required
            rows={3}
            placeholder="Tell us about your project ideas..."
            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#111184]/40 focus:outline-none focus:ring-2 focus:ring-[#111184]/10 transition"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111184] py-3.5 text-sm font-bold text-white shadow-md shadow-[#111184]/25 transition hover:bg-[#0b0b68] hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
