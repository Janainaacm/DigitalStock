import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Link from "next/link"
import CustomLink from "./globalComponents/ui-elements/CustomLink"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "DigitalStock",
  description: "Buy IT-related Products",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="">
          <ul className="flex p-4 text-4xl border-b-2 justify-evenly border-limedSpruce-200">
            <CustomLink href={"/"} text={"Home"} />
            <CustomLink href={"/products"} text={"Products"} />
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
