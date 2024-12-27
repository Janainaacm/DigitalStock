"use client";

import { useAppState } from "@/app/store/BackendAPIState";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";
import { useEffect, useRef, useState } from "react";

const DisplaySearchBar = ({ inSideBar = false }) => {
  const {
    productList,
    fetchAllProducts: fetchProducts,
  } = useAppState();
  const [open, setOpen] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [barOpen, setBarOpen] = useState(inSideBar);


  useEffect(() => {
    if (productList.length === 0) {
      fetchProducts();
    }
  }, [productList]);


  
  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
      if (!inSideBar) setBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full relative">
      <SearchBar
        open={barOpen}
        setOpen={() => setBarOpen((prev) => !prev)}
      />
      {open && (
        <div
          className="relative"
          onClick={(e) => e.stopPropagation()} 
        >
          <SearchResultsList />
        </div>
      )}
    </div>
  );
  
};

export default DisplaySearchBar;
