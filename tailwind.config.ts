import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'scroll-y': 'scroll-y 40s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'scroll-y': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-33.33%)' },
        }
      },
      colors: {
        cream: "#F8FAFC", // Off-White/Slate-50
        orange: "#3B82F6", // Changed from Cyan to Royal Blue
        teal: "#0F172A", // Changed from Midnight Blue to Slate-900 (Rich Navy)
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;

