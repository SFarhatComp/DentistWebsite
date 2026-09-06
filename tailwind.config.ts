import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.md"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          foreground: "hsl(var(--primary-foreground))",
          // Texte foncé posé sur une surface rose
          on: "hsl(var(--on-primary))",
          "on-muted": "hsl(var(--on-primary-muted))",
        },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        surface: { DEFAULT: "hsl(var(--surface))", alt: "hsl(var(--surface-alt))" },
        urgence: "hsl(var(--urgence))",
        // --border et --muted-foreground sont --foreground avec alpha (handoff §1).
        border: "hsl(var(--foreground) / 0.16)",
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--foreground) / 0.72)" },
        gold: "hsl(var(--gold))",
      },
      fontFamily: {
        display: ["var(--font-display)", "\"Familjen Grotesk\"", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "\"Space Grotesk\"", "system-ui", "sans-serif"],
      },
      borderRadius: { lg: "0.5rem", md: "0.375rem", sm: "0.25rem" },
    },
  },
  plugins: [],
}
export default config
