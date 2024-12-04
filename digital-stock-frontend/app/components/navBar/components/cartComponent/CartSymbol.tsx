import { CartItemInterface, WishlistItemsInterface } from "@/app/utils/Types";
import { useAuthState } from "@/app/store/AuthState";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import CartDropdown from "./CartDropdown";
import BagIcon from "@/public/icons/BagIcon";

const CartSymbol = () => {
  const { cart } = useAuthState();
  const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);
  const [cartNumber, setCartNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState("");


  useEffect(() => {
    if (cart?.items) {
      setCartItems(cart.items);

      const numberOfItems = cart.items.reduce((acc, item) => {
        return acc + 1 * item.quantity;
      }, 0);
      setCartNumber(Number(numberOfItems.toFixed(2)));
    } else {
      setCartItems([]);
      setCartNumber(0);
    }
  }, [cart]);

  useEffect(() => {
    console.log(open);
  }, [open]);


  const handleAnimate = useCallback(() => {
    if (cartNumber === 0) return;
    setAnimate("animate__animated animate__headShake");
  }, [cartNumber, setAnimate]);

  useEffect(() => {
    handleAnimate();
    setTimeout(() => {
      setAnimate("");
    }, 1000);
  }, [handleAnimate]);


  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-label="Cart">
          <BagIcon extraClass="h-8 w-8 sm:h-6 sm:w-6" />
          {cartNumber > 0 && (
            <span
              className={`${animate} absolute text-xs -top-3 bg-gray-800 text-gray-100 py-1 px-2 rounded-full`}
            >
              {cartNumber}
            </span>
          )}
        </button>

      <div>
        {open && (
          <div
            className="fixed inset-0 bg-black-300 bg-opacity-50 z-[100]"
            onClick={() => setOpen(false)}
          ></div>
        )}

        <div
          className={`fixed inset-y-0 right-0 z-[101] transform ${
            open ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out bg-white`}
        >
          <CartDropdown cartItems={cartItems} onClose={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default CartSymbol;
