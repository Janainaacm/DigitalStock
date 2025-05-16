import { ProductInterface } from "@/app/utils/Types";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";
import { useRouter } from "next/navigation";
import { useAppState } from "@/app/store/BackendAPIState";

type Props = {
  product: ProductInterface;
  showProps: boolean;
};

const ProductCard = ({ product, showProps }: Props) => {
  const router = useRouter();
  const { selectProduct } = useAppState();

  const handleClick = () => {
    selectProduct(product);
    router.push(`./products/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group overflow-hidden cursor-pointer relative bg-white 
        h-80 sm:h-86 md:h-90 lg:h-96 w-full flex flex-col"
    >
      <div className="relative h-56 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden bg-white flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain max-h-full max-w-full p-3 hover:scale-110 transition-all duration-700"
        />
        {showProps && (
          <div className="absolute bottom-0 bg-white/60 h-10 md:opacity-0 md:h-0 px-2 md:group-hover:opacity-100 md:group-hover:h-10 w-full flex justify-between items-center transition-all duration-500">
            <AddToWishlistButton product={product} />
            <AddToCartButton productId={product.id} quantity={1} />
          </div>
        )}
      </div>

      <div className="p-2 sm:p-3 md:p-4 relative flex-grow flex flex-col justify-between">
        <div className="z-20 relative bg-white">
          <h6 className="text-sm sm:text-base md:text-md font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h6>
          <h6 className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
            ${product.price}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
