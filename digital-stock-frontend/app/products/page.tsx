"use client";
import { useRouter } from "next/navigation";
import { useAppState } from "../store/BackendAPIState";
import { useEffect, useState } from "react";
import { useAuthState } from "@/app/store/AuthState";
import { ProductInterface } from "../utils/Types";
import { useUserState } from "../store/UserState";
import FilterButton from "./components/FilterButton";
import SearchBar from "../globalComponents/searchBar/SearchBar";
import AddToCartButton from "./components/AddToCartButton";

export default function ProductPage() {
  const { fetchAllProducts, productList, displayProducts, fetchDisplayProducts, filteredProductList, searchKeyword } = useAppState();
  const { addToWishlist, removeFromWishlist, isProductInWishlist, clearWishlist } = useUserState()
  const { user, wishlist } = useAuthState();
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
      <div className="bg-white shadow-lg border h-screen fixed min-w-[200px] py-6 px-4 font-[sans-serif] overflow-auto">
        <div className="mt-6">
          <h6 className="text-blue-600 text-md font-bold px-4">Filter</h6>
          <FilterButton/>
          <ul className="mt-3">
            <li>
              <button onClick={() =>clear()}>
                Clear wishlist
              </button>
              <a
                href="javascript:void(0)"
                className="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all"
              >
                <svg
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                    data-original="#000000"
                  />
                </svg>
                <span>Audience</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="font-sans p-4 mx-auto lg:max-w-5xl md:max-w-3xl  sm:max-w-full">
        
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
          Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
