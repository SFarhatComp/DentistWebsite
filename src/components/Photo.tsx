import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Photos réelles du studio (cahier, lot 4.4 et 6) : servies par next/image en
 * AVIF/WebP, au plus 1600 px, avec `sizes` pour ne jamais télécharger trop grand.
 * Le cadre fixe le format ; la photo le remplit (object-cover).
 */
export function Photo({
  name,
  alt,
  sizes,
  className,
  imgClassName,
  preload,
  position = "50% 50%",
}: {
  name: string
  alt: string
  sizes: string
  className?: string
  imgClassName?: string
  preload?: boolean
  position?: string
}) {
  return (
    <div className={cn("relative overflow-hidden bg-aub-soft", className)}>
      <Image
        src={`/img/${name}.webp`}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-cover", imgClassName)}
        style={{ objectPosition: position }}
      />
    </div>
  )
}
