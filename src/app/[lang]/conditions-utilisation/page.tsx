import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Conditions d'utilisation" }

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Conditions"
        title="Conditions d'utilisation"
        subtitle="Conditions encadrant l'utilisation du site web de De Facto Studio Dentaire."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Acceptation</h2>
              <p>L&apos;utilisation de ce site implique votre acceptation des présentes conditions. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser le site.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Nature des informations</h2>
              <p>Les informations publiées sur ce site sont fournies à titre informatif et ne constituent pas un avis médical, un diagnostic ni une prescription. Une consultation clinique est toujours nécessaire pour évaluer votre situation.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Résultats cliniques et photos avant/après</h2>
              <p>Les cas et photographies présentés illustrent des situations traitées. Chaque patient est différent : les résultats varient selon la condition initiale, les habitudes, les objectifs et la biologie de chaque personne. Aucun résultat n&apos;est garanti.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Propriété intellectuelle</h2>
              <p>Le contenu du site (textes, images, marques, mise en page) appartient à De Facto Studio Dentaire ou à ses partenaires. Toute reproduction sans autorisation est interdite.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Limitation de responsabilité</h2>
              <p>De Facto Studio Dentaire s&apos;efforce de fournir des informations exactes et à jour, mais ne peut garantir l&apos;absence d&apos;erreurs. L&apos;utilisateur reste responsable de l&apos;usage qu&apos;il fait des informations consultées.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Liens externes</h2>
              <p>Certains liens peuvent renvoyer à des sites tiers. Le studio ne peut être tenu responsable du contenu ou des pratiques de ces sites.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Droit applicable</h2>
              <p>Les présentes conditions sont régies par les lois applicables au Québec et au Canada. Tout litige relèvera des tribunaux compétents du district de Montréal.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Modifications</h2>
              <p>Ces conditions peuvent être modifiées à tout moment. La version en vigueur est celle publiée sur le site.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
