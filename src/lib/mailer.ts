import nodemailer, { type Transporter } from "nodemailer"

/**
 * Envoi direct à la boîte Google Workspace du studio (cahier 8.4) : aucun
 * stockage chez Netlify Forms, aucun service de courriel intermédiaire.
 *
 * Variables d'environnement (Netlify → Site configuration → Environment variables) :
 *   SMTP_HOST  smtp.gmail.com (défaut)            SMTP_PORT  465 (défaut)
 *   SMTP_USER  adresse Workspace qui envoie        SMTP_PASS  mot de passe d'application
 *   MAIL_FROM  expéditeur affiché (défaut : SMTP_USER)
 *   MAIL_TO    boîte qui reçoit (défaut : contact@studiodefacto.ca)
 */
export function mailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
}

let transport: Transporter | null = null

function getTransport() {
  if (transport) return transport
  const port = Number(process.env.SMTP_PORT || 465)
  transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { minVersion: "TLSv1.2" },
  })
  return transport
}

export async function sendMail(opts: { subject: string; text: string; replyTo?: string }) {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER
  const to = process.env.MAIL_TO || "contact@studiodefacto.ca"
  await getTransport().sendMail({
    from: `"Site studiodefacto.ca" <${from}>`,
    to,
    subject: opts.subject,
    text: opts.text,
    replyTo: opts.replyTo,
  })
}
