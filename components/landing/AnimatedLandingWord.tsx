"use client";

const words = ["Leads.", "Customers.", "Revenue.", "Growth."];

export default function AnimatedLandingWord() {
  return (
    <span className="relative inline-flex h-[1.15em] min-w-[5.7ch] justify-center align-bottom text-[#111184]">
      {words.map((word, index) => (
        <span
          key={word}
          className="absolute inset-x-0 opacity-0"
          style={{ animation: `landing-word-cycle 8s ease-in-out ${index * 2}s infinite` }}
        >
          {word}
        </span>
      ))}

      <style jsx>{`
        @keyframes landing-word-cycle {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          8%,
          23% {
            opacity: 1;
            transform: translateY(0);
          }
          29%,
          100% {
            opacity: 0;
            transform: translateY(-14px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          span span {
            animation: none !important;
            display: none;
          }

          span span:first-of-type {
            display: inline;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </span>
  );
}
