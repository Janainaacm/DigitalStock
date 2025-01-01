import { useAuthState } from "@/app/store/AuthState";
import { useUserState } from "@/app/store/UserState";

interface AddToCartButtonProps {
  productId: number;
  quantity: number;
}

const AddToCartButton = ({ productId, quantity }: AddToCartButtonProps) => {
  const { addItemToCart } = useUserState();
  const { user } = useAuthState();

  const handleClick = () => {
    if (!user) {
      alert("Please log in to add products to your cart.");
      return;
    }

    addItemToCart(productId, quantity);
  };

  return (
    <button
      className="bg-transparent outline-none border-none"
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <svg className="fill-gray-800 w-5 h-5 inline-block" viewBox="0 0 512 512">
        <path
          d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
          data-original="#000000"
        ></path>
      </svg>
    </button>
  );
};

export default AddToCartButton;
