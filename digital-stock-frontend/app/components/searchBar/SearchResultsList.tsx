import { ProductInterface } from "@/app/utils/Types";
import SearchResult from "./SearchResult";
import { useEffect, useState } from "react";
import { useAppState } from "@/app/store/BackendAPIState";



const SearchResultsList = () => {
  const [results, setResults] = useState<ProductInterface[]>([])
  const { searchBar, productList } = useAppState()

  const fetchResults = () => {
    if (searchBar === "") {
      setResults([]);
    } else {
      const filtered = productList.filter((product) =>
        product.name.toLowerCase().includes(searchBar.toLowerCase())
      );

      const noDuplicates = filtered.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.name === product.name)
      );

      setResults(noDuplicates);
    }
  };

  useEffect(() => {
    fetchResults()
  }, [searchBar])

  return (
    <div
      className={`search-results-list w-full bg-white flex flex-col shadow-md rounded-lg mt-1 overflow-y-scroll absolute transition-all duration-300 ease-in-out ${
        results.length > 0 ? "visible opacity-100" : "invisible opacity-0"
      }`}
      style={{
        maxHeight: results.length > 0 ? "230px" : "0",
      }}
    >
      {results.map((product) => (
        <SearchResult product={product} key={product.id} />
      ))}
    </div>
  );
};


export default SearchResultsList;
