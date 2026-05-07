import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment De Facto Studio Dentaire protège vos renseignements personnels.",
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Conformité"
        title="Politique de confidentialité"
        subtitle="De Facto Studio Dentaire respecte vos renseignements personnels et applique les exigences applicables au Québec."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="prose-content max-w-3xl space-y-10 text-base text-muted-foreground leading-relaxed">

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Données collectées</h2>
              <p>Nous recueillons uniquement les renseignements nécessaires à la prestation de soins, à la gestion administrative et à la communication. Selon le formulaire utilisé, ceci peut inclure : nom, coordonnées, date de naissance, antécédents médicaux pertinents, informations d&apos;assurance et documents joints volontairement (photos, radiographies, cartes d&apos;assurance).</p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Pourquoi nous les collectons</h2>
              <p>Les renseignements sont utilisés pour préparer votre dossier, planifier votre traitement, communiquer avec vous, faciliter la coordination avec les assureurs lorsque pertinent, et respecter nos obligations professionnelles et légales.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Comment elles sont utilisées</h2>
              <p>Vos renseignements ne sont utilisés que dans le cadre de votre suivi clinique et administratif au studio. Nous ne vendons pas vos données et ne les utilisons pas à des fins de profilage commercial.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Qui y a accès</h2>
              <p>Seuls les membres de l&apos;équipe clinique et administrative ayant un besoin légitime ont accès à votre dossier. Les fournisseurs de services qui hébergent ou traitent les données pour notre compte sont liés par des obligations de confidentialité.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Durée de conservation</h2>
              <p>Les dossiers cliniques sont conservés conformément aux exigences professionnelles applicables. Les soumissions de formulaires sont conservées le temps nécessaire au traitement de votre demande, puis archivées ou supprimées selon nos politiques internes.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Mesures de sécurité</h2>
              <p>Nous appliquons des mesures techniques et organisationnelles raisonnables pour protéger vos données : chiffrement des transmissions, accès contrôlé, sauvegardes sécurisées et formation du personnel.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Vos droits</h2>
              <p>Vous avez le droit d&apos;accéder à vos renseignements personnels, d&apos;en demander la rectification, et de retirer votre consentement aux communications non essentielles. Pour exercer ces droits, contactez le studio par les coordonnées indiquées sur la page Contact.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Responsable de la protection des renseignements</h2>
              <p>Une personne responsable de la protection des renseignements personnels est désignée au sein du studio. Vous pouvez la joindre par les coordonnées de contact officielles.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Formulaires et téléversement de documents</h2>
              <p>Lorsque vous soumettez un formulaire ou téléversez un document, ces données transitent par nos services d&apos;hébergement et de traitement de formulaires. Évitez de transmettre des informations sensibles que vous ne souhaitez pas partager : les questionnaires médicaux complets sont remplis dans un environnement clinique sécurisé.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Cookies et outils analytiques</h2>
              <p>Le site peut utiliser des cookies essentiels au bon fonctionnement et, optionnellement, des outils d&apos;analyse de fréquentation anonymisée. Aucun cookie publicitaire n&apos;est utilisé.</p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Modifications</h2>
              <p>Cette politique peut être mise à jour. La date de dernière modification sera indiquée. Nous recommandons de consulter cette page périodiquement.</p>
            </div>

          </div>
        </Container>
      </section>
    </>
  )
}
