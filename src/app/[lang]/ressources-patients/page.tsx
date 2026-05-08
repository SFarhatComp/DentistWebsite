import { redirect } from "next/navigation"

export default function LegacyRessourcesPage({ params }: { params: { lang: string } }) {
  redirect(`/${params.lang}/ressources`)
}
