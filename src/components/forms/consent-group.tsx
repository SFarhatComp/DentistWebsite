import Link from "next/link"
import { CheckboxField } from "./fields"
import { getTranslations } from "@/lib/i18n"
import type { Locale } from "@/types"

interface ConsentItem {
  name: string
  label: React.ReactNode
  required?: boolean
  defaultChecked?: boolean
}

interface ConsentBlockProps {
  number: string
  title: string
  description?: string
  items: ConsentItem[]
}

export function ConsentBlock({ number, title, description, items }: ConsentBlockProps) {
  return (
    <div className="border-t border-border pt-6 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-display text-sm text-accent/70 tabular-nums">{number}</span>
        <h4 className="font-display text-base text-foreground">{title}</h4>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 ml-9">{description}</p>
      )}
      <div className="space-y-3 ml-9">
        {items.map((item) => (
          <CheckboxField
            key={item.name}
            name={item.name}
            value="1"
            label={item.label}
            required={item.required}
            defaultChecked={item.defaultChecked}
          />
        ))}
      </div>
    </div>
  )
}

interface ConsentGroupProps {
  lang: Locale
}

export function ConsentGroup({ lang }: ConsentGroupProps) {
  const t = getTranslations(lang)
  return (
    <div className="space-y-6">
      <ConsentBlock
        number="01"
        title={t("consentGroup.block1Title")}
        items={[
          { name: "consent_no_replace", required: true, label: t("consentGroup.consent_no_replace") },
          { name: "consent_contact", required: true, label: t("consentGroup.consent_contact") },
          { name: "consent_no_confirmation", required: true, label: t("consentGroup.consent_no_confirmation") },
        ]}
      />

      <ConsentBlock
        number="02"
        title={t("consentGroup.block2Title")}
        items={[
          { name: "consent_use", required: true, label: t("consentGroup.consent_use") },
        ]}
      />

      <ConsentBlock
        number="03"
        title={t("consentGroup.block3Title")}
        description={t("consentGroup.block3Description")}
        items={[
          {
            name: "consent_privacy",
            required: true,
            label: (
              <>
                {t("consentGroup.consent_privacy_prefix")}
                <Link
                  href={`/${lang}/confidentialite`}
                  className="text-primary underline hover:no-underline"
                  target="_blank"
                >
                  {t("consentGroup.consent_privacy_link")}
                </Link>
                {t("consentGroup.consent_privacy_suffix")}
              </>
            ),
          },
        ]}
      />

      <ConsentBlock
        number="04"
        title={t("consentGroup.block4Title")}
        items={[
          { name: "consent_emergency", required: true, label: t("consentGroup.consent_emergency") },
        ]}
      />

      <ConsentBlock
        number="05"
        title={t("consentGroup.block5Title")}
        description={t("consentGroup.block5Description")}
        items={[
          {
            name: "consent_communications",
            required: false,
            defaultChecked: false,
            label: t("consentGroup.consent_communications"),
          },
        ]}
      />
    </div>
  )
}
