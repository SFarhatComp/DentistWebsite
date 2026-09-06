import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { getTranslationObjectList, getTranslations } from "@/lib/i18n"
import { features } from "@/lib/features"
import type { Locale } from "@/types"

interface Photo {
  src: string
  caption: string
}

export function StudioSection({ lang }: { lang: Locale }) {
  const t = getTranslations(lang)
  const photos = getTranslationObjectList<Photo>(lang, "home.studioSection.photos")

  return (
    <section className="border-b border-border px-6 py-[76px] md:px-12">
      <Container className="px-0">
        <FadeIn>
          <h2 className="font-display font-semibold text-3xl leading-[1.05] tracking-[-0.03em] md:text-[2.5rem]">
            {t("home.studioSection.title")}
          </h2>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.6] text-muted-foreground">
            {t("home.studioSection.intro")}
          </p>
        </FadeIn>
        {/* Les filets de la grille sont le `gap` sur fond `border` — pas de bordures par case. */}
        <FadeIn>
          <div className="mt-12 grid grid-cols-2 gap-[2px] bg-border md:grid-cols-3">
            {photos.map((photo) => (
              <figure key={photo.src} className="relative m-0 aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/img/${photo.src}.webp`}
                  alt={photo.caption}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-[0.86]"
                />
                {features.galerieCaptions && (
                  <figcaption
                    className="absolute bottom-3 left-3 text-[10px] tracking-[0.2em] text-foreground"
                    style={{ textShadow: "0 1px 6px rgba(0,0,0,.9)" }}
                  >
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
