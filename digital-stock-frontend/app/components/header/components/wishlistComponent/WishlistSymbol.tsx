import { useAuthState } from "@/app/store/AuthState";
import { useCallback, useEffect, useState } from "react";
import { WishlistItemsInterface } from "@/app/utils/Types";
import WishlistDropdown from "./WishlistDropdown";
import WhistlistIcon from "@/public/icons/WishlistIcon";
import AuthForm from "@/app/(with-layout)/auth/AuthForm";

const WishlistSymbol = () => {
  const { wishlist, user } = useAuthState();
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

  const handleAnimate = useCallback(() => {
    if (wishlistNumber === 0) return;
    setAnimate("animate__animated animate__headShake");
  }, [wishlistNumber, setAnimate]);

  useEffect(() => {
    handleAnimate();
    setTimeout(() => {
      setAnimate("");
    }, 1000);
  }, [handleAnimate]);

  const showContents = () => {
    if (user) {
      return <WishlistDropdown wishlistItems={wishlistItems} />;
    } else {
      return (
        <div className="absolute right-0 mt-2 w-[350px] max-h-0 overflow-hidden group-hover:max-h-[500px] transition-all duration-300 ease-in-out bg-white shadow-xl rounded-lg font-sans">
          <div className="flex py-7 flex-col items-center justify-center">
            <h4 className="text-md pb-5 text-gray-600">
              Sign in to see wishlist
            </h4>
            <AuthForm>
              <div className="bg-blue-500 text-white font-semibold rounded-xl py-2 px-7">
                Sign in
              </div>
            </AuthForm>
          </div>
        </div>
      );
    }
  };

  if (user && user.role == "ROLE_ADMIN") {
    return (
      null
    )
  }

  return (
    <div className="group relative">
      <button type="button" className="relative" aria-label="Wishlist">
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
        {showContents()}
      </div>
    </div>
  );
};

export default WishlistSymbol;
