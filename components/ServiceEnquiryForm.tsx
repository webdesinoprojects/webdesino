"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2, User, Mail, Phone, MessageSquare } from "lucide-react";

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
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-scale-in">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Received!</h3>
        <p className="text-gray-600 mb-8 max-w-xs mx-auto">
          Thanks for your interest in <span className="font-semibold text-teal">{serviceTitle}</span>. Our team will get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-teal font-semibold hover:text-orange transition-colors underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-2xl border border-white/20 relative overflow-hidden animate-fade-in-up">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange via-white to-orange"></div>
      
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Get a Free Quote</h3>
        <p className="text-gray-200 text-sm">
          Ready to start your <span className="text-orange font-semibold">{serviceTitle}</span> project? Fill out the form below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange transition-colors">
            <User size={18} />
          </div>
          <input
            type="text"
            required
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange focus:ring-1 focus:ring-orange outline-none transition-all"
            placeholder="Your Name"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange transition-colors">
            <Mail size={18} />
          </div>
          <input
            type="email"
            required
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange focus:ring-1 focus:ring-orange outline-none transition-all"
            placeholder="Email Address"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange transition-colors">
            <Phone size={18} />
          </div>
          <input
            type="tel"
            required
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange focus:ring-1 focus:ring-orange outline-none transition-all"
            placeholder="Phone Number"
          />
        </div>

        <div className="relative group">
          <div className="absolute left-3 top-4 text-gray-400 group-focus-within:text-orange transition-colors">
            <MessageSquare size={18} />
          </div>
          <textarea
            rows={3}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange focus:ring-1 focus:ring-orange outline-none transition-all resize-none"
            placeholder="Tell us about your project requirements..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-orange to-red-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-orange/20 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Request Consultation <Send size={18} />
            </>
          )}
        </button>
        
        <p className="text-xs text-center text-gray-400 mt-4">
          We respect your privacy. No spam, ever.
        </p>
      </form>
    </div>
  );
}
