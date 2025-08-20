import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'gradient-rotate': 'gradient-rotate 20s linear infinite',
        'gradient-pulse': 'gradient-pulse 4s ease-in-out infinite',
        'gradient-flow': 'gradient-flow 12s ease infinite',
        'gradient-wave': 'gradient-wave 6s ease-in-out infinite',
        'first': 'moveVertical 30s ease infinite',
        'second': 'moveInCircle 20s reverse infinite',
        'third': 'moveInCircle 40s linear infinite',
        'fourth': 'moveHorizontal 40s ease infinite',
        'fifth': 'moveInCircle 20s ease infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-shift': {
          '0%': {
            'background-position': '0% 50%',
            'background-size': '200% 200%'
          },
          '50%': {
            'background-position': '100% 50%',
            'background-size': '200% 200%'
          },
          '100%': {
            'background-position': '0% 50%',
            'background-size': '200% 200%'
          }
        },
        'gradient-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'gradient-pulse': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'opacity': '1'
          },
          '50%': {
            'background-size': '300% 300%',
            'opacity': '0.8'
          }
        },
        'gradient-flow': {
          '0%': {
            'background-position': '0% 0%',
            'background-size': '300% 300%'
          },
          '25%': {
            'background-position': '100% 0%',
            'background-size': '300% 300%'
          },
          '50%': {
            'background-position': '100% 100%',
            'background-size': '300% 300%'
          },
          '75%': {
            'background-position': '0% 100%',
            'background-size': '300% 300%'
          },
          '100%': {
            'background-position': '0% 0%',
            'background-size': '300% 300%'
          }
        },
        'gradient-wave': {
          '0%, 100%': {
            'background-position': '0% 50%',
            'background-size': '200% 200%'
          },
          '25%': {
            'background-position': '100% 50%',
            'background-size': '200% 200%'
          },
          '50%': {
            'background-position': '100% 100%',
            'background-size': '200% 200%'
          },
          '75%': {
            'background-position': '0% 100%',
            'background-size': '200% 200%'
          }
        },
        moveHorizontal: {
          '0%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
          '50%': {
            transform: 'translateX(50%) translateY(10%)',
          },
          '100%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
        },
        moveInCircle: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(180deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        moveVertical: {
          '0%': {
            transform: 'translateY(-50%)',
          },
          '50%': {
            transform: 'translateY(50%)',
          },
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
};

export default config;
