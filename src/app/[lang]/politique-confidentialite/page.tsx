import { redirect } from "next/navigation"

export default function LegacyPrivacyPage({ params }: { params: { lang: string } }) {
  redirect(`/${params.lang}/confidentialite`)
}
