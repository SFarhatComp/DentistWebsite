import type { Metadata } from "next"
import "./globals.css"

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
  address: {
    "@type": "PostalAddress",
    streetAddress: "728 rue Fleury Est",
    addressLocality: "Montréal",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  url: "https://defactodentaire.ca",
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
    </html>
  )
}
