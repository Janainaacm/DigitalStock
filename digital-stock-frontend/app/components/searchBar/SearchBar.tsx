"use client";

import { useAppState } from "@/app/store/BackendAPIState";
import SearchIcon from "@/public/icons/SearchIcon";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Props {
  setSearchResult: () => void;
}
const SearchBar = ({setSearchResult}: Props) => {
  const { searchBar, setSearchBar, productList } = useAppState();
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null); 



  const getSearchResult = () => {
    const filteredList = productList.filter((product) =>
      product.name.toLowerCase().includes(searchBar.toLowerCase())
    );
    console.log(filteredList);
    setOpen(!open)
    setSearchResult()
    router.push("/products");
  };

  const handleChange = (value: string) => {
    setSearchBar(value);
  };


  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus(); 
    }
  }, [open]);

  
  return (
    <div 
    onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setOpen(false); 
      }
    }}
    tabIndex={-1} 
    className="relative w-full flex items-center">
      {open ? (
           <div className="relative group px-2 py-2 text-gray-700 font-medium text-sm uppercase w-full flex items-center focus-within:border-none">
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
             ref={inputRef}
             type="text"
             placeholder="Search..."
             className="w-full h-full outline-none text-sm z-10 bg-transparent focus:outline-none group-focus-within:border-none"
             value={searchBar}
             onChange={(e) => handleChange(e.target.value)}
             onKeyDown={(e) => e.key === "Enter" && getSearchResult() }
           />
     
           <div className="absolute top-0 left-0 w-0 h-0 border-gray-500 group-hover:border-t-2 transition-all duration-500 group-hover:w-full group-hover:h-full group-focus-within:border-blue-500 group-focus-within:h-full group-focus-within:w-full group-focus-within:border-t-2 z-0"></div>
           <div className="absolute top-0 right-0 w-0 h-0 border-gray-500 group-hover:border-t-2 transition-all duration-500 group-hover:w-full group-hover:h-full group-focus-within:border-blue-500 group-focus-within:h-full group-focus-within:w-full group-focus-within:border-t-2 z-0"></div>
           <div className="absolute bottom-0 left-0 w-full h-0 border-b-2 border-l-2 border-gray-500 transition-all duration-400 group-hover:w-full group-hover:h-full group-focus-within:border-blue-500 group-focus-within:h-full z-0"></div>
           <div className="absolute bottom-0 right-0 w-full h-0 border-b-2 border-r-2 border-gray-500 transition-all duration-400 group-hover:w-full group-hover:h-full group-focus-within:border-blue-500 group-focus-within:h-full z-0"></div>
         </div>
      ) : (
        <button
        onClick={() => setOpen(true)}
        >
          <SearchIcon/>
        </button>
      )}
    </div>

    

  );
};
export default SearchBar;
