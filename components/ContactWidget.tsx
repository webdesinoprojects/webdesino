"use client";

// import { useState } from "react";
// import { Phone, MessageCircle, MessageSquare, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function ContactWidget() {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 lg:bottom-8 right-6 z-50 flex flex-col items-center gap-4">
      
      {/* Sub buttons container*/}
      {/* <div className={`flex flex-col gap-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}> */}
        
        {/* <Link
          href="tel:+919310851557"
          className="w-12 h-12 bg-[#00e676] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Call Us"
        >
          <Phone size={24} />
        </Link> */}

        <Link
          href="https://wa.me/919310851557"
          target="_blank"
          className="w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="WhatsApp"
        >
          <FaWhatsapp size={28} />
        </Link>
      {/* </div> */}

      {/* Main Toggle Button */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#a855f7] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform relative"
      >
        <div className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}>
          <MessageSquare size={28} fill="currentColor" />
        </div>
        <div className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}>
          <X size={28} />
        </div>
      </button> */}
    </div>
  );
}