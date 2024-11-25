import { ProductInterface } from "@/app/Types";
import { useAuthState } from "@/app/store/AuthState";
import { useAppState } from "@/app/store/BackendAPIState";

const AddToCartButton = ({ product }: { product: ProductInterface }) => {
    const addItemToCart = useAppState((state) => state.addItemToCart);
    const { user } = useAuthState();
   

    const handleClick = () => {
        if (!user) {
            console.log("no user, open login pop up")
            return;
          }

        addItemToCart(product); 
    };

    return (
        <button 
        className="p-2 px-6 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        onClick={() => handleClick()}>
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
