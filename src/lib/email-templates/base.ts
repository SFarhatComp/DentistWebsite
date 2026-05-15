/**
 * Shared layout for all transactional emails sent by the Studio Dentaire De Facto.
 * Inline styles only — works across Gmail, Outlook, Apple Mail, mobile clients.
 *
 * Palette : globals.css HSL → hex pour compatibilité email
 */

const C = {
  background: "#F5F0E6", // cream
  surface: "#FAF7F0", // light ivory
  foreground: "#1A1717", // deep black
  primary: "#3A2438", // aubergine
  accent: "#C56A2A", // burnt orange
  muted: "#8C837A", // warm gray
  border: "#E5DCC9", // subtle border
  red: "#B91C1C", // for urgent / alerts
  redBg: "#FEF2F2",
}

const FONTS = {
  display: '"Cormorant Garamond", Georgia, serif',
  body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}

export interface BaseLayoutProps {
  preheader: string
  brandLabel?: string
  accentBar?: "default" | "red" // red bar for urgences
  body: string // already-built inner HTML
}

export function baseLayout({ preheader, brandLabel = "Notification", accentBar = "default", body }: BaseLayoutProps): string {
  const accentColor = accentBar === "red" ? C.red : C.accent
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Studio Dentaire De Facto</title>
</head>
<body style="margin:0; padding:0; background:${C.background}; font-family:${FONTS.body}; color:${C.foreground}; -webkit-font-smoothing:antialiased;">
  <!-- Preheader (hidden, shown as preview text in inbox) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(preheader)}</div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${C.background};">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px; width:100%; background:#FFFFFF; border:1px solid ${C.border};">

          <!-- Accent bar top -->
          <tr><td style="background:${accentColor}; height:4px; line-height:4px; font-size:0;">&nbsp;</td></tr>

          <!-- Brand header -->
          <tr>
            <td style="padding:32px 40px 16px 40px; border-bottom:1px solid ${C.border};">
              <div style="font-family:${FONTS.display}; font-size:22px; color:${C.primary}; letter-spacing:0.02em; margin:0;">Studio Dentaire De Facto</div>
              <div style="font-family:${FONTS.body}; font-size:11px; color:${C.muted}; text-transform:uppercase; letter-spacing:0.15em; margin-top:6px;">${escapeHtml(brandLabel)}</div>
            </td>
          </tr>

          <!-- Body content -->
          <tr>
            <td style="padding:32px 40px;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px; border-top:1px solid ${C.border}; background:${C.surface};">
              <div style="font-family:${FONTS.body}; font-size:12px; color:${C.muted}; line-height:1.6;">
                Studio Dentaire De Facto · 728 rue Fleury Est, Ahuntsic, Montréal<br>
                Téléphone : <a href="tel:+15148637805" style="color:${C.primary}; text-decoration:none;">514 863 7805</a> ·
                Web : <a href="https://defactodentiste.netlify.app" style="color:${C.primary}; text-decoration:none;">studiodefacto.ca</a>
              </div>
              <div style="font-family:${FONTS.body}; font-size:10px; color:${C.muted}; line-height:1.5; margin-top:12px;">
                Courriel automatique — merci de ne pas répondre directement à ${escapeHtml("notifications@studiodefacto.ca")}. Pour répondre au patient, utilisez son adresse en haut du courriel.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** Section header — strong visual differentiation between sections */
export function section(title: string, content: string, opts?: { number?: string; accent?: "default" | "red" }): string {
  const accentColor = opts?.accent === "red" ? C.red : C.accent
  const numberLabel = opts?.number ? `<span style="font-family:${FONTS.display}; font-size:14px; color:${accentColor}; letter-spacing:0.05em; margin-right:10px; vertical-align:middle;">${escapeHtml(opts.number)}</span>` : ""
  return `
  <div style="margin:0 0 36px 0;">
    <div style="border-bottom:2px solid ${accentColor}; padding-bottom:8px; margin-bottom:16px;">
      ${numberLabel}<span style="font-family:${FONTS.display}; font-size:20px; color:${C.primary}; letter-spacing:0.01em; font-weight:500; vertical-align:middle;">${escapeHtml(title)}</span>
    </div>
    <div>
      ${content}
    </div>
  </div>`
}

/** Single row in a data list: Label / Value */
export function row(label: string, value: string | null | undefined, opts?: { highlight?: boolean }): string {
  if (value === undefined || value === null || value === "") return ""
  const color = opts?.highlight ? C.red : C.foreground
  const weight = opts?.highlight ? "600" : "400"
  return `
    <div style="margin-bottom:10px; line-height:1.5;">
      <span style="font-family:${FONTS.body}; font-size:11px; color:${C.muted}; text-transform:uppercase; letter-spacing:0.1em; display:inline-block; min-width:140px; vertical-align:top;">${escapeHtml(label)}</span>
      <span style="font-family:${FONTS.body}; font-size:14px; color:${color}; font-weight:${weight};">${escapeHtml(String(value))}</span>
    </div>`
}

/** Multi-line / long text block */
export function longText(label: string, value: string | null | undefined): string {
  if (!value) return ""
  return `
    <div style="margin-bottom:14px;">
      <div style="font-family:${FONTS.body}; font-size:11px; color:${C.muted}; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:6px;">${escapeHtml(label)}</div>
      <div style="font-family:${FONTS.body}; font-size:14px; color:${C.foreground}; line-height:1.6; white-space:pre-wrap;">${escapeHtml(value)}</div>
    </div>`
}

/** Compact list of selected checkbox values only (filters out unchecked).
 *  Use when you only want to show what was checked (e.g. preferences). */
export function checkboxList(label: string, items: { key: string; label: string; selected: boolean }[]): string {
  const selected = items.filter((i) => i.selected)
  if (selected.length === 0) {
    return `
      <div style="margin-bottom:14px;">
        ${label ? `<div style="font-family:${FONTS.body}; font-size:11px; color:${C.muted}; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:6px;">${escapeHtml(label)}</div>` : ""}
        <div style="font-family:${FONTS.body}; font-size:13px; color:${C.muted}; font-style:italic;">Aucune sélection</div>
      </div>`
  }
  return `
    <div style="margin-bottom:14px;">
      ${label ? `<div style="font-family:${FONTS.body}; font-size:11px; color:${C.muted}; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:6px;">${escapeHtml(label)}</div>` : ""}
      <ul style="margin:0; padding:0 0 0 18px; list-style:disc;">
        ${selected.map((i) => `<li style="font-family:${FONTS.body}; font-size:14px; color:${C.foreground}; line-height:1.7;">${escapeHtml(i.label)}</li>`).join("")}
      </ul>
    </div>`
}

/** Tabular view of ALL options with ✓ / — status.
 *  Use when showing whether each option was selected (gives dentist full picture).
 *  Highlight: selected options get accent color background. */
export function checkboxTable(label: string, items: { key: string; label: string; selected: boolean; alert?: boolean }[]): string {
  if (items.length === 0) return ""
  const rows = items
    .map((i) => {
      const bg = i.selected && i.alert ? C.redBg : i.selected ? "#FAF5EE" : "#FFFFFF"
      const labelColor = i.selected && i.alert ? C.red : i.selected ? C.foreground : C.muted
      const labelWeight = i.selected ? "500" : "400"
      const mark = i.selected
        ? `<span style="color:${i.alert ? C.red : C.accent}; font-weight:600; font-size:15px;">✓</span>`
        : `<span style="color:${C.muted}; font-size:14px;">—</span>`
      return `
        <tr>
          <td style="padding:8px 14px; background:${bg}; border-bottom:1px solid ${C.border}; font-family:${FONTS.body}; font-size:14px; color:${labelColor}; font-weight:${labelWeight}; line-height:1.5;">${escapeHtml(i.label)}</td>
          <td style="padding:8px 14px; background:${bg}; border-bottom:1px solid ${C.border}; width:40px; text-align:center;">${mark}</td>
        </tr>`
    })
    .join("")
  return `
    <div style="margin-bottom:14px;">
      ${label ? `<div style="font-family:${FONTS.body}; font-size:11px; color:${C.muted}; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:8px;">${escapeHtml(label)}</div>` : ""}
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${C.border}; border-collapse:collapse;">
        ${rows}
      </table>
    </div>`
}

/** Symptoms / Yes-No questions in tabular format.
 *  Shows each question with its answer (Oui / Non / —) and visual emphasis. */
export function ynTable(label: string, items: { label: string; value: string; alertOnYes?: boolean }[]): string {
  if (items.length === 0) return ""
  const rows = items
    .map((i) => {
      const isYes = i.value === "yes" || i.value === "oui"
      const isNo = i.value === "no" || i.value === "non"
      const alert = isYes && i.alertOnYes
      const bg = alert ? C.redBg : isYes ? "#FAF5EE" : "#FFFFFF"
      const labelColor = alert ? C.red : C.foreground
      const labelWeight = alert ? "600" : isYes ? "500" : "400"
      const statusText = isYes ? "Oui" : isNo ? "Non" : "—"
      const statusColor = alert ? C.red : isYes ? C.accent : isNo ? C.muted : C.muted
      const statusWeight = alert ? "700" : isYes ? "600" : "400"
      return `
        <tr>
          <td style="padding:10px 14px; background:${bg}; border-bottom:1px solid ${C.border}; font-family:${FONTS.body}; font-size:14px; color:${labelColor}; font-weight:${labelWeight}; line-height:1.5;">${escapeHtml(i.label)}${alert ? ' <span style="display:inline-block; margin-left:6px; padding:1px 6px; background:'+C.red+'; color:#FFFFFF; font-size:9px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; vertical-align:middle;">Alerte</span>' : ""}</td>
          <td style="padding:10px 14px; background:${bg}; border-bottom:1px solid ${C.border}; width:60px; text-align:center; font-family:${FONTS.body}; font-size:14px; color:${statusColor}; font-weight:${statusWeight};">${statusText}</td>
        </tr>`
    })
    .join("")
  return `
    <div style="margin-bottom:14px;">
      ${label ? `<div style="font-family:${FONTS.body}; font-size:11px; color:${C.muted}; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:8px;">${escapeHtml(label)}</div>` : ""}
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${C.border}; border-collapse:collapse;">
        ${rows}
      </table>
    </div>`
}

/** Alert box (for urgences ou warnings) */
export function alertBox(text: string): string {
  return `
    <div style="background:${C.redBg}; border-left:4px solid ${C.red}; padding:14px 18px; margin:0 0 24px 0;">
      <div style="font-family:${FONTS.body}; font-size:13px; color:${C.red}; line-height:1.5; font-weight:500;">${escapeHtml(text)}</div>
    </div>`
}

/** Title H1 */
export function heading(text: string, size: "lg" | "md" = "lg"): string {
  const fontSize = size === "lg" ? "28px" : "20px"
  return `<h1 style="font-family:${FONTS.display}; font-size:${fontSize}; color:${C.foreground}; margin:0 0 8px 0; line-height:1.2; font-weight:400;">${escapeHtml(text)}</h1>`
}

/** Subtitle (date, timestamp, context) */
export function subtitle(text: string): string {
  return `<div style="font-family:${FONTS.body}; font-size:13px; color:${C.muted}; margin:0 0 32px 0;">${escapeHtml(text)}</div>`
}

/** Action button(s) at the bottom */
export function actionButtons(buttons: { label: string; url: string; primary?: boolean }[]): string {
  return `
    <div style="margin-top:32px; padding-top:24px; border-top:1px solid ${C.border};">
      ${buttons.map((b) => {
        const bg = b.primary ? C.accent : "transparent"
        const color = b.primary ? "#FFFFFF" : C.primary
        const border = b.primary ? "none" : `1px solid ${C.primary}`
        return `<a href="${escapeAttr(b.url)}" style="display:inline-block; margin-right:10px; padding:10px 22px; background:${bg}; color:${color}; border:${border}; font-family:${FONTS.body}; font-size:13px; font-weight:500; text-decoration:none; letter-spacing:0.05em;">${escapeHtml(b.label)}</a>`
      }).join("")}
    </div>`
}

/** Format Netlify submission timestamp into French readable date */
export function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString("fr-CA", {
      timeZone: "America/Montreal",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso
  }
}

/** Escape HTML to prevent XSS in user-submitted content */
function escapeHtml(s: unknown): string {
  if (s === null || s === undefined) return ""
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function escapeAttr(s: string): string {
  return escapeHtml(s)
}

export { C as COLORS, FONTS, escapeHtml }
