import { ProductInterface } from "@/app/Types"
import AddToCartButton from "./AddToCartButton"




export default function ProductCard({ product }: { product: ProductInterface }) {
    const {id, name, description, price, category, colorName, imageUrl, stock} = product
//          <Image width={250} height={250} src={imageUrl} alt={"Product Image"} />

    return (
      <>
        <div className="p-5 py-10 bg-purple-100 text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
          <div className="bg-white p-7 rounded-xl">
            <img src={imageUrl} alt="" />
          </div>
          <h1 className="text-3xl my-5">{name}</h1>
          <p className="mb-5">{description}</p>
          <h2 className="font-semibold mb-5">${price}</h2>

          <AddToCartButton product={product}/>
          
        </div>
      </>
    )
  }