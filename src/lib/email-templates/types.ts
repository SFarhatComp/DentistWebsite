export interface NetlifyPayload {
  form_name: string
  data: Record<string, string | string[] | undefined>
  created_at?: string
  site_url?: string
}

export interface EmailMeta {
  to: string
  subject: string
  replyTo?: string
  isUrgent?: boolean
}
