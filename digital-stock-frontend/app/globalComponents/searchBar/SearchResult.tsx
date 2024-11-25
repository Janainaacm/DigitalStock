import { useAppState } from "@/app/store/BackendAPIState";
import Link from "next/link";

const SearchResult = () => {
  const { filteredProductList, setFilteredProductList, setSearchBar } = useAppState();

  const showResults = () => {
    if (!filteredProductList || filteredProductList.length === 0) return [];
    const uniqueProducts = new Map();
    filteredProductList.forEach((product) => {
      if (!uniqueProducts.has(product.name)) {
        uniqueProducts.set(product.name, product);
      }
    });
    return Array.from(uniqueProducts.values());
  };

  const filteredResults = showResults();

  const handleClick = () => {
    setSearchBar(""); 
    setFilteredProductList([]); 
  };

  return (
    <div className="">
      <ul className="absolute top-5  max-lg:top-8 left-0 z-50 block space-y-2 shadow-lg bg-white max-h-[300px] overflow-y-scroll min-w-[250px] px-6 transition-all duration-500">
        {filteredResults.map((product) => (
          <li key={product.id} className="max-lg:border-b max-lg:px-3 max-lg:py-3 border-b py-3">
            <Link
              href={`/products/${product.id}`}
              passHref
              onClick={handleClick}
              className="hover:text-[#007bff] text-gray-700 normal-case block text-[15px]"
            >
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
