/**
 * Reusable email components built on @react-email/components.
 * Use these as building blocks for individual templates.
 */

import {
  Body,
  Button as REButton,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"
import { colors, fonts, fontSizes, spacing } from "./theme"

/* -------------------------------------------------------------------------- */
/* LAYOUT                                                                     */
/* -------------------------------------------------------------------------- */

interface EmailLayoutProps {
  preview: string
  /** Accent color for the top bar and badges. Default = aubergine. Use "red" for urgences. */
  tone?: "default" | "red"
  children: React.ReactNode
}

export function EmailLayout({ preview, tone = "default", children }: EmailLayoutProps) {
  const accentBarColor = tone === "red" ? colors.alertText : colors.accent
  return (
    <Html lang="fr">
      <Head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: colors.surfaceMuted, fontFamily: fonts.body, margin: 0, padding: 0, color: colors.text }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: `${spacing.lg} ${spacing.sm}`,
          }}
        >
          {/* Thin accent bar at the very top */}
          <Section
            style={{
              backgroundColor: accentBarColor,
              height: "3px",
              lineHeight: "3px",
              fontSize: "0",
            }}
          >
            &nbsp;
          </Section>

          <Container
            style={{
              backgroundColor: colors.bg,
              padding: `${spacing.xl} ${spacing.lg}`,
              borderLeft: `1px solid ${colors.borderSubtle}`,
              borderRight: `1px solid ${colors.borderSubtle}`,
              borderBottom: `1px solid ${colors.borderSubtle}`,
            }}
          >
            {children}
          </Container>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  )
}

/* -------------------------------------------------------------------------- */
/* HEADER (brand)                                                             */
/* -------------------------------------------------------------------------- */

export function EmailHeader({ kicker }: { kicker?: string }) {
  return (
    <Section style={{ paddingBottom: spacing.lg }}>
      <Text
        style={{
          fontFamily: fonts.display,
          fontSize: "18px",
          color: colors.primary,
          fontWeight: 500,
          letterSpacing: "0.02em",
          margin: 0,
        }}
      >
        Studio Dentaire De Facto
      </Text>
      {kicker && (
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.micro,
            color: colors.textSubtle,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            margin: `${spacing.xs} 0 0 0`,
            fontWeight: 500,
          }}
        >
          {kicker}
        </Text>
      )}
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* HERO (big patient name + badge + time)                                     */
/* -------------------------------------------------------------------------- */

interface HeroProps {
  /** Eyebrow text above the name */
  eyebrow?: string
  /** Big patient/professional name (Cormorant Garamond) */
  name: string
  /** Status badge (Urgent, New patient, etc.) */
  badge?: { label: string; tone?: "default" | "red" | "info" }
  /** Subtitle below name */
  subtitle?: string
  /** Timestamp text */
  timestamp?: string
}

export function Hero({ eyebrow, name, badge, subtitle, timestamp }: HeroProps) {
  return (
    <Section style={{ paddingBottom: spacing.lg }}>
      {eyebrow && (
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.micro,
            color: colors.textSubtle,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            margin: `0 0 ${spacing.sm} 0`,
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </Text>
      )}
      <Heading
        as="h1"
        style={{
          fontFamily: fonts.display,
          fontSize: fontSizes.hero,
          color: colors.text,
          margin: 0,
          lineHeight: "1.15",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        {name}
      </Heading>
      {(badge || subtitle) && (
        <Section style={{ marginTop: spacing.sm }}>
          {badge && <Badge label={badge.label} tone={badge.tone} />}
          {subtitle && (
            <Text
              style={{
                fontFamily: fonts.body,
                fontSize: fontSizes.body,
                color: colors.textMuted,
                margin: badge ? `${spacing.xs} 0 0 0` : "0",
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </Text>
          )}
        </Section>
      )}
      {timestamp && (
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.small,
            color: colors.textSubtle,
            margin: `${spacing.md} 0 0 0`,
          }}
        >
          Reçu le {timestamp}
        </Text>
      )}
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* BADGE                                                                      */
/* -------------------------------------------------------------------------- */

interface BadgeProps {
  label: string
  tone?: "default" | "red" | "info"
}

export function Badge({ label, tone = "default" }: BadgeProps) {
  const palette = {
    default: { bg: colors.surfaceMuted, fg: colors.primary, border: colors.borderSubtle },
    red: { bg: colors.alertBg, fg: colors.alertText, border: colors.alertBorder },
    info: { bg: colors.successBg, fg: colors.successText, border: "#BBF7D0" },
  }[tone]
  return (
    <Text
      style={{
        display: "inline-block",
        backgroundColor: palette.bg,
        color: palette.fg,
        border: `1px solid ${palette.border}`,
        padding: "4px 10px",
        fontSize: fontSizes.micro,
        fontFamily: fonts.body,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        margin: 0,
        borderRadius: "2px",
      }}
    >
      {label}
    </Text>
  )
}

/* -------------------------------------------------------------------------- */
/* ACTION BUTTONS                                                             */
/* -------------------------------------------------------------------------- */

interface ActionButton {
  label: string
  href: string
  primary?: boolean
}

export function ActionButtons({ buttons }: { buttons: ActionButton[] }) {
  if (buttons.length === 0) return null
  return (
    <Section style={{ paddingTop: spacing.md, paddingBottom: spacing.md }}>
      {buttons.map((b, i) => (
        <REButton
          key={i}
          href={b.href}
          style={{
            display: "inline-block",
            backgroundColor: b.primary ? colors.accent : "transparent",
            color: b.primary ? "#FFFFFF" : colors.primary,
            border: b.primary ? "none" : `1px solid ${colors.primary}`,
            padding: "12px 24px",
            fontFamily: fonts.body,
            fontSize: fontSizes.small,
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.02em",
            marginRight: i < buttons.length - 1 ? spacing.sm : 0,
            marginBottom: spacing.xs,
            borderRadius: "2px",
          }}
        >
          {b.label}
        </REButton>
      ))}
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* HIGHLIGHTED PHONE CALL CARD                                                */
/* -------------------------------------------------------------------------- */

/** Normalise vers format E.164 nord-américain (+1XXXXXXXXXX). */
function toE164NorthAmerica(raw: string): string {
  const digits = raw.replace(/[^0-9+]/g, "")
  if (digits.startsWith("+")) return digits
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`
  if (digits.length === 10) return `+1${digits}`
  return digits
}

export function PhoneCallCard({ phone, urgent = false }: { phone: string; urgent?: boolean }) {
  if (!phone) return null
  const cleanPhone = toE164NorthAmerica(phone)
  const bg = urgent ? colors.alertBg : colors.surfaceMuted
  const border = urgent ? colors.alertBorder : colors.borderSubtle
  const accent = urgent ? colors.alertText : colors.accent
  return (
    <Section
      style={{
        backgroundColor: bg,
        border: `1px solid ${border}`,
        padding: spacing.md,
        marginTop: spacing.md,
        marginBottom: spacing.md,
        borderRadius: "2px",
      }}
    >
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: fontSizes.micro,
          color: urgent ? colors.alertStrong : colors.textSubtle,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          margin: `0 0 ${spacing.xs} 0`,
          fontWeight: 600,
        }}
      >
        {urgent ? "Action urgente requise" : "Joindre le contact"}
      </Text>
      <Link
        href={`tel:${cleanPhone}`}
        style={{
          fontFamily: fonts.display,
          fontSize: "26px",
          color: accent,
          textDecoration: "none",
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        {phone}
      </Link>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* DETAIL ROW (label + value)                                                 */
/* -------------------------------------------------------------------------- */

interface DetailRowProps {
  label: string
  value: React.ReactNode
  /** If true, value is rendered in alert red */
  alert?: boolean
}

export function DetailRow({ label, value, alert = false }: DetailRowProps) {
  if (value === undefined || value === null || value === "") return null
  return (
    <Row style={{ marginBottom: spacing.sm }}>
      <Column style={{ width: "140px", verticalAlign: "top", paddingRight: spacing.sm }}>
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.micro,
            color: colors.textSubtle,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: 0,
            fontWeight: 500,
          }}
        >
          {label}
        </Text>
      </Column>
      <Column style={{ verticalAlign: "top" }}>
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.body,
            color: alert ? colors.alertText : colors.text,
            margin: 0,
            lineHeight: 1.5,
            fontWeight: alert ? 600 : 400,
          }}
        >
          {value}
        </Text>
      </Column>
    </Row>
  )
}

/* -------------------------------------------------------------------------- */
/* SECTION TITLE                                                              */
/* -------------------------------------------------------------------------- */

export function SectionTitle({ children, accent }: { children: React.ReactNode; accent?: "default" | "red" }) {
  return (
    <Section style={{ marginTop: spacing.lg, marginBottom: spacing.md }}>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: fontSizes.micro,
          color: accent === "red" ? colors.alertText : colors.textSubtle,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          margin: 0,
          fontWeight: 600,
          paddingBottom: spacing.xs,
          borderBottom: `1px solid ${accent === "red" ? colors.alertBorder : colors.borderSubtle}`,
        }}
      >
        {children}
      </Text>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* LONG TEXT BLOCK (for messages, clinical notes)                             */
/* -------------------------------------------------------------------------- */

export function LongTextBlock({ label, value }: { label?: string; value: string }) {
  if (!value) return null
  return (
    <Section style={{ marginBottom: spacing.md }}>
      {label && (
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.micro,
            color: colors.textSubtle,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: `0 0 ${spacing.xs} 0`,
            fontWeight: 500,
          }}
        >
          {label}
        </Text>
      )}
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: fontSizes.body,
          color: colors.text,
          lineHeight: 1.6,
          margin: 0,
          whiteSpace: "pre-wrap",
          padding: spacing.sm,
          backgroundColor: colors.surfaceMuted,
          borderLeft: `2px solid ${colors.accent}`,
        }}
      >
        {value}
      </Text>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* TAG LIST (compact pills for selected checkbox items)                       */
/* -------------------------------------------------------------------------- */

export function TagList({
  label,
  items,
  emptyText = "Aucune sélection",
  alertItems = [],
}: {
  label?: string
  items: { key: string; label: string; selected: boolean }[]
  emptyText?: string
  /** Keys that should be highlighted as alerts when selected */
  alertItems?: string[]
}) {
  const selected = items.filter((i) => i.selected)
  return (
    <Section style={{ marginBottom: spacing.md }}>
      {label && (
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.micro,
            color: colors.textSubtle,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: `0 0 ${spacing.xs} 0`,
            fontWeight: 500,
          }}
        >
          {label}
        </Text>
      )}
      {selected.length === 0 ? (
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: fontSizes.small,
            color: colors.textSubtle,
            fontStyle: "italic",
            margin: 0,
          }}
        >
          {emptyText}
        </Text>
      ) : (
        <Section>
          {selected.map((item) => {
            const isAlert = alertItems.includes(item.key)
            return (
              <Text
                key={item.key}
                style={{
                  display: "inline-block",
                  backgroundColor: isAlert ? colors.alertBg : colors.surfaceMuted,
                  color: isAlert ? colors.alertText : colors.text,
                  border: `1px solid ${isAlert ? colors.alertBorder : colors.borderSubtle}`,
                  padding: "6px 12px",
                  fontFamily: fonts.body,
                  fontSize: fontSizes.small,
                  fontWeight: isAlert ? 600 : 500,
                  margin: `0 ${spacing.xs} ${spacing.xs} 0`,
                  borderRadius: "2px",
                }}
              >
                {item.label}
              </Text>
            )
          })}
        </Section>
      )}
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* YES/NO INDICATOR LIST                                                      */
/* -------------------------------------------------------------------------- */

export function YnIndicatorList({
  items,
}: {
  items: { label: string; value: "yes" | "no" | ""; alertOnYes?: boolean }[]
}) {
  return (
    <Section style={{ marginBottom: spacing.md }}>
      {items.map((item, i) => {
        const isYes = item.value === "yes"
        const alert = isYes && item.alertOnYes
        const dot = isYes ? "●" : item.value === "no" ? "○" : "·"
        const dotColor = alert ? colors.alertText : isYes ? colors.accent : colors.textSubtle
        return (
          <Row
            key={i}
            style={{
              marginBottom: spacing.xs,
              borderBottom: `1px solid ${colors.borderSubtle}`,
              paddingBottom: spacing.xs,
            }}
          >
            <Column style={{ width: "20px", verticalAlign: "top" }}>
              <Text style={{ color: dotColor, fontSize: "20px", lineHeight: 1, margin: 0, fontWeight: 700 }}>{dot}</Text>
            </Column>
            <Column style={{ verticalAlign: "middle" }}>
              <Text
                style={{
                  fontFamily: fonts.body,
                  fontSize: fontSizes.body,
                  color: alert ? colors.alertText : colors.text,
                  fontWeight: alert ? 600 : 400,
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {item.label}
                {alert && (
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: colors.alertText,
                      color: "#FFFFFF",
                      padding: "1px 6px",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginLeft: spacing.xs,
                      verticalAlign: "middle",
                      borderRadius: "2px",
                    }}
                  >
                    Alerte
                  </span>
                )}
              </Text>
            </Column>
            <Column style={{ width: "50px", textAlign: "right", verticalAlign: "middle" }}>
              <Text
                style={{
                  fontFamily: fonts.body,
                  fontSize: fontSizes.small,
                  color: alert ? colors.alertText : isYes ? colors.accent : colors.textSubtle,
                  fontWeight: alert ? 700 : isYes ? 600 : 400,
                  margin: 0,
                }}
              >
                {isYes ? "Oui" : item.value === "no" ? "Non" : "—"}
              </Text>
            </Column>
          </Row>
        )
      })}
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* ALERT BANNER                                                               */
/* -------------------------------------------------------------------------- */

export function AlertBanner({ title, items }: { title: string; items?: string[] }) {
  return (
    <Section
      style={{
        backgroundColor: colors.alertBg,
        border: `1px solid ${colors.alertBorder}`,
        padding: spacing.md,
        marginBottom: spacing.lg,
        borderRadius: "2px",
      }}
    >
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: fontSizes.micro,
          color: colors.alertText,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          margin: `0 0 ${spacing.xs} 0`,
          fontWeight: 700,
        }}
      >
        {title}
      </Text>
      {items && items.length > 0 && (
        <Section style={{ marginTop: spacing.xs }}>
          {items.map((item, i) => (
            <Text
              key={i}
              style={{
                fontFamily: fonts.body,
                fontSize: fontSizes.body,
                color: colors.alertStrong,
                lineHeight: 1.5,
                margin: `${spacing.xs} 0 0 0`,
                fontWeight: 500,
              }}
            >
              · {item}
            </Text>
          ))}
        </Section>
      )}
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                     */
/* -------------------------------------------------------------------------- */

export function EmailFooter() {
  return (
    <Section style={{ paddingTop: spacing.md, paddingBottom: spacing.lg, textAlign: "center" }}>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: fontSizes.micro,
          color: colors.textSubtle,
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        Studio Dentaire De Facto — 728 rue Fleury Est, Ahuntsic
      </Text>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: fontSizes.micro,
          color: colors.textSubtle,
          margin: `${spacing.xs} 0 0 0`,
          lineHeight: 1.6,
        }}
      >
        <Link href="tel:+15148637805" style={{ color: colors.primary, textDecoration: "none" }}>
          514 863 7805
        </Link>{" "}
        ·{" "}
        <Link
          href="https://studiodefacto.ca"
          style={{ color: colors.primary, textDecoration: "none" }}
        >
          studiodefacto.ca
        </Link>
      </Text>
      <Hr style={{ borderColor: colors.borderSubtle, margin: `${spacing.md} 0 ${spacing.xs} 0` }} />
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: "10px",
          color: colors.textSubtle,
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        Courriel automatique. Pour répondre au patient, utilisez Reply — son adresse est dans le champ Reply-To.
      </Text>
    </Section>
  )
}

/* Export react components also as `Section`, `Row`, `Column` etc.
 * so templates can import them all from one place. */
export { Body, Container, Head, Heading, Hr, Html, Link, Preview, Row, Column, Section, Text }
