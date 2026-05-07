"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"
import type { Locale } from "@/types"
import { getTranslations } from "@/lib/i18n"

interface NavbarProps {
  lang: Locale
}

export function Navbar({ lang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const t = getTranslations(lang)
  const otherLang = lang === "en" ? "fr" : "en"

  const navLinks = [
    { href: `/${lang}`, label: t("nav.home") },
    { href: `/${lang}/cases`, label: t("nav.cases") },
  ]

  // Get the path without the language prefix for language switching
  const pathWithoutLang = pathname.replace(/^\/(en|fr)/, "") || "/"
  const switchLangHref = `/${otherLang}${pathWithoutLang}`

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold text-primary"
            >
              {t("site.name")}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <Link
              href={switchLangHref}
              className="flex items-center space-x-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Globe className="h-4 w-4" />
              <span>{otherLang.toUpperCase()}</span>
            </Link>

            <Button asChild size="sm">
              <Link href={`/${lang}/contact`}>{t("home.hero.contact")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t md:hidden"
          >
            <Container>
              <div className="flex flex-col space-y-4 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  href={switchLangHref}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <Globe className="h-4 w-4" />
                  <span>
                    {t("nav.language")}: {otherLang.toUpperCase()}
                  </span>
                </Link>

                <Button asChild size="sm" className="w-fit">
                  <Link
                    href={`/${lang}/contact`}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("home.hero.contact")}
                  </Link>
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
