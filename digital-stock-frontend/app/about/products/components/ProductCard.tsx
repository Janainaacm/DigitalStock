import { ProductInterface } from "@/app/Types"
import Image from "next/image"
import React from "react"




export default function ProductCard({ product }: { product: ProductInterface }) {
    const {id, name, description, price, category, colorName, imageUrl, stock} = product

    return (
      <>
        <div className="border-r-4 border-red-500 bg-black-500">
          <header>{name}</header>
          <Image width={250} height={250} src={imageUrl} alt={"Product Image"} />
          <div>{description}</div>
          <footer>
            {price} <span>{id}</span>
          </footer>
        </div>
      </>
    )
  }