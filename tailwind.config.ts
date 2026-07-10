import type { Config } from "tailwindcss";

/**
 * Brand colors point at the CSS variables in globals.css, so :root stays the
 * single source of truth. `<alpha-value>` lets opacity modifiers work —
 * e.g. bg-brand-green/10, text-brand-gold/50.
 *
 * NOTE: adjust `content` globs to match your folder layout if it isn't src/.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:        "rgb(var(--green-rgb) / <alpha-value>)",
          "green-hover":"rgb(var(--green-hover-rgb) / <alpha-value>)",
          "green-deep": "rgb(var(--green-deep-rgb) / <alpha-value>)",
          gold:         "rgb(var(--gold-rgb) / <alpha-value>)",
          "gold-ink":   "#8A6708",
          orange:       "rgb(var(--orange-rgb) / <alpha-value>)",
          "orange-deep":"rgb(var(--orange-deep-rgb) / <alpha-value>)",
          taupe:        "rgb(var(--taupe-rgb) / <alpha-value>)",
          sand:         "#F6F1EB",
          ink:          "rgb(var(--ink-rgb) / <alpha-value>)",
          muted:        "#6B7280",
        },
      },
      fontFamily: {
        sans:   ["var(--font-sans)"],
        serif:  ["var(--font-serif)"],
        script: ["var(--font-script)"],
      },
      borderRadius: { card: "var(--radius)" },
      boxShadow:    { card: "var(--shadow-card)", "card-hover": "var(--shadow-card-hover)" },
      maxWidth:     { container: "var(--container)" },
      height:       { section: "var(--section-h)" },
    },
  },
  plugins: [],
};

export default config;