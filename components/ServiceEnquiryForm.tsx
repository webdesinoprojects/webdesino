"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2, User, Mail, Phone, MessageSquare, ShieldCheck} from "lucide-react";
import { createEnquiry } from "@/lib/actions";

interface ServiceEnquiryFormProps {
  serviceTitle: string;
  source?: "ads-landing";
  landingService?: "web-development" | "google-ads" | "meta-ads" | "seo-optimization";
}

export default function ServiceEnquiryForm({
  serviceTitle,
  source,
  landingService,
}: ServiceEnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append("service", serviceTitle);
    if (source && landingService) {
      formData.append("source", source);
      formData.append("landingService", landingService);
    }

    const result = await createEnquiry(formData);
    
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-white/20 text-center animate-fade-in h-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-[#111184]/10 text-[#111184] rounded-full flex items-center justify-center mb-6 animate-scale-in">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Received!</h3>
        <p className="text-gray-600 mb-8 max-w-xs mx-auto">
          Thanks for your interest in <span className="font-semibold text-[#111184]">{serviceTitle}</span>. Our team will get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-[#111184] font-semibold hover:text-black transition-colors underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#111184] rounded-2xl p-6 lg:p-8 shadow-2xl shadow-[#111184]/20 border border-white/10 relative overflow-hidden animate-fade-in-up">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#111184]/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      <div className="mb-8 relative z-10">
        <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white mb-3 border border-white/10">
          Fast Response
        </span>
        <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Quote</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Ready to start your <span className="text-white font-semibold">{serviceTitle}</span> project? Fill out the form and we'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div className="relative group">
          <label htmlFor="service-enquiry-name" className="sr-only">Your name</label>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors">
            <User size={18} />
          </div>
          <input
            id="service-enquiry-name"
            type="text"
            name="name"
            required
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 outline-none transition-all"
            placeholder="Your Name"
          />
        </div>

        <div className="relative group">
          <label htmlFor="service-enquiry-email" className="sr-only">Email address</label>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors">
            <Mail size={18} />
          </div>
          <input
            id="service-enquiry-email"
            type="email"
            name="email"
            required
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 outline-none transition-all"
            placeholder="Email Address"
          />
        </div>

        <div className="relative group">
          <label htmlFor="service-enquiry-phone" className="sr-only">Phone number</label>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors">
            <Phone size={18} />
          </div>
          <input
            id="service-enquiry-phone"
            type="tel"
            name="phone"
            required
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 outline-none transition-all"
            placeholder="Phone Number"
          />
        </div>

        <div className="relative group">
          <label htmlFor="service-enquiry-message" className="sr-only">Project requirements</label>
          <div className="absolute left-3 top-4 text-gray-400 group-focus-within:text-white transition-colors">
            <MessageSquare size={18} />
          </div>
          <textarea
            id="service-enquiry-message"
            name="message"
            rows={3}
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 outline-none transition-all resize-none"
            placeholder="Tell us about your project requirements..."
          ></textarea>
        </div>

        {error && (
          <div className="text-red-300 text-sm text-center bg-red-900/20 p-2 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-white text-[#111184] rounded-xl font-bold hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Get My Free Quote <Send size={18} />
            </>
          )}
        </button>
        
        <p className="text-center text-xs text-gray-400 mt-4">
          <span className="inline-flex items-center gap-1"><ShieldCheck size={12} /> 100% Secure & Confidential</span>
        </p>
      </form>
    </div>
  );
}


