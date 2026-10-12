import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.md"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1240px" } },
    extend: {
      /* Hauteurs de ligne du corps de texte.
       *
       * La maquette donne 1,6 a tout le texte courant, de 11 a 18 px, et ne
       * descend plus bas que par exception, en le declarant alors sur
       * l'element. Les tailles nommees de Tailwind, elles, viennent avec une
       * hauteur plus serree : text-base vaut 16 px/1,5 et non 16 px/1,6.
       *
       * L'ecart est d'un pixel et demi par ligne, invisible isolement mais
       * visible sur un paragraphe, et il touchait plus de deux cents elements.
       * On corrige donc l'echelle une fois ici plutot que de poser leading-[1.6]
       * a chaque appel ; les endroits qui veulent plus serre gardent leur
       * leading explicite, qui l'emporte. */
      /* `leading-relaxed` vaut 1,625 chez Tailwind. La maquette n'emploie cette
       * valeur nulle part : son texte aere est a 1,6, tout simplement. L'ecart
       * est de 0,4 px par ligne — invisible seul, mais il portait sur une
       * cinquantaine d'endroits. On redefinit le palier plutot que de remplacer
       * la classe dans vingt fichiers : ici, « relaxed » veut dire 1,6. */
      lineHeight: {
        relaxed: "1.6",
      },
      fontSize: {
        xs: ["12px", "1.6"],
        sm: ["14px", "1.6"],
        base: ["16px", "1.6"],
        lg: ["18px", "1.6"],
        xl: ["20px", "1.55"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: { DEFAULT: "hsl(var(--surface))", alt: "hsl(var(--surface-alt))" },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          foreground: "hsl(var(--primary-foreground))",
          pale: "hsl(var(--accent-pale))",
          soft: "hsl(var(--accent-soft))",
        },
        // Fonds sombres de la maquette
        plum: {
          DEFAULT: "hsl(var(--plum))",
          deep: "hsl(var(--plum-deep))",
          mid: "hsl(var(--plum-mid))",
          dark: "hsl(var(--plum-dark))",
        },
        lavender: {
          DEFAULT: "hsl(var(--lavender))",
          soft: "hsl(var(--lavender-soft))",
          mist: "hsl(var(--lavender-mist))",
        },
        // Les filets sont l'encre à 12 % ; aucun modificateur d'opacité ne les vise.
        border: "hsl(var(--foreground) / 0.12)",
        muted: { DEFAULT: "hsl(var(--surface))", foreground: "hsl(var(--muted-foreground))" },
        // Conservés pour les composants non encore repris par la v2
        accent: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--surface))", foreground: "hsl(var(--foreground))" },
        gold: "hsl(var(--primary))",
      },
      fontFamily: {
        display: ["var(--font-display)", '"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      // La maquette n'utilise qu'un seul rayon : 3 px.
      borderRadius: { lg: "3px", md: "3px", sm: "3px" },
      maxWidth: { page: "1240px" },
      // La maquette replie la navigation en bouton « Menu » sous 1200 px.
      screens: { nav: "1200px" },
      backgroundImage: { hero: "var(--hero)" },
    },
  },
  plugins: [],
}
export default config
