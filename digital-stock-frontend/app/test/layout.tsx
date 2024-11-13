import { Metadata } from "next"

export const metadata: Metadata = {
  title: "test",
  description: "Did it override?",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <p>Hello 'test'</p>
      {children}
    </section>
  )
}
