"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2, User, Mail, Phone, MessageSquare, ShieldCheck} from "lucide-react";

export default function ServiceEnquiryForm({ serviceTitle }: { serviceTitle: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-white/20 text-center animate-fade-in h-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-[#02066F]/10 text-[#02066F] rounded-full flex items-center justify-center mb-6 animate-scale-in">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Received!</h3>
        <p className="text-gray-600 mb-8 max-w-xs mx-auto">
          Thanks for your interest in <span className="font-semibold text-[#02066F]">{serviceTitle}</span>. Our team will get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-[#02066F] font-semibold hover:text-black transition-colors underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#02066F] rounded-2xl p-6 lg:p-8 shadow-2xl shadow-[#02066F]/20 border border-white/10 relative overflow-hidden animate-fade-in-up">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#4F46E5]/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
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
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors">
            <User size={18} />
          </div>
          <input
            type="text"
            required
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 outline-none transition-all"
            placeholder="Your Name"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors">
            <Mail size={18} />
          </div>
          <input
            type="email"
            required
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 outline-none transition-all"
            placeholder="Email Address"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors">
            <Phone size={18} />
          </div>
          <input
            type="tel"
            required
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 outline-none transition-all"
            placeholder="Phone Number"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-3 top-4 text-gray-400 group-focus-within:text-white transition-colors">
            <MessageSquare size={18} />
          </div>
          <textarea
            rows={3}
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-white/30 focus:bg-white/10 focus:ring-1 focus:ring-white/30 outline-none transition-all resize-none"
            placeholder="Tell us about your project requirements..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-white text-[#02066F] rounded-xl font-bold hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

