import Link from "next/link"

export default function CustomLink(customUrl: { href: string; text: string }) {
  return (
    <>
      <Link href={customUrl.href}>
        <p
          className="
      text-black-700
      transition hover:text-whiteLilac-600 hover:-translate-y-1"
        >
          {customUrl.text}
        </p>
      </Link>

      {/* 
        <Link href={customUrl.href}>
      <p
        className="
      text-limedSpruce-700
      transition hover:text-limedSpruce-600 hover:-translate-y-1"
      >
        {customUrl.text}
      </p>
    </Link>
    
    */}
    </>
  )
}
