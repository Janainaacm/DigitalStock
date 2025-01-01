import { ProductInterface } from "@/app/utils/Types";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";
import { useRouter } from "next/navigation";

type Props = {
  product: ProductInterface;
  showProps: boolean;
};

const ProductCard = ({ product, showProps }: Props) => {
    const router = useRouter()
    
  return (
    <div
    onClick={() => router.push(`./products/${product.id}`)}
     className="group overflow-hidden cursor-pointer relative">
      <div className="bg-white w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="p-3 w-full object-cover object-top hover:scale-110 transition-all duration-700" 
        />
      </div>

      <div className="p-4 relative">
        {showProps ?
        null
        : 
        <div
          className="flex flex-wrap justify-between gap-2 w-full absolute px-4 pt-3 z-10
            transition-all duration-500
            left-0 right-0
            group-hover:bottom-20
            lg:bottom-5 lg:opacity-0 lg:bg-white lg:group-hover:opacity-100
            max-lg:bottom-20 max-lg:py-3 max-lg:bg-white/60"
        >
          <AddToWishlistButton product={product}/>
          <AddToCartButton productId={product.id} quantity={1}/>
        </div>
        }
        
        <div className="z-20 relative bg-white">
          <h6 className="text-md font-semibold text-gray-800">
            {product.name}
          </h6>
          <h6 className="text-sm text-gray-600 mt-2">${product.price}</h6>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
