"use client";
import { useState } from "react";
import CartSymbol from "./components/cartComponent/CartSymbol";
import WishlistSymbol from "./components/wishlistComponent/WishlistSymbol";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DisplaySearchBar from "../searchBar/DisplaySearchBar";
import { useAppState } from "@/app/store/BackendAPIState";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { fetchProductsByCategory } = useAppState();
  const router = useRouter();

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleClick = () => {
    console.log("klicking", isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const searchByCategory = (category: string) => {
    fetchProductsByCategory(category, router)
  };

  const redirect = (path: string) => {
    if (isMenuOpen) {
          handleClick();
    }
    router.push(`${path}`);
  };

  return (
    <div className="flex bg-white border-b py-4 sm:px-8 px-6 font-[sans-serif] min-h-[80px] tracking-wide z-[110] fixed top-0 w-full">
      <div className="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full">
        <div
          id="collapseMenu"
          className={`lg:ml-10 lg:block z-50 transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
          }  max-lg:min-w-[300px] max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-full max-lg:shadow-md max-lg:bg-white`}
        >
          <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
              <button
                onClick={() => redirect("/")}
                className="hover:text-[#007bff] text-[#007bff] font-semibold block text-[15px]"
              >
                Home
              </button>
            </li>
            <li className="group max-lg:border-b max-lg:px-3 max-lg:py-3 relative">
              <button
                className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                onClick={() => handleToggle()}
              >
                Store
                <svg
                  width="16px"
                  height="16px"
                  className="ml-1 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                    data-name="16"
                    data-original="#000000"
                  />
                </svg>
              </button>

              <ul
                className={`top-5 max-lg:top-8 left-0 z-50 block space-y-2 bg-white overflow-hidden min-w-[250px] max-h-0 transition-all duration-500
              ${
                isMenuOpen
                  ? ""
                  : "absolute shadow-lg group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6"
              } ${isExpanded && isMenuOpen ? "py-3 max-h-[700px] before:bg-[rgba(0,0,0,0.5)]" : ""} `}
              >
                <li className="border-b py-3">
                  <button
                    onClick={() => redirect("/products")}
                    className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                  >
                    <svg
                      width="20px"
                      height="20px"
                      className="mr-4 inline-block"
                      viewBox="0 0 1700 1700"
                    >
                      <path
                        d="M916.7 1269.4c-10.7 0-20.4-7.2-23.2-18l-29.9-114.7c-3.3-12.8 4.3-25.9 17.2-29.3 12.8-3.3 25.9 4.3 29.3 17.2l29.9 114.7c3.3 12.8-4.3 25.9-17.2 29.3-2 .5-4.1.8-6.1.8zm-169.4 0c-2 0-4-.3-6.1-.8-12.8-3.3-20.5-16.4-17.2-29.3l29.9-114.7c3.3-12.8 16.4-20.5 29.3-17.2 12.8 3.3 20.5 16.4 17.2 29.3l-29.9 114.7c-2.8 10.8-12.6 18-23.2 18z"
                        data-original="#000000"
                      />
                      <path
                        d="M1066.6 1358.8H597.4c-13.3 0-24-10.7-24-24 0-62.6 50.9-113.5 113.5-113.5h290.4c62.6 0 113.5 50.9 113.5 113.5-.2 13.3-10.9 24-24.2 24zm-440.7-48H1038c-9.6-24.3-33.3-41.5-60.9-41.5H686.8c-27.6.1-51.3 17.3-60.9 41.5zM276.4 762.7c-13.3 0-24-10.7-24-24V395c0-29.7 24.2-53.9 53.9-53.9h1051.4c29.7 0 53.9 24.2 53.9 53.9v297.8c0 13.3-10.7 24-24 24s-24-10.7-24-24V395c0-3.2-2.6-5.9-5.9-5.9H306.3c-3.2 0-5.9 2.6-5.9 5.9v343.7c0 13.2-10.7 24-24 24zm904.5 392H446.5c-13.3 0-24-10.7-24-24s10.7-24 24-24h734.3c13.3 0 24 10.7 24 24s-10.6 24-23.9 24zm0-120.8H446.5c-13.3 0-24-10.7-24-24s10.7-24 24-24h734.3c13.3 0 24 10.7 24 24s-10.6 24-23.9 24z"
                        data-original="#000000"
                      />
                      <path
                        d="M424.1 1358.8H128.4c-25.6 0-46.4-20.8-46.4-46.4V761.1c0-25.6 20.8-46.4 46.4-46.4h295.7c25.6 0 46.4 20.8 46.4 46.4v551.3c0 25.6-20.8 46.4-46.4 46.4zm-294.1-48h292.5V762.7H130z"
                        data-original="#000000"
                      />
                      <path
                        d="M446.5 853.6H106c-13.3 0-24-10.7-24-24s10.7-24 24-24h340.5c13.3 0 24 10.7 24 24s-10.7 24-24 24zm0 414.4H106c-13.3 0-24-10.7-24-24s10.7-24 24-24h340.5c13.3 0 24 10.7 24 24s-10.7 24-24 24zm1125.1 90.8h-368.3c-25.6 0-46.4-20.8-46.4-46.4V715.2c0-25.6 20.8-46.4 46.4-46.4h368.3c25.6 0 46.4 20.8 46.4 46.4v597.2c0 25.6-20.8 46.4-46.4 46.4zm-366.7-48H1570v-594h-365.1z"
                        data-original="#000000"
                      />
                      <path
                        d="M1594 811.8h-413.1c-13.3 0-24-10.7-24-24s10.7-24 24-24H1594c13.3 0 24 10.7 24 24s-10.7 24-24 24zm0 452h-413.1c-13.3 0-24-10.7-24-24s10.7-24 24-24H1594c13.3 0 24 10.7 24 24s-10.7 24-24 24z"
                        data-original="#000000"
                      />
                    </svg>
                    All products
                  </button>
                </li>

                <li className="border-b py-3">
                  <button
                    onClick={() => searchByCategory("Computers")}
                    className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      width="20px"
                      height="20px"
                      stroke="currentColor"
                      className="mr-4 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                      />
                    </svg>
                    Computers
                  </button>
                </li>

                <li className="border-b py-3">
                  <button
                    onClick={() => searchByCategory("Smartphones")}
                    className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                  >
                    <svg
                      fill="none"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="mr-4 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                      />
                    </svg>
                    Smartphones
                  </button>
                </li>
                <li className="border-b py-3">
                  <button
                    onClick={() => searchByCategory("Earphones")}
                    className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                  >
                    <svg
                      className="mr-4 inline-block"
                      viewBox="0 0 24 24"
                      fill="none"
                      width="20px"
                      height="20px"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                    Headphones
                  </button>
                </li>
                <li className={` ${
                  isMenuOpen
                  ? "pt-3"
                  : "border-b py-3"
                }`}>
                  <button
                    onClick={() => searchByCategory("Watches")}
                    className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                  >
                    <svg
                      className="mr-4 inline-block"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <rect x="6" y="6" width="12" height="12" rx="3" />{" "}
                      <path d="M9 18v3h6v-3" /> <path d="M9 6v-3h6v3" />
                    </svg>
                    Watches
                  </button>
                </li>
              </ul>
            </li>

            <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
              <Link
                href="javascript:void(0)"
                className="hover:text-[#007bff] text-gray-600 font-semibold text-[15px] block"
              >
                About
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
              <Link
                href="javascript:void(0)"
                className="hover:text-[#007bff] text-gray-600 font-semibold text-[15px] block"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex gap-x-6 gap-y-4 ml-auto">
          <DisplaySearchBar />

          <div className="flex items-center space-x-8 ml-12">
            <WishlistSymbol />
            <CartSymbol />
            <button
              className="inline-block cursor-pointer border-gray-300"
              onClick={() => redirect("../user/profile")}
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                className="hover:fill-[#007bff]"
              >
                <circle cx="10" cy="7" r="6" data-original="#000000" />
                <path
                  d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                  data-original="#000000"
                />
              </svg>
            </button>

            <button
              id="toggleClose"
              className="lg:hidden z-[90] rounded-full  bg-transparent"
              onClick={handleClick}
            >
              <div
                className={`transition-transform -ml-2 duration-300 ease-in-out ${
                  isMenuOpen ? "rotate-180 opacity-100" : "rotate-0 opacity-100"
                }`}
              >
                {isMenuOpen ? (
                  <svg
                    className="h-7 w-7 text-gray-900"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg
                    className="w-7 h-7 fill-current text-gray-900 transform"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

/**
 
 */
