import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/header/Header";
import ClientComponent from "../ClientComponent";
import Footer from "../components/footer/Footer";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
          <ClientComponent>{children}</ClientComponent>
          <Footer/>
      </body>
    </html>
  );
}
