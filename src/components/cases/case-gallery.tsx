"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { GalleryImage, Locale } from "@/types"
import { getTranslations } from "@/lib/i18n"

interface CaseGalleryProps {
  images: GalleryImage[]
  lang: Locale
}

export function CaseGallery({ images, lang }: CaseGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const t = getTranslations(lang)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const goToPrevious = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
  }

  const goToNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
  }

  const getTypeLabel = (type?: string) => {
    switch (type) {
      case "before":
        return lang === "fr" ? "Avant" : "Before"
      case "after":
        return lang === "fr" ? "Après" : "After"
      default:
        return null
    }
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={image.src}
              alt={image.caption}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            {image.type && (
              <Badge
                className="absolute left-3 top-3"
                variant={image.type === "before" ? "secondary" : "default"}
              >
                {getTypeLabel(image.type)}
              </Badge>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-sm text-white">{image.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-h-[80vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].caption}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto rounded-lg object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-black/60 p-4">
                <div className="flex items-center gap-2">
                  {images[selectedIndex].type && (
                    <Badge
                      variant={
                        images[selectedIndex].type === "before"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {getTypeLabel(images[selectedIndex].type)}
                    </Badge>
                  )}
                  <p className="text-white">{images[selectedIndex].caption}</p>
                </div>
              </div>
            </motion.div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
