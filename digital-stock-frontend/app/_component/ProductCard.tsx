import Image from "next/image"
import { IProduct } from "../_types/IProduct"

// Where does Destructuring happen?
export default function ProductCard({ product }: { product: IProduct }) {
  const { id, title, description, price, image } = product // Destructuring

  return (
    <>
      <div className="border-r-4 border-red-500 bg-black-500">
        <header>{title}</header>
        <Image width={250} height={250} src={image} alt={"Product Image"} />
        <div>{description}</div>
        <footer>
          {price} <span>{id}</span>
        </footer>
      </div>
    </>
  )
}
