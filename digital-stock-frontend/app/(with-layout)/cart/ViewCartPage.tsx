"use client";
import { useAuthState } from "@/app/store/AuthState";
import { useUserState } from "@/app/store/UserState";
import { useState, useEffect } from "react";
import colorClasses from "../../utils/ColorClasses";
import { useRouter } from "next/navigation";

type Props = {
  onCheckout: () => void;
}

const ViewCart = ({onCheckout}: Props) => {
  const { cart } = useAuthState();
  const {
    addItemToCart,
    removeItemFromCart,
    isProductInWishlist,
    addToWishlist,
    removeFromWishlist,
  } = useUserState();
  const [subtotal, setSubtotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (cart) {
      const newSubtotal = cart.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);

      setSubtotal(Number(newSubtotal.toFixed(2)));
    }
  }, [cart]);

  const handleAddToCart = (productId: number) => {
    addItemToCart(productId, 1);
  };
  const handleRemoveFromCart = (productId: number, quantity: number) => {
    removeItemFromCart(productId, quantity);
  };

  const handleAddToWishlist = (productId: number) => {
    const inWishlist = isProductInWishlist(productId);

    if (inWishlist) {
      console.log(productId);
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <div className="font-sans max-w-4xl max-md:max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-extrabold text-gray-800">Your Cart</h1>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="col-span-2 space-y-4">
          {cart?.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]"
            >
              <div className="flex gap-4">
                <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                  <img
                    src={item.product.imageUrl}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-800">
                      {item.product.name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                      Color:{" "}
                      <span
                        className={`inline-block w-5 h-5 rounded-md ${
                          colorClasses[item.product.colorName.toLowerCase().replace(/\s+/g, "")]
                        }`}
                        
                      ></span>
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    <button
                      onClick={() => handleRemoveFromCart(item.product.id, 1)}
                      type="button"
                      className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full"
                    >
                      <svg className="w-2 fill-white" viewBox="0 0 124 124">
                        <path
                          d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                    <span className="font-bold text-sm leading-[18px]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item.product.id)}
                      type="button"
                      className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full"
                    >
                      <svg className="w-2 fill-white" viewBox="0 0 42 42">
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="ml-auto flex flex-col">
                <div className="flex items-start gap-4 justify-end">
                  <button onClick={() => handleAddToWishlist(item.product.id)}>
                    <svg
                      width="27px"
                      className={`text-gray-400 ${
                        isProductInWishlist(item.product.id)
                          ? "fill-red-400 text-red-700"
                          : "fill-none  hover:opacity-80"
                      } hover:fill-red-300 hover:text-red-700 hover:scale-[1.05] transition-all duration-600`}
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

                  <button
                    onClick={() =>
                      handleRemoveFromCart(item.product.id, item.quantity)
                    }
                  >
                    <svg
                      className="w-4 cursor-pointer fill-gray-400 hover:fill-red-800 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </button>
                </div>
                <h3 className="text-base font-bold text-gray-800 mt-auto">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
          <ul className="text-gray-800 space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal{" "}
              <span className="ml-auto font-bold">${subtotal.toFixed(2)}</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Shipping <span className="ml-auto font-bold">$5.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Tax{" "}
              <span className="ml-auto font-bold">
                ${(subtotal * 0.1).toFixed(2)}
              </span>
            </li>
            <hr className="border-gray-300" />
            <li className="flex flex-wrap gap-4 text-sm font-bold">
              Total
              <span className="ml-auto">
                ${(subtotal + 5 + subtotal * 0.1).toFixed(2)}
              </span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              onClick={onCheckout}
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
              disabled={cart?.items.length == 0}
            >
              Buy Now
            </button>
            <button
            onClick={() => router.push("/")}
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
            >
              Continue Shopping
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <img
              src="https://readymadeui.com/images/master.webp"
              alt="card1"
              className="w-10 object-contain"
            />
            <img
              src="https://readymadeui.com/images/visa.webp"
              alt="card2"
              className="w-10 object-contain"
            />
            <img
              src="https://readymadeui.com/images/american-express.webp"
              alt="card3"
              className="w-10 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
