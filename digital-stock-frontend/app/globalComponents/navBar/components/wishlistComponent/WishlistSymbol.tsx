import { useAuthState } from "@/app/store/AuthState";
import { useAppState } from "@/app/store/BackendAPIState";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WishlistItemsInterface } from "@/app/Types";

const WishlistSymbol = () => {
  const { wishlist } = useAuthState();
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<WishlistItemsInterface[]>(
    []
  );
  const [wishlistNumber, setWishlistNumber] = useState(0);

  useEffect(() => {
    if (wishlist?.items) {
      setWishlistItems(wishlist.items);
      setWishlistNumber(wishlist.items.length);
    } else {
      setWishlistItems([]);
      setWishlistNumber(0);
    }
  }, [wishlist]);

  return (
    <div className="group relative">
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
      <div className="absolute shadow-lg bg-white space-y-3 lg:top-5 max-lg:top-8 -left-6 min-w-auto] z-50 max-h-0 overflow-scroll group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
        <ul className="w-full">
          <li>
            {wishlistItems && wishlistItems.length > 0 ? (
              <div className="space-y-2">
                {wishlistItems.map(
                  (item) =>
                    item.product && (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 border-b pb-2"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            ${item.product.price?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    )
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-600">Your wishlist is empty.</p>
            )}
          </li>
        </ul>
        <button
          className="w-full bg-blue-600 text-white text-sm py-2 rounded-b hover:bg-blue-700 transition-all"
          onClick={() => router.push("/wishlist")}
        >
          Go to Wishlist
        </button>
      </div>
    </div>
  );
};

export default WishlistSymbol;
