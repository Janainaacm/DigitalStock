import "./globals.css";
import ClientComponent from "../ClientComponent";
import Header from "../components/header/Header";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <ClientComponent>{children}</ClientComponent>
      </body>
    </html>
  );
}
