import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#006C33",
          dark:    "#004F24",
          light:   "#008040",
          pale:    "#E8F5EE",
          muted:   "#5A9970",
        },
        gold: {
          DEFAULT: "#FFD700",
          dark:    "#D4A800",
          light:   "#FFE566",
          pale:    "#FFFBEB",
        },
        ink:   "#111827",
        sub:   "#374151",
        muted: "#6B7280",
        faint: "#F9FAFB",
        line:  "#E5E7EB",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans:  ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card:   "0 1px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        hover:  "0 4px 12px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.11)",
        green:  "0 4px 16px rgba(0,108,51,0.22)",
        "green-lg": "0 8px 28px rgba(0,108,51,0.30)",
        gold:   "0 4px 16px rgba(255,215,0,0.35)",
        "gold-lg":  "0 8px 28px rgba(255,215,0,0.45)",
      },
      transitionDuration: {
        "350": "350ms",
        "400": "400ms",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)"  },
          "50%":      { transform: "translateY(-10px)" },
        },
        pulse_dot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.5", transform: "scale(0.85)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        float:     "float 4s ease-in-out infinite",
        pulse_dot: "pulse_dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
