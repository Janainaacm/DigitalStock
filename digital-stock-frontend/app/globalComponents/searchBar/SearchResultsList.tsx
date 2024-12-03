import { ProductInterface } from "@/app/utils/Types";
import SearchResult from "./SearchResult";

interface SearchResultsListProps {
  results: ProductInterface[];
}

const SearchResultsList = ({ results }: SearchResultsListProps) => {
    return (
        <div
          className="w-full bg-white flex flex-col shadow-md rounded-lg mt-1 overflow-y-scroll absolute transition-all duration-300 ease-in-out"
          style={{ maxHeight: results.length > 0 ? '230px' : '0', opacity: results.length > 0 ? '1' : '0' }}
        >
          {results.map((product) => (
            <SearchResult product={product} key={product.id} />
          ))}
        </div>
      );
      
};

export default SearchResultsList;
