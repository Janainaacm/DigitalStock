"use client";

import { useAppState } from "@/app/store/BackendAPIState";
import SearchIcon from "@/public/icons/SearchIcon";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  setOpen: () => void;
}

const SearchBar = ({ open, setOpen }: Props) => {
  const { searchBar, setSearchBar, productList, setSearchKeyword, setFilteredProductList } = useAppState();
  const router = useRouter();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getSearchResult = () => {
    const filteredList = productList.filter((product) =>
      product.name.toLowerCase().includes(searchBar.toLowerCase())
    );
    
    setSearchKeyword(searchBar);
    setFilteredProductList(filteredList)
    setSearchBar("")
    router.push("/products");
  };

  const handleChange = (value: string) => {
    setSearchBar(value);
    console.log(searchBar)
  };


  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  
  }, [open]);
  


  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="relative w-full flex items-center"
    >
      {open ? (
        <div className="relative group px-2 text-gray-700 text-md w-full flex items-center">
          <SearchIcon />

          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="w-full h-full outline-none text-md ml-3 z-10 bg-transparent focus:outline-none"
            value={searchBar}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getSearchResult()}
          />
        </div>
      ) : (
        <button onClick={() => setOpen()}>
          <SearchIcon />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
