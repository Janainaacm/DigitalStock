import { WishlistItemsInterface } from "@/app/utils/Types";
import { useUserState } from "@/app/store/UserState";
import { useRouter } from "next/navigation";

interface WishlistDropdownProps {
  wishlistItems: WishlistItemsInterface[];
}

const WishlistDropdown = ({ wishlistItems }: WishlistDropdownProps) => {
  const { removeFromWishlist, addItemToCart } = useUserState();
  const router = useRouter()

  const removeItemFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = (productId: number) => {
    addItemToCart(productId, 1)
  }

  return (
    <div className="absolute right-0 mt-2 w-[350px] max-h-0 overflow-hidden group-hover:max-h-[500px] transition-all duration-300 ease-in-out bg-white shadow-xl rounded-lg font-sans">
      <h3 className="text-2xl px-6 py-3 border-b font-bold flex-1">Wishlist</h3>

      <div className="max-h-[350px] -mb-4 overflow-scroll px-4 pt-4">
        {wishlistItems && wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {wishlistItems.map(
              (item) =>
                item.product && (
                  <div key={item.product.id} className=" border-b pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-white border p-3 rounded-md">
                        <img
                          src={item.product.image}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col">
                        <h3 className="text-base max-sm:text-sm font-bold text-gray-800">
                          {item.product.name}
                        </h3>
                        <p className="text-xs font-semibold text-gray-500 mt-0.5">
                          Color: {item.product.colorName}
                        </p>

                        <button
                          type="button"
                          className="mt-3 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
                          onClick={() =>
                            removeItemFromWishlist(item.product.id)
                          }
                        >
                          <svg
                            className="w-4 fill-current inline"
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
                          REMOVE
                        </button>
                        <button
                          type="button"
                          className="mt-3 font-semibold text-black text-xs flex items-center gap-1 shrink-0"
                          onClick={() =>
                            handleAddToCart(item.product.id)
                          }
                        >
                          <svg
                            className="h-4 w-4 text-gray-900"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600">Your wishlist is empty.</p>
        )}
      </div>
      <div className="p-6 w-full border-t bg-white">
        <button
          onClick={() => router.push("/user?currentPage=wishlist")}
          type="button"
          className="text-sm font-semibold py-3 w-full border hover:bg-gray-50 hover:shadow-xl transition-all duration-300 rounded-md tracking-wide"
        >
          Go to wishlist
        </button>
      </div>
    </div>
  );
};
export default WishlistDropdown;
