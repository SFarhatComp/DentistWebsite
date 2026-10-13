import type { Metadata } from "next"
import { Cormorant_Garamond, Inter, League_Spartan } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
})

/* La maquette ne se sert de League Spartan qu'aux cinq etiquettes « Stade N »
   du schema du parcours. C'est peu, mais ces etiquettes sont la legende du
   diagramme : en Inter elles se confondent avec le texte courant. */
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-etiquette",
  display: "swap",
})

export const metadata: Metadata = {
  title: { default: "Studio Dentaire [de facto]", template: "%s | Studio Dentaire [de facto]" },
  description:
    "Studio dentaire indépendant à Ahuntsic, Montréal. Dr Bader Ramdani, dentiste généraliste. Atelier de prothèses sur place.",
  metadataBase: new URL("https://studiodefacto.ca"),
  alternates: { languages: { fr: "/fr", en: "/en" } },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  // La raison sociale, sans crochets : ce champ sert a Google et aux
  // annuaires pour identifier l'entreprise, et doit correspondre au nom
  // sous lequel le studio est enregistre. La marque crochetee est partout
  // ailleurs, ou elle s'adresse a un lecteur.
  name: "Studio Dentaire De Facto",
  address: {
    "@type": "PostalAddress",
    streetAddress: "728 rue Fleury Est",
    addressLocality: "Montréal",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  telephone: "+1-514-863-7805",
  email: "info@studiodefacto.ca",
  url: "https://studiodefacto.ca",
  // Lundi et mardi 10 h – 18 h, mercredi 15 h – 20 h (maquette v2).
  // Jeudi et vendredi ne sont pas déclarés : « bientôt disponible ».
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday"],
      opens: "10:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Wednesday"],
      opens: "15:00",
      closes: "20:00",
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable} ${leagueSpartan.variable}`}>
      <head>
        {/* Les chevrons sont echappes : sans cela, une valeur contenant
            </script> fermerait la balise et sortirait du bloc JSON-LD. Toutes
            les valeurs sont litterales aujourd hui, mais la protection ne coute
            rien et survit aux modifications futures. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, String.fromCharCode(92) + "u003c") }}
        />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }`,
          }}
        />
      </body>
    </html>
  )
}
