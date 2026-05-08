import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Confidentialité et renseignements personnels",
  description:
    "Comment Studio Dentaire De Facto recueille, utilise, conserve et protège vos renseignements personnels et de santé.",
}

interface Section {
  title: string
  body: string
}

const sections: Section[] = [
  {
    title: "1. Renseignements personnels recueillis",
    body: "Selon votre interaction avec le studio, nous pouvons recueillir des renseignements tels que votre nom, vos coordonnées, votre date de naissance, vos informations d'assurance et toute autre donnée nécessaire à la gestion administrative et clinique de votre dossier.",
  },
  {
    title: "2. Renseignements de santé",
    body: "Les renseignements de santé recueillis dans le cadre de l'évaluation, du diagnostic, de la planification et du traitement comprennent les antécédents médicaux et dentaires, les médicaments, les allergies, les radiographies, les photos cliniques, les scans et les notes cliniques. Ces données sont protégées par les obligations professionnelles applicables.",
  },
  {
    title: "3. Formulaires web",
    body: "Les formulaires disponibles sur le site (rendez-vous, contact, urgence) servent à transmettre une demande à l'équipe. Les renseignements transmis sont traités en confidentialité et utilisés uniquement pour répondre à votre demande.",
  },
  {
    title: "4. Pièces jointes transmises",
    body: "Si vous transmettez des pièces jointes (radiographies, documents dentaires, photos), nous vous invitons à limiter les informations transmises à ce qui est nécessaire à votre demande. Évitez d'envoyer des renseignements sensibles non requis.",
  },
  {
    title: "5. Courriels et SMS",
    body: "Les communications par courriel et SMS sont utilisées pour la coordination administrative (confirmations, rappels, suivis). Les communications électroniques peuvent comporter certains risques inhérents au transit numérique.",
  },
  {
    title: "6. Utilisation des renseignements",
    body: "Vos renseignements sont utilisés pour préparer votre dossier, planifier votre traitement, communiquer avec vous, coordonner avec les assureurs lorsque pertinent et respecter les obligations professionnelles et légales applicables.",
  },
  {
    title: "7. Conservation",
    body: "Les renseignements sont conservés selon les exigences de l'Ordre des dentistes du Québec et la législation applicable. La durée de conservation peut varier selon la nature des renseignements et l'évolution du dossier clinique.",
  },
  {
    title: "8. Accès limité",
    body: "L'accès à vos renseignements est limité aux membres de l'équipe ayant besoin de les consulter pour assurer vos soins, votre suivi ou la gestion administrative de votre dossier.",
  },
  {
    title: "9. Sécurité",
    body: "Des mesures techniques et organisationnelles raisonnables sont mises en place pour protéger les renseignements contre la perte, l'accès non autorisé, la modification ou la divulgation non désirée.",
  },
  {
    title: "10. Demandes d'accès ou de correction",
    body: "Vous pouvez demander l'accès à vos renseignements ou la correction d'informations inexactes en contactant l'équipe. Une vérification d'identité peut être requise avant le traitement de la demande.",
  },
  {
    title: "11. Retrait du consentement",
    body: "Lorsque applicable, vous pouvez retirer votre consentement au traitement de vos renseignements pour des fins non essentielles à la prestation des soins. Le retrait peut affecter notre capacité à offrir certains services.",
  },
  {
    title: "12. Limites des communications électroniques",
    body: "Les communications électroniques peuvent comporter certains risques. Les informations transmises par formulaire, courriel ou SMS doivent être limitées aux renseignements nécessaires à la demande. Pour des renseignements particulièrement sensibles, un échange en personne ou téléphonique peut être préférable.",
  },
  {
    title: "13. Contact pour questions de confidentialité",
    body: "Pour toute question relative à la confidentialité ou à la gestion de vos renseignements personnels, vous pouvez contacter l'équipe directement par téléphone ou par courriel.",
  },
]

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        label="Conformité"
        title="Confidentialité et renseignements personnels"
        subtitle="Comment Studio Dentaire De Facto recueille, utilise, conserve et protège vos renseignements personnels et de santé."
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <div className="bg-surface/60 border border-border p-6 md:p-8 mb-12">
                <p className="text-base text-foreground leading-relaxed italic">
                  Les communications électroniques peuvent comporter certains risques. Les informations transmises par formulaire, courriel ou SMS doivent être limitées aux renseignements nécessaires à la demande.
                </p>
              </div>
            </FadeIn>

            <div className="space-y-10">
              {sections.map((s, i) => (
                <FadeIn key={s.title}>
                  <div className="border-t border-border pt-8 first:border-t-0 first:pt-0">
                    <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">{s.title}</h2>
                    <p className="text-base text-muted-foreground leading-relaxed">{s.body}</p>
                    {i === sections.length - 1 && (
                      <p className="mt-4 text-sm text-muted-foreground italic">
                        Dernière mise à jour : 8 mai 2026.
                      </p>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
