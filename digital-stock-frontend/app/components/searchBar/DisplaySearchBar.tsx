"use client";

import { useAppState } from "@/app/store/BackendAPIState";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";
import { useEffect, useState } from "react";
import { ProductInterface } from "@/app/utils/Types";

const DisplaySearchBar = () => {
  const {
    searchBar,
    productList,
    fetchAllProducts: fetchProducts,
    setFilteredProductList,
  } = useAppState();
  const [searchResult, setSearchResult] = useState<ProductInterface[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [open, isOpen] = useState(false)


  const setResults = () => {
    if (searchBar === "") {
    setFilteredProductList([])
    setSearchResult([])
    } else {
    const filtered = productList.filter((product) =>
      product.name.toLowerCase().includes(searchBar.toLowerCase())
    );
    setFilteredProductList(filtered);

    const noDuplicates = filtered.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.name === product.name)
    );
    
    setSearchResult(noDuplicates)
    }
  };

  useEffect(() => {
    if (productList.length === 0) {
      fetchProducts();
    }
  }, [productList]);

  useEffect(() => {
    if (productList.length > 0) {
      setResults();
    }
  }, [searchBar]);



  return (
    <div className="w-full">
      <SearchBar setSearchResult={() => setSearchResult([])}/>
      <div className="relative">
      <SearchResultsList results={searchResult} />
      </div>
    </div>
  );
};

export default DisplaySearchBar;
