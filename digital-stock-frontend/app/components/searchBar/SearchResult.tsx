import { ProductInterface } from "@/app/utils/Types";
import { useAppState } from "@/app/store/BackendAPIState";
import { useRouter } from "next/navigation";

type SearchResultProps = {
  product: ProductInterface;
};

const SearchResult = ({ product }: SearchResultProps) => {
  const { selectProduct, setSearchBar } = useAppState();
  const router = useRouter();

  const search = (product: ProductInterface) => {
    selectProduct(product);
    setSearchBar("")
    router.push(`/products/${product.id}`);
  };

  return (
    <button 
    className="px-5 py-2 hover:bg-gray-200"
    onClick={() => search(product)}>
      {product.name}
    </button>
  );
};

export default SearchResult;
