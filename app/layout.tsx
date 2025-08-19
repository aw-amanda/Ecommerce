import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Elsie_Swash_Caps, Roboto_Condensed} from "next/font/google"

const roboto = Roboto_Condensed({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-roboto',
})

const elsie = Elsie_Swash_Caps({
  subsets: ['latin'],
  weight: '400',
  variable: "--font-elsie",
})

export const metadata: Metadata = {
  title: "NextJS E-Commerce Application",
  description: "E-Commerce Application for a fictional pâtisserie",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-black/90 ${elsie.variable} ${roboto.variable}`}>
        <Navbar />
        <main className="w-full mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
