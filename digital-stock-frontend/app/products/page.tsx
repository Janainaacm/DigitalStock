"use client";
import { useRouter } from "next/navigation";
import { useAppState } from "../store/BackendAPIState";
import { useEffect, useState } from "react";
import { useAuthState } from "@/app/store/AuthState";
import { useUserState } from "../store/UserState";
import FilterButton from "./components/FilterButton";
import AddToCartButton from "./components/AddToCartButton";

export default function ProductPage() {
  const { fetchAllProducts, productList, displayProducts, fetchDisplayProducts, filteredProductList, searchKeyword } = useAppState();
  const { addToWishlist, removeFromWishlist, isProductInWishlist, clearWishlist } = useUserState()
  const { user } = useAuthState();
  const router = useRouter();
  const [title, setTitle] = useState("Products")

  useEffect(() => {
    if (productList.length === 0) {
      fetchAllProducts()
    }
  }, [productList]);

  useEffect(() => {
    fetchDisplayProducts();

    if (searchKeyword) {
      setTitle(`Products found in ${searchKeyword}`)
    }
  }, [productList, filteredProductList]);


  const handleAddToWishlist = (productId: number) => {
    if (!user) {
      alert("Please log in to add products to your wishlist.");
      return;
    }

    const inWishlist = isProductInWishlist(productId);

    if (inWishlist) {
      console.log(productId)
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    
  };

  const clear = () => {
    clearWishlist();
  };

  
  return (
    <div>
      <div className="font-sans bg-gray-50 p-4 mx-autow-full px-24 shadow-inner">
        
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          {title}
        </h2>
        <p className="mb-12 text-gray-500 border-b ">{displayProducts.length} Items</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-400"
              onClick={() => router.push(`./products/${product.id}`)}
            >
              <div className="relative w-full aspect-w-16 p-2 aspect-h-8 lg:h-80">
                <button
                  className="absolute top-2 opacity-80 right-2 bg-gray-50 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWishlist(product.id);
                  }}
                >
                  <svg
                    width="27px"
                    className={`text-red-600 ${
                      isProductInWishlist(product.id)
                        ? "fill-red-600"
                        : "fill-none hover:fill-red-200 hover:scale-[1.05] hover:opacity-80 transition-all duration-600"
                    }`}
                    
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className=" h-full w-full object-cover object-top"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
                <div className="mt-4 flex items-center flex-wrap gap-2">
                  <h4 className="text-md font-semibold text-gray-800">
                    ${product.price}
                  </h4>

                  <div className="relative w-full aspect-w-16 p-2">
                    <AddToCartButton productId={product.id} quantity={1}/>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
