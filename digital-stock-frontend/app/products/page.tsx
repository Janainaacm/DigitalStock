import ProductCard from "../_component/ProductCard"
import { IProduct, IProducts } from "../_types/IProduct"

export default async function Store() {
  const data = await fetch("https://dummyjson.com/c/13be-235c-4e6a-924c")
  const result: IProducts = await data.json() // Contains Object
  const productList: IProduct[] = result.products // Contains Array ONLY

  return (
    <main>
      <div className="flex items-center justify-center">
        <p>Products</p>
        <img src="https://example.com/images/smartphone-x.jpg" alt="" />
        <section>
          {productList.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </section>
      </div>
    </main>
  )
}
