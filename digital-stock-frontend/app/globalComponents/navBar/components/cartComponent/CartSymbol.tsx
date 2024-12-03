import { CartItemInterface, WishlistItemsInterface } from "@/app/utils/Types";
import { useAuthState } from "@/app/store/AuthState";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CartDropdown from "./CartDropdown";

const CartSymbol = () => {
  const { cart } = useAuthState();
  const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);
  const [cartNumber, setCartNumber] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(cart)
    if (cart?.items) {
      setCartItems(cart.items);
      setCartNumber(cart.items.length);
    } else {
      setCartItems([]);
      setCartNumber(0);
    }
  }, [cart]);


useEffect(() => {
  console.log(open)
}, [open])

return (
  <div className="relative">
    <button
      className="hover:text-[#007bff] text-gray-600 text-[15px] font-bold lg:hover:fill-[#007bff] block"
      onClick={() => setOpen(!open)}
    >
      <svg
        width="20px"
        height="20px"
        className="cursor-pointer fill-[#333] inline"
        viewBox="0 0 512 512"
      >
        <path
          d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
          data-original="#000000"
        ></path>
      </svg>
      <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
        {cartNumber || 0}
      </span>
    </button>

    <div
      className={`fixed inset-y-0 right-0 w-[500px] bg-white shadow-lg z-[100] transform ${
        open ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <CartDropdown cartItems={cartItems} onClose={() => setOpen(false)} />
    </div>
  </div>
);
};

export default CartSymbol;
