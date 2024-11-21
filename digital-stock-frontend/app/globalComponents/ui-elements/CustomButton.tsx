import Link from "next/link"

export default function CustomButton(customUrl: {
  href: string
  text: string
}) {
  return (
    <div
      className="bg-jetStream-600 px-6 py-2 text-white
    font-bold rounded-md 
    hover:bg-jetStream-500 hover:cursor-pointer
    "
    >
      <Link href={customUrl.href}>{customUrl.text}</Link>
    </div>
  )
}
