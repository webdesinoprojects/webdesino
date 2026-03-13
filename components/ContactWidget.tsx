"use client";

import { useState } from "react";
import { CalendarClock, Loader2, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { createCallEnquiry } from "@/lib/actions";

export default function ContactWidget() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCallEnquirySubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    const result = await createCallEnquiry(formData);

    setIsSubmitting(false);
    if (!result.success) {
      setError(result.error || "Something went wrong. Please try again.");
      return;
    }

    setSuccessMessage("Our team will contact you very soon");
    setTimeout(() => {
      setIsCardOpen(false);
      setIsDismissed(true);
      setSuccessMessage(null);
    }, 1800);
  };

  return (
    <div className="fixed bottom-24 lg:bottom-8 right-6 z-50 flex flex-col items-end gap-4">
      {!isDismissed && !isCardOpen && (
        <button
          type="button"
          onClick={() => setIsCardOpen(true)}
          className="rounded-full bg-[#111184] text-white px-5 py-3 shadow-xl hover:bg-[#0b0b62] transition-colors text-sm font-semibold"
        >
          Book a 15-minute intro call
        </button>
      )}

      {!isDismissed && isCardOpen && (
        <div className="w-[320px] max-w-[88vw] rounded-2xl bg-white border border-gray-200 shadow-2xl p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="text-sm font-semibold text-[#111184]">Book a 15-minute intro call</p>
              <p className="text-xs text-gray-600">Share basic details and we will call you.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsCardOpen(false);
                setIsDismissed(true);
              }}
              className="text-gray-500 hover:text-gray-800"
              aria-label="Close call enquiry"
            >
              <X size={18} />
            </button>
          </div>

          {successMessage ? (
            <div className="rounded-xl bg-green-50 border border-green-200 px-3 py-4 text-sm text-green-800 text-center font-medium">
              {successMessage}
            </div>
          ) : (
            <form action={handleCallEnquirySubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#111184]/40"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone number"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#111184]/40"
              />
              <input
                type="email"
                name="email"
                placeholder="Email (optional)"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#111184]/40"
              />
              <textarea
                name="issue"
                required
                rows={3}
                placeholder="Likely issue you want to discuss"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#111184]/40"
              />

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#111184] text-white py-2.5 text-sm font-semibold hover:bg-[#0b0b62] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CalendarClock size={16} />
                    Book Intro Call
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}

      <Link
        href="https://wa.me/919310851557"
        target="_blank"
        className="w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="WhatsApp"
      >
        <FaWhatsapp size={28} />
      </Link>
    </div>
  );
}
