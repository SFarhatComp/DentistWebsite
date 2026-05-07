import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cormorant" })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: { default: "De Facto Studio Dentaire", template: "%s — De Facto Studio Dentaire" },
  description: "Studio dentaire à Montréal. Une approche réfléchie, précise et personnalisée des soins dentaires.",
  metadataBase: new URL("https://defactodentaire.ca"),
  alternates: { languages: { fr: "/fr", en: "/en" } },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "De Facto Studio Dentaire",
  address: { "@type": "PostalAddress", streetAddress: "728 rue Fleury Est", addressLocality: "Montréal", addressRegion: "QC", addressCountry: "CA" },
  url: "https://defactodentaire.ca",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
