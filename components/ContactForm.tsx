"use client";

import { FormEvent, useState } from "react";
import { createEnquiry } from "@/lib/actions";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm({ locationName }: { locationName?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (locationName) {
      formData.append("location", locationName);
    }

    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const result = await createEnquiry(formData);

      if (result?.success) {
        setIsSuccess(true);
        form.reset();
        return;
      }

      setError(result?.error || "Failed to send message. Please try again.");
    } catch (submitError) {
      console.error("Contact form submit failed:", submitError);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="glass-strong rounded-3xl p-8 animate-fade-in h-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-[#111184]/10 text-[#111184] rounded-full flex items-center justify-center mb-6 animate-scale-in">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-8 text-center">
          Thanks for contacting us. We'll get back to you shortly.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-[#111184] font-semibold hover:text-black transition-colors underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-3xl p-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-[#111184] mb-6">
        {locationName ? `Get a Quote in ${locationName}` : "Send Us a Message"}
      </h2>
      <form onSubmit={handleSubmit} method="post" action="#" className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#111184]/50 transition-all"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#111184]/50 transition-all"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#111184]/50 transition-all"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#111184]/50 transition-all"
          >
            <option value="">Select a service</option>
            <option value="web-development">Web Development</option>
            <option value="seo">SEO Services</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="content-writing">Content Writing</option>
            <option value="ecommerce">E-commerce Development</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#111184]/50 transition-all resize-none"
            placeholder="How can we help you?"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {isSuccess && (
          <div className="text-green-600 text-sm font-medium">
            Message sent successfully. Our team will contact you shortly.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#111184] text-white py-4 rounded-xl font-semibold hover:bg-[#111184]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
