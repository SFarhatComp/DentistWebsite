import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/contact/contact-form"
import { FadeIn } from "@/components/motion/fade-in"
import { getTranslations, getDictionary } from "@/lib/i18n"
import type { Locale } from "@/types"

interface ContactPageProps {
  params: { lang: string }
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const lang = params.lang as Locale
  const dict = getDictionary(lang)
  const contact = dict.contact as { title: string; subtitle: string }

  return {
    title: contact.title,
    description: contact.subtitle,
  }
}

export default function ContactPage({ params }: ContactPageProps) {
  const lang = params.lang as Locale
  const t = getTranslations(lang)

  const contactInfo = [
    {
      icon: MapPin,
      content: (
        <>
          {t("contact.info.address")}
          <br />
          {t("contact.info.city")}
        </>
      ),
    },
    { icon: Phone, content: t("contact.info.phone") },
    { icon: Mail, content: t("contact.info.email") },
    { icon: Clock, content: t("contact.info.hours") },
  ]

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("contact.title")}
          </h1>
          <p className="text-lg text-muted-foreground">{t("contact.subtitle")}</p>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Form */}
          <FadeIn delay={0.1} className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <ContactForm lang={lang} />
              </CardContent>
            </Card>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn delay={0.2}>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>{t("contact.info.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <item.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item.content}</span>
                  </div>
                ))}

                {/* Map placeholder */}
                <div className="mt-6 aspect-video overflow-hidden rounded-lg bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178788.0436504844!2d-73.68742229999999!3d45.5591827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sMontreal%2C%20QC!5e0!3m2!1sen!2sca!4v1704067200000!5m2!1sen!2sca"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  />
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
