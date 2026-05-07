import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A84FF",
          light: "#5AC8FA",
          dark: "#0056D6"
        },
        success: "#30D158",
        error: "#FF453A",
        warning: "#FFD60A",
        info: "#64D2FF",
        bg: {
          primary: "var(--color-bg-primary)",
          card: "var(--color-bg-card)",
          elevated: "var(--color-bg-elevated)"
        },
        border: {
          DEFAULT: "var(--color-border)",
          light: "var(--color-border-light)"
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          inverse: "var(--color-text-inverse)"
        }
      },
      fontFamily: {
        display: ["Outfit", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["DM Sans", "Source Sans 3", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        hero: "clamp(2.5rem, 5vw, 4.5rem)",
        h1: "clamp(2rem, 4vw, 3rem)",
        h2: "clamp(1.5rem, 3vw, 2.25rem)",
        h3: "clamp(1.25rem, 2vw, 1.75rem)",
        h4: "1.25rem",
        "body-lg": "1.125rem",
        body: "1rem",
        "body-sm": "0.875rem",
        caption: "0.75rem",
        overline: "0.6875rem"
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      boxShadow: {
        bento: "0 1px 3px rgba(0,0,0,0.03), 0 0 1px rgba(0,0,0,0.06)",
        "bento-hover":
          "0 12px 40px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.08)",
        card: "0 2px 8px rgba(0,0,0,0.04), 0 0 1px rgba(0,0,0,0.06)",
        "card-hover":
          "0 8px 30px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.08)"
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #0A84FF 0%, #5AC8FA 100%)",
        "gradient-success":
          "linear-gradient(135deg, #30D158 0%, #63E688 100%)",
        "gradient-hero":
          "linear-gradient(180deg, #000000 0%, #1D1D1F 100%)",
        "gradient-card-blue":
          "linear-gradient(145deg, #E8F4FD 0%, #D1ECFF 100%)",
        "gradient-card-green":
          "linear-gradient(145deg, #E3F9E8 0%, #C6F0D0 100%)",
        "gradient-card-orange":
          "linear-gradient(145deg, #FFF3E0 0%, #FFE0B2 100%)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.25,0.1,0.25,1) both"
      }
    }
  },
  plugins: []
};

export default config;
