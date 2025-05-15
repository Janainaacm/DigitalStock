"use client";
import { useAppState } from "../../store/BackendAPIState";
import { useEffect, useState } from "react";
import { useAuthState } from "@/app/store/AuthState";
import FilterProductsButton from "./components/filterButton/FilterProductsButton.tsx";
import ProductCard from "./components/ProductCard";
import LoadingIcon from "@/public/icons/LoadingIcon";
import { ProductInterface } from "@/app/utils/Types";

export default function ProductPage() {
  const {
    fetchAllProducts,
    productList,
    displayProducts,
    fetchDisplayProducts,
    searchKeyword,
    filteredProductList,
  } = useAppState();
  const { user } = useAuthState();
  const [title, setTitle] = useState("Products");
  const [shown, setShown] = useState<ProductInterface[]>([]);

  useEffect(() => {
    if (productList.length == 0) {
      fetchAllProducts();
    }
  }, [productList, fetchAllProducts]);

  useEffect(() => {
    fetchDisplayProducts();

    if (searchKeyword && searchKeyword.length > 1) {
      setTitle(`Products found in: ${searchKeyword}`);
    } else {
      setTitle("Products")
    }
  }, [fetchDisplayProducts, searchKeyword, filteredProductList]);

  useEffect(() => {
    if (displayProducts.length > 0) {
      setShown(displayProducts);
    } else {
      setShown(productList);
    }
  }, [displayProducts, productList]);

  

  return (
    <div className="font-[sans-serif] bg-white p-4 mx-auto max-w-[1400px]">
      <div className="font-sans bg-white p-4 mx-autow-full md:px-14 shadow-inner">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">{title}</h2>

        <div className="border-b flex justify-between items-center pb-2">
          <div>
            <p className="text-gray-500">{shown.length} Products</p>
          </div>
          <div>
            <FilterProductsButton />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
          {shown.length > 0 ? 
           (shown.map((product) => (
            <ProductCard key={product.id} product={product} showProps={!!user && user.role == "ROLE_ADMIN"}/>
          )))
        : 
        <LoadingIcon/>
        }
         
        </div>
      </div>
    </div>
  );
}
