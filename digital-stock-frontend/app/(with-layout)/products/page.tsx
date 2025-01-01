"use client";
import { useRouter } from "next/navigation";
import { useAppState } from "../../store/BackendAPIState";
import { useEffect, useState } from "react";
import { useAuthState } from "@/app/store/AuthState";
import { useUserState } from "../../store/UserState";
import AddToCartButton from "./components/AddToCartButton";
import FilterProductsButton from "./components/filterButton/FilterProductsButton.tsx";
import ProductCard from "./components/ProductCard";

export default function ProductPage() {
  const {
    fetchAllProducts,
    productList,
    displayProducts,
    fetchDisplayProducts,
    searchKeyword,
  } = useAppState();
  const { addToWishlist, removeFromWishlist, isProductInWishlist } =
    useUserState();
  const { user } = useAuthState();
  const router = useRouter();
  const [title, setTitle] = useState("Products");

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
  }, [fetchDisplayProducts, searchKeyword]);

  

  return (
    <div>
      <div className="font-sans bg-white p-4 mx-autow-full px-14 shadow-inner">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">{title}</h2>

        <div className="border-b flex justify-between items-center pb-2">
          <div>
            <p className="text-gray-500">{displayProducts.length} Products</p>
          </div>
          <div>
            <FilterProductsButton />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} showProps={!!user && user.role == "ROLE_ADMIN"}/>
          ))}
        </div>
      </div>
    </div>
  );
}
