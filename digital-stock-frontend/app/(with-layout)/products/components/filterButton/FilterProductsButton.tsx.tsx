"use client";

import { useState } from "react";
import FilterProductsDropdown from "./FilterProductsDropdown";


const FilterProductsButton = () => {
  const [open, setOpen] = useState(false);

  const toggleExtend = () => {
    setOpen(!open);
  };

  return (
    <div className="relative">
      <div>
        <button
          onClick={toggleExtend}
          className={`border group px-7 py-1.5 text-gray-700 font-medium text-md uppercase tracking-widest focus:outline-none flex items-center transition-all duration-500 ${
            open ? "shadow-inner bg-gray-50" : "shadow-md"
          }`}
        >
          FILTER
        </button>
      </div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Cart"
      ></button>

      <div>
        {open && (
          <div
            className="fixed inset-0 bg-black-300 bg-opacity-50 z-[100]"
            onClick={() => setOpen(false)}
          ></div>
        )}

        <div
          className={`fixed inset-y-0 right-0 z-[101] transform ${
            open ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out bg-white`}
        >
          <FilterProductsDropdown onClose={() => setOpen(false)}/>
        </div>
      </div>
    </div>
  );
};
export default FilterProductsButton;
