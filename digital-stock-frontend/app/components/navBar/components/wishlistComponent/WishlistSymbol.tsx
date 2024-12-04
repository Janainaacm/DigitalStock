import { useAuthState } from "@/app/store/AuthState";
import { useAppState } from "@/app/store/BackendAPIState";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WishlistItemsInterface } from "@/app/utils/Types";
import WishlistDropdown from "./WishlistDropdown";
import WhistlistIcon from "@/public/icons/WishlistIcon";

const WishlistSymbol = () => {
  const { wishlist } = useAuthState();
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<WishlistItemsInterface[]>(
    []
  );
  const [wishlistNumber, setWishlistNumber] = useState(0);
  const [animate, setAnimate] = useState("");


  useEffect(() => {
    if (wishlist?.items) {
      setWishlistItems(wishlist.items);
      setWishlistNumber(wishlist.items.length);
    } else {
      setWishlistItems([]);
      setWishlistNumber(0);
    }
  }, [wishlist]);

  // Animate Wishlist Number
  const handleAnimate = useCallback(() => {
    if (wishlistNumber === 0) return;
    setAnimate("animate__animated animate__headShake");
  }, [wishlistNumber, setAnimate]);

  // Set animate when no of wishlist changes
  useEffect(() => {
    handleAnimate();
    setTimeout(() => {
      setAnimate("");
    }, 1000);
  }, [handleAnimate]);

  return (
    <div className="group relative">

    <button
    type="button"
    className="relative"
    aria-label="Wishlist"
  >
    <WhistlistIcon />
    {wishlistNumber > 0 && (
      <span
        className={`${animate} absolute text-xs -top-3 -right-3 bg-gray-800 text-gray-100 py-1 px-2 rounded-full`}
      >
        {wishlistNumber}
      </span>
    )}
  </button>
  <div className="max-h-0 overflow-hidden group-hover:max-h-[400px] transition-[max-height] duration-300 ease-in-out">
        <WishlistDropdown wishlistItems={wishlistItems} />
      </div>
  </div>

  );
};

export default WishlistSymbol;

 
  /* <div className="group relative">
      <button className="hover:text-[#007bff] text-gray-600 text-[15px] font-bold lg:hover:fill-[#007bff] block">
        <svg
          width="20px"
          className="cursor-pointer fill-[#333] inline"
          viewBox="0 0 64 64"
        >
          <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
        </svg>
        <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
          {wishlistNumber || 0}
        </span>
      </button>
      <div className="max-h-0 overflow-hidden group-hover:max-h-[400px] transition-[max-height] duration-300 ease-in-out">
        <WishlistDropdown wishlistItems={wishlistItems} />
      </div>
    </div> */
 