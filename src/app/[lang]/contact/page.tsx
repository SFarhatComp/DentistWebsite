import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { PageHero } from "@/components/shared/page-hero"
import { Container } from "@/components/layout/container"
import { ContactForm } from "@/components/forms/contact-form"
import { FadeIn } from "@/components/motion/fade-in"
import { SectionLabel } from "@/components/shared/section-label"
import { getTranslations } from "@/lib/i18n"
import type { Metadata } from "next"
import type { Locale } from "@/types"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Studio Dentaire De Facto — 728 rue Fleury Est, Ahuntsic, Montréal. Téléphone : 514 863 7805. Lundi-mercredi 9 h à 18 h, jeudi-vendredi sur rendez-vous.",
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  const t = getTranslations(lang)
  const phoneTel = t("contact.phoneTel")
  const phoneDisplay = t("contact.phonePlaceholder")
  const email = t("contact.emailPlaceholder")

  return (
    <>
      <PageHero label="Contact" title="Nous joindre" subtitle="Simple, direct et rassurant. Notre équipe vous répond dans les meilleurs délais." />

      {/* Coordonnées principales */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
            <FadeIn>
              <SectionLabel>Coordonnées</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-10">
                Studio Dentaire De Facto
              </h2>

              <div className="space-y-7">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="label-sm text-muted mb-1">Adresse</div>
                    <p className="text-lg text-foreground">728 rue Fleury Est<br />Montréal, QC</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="h-5 w-5 text-accent shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="label-sm text-muted mb-1">Téléphone</div>
                    <a href={`tel:${phoneTel}`} className="text-lg text-foreground hover:text-primary">
                      {phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="h-5 w-5 text-accent shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="label-sm text-muted mb-1">Courriel</div>
                    <a href={`mailto:${email}`} className="text-lg text-foreground hover:text-primary">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="h-5 w-5 text-accent shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="label-sm text-muted mb-1">Horaire</div>
                    <ul className="text-base text-foreground space-y-1">
                      <li>Lundi au mercredi : <span className="font-medium">9 h à 18 h</span></li>
                      <li>Jeudi et vendredi : <span className="italic">sur rendez-vous</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${lang}/rendez-vous`}
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
                >
                  Demander un rendez-vous
                </Link>
                <Link
                  href={`/${lang}/premiere-visite`}
                  className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide transition-colors"
                >
                  Première visite
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <h2 className="font-display text-2xl md:text-3xl mb-8">Nous écrire</h2>
              <ContactForm lang={lang} />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Accès */}
      <section className="py-16 md:py-20 bg-surface/40 border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <SectionLabel>Accès</SectionLabel>
              <h2 className="font-display text-2xl md:text-3xl leading-[1.15] mb-6">
                Comment se rendre au studio
              </h2>
              <div className="grid gap-6 md:grid-cols-3 text-base text-muted-foreground leading-relaxed">
                <div>
                  <div className="label-sm text-foreground mb-2">En voiture</div>
                  <p>Stationnement disponible à proximité.</p>
                </div>
                <div>
                  <div className="label-sm text-foreground mb-2">Transport en commun</div>
                  <p>Accès par les lignes locales d&apos;Ahuntsic.</p>
                </div>
                <div>
                  <div className="label-sm text-foreground mb-2">Repères de quartier</div>
                  <p>Au cœur d&apos;Ahuntsic, sur Fleury Est.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Urgence */}
      <section className="py-12 md:py-16 border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <div className="border-l-4 border-accent bg-accent/5 p-6 md:p-8">
                <SectionLabel>Urgence dentaire</SectionLabel>
                <p className="text-base text-foreground leading-relaxed mb-4">
                  En cas de douleur, traumatisme, fracture ou enflure : appelez la clinique ou remplissez le formulaire d&apos;urgence dédié.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`tel:${phoneTel}`}
                    className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-2.5 text-sm font-medium tracking-wide transition-colors"
                  >
                    Appeler la clinique
                  </a>
                  <Link
                    href={`/${lang}/urgence`}
                    className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-5 py-2.5 text-sm font-medium tracking-wide transition-colors"
                  >
                    Formulaire d&apos;urgence
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Carte */}
      <section>
        <iframe
          src="https://www.google.com/maps?q=728+rue+Fleury+Est,+Montréal,+QC&output=embed"
          className="w-full h-[500px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte — Studio Dentaire De Facto"
        />
      </section>
    </>
  )
}
