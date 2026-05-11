import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: { default: "Studio Dentaire De Facto", template: "%s | Studio Dentaire De Facto" },
  description: "Studio dentaire à Ahuntsic, Montréal. Dentisterie réfléchie, diagnostic rigoureux et laboratoire intégré.",
  metadataBase: new URL("https://studiodefacto.ca"),
  alternates: { languages: { fr: "/fr", en: "/en" } },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Studio Dentaire De Facto",
  address: {
    "@type": "PostalAddress",
    streetAddress: "728 rue Fleury Est",
    addressLocality: "Montréal",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  telephone: "+1-514-863-7805",
  url: "https://studiodefacto.ca",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
