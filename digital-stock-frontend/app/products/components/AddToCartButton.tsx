import { useAuthState } from "@/app/store/AuthState";
import { useUserState } from "@/app/store/UserState";

interface AddToCartButtonProps {
    productId: number,
    quantity: number
}

const AddToCartButton = ({productId, quantity}: AddToCartButtonProps) => {
  const { addItemToCart } = useUserState();
  const { user } = useAuthState();

  const handleClick = () => {
    if (!user) {
      console.log("no user, open login pop up");
      return;
    }

    addItemToCart(productId, quantity);
  };

  return (
    <button
      className="absolute bottom-2 opacity-80 right-2 bg-gray-50 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:scale-[1.15] transition-all duration-200"
      onClick={(e) => {
        e.stopPropagation();
        handleClick();}}
    >
      <svg
        className="h-5 w-5 text-gray-900"
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
    </button>
  );
};

export default AddToCartButton;
