import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dr. Bader Dental | Excellence in Dental Care",
  description: "Expert dental care with personalized treatment plans. Cosmetic dentistry, restorative care, and preventive services in Montreal.",
  keywords: ["dentist", "dental care", "cosmetic dentistry", "Montreal", "veneers", "implants"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
