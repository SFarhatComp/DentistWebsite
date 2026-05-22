import { redirect } from "next/navigation"

export default async function LegacyPrivacyPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  redirect(`/${params.lang}/confidentialite`)
}
