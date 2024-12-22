import { useEffect, useState } from "react";
import { useAuthState } from "../../../store/AuthState";
import { WishlistItemsInterface } from "../../../utils/Types";
import { useUserState } from "../../../store/UserState";
import { useRouter } from "next/navigation";

const WishlistPage = () => {
  const { wishlist } = useAuthState();
  const { removeFromWishlist, addItemToCart } = useUserState();
  const [wishlistItems, setWishlistItems] = useState<WishlistItemsInterface[]>([]);
  const [wishlistNumber, setWishlistNumber] = useState(0);
  const [extended, setExtended] = useState<number | null>(null); 
  const router = useRouter();


  const toggleExtend = (id: number) => {
    setExtended((prev) => (prev === id ? null : id)); 
  };

  useEffect(() => {
    if (wishlist?.items) {
      setWishlistItems(wishlist.items);
      setWishlistNumber(wishlist.items.length);
    } else {
      setWishlistItems([]);
      setWishlistNumber(0);
    }
  }, [wishlist]);

  const removeItem = (id: number) => {
    removeFromWishlist(id);
  }

  const handleAddToCart = (id: number) => {
    addItemToCart(id, 1);
  }

  return (
    <>
      <div className="mx-auto relative flex justify-center items-center mb-36">
        <div className="flex flex-col jusitfy-start items-start">
        <div className="p-6">
          <div className="mt-3">
            <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">
              Wishlist
            </h1>
          </div>
          <div className="pt-4 w-full">
            <p className="text-2xl tracking-tight leading-6 text-gray-600">
              {wishlistNumber} items
            </p>
          </div>
          </div>
          <div className="pt-10 p-6 shadow-inner grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-5">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex p-3 shadow-md flex-col relative"> 
                <div className="relative">
                  <img
                    className="lg:block p-6"
                    src={item.product.imageUrl}
                  />
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400"
                  >
                    <svg
                      className="fil-current"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M13 1L1 13"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 1L13 13"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex justify-center items-center">
                    <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800">
                      {item.product.name}
                    </p>
                  </div>
                  <div className="flex justify-center items-center mb-1">
                    <button
                      onClick={() => toggleExtend(item.id)}
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400 hover:bg-gray-200"
                    >
                      <svg
                        className={`fill-stroke transform transition-transform ${
                          extended === item.id ? "rotate-180" : "rotate-0"
                        }`}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  className={`absolute top-full left-0 z-50 bg-white w-full transition-all duration-500 overflow-hidden ${
                    extended === item.id ? "max-h-[700px] py-3" : "max-h-0"
                  }`}
                >
                  <div className="flex flex-col jusitfy-start items-start mt-6 px-4">
                    <div>
                      <p className="tracking-tight text-xs leading-3 text-gray-800">
                        Color
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
                        {item.product.colorName}
                      </p>
                    </div>
                    <div>
                      <p className="tracking-tight mt-6 text-xs leading-3 text-gray-800">
                        Price
                      </p>
                    </div>
                    <div className="mt-2 mb-4">
                      <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
                        {item.product.price}
                      </p>
                    </div>
                    {item.product.stock === 0 ? (
                      <div className="flex items-center">
                        <div className="bg-red-600 h-4 w-4 rounded-full"></div>
                        <p className="text-red-600 ml-3">Out of stock</p>
                      </div>
                    ) : null}
                    {item.product.stock < 7 && item.product.stock !== 0 ? (
                      <div className="flex items-center">
                        <div className="bg-yellow-600 h-4 w-4 rounded-full"></div>
                        <p className="text-yellow-600 ml-3">Almost out of stock</p>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="bg-green-500 h-4 w-4 rounded-full"></div>
                        <p className="text-green-600 ml-3">In stock</p>
                      </div>
                    )}
                    <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-6 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                      <div className="w-full">
                        <button 
                        onClick={() => router.push(`./products/${item.product.id}`)}
                        className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800 bg-white border border-gray-800">
                          More information
                        </button>
                      </div>
                      <div className="w-full">
                        <button
                        onClick={() => handleAddToCart(item.product.id)}
                        className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default WishlistPage;
