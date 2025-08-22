import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arcade: ["var(--font-press-start-2p)", "monospace"],
      },
      colors: {
        "arcade-shadow": "rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      transitionProperty: {
        "height": "height",
        "spacing": "margin, padding",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow": "0 0 20px rgba(16, 185, 129, 0.5)",
        "glow-lg": "0 0 40px rgba(16, 185, 129, 0.7)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-emerald": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        "gradient-green": "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      },
      screens: {
        "xs": "475px",
        "3xl": "1600px",
        "4xl": "1920px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  corePlugins: {
    preflight: true,
    container: false,
  },
};

export default config;
