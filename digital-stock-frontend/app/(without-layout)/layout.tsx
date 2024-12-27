import "./globals.css";
import ClientComponent from "../ClientComponent";
import { Metadata } from "next";
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
          <ClientComponent>{children}</ClientComponent>
      </body>
    </html>
  );
}
