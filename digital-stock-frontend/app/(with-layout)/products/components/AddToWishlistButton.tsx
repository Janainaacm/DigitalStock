import { useAuthState } from "@/app/store/AuthState";
import { useUserState } from "@/app/store/UserState";
import { ProductInterface } from "@/app/utils/Types";

interface AddToWishlistButtonProps {
  product: ProductInterface;
}

const AddToWishlistButton = ({ product }: AddToWishlistButtonProps) => {
  const { addToWishlist, isProductInWishlist, removeFromWishlist } =
    useUserState();
  const { user } = useAuthState();

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
  };

  return (
    <button
    className="bg-transparent outline-none border-none"
      onClick={(e) => {
        e.stopPropagation();
        handleAddToWishlist(product.id);
      }}
    >
      <svg
        className={`h-6 w-6 ${
          isProductInWishlist(product.id)
            ? "text-red-600 fill-red-600"
            : "text-gray-600 fill-none hover:fill-red-200 hover:text-red-400 hover:scale-[1.05] hover:opacity-80 transition-all duration-600"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};

export default AddToWishlistButton;
