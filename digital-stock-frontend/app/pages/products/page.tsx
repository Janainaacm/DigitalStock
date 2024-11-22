'use client'

import ProductCard from "./components/ProductCard"
import {  useAppState } from "../../store/BackendAPIState"
import { useEffect } from "react"

export default function ProductPage() {
    const {fetchProducts, productsList} = useAppState();


    useEffect (() => {
        if (productsList.length == 0) {
            fetchProducts();
        }
    })

    return (
        <div className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start ">
            {productsList.map((product) => (
                <ProductCard product={product} key={product.id}/>
            ))}
            
        </div>
    )
}

