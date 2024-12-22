import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/header/Header";
import ClientComponent from "./ClientComponent";
import Footer from "./components/footer/Footer";

const geistSans = localFont({
  src: "./utils/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./utils/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DigitalStock",
  description: "Buy IT-related Products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
          <ClientComponent>{children}</ClientComponent>
          <Footer/>
      </body>
    </html>
  );
}
