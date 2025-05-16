"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppState } from "@/app/store/BackendAPIState";
import GoBackButton from "@/app/components/buttons/GoBackButton";
import { ProductInterface } from "@/app/utils/Types";
import { useAuthState } from "@/app/store/AuthState";
import { useUserState } from "@/app/store/UserState";
import LoadingIcon from "@/public/icons/LoadingIcon";

const ProductDetails = () => {
  const {
    product,
    allProductVariants,
    fetchAllProductColorsByName,
  } = useAppState();
  const { user } = useAuthState();
  const {
    addItemToCart,
    addToWishlist,
    isProductInWishlist,
    removeFromWishlist,
  } = useUserState();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<ProductInterface | null>(
    null
  );
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (product) {
      fetchAllProductColorsByName(product.name);
      setSelectedColor(product);
    }
  }, [product, fetchAllProductColorsByName]);

  useEffect(() => {
    if (selectedColor) {
      setIsInWishlist(isProductInWishlist(selectedColor.id));
    }
  }, [selectedColor, isProductInWishlist]);

  const handleColorChange = (variant: ProductInterface) => {
    setSelectedColor(variant);
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in to add products to your cart.");
      return;
    }

    if (!selectedColor) {
      return;
    }

    addItemToCart(selectedColor.id, quantity);
  };

  const handleAddToWishlist = (productId: number) => {
    if (!user) {
      alert("Please log in to add products to your wishlist.");
      return;
    }

    const inWishlist = isProductInWishlist(productId);

    if (inWishlist) {
      console.log(productId);
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    setIsInWishlist(!isInWishlist);
  };

  if (!product || !selectedColor) {
    return <p>Loading...</p>;
  }

  return (
    <div className="font-sans tracking-wide max-md:mx-auto">
      <div className="bg-white md:min-h-[600px] grid items-start grid-cols-1 lg:grid-cols-5 md:grid-cols-2">
        <div className="lg:col-span-3 h-full ">
          <div className="mt-4 ml-6 relative">
            <GoBackButton />
          </div>
          <div className="relative h-full flex items-center justify-center lg:min-h-[580px]">
            {selectedColor ? (
              <img
                src={selectedColor.image}
                alt="Product"
                className="lg:w-3/5 w-3/4 h-full w-full object-contain max-lg:p-8"
              />
            ) : (
              <LoadingIcon />
            )}
          </div>
        </div>

        {selectedColor ? (
          <div className="lg:col-span-2 bg-gray-100 py-6 px-8 h-full">
            <div>
              <h2 className="text-3xl font-bold text-black">
                {selectedColor.name}
              </h2>
              <h3 className="text-md font-semibold mt-3 text-black">
                {selectedColor.colorName}
              </h3>
            </div>

            <div className="mt-8">
              <h3 className="text-md text-gray-800">Price</h3>
              <p className="text-gray-800 text-3xl font-bold mt-1">
                ${selectedColor.price}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">
                Choose a Color
              </h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {allProductVariants.map((variant) => (
                  <div key={variant.id} className="relative group">
                    <button
                      type="button"
                      style={{
                        backgroundImage: `url(${variant.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className={`w-20 h-20 mr-3 border-2 ${
                        selectedColor.id === variant.id
                          ? "border-gray-800"
                          : "border-white"
                      } hover:border-gray-800 rounded-full shrink-0`}
                      onClick={() => handleColorChange(variant)}
                    />
                    <p className="absolute top-24 left-1/2 -translate-x-1/2 text-gray-700 text-sm">
                      {variant.colorName}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-lg font-bold text-gray-800">Quantity</h3>
              <div className="flex divide-x border w-max mt-4 rounded overflow-hidden">
                <button
                  type="button"
                  className="bg-gray-100 w-10 h-9 font-semibold flex items-center justify-center"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  <svg
                    className="w-3 fill-current inline"
                    viewBox="0 0 124 124"
                  >
                    <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="bg-transparent w-10 h-9 font-semibold flex items-center justify-center text-gray-800 text-lg"
                >
                  {quantity}
                </button>
                <button
                  type="button"
                  className="bg-gray-800 text-white w-10 h-9 font-semibold flex items-center justify-center"
                  onClick={() => {
                    if (quantity < 10) {
                      setQuantity(quantity + 1);
                    }
                  }}
                >
                  <svg className="w-3 fill-current inline" viewBox="0 0 42 42">
                    <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {user && user.role == "ROLE_ADMIN" ? null : (
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => handleAddToCart()}
                  type="button"
                  className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => handleAddToWishlist(selectedColor.id)}
                  type="button"
                  className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                >
                  {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center text-sm text-gray-800 mt-8">
              <svg className="fill-current w-6 mr-3" viewBox="0 0 48 48">
                <path d="M15.5 33.3h19.1v2H15.5z" data-original="#000000" />
                <path
                  d="M45.2 35.3H43v-2h2.2c.4 0 .8-.4.8-.8v-9.1c0-.4-.3-.6-.5-.7l-3.2-1.3c-.3-.2-.8-.5-1.1-1l-6.5-10c-.1-.2-.4-.3-.7-.3H2.8c-.4 0-.8.4-.8.8v21.6c0 .4.4.8.8.8h3.9v2H2.8C1.3 35.3 0 34 0 32.5V10.9c0-1.5 1.3-2.8 2.8-2.8h31.3c1 0 1.9.5 2.4 1.3l6.5 10 .4.4 2.9 1.2c1.1.5 1.7 1.4 1.7 2.5v9.1c0 1.4-1.3 2.7-2.8 2.7z"
                  data-original="#000000"
                />
                <path
                  d="M26.5 21H3.9v-9.4h22.6zM5.9 19h18.6v-5.4H5.9zm32.9 2H27.9v-9.4h6.3zm-8.9-2h5.7L33 13.6h-3.1zm-19 20.9c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6zm27.9 9.2c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6z"
                  data-original="#000000"
                />
              </svg>
              Free delivery on orders above $900
            </div>
          </div>
        ) : (
          <LoadingIcon />
        )}
      </div>

      <div className="mt-8 mb-16 max-w-2x px-6">
        <div className="mt-8 mb-6">
          <h3 className="text-lg font-bold text-gray-800">
            Product Description
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            {selectedColor? selectedColor.description : "Loading."}
          </p>
        </div>

        <h3 className="text-lg font-bold text-gray-800">Stock</h3>
        <p className="text-sm text-gray-600 mb-6">
          {selectedColor ? (selectedColor.stock, " units available.") : "Loading."}
        </p>

        <h3 className="text-lg font-bold text-gray-800">Category</h3>
        <p className="text-sm text-gray-600">{selectedColor ? selectedColor.categoryName : "Loading."}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
