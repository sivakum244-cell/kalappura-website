import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#166534",
          600: "#15803d",
          700: "#14532d",
          800: "#052e16",
          900: "#022c22",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#d4a853",
          600: "#b8860b",
          700: "#92400e",
          800: "#78350f",
          900: "#451a03",
        },
        sand: {
          50: "#fefdfb",
          100: "#fdf8f0",
          200: "#f5ebe0",
          300: "#eddecc",
          400: "#dbc8a8",
          500: "#c9b088",
          600: "#a68a5b",
          700: "#8b6914",
          800: "#6b5730",
          900: "#4a3f2b",
        },
        teak: {
          50: "#faf6f1",
          100: "#f0e6d6",
          200: "#e0ccad",
          300: "#cfab7c",
          400: "#c19356",
          500: "#a67b3d",
          600: "#8b6530",
          700: "#6e4e28",
          800: "#5c4025",
          900: "#4d3622",
        },
        backwater: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        accent: ["Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        "gradient-luxury":
          "linear-gradient(135deg, #f5ebe0 0%, #fefdfb 50%, #f0f9ff 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #d4a853 0%, #fbbf24 50%, #d4a853 100%)",
        "gradient-dark":
          "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)",
      },
      boxShadow: {
        luxury: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
        card: "0 4px 30px rgba(0, 0, 0, 0.06)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.04)",
        gold: "0 4px 20px rgba(212, 168, 83, 0.3)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
