"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Locale } from "@/types"
import { getTranslations } from "@/lib/i18n"

interface ContactFormProps {
  lang: Locale
}

export function ContactForm({ lang }: ContactFormProps) {
  const t = getTranslations(lang)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      })

      if (response.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center"
      >
        <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
        <h3 className="mb-2 text-xl font-semibold">{t("contact.form.success")}</h3>
      </motion.div>
    )
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Hidden fields for Netlify */}
      <input type="hidden" name="form-name" value="contact" />
      <div hidden>
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("contact.form.name")}</Label>
          <Input
            id="name"
            name="name"
            placeholder={t("contact.form.namePlaceholder")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("contact.form.email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t("contact.form.emailPlaceholder")}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{t("contact.form.subject")}</Label>
        <Input
          id="subject"
          name="subject"
          placeholder={t("contact.form.subjectPlaceholder")}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("contact.form.message")}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("contact.form.messagePlaceholder")}
          rows={5}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachment">{t("contact.form.attachment")}</Label>
        <Input
          id="attachment"
          name="attachment"
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">
          {t("contact.form.attachmentHelp")}
        </p>
      </div>

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-destructive"
        >
          <AlertCircle className="h-5 w-5" />
          <span>{t("contact.form.error")}</span>
        </motion.div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {t("contact.form.sending")}
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {t("contact.form.submit")}
          </>
        )}
      </Button>
    </form>
  )
}
