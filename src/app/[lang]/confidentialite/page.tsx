import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Confidentialité et renseignements personnels",
  description:
    "Comment Studio Dentaire De Facto recueille, utilise et protège vos renseignements personnels et de santé. Politique simple et adaptée au contexte dentaire.",
}

interface Section {
  title: string
  body: string
}

// 8 sections per cahier final §24B
const sections: Section[] = [
  {
    title: "Renseignements recueillis",
    body: "Nous recueillons les renseignements nécessaires à votre prise en charge : identification, coordonnées, renseignements médicaux et dentaires pertinents pour la sécurité et la qualité des soins.",
  },
  {
    title: "Usage des renseignements",
    body: "Vos renseignements servent à l'organisation des rendez-vous, à la tenue du dossier clinique, à la prestation des soins, aux suivis et aux communications nécessaires à votre prise en charge.",
  },
  {
    title: "Partage des renseignements",
    body: "Vos renseignements ne sont partagés que lorsque cela est nécessaire au soin, à une référence à un autre professionnel, à la collaboration avec le laboratoire, ou lorsque la loi l'exige.",
  },
  {
    title: "Sécurité",
    body: "Des mesures techniques et organisationnelles raisonnables sont mises en place pour protéger vos renseignements contre la perte, l'accès non autorisé, la modification ou la divulgation non désirée.",
  },
  {
    title: "Accès et correction",
    body: "Vous pouvez demander l'accès à vos renseignements ou la correction d'informations inexactes. Une vérification d'identité peut être requise avant le traitement de la demande.",
  },
  {
    title: "Consentement",
    body: "Votre consentement est requis pour la transmission de certains renseignements ou documents (référence à un spécialiste, transmission au laboratoire, communications électroniques). Vous pouvez retirer votre consentement pour des fins non essentielles aux soins.",
  },
  {
    title: "Communication électronique",
    body: "Les communications par courriel, SMS ou formulaire web peuvent comporter certains risques inhérents au transit numérique. Les informations transmises doivent être limitées à ce qui est nécessaire à la demande. Pour des renseignements particulièrement sensibles, un échange en personne ou téléphonique peut être préférable.",
  },
  {
    // TODO juridique : faire valider les références légales exactes liées à
    // la confidentialité, aux renseignements personnels et aux communications
    // électroniques en contexte dentaire québécois (Loi 25 / PIPEDA / Code des
    // professions). Une fois validé, ajouter les coordonnées du responsable.
    title: "Responsable de la protection des renseignements personnels",
    body: "Pour toute question relative à la confidentialité, à l'accès, à la correction de vos renseignements personnels ou à la sécurité des données, vous pouvez contacter le responsable de la protection des renseignements personnels du Studio Dentaire De Facto par téléphone ou par courriel. Studio Dentaire De Facto opère dans le cadre des lois applicables au Québec et au Canada, notamment la Loi sur la protection des renseignements personnels dans le secteur privé (Loi 25) et la LPRPDE au niveau fédéral.",
  },
]

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        label="Conformité"
        title="Confidentialité et renseignements personnels"
        subtitle="Comment Studio Dentaire De Facto recueille, utilise et protège vos renseignements personnels et de santé."
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
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="font-display text-sm text-accent/70 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-xl md:text-2xl text-foreground">{s.title}</h2>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn>
              <p className="mt-12 text-sm text-muted-foreground italic">
                Dernière mise à jour : 15 mai 2026.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  )
}
