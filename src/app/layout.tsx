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
  alternates: {
    // « x-default » dit a Google quelle version servir a qui n'est ni
    // francophone ni anglophone declare. Sans elle, il choisit au hasard.
    languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
  },
  openGraph: {
    type: "website",
    siteName: "Studio Dentaire [de facto]",
    locale: "fr_CA",
    alternateLocale: "en_CA",
    url: "https://studiodefacto.ca/fr",
    images: [{ url: "/v2/facade.webp", width: 1200, height: 1600, alt: "La façade du studio au 728, rue Fleury Est" }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "Dentiste",
}

/* --------------------------------------------------------------------------
 * Fiche de l'etablissement, en donnees structurees.
 *
 * C'est ce que Google lit pour savoir qu'il s'agit d'un cabinet dentaire reel,
 * ou il se trouve et ce qu'il offre. Un bloc complet ne garantit pas le
 * referencement, mais un bloc pauvre le freine : sans coordonnees ni image,
 * rien ne rattache le site a un lieu.
 *
 * Les coordonnees sont celles du 728 rue Fleury Est, relevees sur
 * OpenStreetMap. Elles doivent pointer sur la porte, pas sur le quartier.
 * ----------------------------------------------------------------------- */
const SITE = "https://studiodefacto.ca"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE}/#studio`,
  // La raison sociale, sans crochets : ce champ sert a Google et aux annuaires
  // pour identifier l'entreprise, et doit correspondre au nom sous lequel le
  // studio est enregistre. La marque crochetee est partout ailleurs, ou elle
  // s'adresse a un lecteur.
  name: "Studio Dentaire De Facto",
  alternateName: "Studio Dentaire [de facto]",
  description:
    "Studio dentaire independant a Ahuntsic, Montreal. Dr Bader Ramdani, dentiste generaliste. Examen complet, urgence le jour meme, atelier de protheses sur place.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "728 rue Fleury Est",
    addressLocality: "Montréal",
    addressRegion: "QC",
    postalCode: "H2C 1P1",
    addressCountry: "CA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 45.5560771, longitude: -73.6600516 },
  hasMap: "https://www.google.com/maps?q=728+rue+Fleury+Est,+Montréal,+QC+H2C+1P1",
  telephone: "+1-514-863-7805",
  email: "info@studiodefacto.ca",
  url: SITE,
  image: `${SITE}/v2/facade.webp`,
  logo: `${SITE}/v2/logo.svg`,
  priceRange: "$$",
  currenciesAccepted: "CAD",
  paymentAccepted: "Comptant, débit, carte de crédit",
  inLanguage: ["fr-CA", "en-CA"],
  areaServed: [
    { "@type": "City", name: "Montréal" },
    { "@type": "AdministrativeArea", name: "Ahuntsic-Cartierville" },
  ],
  medicalSpecialty: "Dentistry",
  founder: { "@type": "Person", name: "Dr Bader Ramdani", jobTitle: "Dentiste généraliste" },
  // Lundi et mardi 10 h – 18 h, mercredi 15 h – 20 h (maquette v2).
  // Jeudi et vendredi ne sont pas déclarés : « bientôt disponible ».
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday"], opens: "10:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday"], opens: "15:00", closes: "20:00" },
  ],
  availableService: [
    { "@type": "MedicalProcedure", name: "Examen dentaire complet" },
    { "@type": "MedicalProcedure", name: "Nettoyage et détartrage" },
    { "@type": "MedicalProcedure", name: "Urgence dentaire" },
    { "@type": "MedicalProcedure", name: "Couronnes, ponts et prothèses" },
    { "@type": "MedicalProcedure", name: "Traitement de canal" },
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
