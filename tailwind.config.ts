import type { Config } from "tailwindcss"

// Palette De Facto (cahier, lot 6) : aubergine, ivoire, mauve ; l'orange est
// réservé au bouton principal (une seule couleur de bouton sur tout le site).
// Contrastes vérifiés : texte blanc sur cta 5,1:1 ; aubergine sur ivoire 14,3:1 ;
// mauve-ink sur ivoire 7,0:1.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aub: { DEFAULT: "#291B2E", deep: "#1B111F", soft: "#3A2940" },
        ivory: { DEFAULT: "#F5F0E6", paper: "#FBF8F3", line: "#E4DCCD" },
        mauve: { DEFAULT: "#A890AE", ink: "#5E4A63", mist: "#E9E1EA" },
        cta: { DEFAULT: "#B3502C", hover: "#9A4425" },
      },
      fontFamily: {
        display: ["\"Cormorant Garamond\"", "Georgia", "serif"],
        sans: ["\"Inter Variable\"", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: { frame: "1240px", prose: "68ch" },
      transitionTimingFunction: {
        expo: "cubic-bezier(.16,1,.3,1)",
        soft: "cubic-bezier(.22,.65,.28,1)",
      },
    },
  },
  plugins: [],
}
export default config
