"use client";

import { useAppState } from "@/app/store/BackendAPIState";
import SearchResult from "./SearchResult";

const SearchBar = () => {
  const { setFilteredProductList, setSearchBar, searchBar, productList } = useAppState()

  const getSearchResult = () => {
    const filteredList = productList.filter((product) => {
      const lowerCaseSearch = searchBar.toLowerCase();
      return (
        product.name.toLowerCase().includes(lowerCaseSearch) ||
        product.categoryName.toLowerCase().includes(lowerCaseSearch)
      );
    });

    setFilteredProductList(filteredList);
    setSearchBar("");
  };

  const fetchData = (value: string) => {
    const dynamicSearchResult = productList.filter((r) => {
      return value && r && r.name && r.name.toLowerCase().includes(value);
    });
    setFilteredProductList(dynamicSearchResult);
  };

  const handleChange = (value: string) => {
    setSearchBar(value);
    fetchData(value);
  };

  return (
<div className="relative group px-8 py-3 text-gray-700 font-medium text-sm mr-12 uppercase w-full flex items-center focus-within:border-none">
  <svg
    className="h-4 w-6 text-slate-600 mr-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>

  <input
    type="text"
    placeholder="Search Something..."
    className="w-full h-full outline-none text-sm z-10 bg-transparent focus:outline-none group-focus-within:border-none"
    value={searchBar}
    onChange={(e) => handleChange(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && getSearchResult()}
  />

  <div className="absolute top-0 left-0 w-0 h-0 border-gray-500 group-hover:border-t-2 transition-all duration-500 group-hover:w-full group-hover:h-full group-focus-within:border-blue-500 group-focus-within:h-full group-focus-within:w-full group-focus-within:border-t-2 z-0"></div>
  <div className="absolute top-0 right-0 w-0 h-0 border-gray-500 group-hover:border-t-2 transition-all duration-500 group-hover:w-full group-hover:h-full group-focus-within:border-blue-500 group-focus-within:h-full group-focus-within:w-full group-focus-within:border-t-2 z-0"></div>
  <div className="absolute bottom-0 left-0 w-full h-0 border-b-2 border-l-2 border-gray-500 transition-all duration-400 group-hover:w-full group-hover:h-full group-focus-within:border-blue-500 group-focus-within:h-full z-0"></div>
  <div className="absolute bottom-0 right-0 w-full h-0 border-b-2 border-r-2 border-gray-500 transition-all duration-400 group-hover:w-full group-hover:h-full group-focus-within:border-blue-500 group-focus-within:h-full z-0"></div>
  
  <div className="absolute left-0">
  <SearchResult/>
  </div>
</div>


  );
}
export default SearchBar;
