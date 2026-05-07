import Link from "next/link"
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react"
import { Container } from "./container"
import { Separator } from "@/components/ui/separator"
import type { Locale } from "@/types"
import { getTranslations } from "@/lib/i18n"

interface FooterProps {
  lang: Locale
}

export function Footer({ lang }: FooterProps) {
  const t = getTranslations(lang)
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: `/${lang}`, label: t("nav.home") },
    { href: `/${lang}/cases`, label: t("nav.cases") },
    { href: `/${lang}/contact`, label: t("nav.contact") },
  ]

  return (
    <footer className="border-t bg-muted/30">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">{t("site.name")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("footer.contactInfo")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {t("contact.info.address")}
                  <br />
                  {t("contact.info.city")}
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{t("contact.info.phone")}</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{t("contact.info.email")}</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{t("contact.info.hours")}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("footer.followUs")}</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator />

        <div className="py-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {t("site.name")}. {t("footer.rights")}
          </p>
        </div>
      </Container>
    </footer>
  )
}
