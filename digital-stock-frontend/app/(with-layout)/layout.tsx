import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header/Header";
import ClientComponent from "../ClientComponent";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/ScrollToTop";

export const metadata: Metadata = {
  title: "Digital Stock",
  description: "Welcome to Digital Stock, your trusted digital stock platform.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        <Header />
        <ClientComponent>{children}</ClientComponent>
        <Footer />
      </body>
    </html>
  );
}
