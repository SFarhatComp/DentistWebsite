import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import type { Locale } from "@/types"

/**
 * Gabarit des pages du site : en-tête, contenu, pied de page.
 *
 * L'en-tête est posé en absolu par-dessus le héros sombre de chaque page : le
 * conteneur sert de repère de positionnement, et <main> ne porte aucun
 * décalage haut. Le bandeau collant de la v1 a disparu — la maquette garde
 * l'appel à l'action dans l'en-tête à toutes les largeurs.
 *
 * Les pages d'annonce vivent hors de ce groupe et n'héritent donc ni du menu
 * ni du pied de page complet.
 */
export default async function SiteLayout(props: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const params = await props.params
  const lang = params.lang as Locale

  return (
    <div className="relative">
      <Navbar lang={lang} />
      <main>{props.children}</main>
      <Footer lang={lang} />
    </div>
  )
}
