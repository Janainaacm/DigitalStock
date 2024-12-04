"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

import UserIcon from "@/public/icons/UserIcon";
import AuthForm from "@/app/auth/AuthForm";

import styles from "./components/styles/Header.module.css";
import SearchBar from "../searchBar/SearchBar";
import DisplaySearchBar from "../searchBar/DisplaySearchBar";
import { useAuthState } from "@/app/store/AuthState";
import CartSymbol from "./components/cartComponent/CartSymbol";
import WishlistSymbol from "./components/wishlistComponent/WishlistSymbol";
import { useAppState } from "@/app/store/BackendAPIState";
import { useRouter } from "next/navigation";

type Props = {
  title?: string;
};

const Header = ({ title }: Props) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [didMount, setDidMount] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { fetchProductsByCategory } = useAppState();
  const router = useRouter();

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    if (offset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [setScrolled]);

  useEffect(() => {
    setDidMount(true);
    window.addEventListener("scroll", handleScroll);
    return () => setDidMount(false);
  }, [handleScroll]);

  if (!didMount) {
    return null;
  }

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleClick = () => {
    console.log("klicking", isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const searchByCategory = (category: string) => {
    fetchProductsByCategory(category)
    router.push("/products")
  };

  const redirect = (path: string) => {
    if (isMenuOpen) {
          handleClick();
    }
    router.push(`${path}`);
  };

  return (
    <>
      <nav
        className={`${
          scrolled ? "bg-white sticky top-0 shadow-md z-50" : "bg-transparent"
        } w-full z-50 h-20 relative`}
      >
        <div className="app-max-width w-full">
          <div
            className={`flex justify-between align-baseline app-x-padding ${styles.mainMenu}`}
          >
            {/* Hamburger Menu and Mobile Nav 
            <div className="flex-1 lg:flex-0 lg:hidden">
              <Menu />
            </div>
            
            */}


            {/* Left Nav */}
            <ul className={`flex-0 pt-1 lg:flex-1 flex ${styles.leftMenu}`}>
            <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
              <button
                onClick={() => redirect("/")}
                className="hover:text-white text-gray-600 transition-all duration-300 font-semibold block text-[15px]"
              >
                Home
              </button>
            </li>
            <li className="group max-lg:border-b max-lg:px-3 max-lg:py-3 relative">
              <button
                className="hover:text-white text-gray-600 transition-all duration-300 hover:fill-white fill-gray-600 text-gray-600 font-semibold text-[15px] block"
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
                className={`top-5 max-lg:top-8 left-0 z-50 block space-y-2 bg-white overflow-hidden w-[200px] max-h-0 transition-all duration-500
              ${
                isMenuOpen
                  ? ""
                  : "absolute shadow-lg group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6"
              } ${isExpanded && isMenuOpen ? "py-3 max-h-[700px] before:bg-[rgba(0,0,0,0.5)]" : ""} `}
              >
                <li className="border-b w-full pb-3">
                  <button
                    onClick={() => redirect("/products")}
                    className="hover:text-blue-400 hover:fill-blue-400 transition-all duration-300 text-gray-600 font-semibold text-[15px] block"
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

                <li className="border-b w-full py-3">
                  <button
                    onClick={() => searchByCategory("Computers")}
                    className="hover:text-blue-400 hover:fill-blue-400 transition-all duration-300 text-gray-600 font-semibold text-[15px] block"
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

                <li className="border-b w-full py-3">
                  <button
                    onClick={() => searchByCategory("Smartphones")}
                    className="hover:text-blue-400 hover:fill-blue-400 transition-all duration-300 text-gray-600 font-semibold text-[15px] block"
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
                <li className="border-b w-full py-3">
                  <button
                    onClick={() => searchByCategory("Earphones")}
                    className="hover:text-blue-400 hover:fill-blue-400 transition-all duration-300 text-gray-600 font-semibold text-[15px] block"
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
                  : "border-b w-full py-3"
                }`}>
                  <button
                    onClick={() => searchByCategory("Watches")}
                    className="hover:text-blue-400 hover:fill-blue-400 transition-all duration-300 text-gray-600 font-semibold text-[15px] block"
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
                className="hover:text-white text-gray-600 transition-all duration-300  text-gray-600 font-semibold text-[15px] block"
              >
                About
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
              <Link
                href="javascript:void(0)"
                className="hover:text-white text-gray-600 transition-all duration-300 text-gray-600 font-semibold text-[15px] block"
              >
                Contact
              </Link>
            </li>
          </ul>

            <div className="flex items-center justify-center h-full cursor-pointer">
              <div className="scale-[0.8] absolute top-2.5 w-32 h-auto">
                <Link href="/">
                  <Image
                    className="block"
                    src="/logo.svg" 
                    alt="Logo"
                    width={220}
                    height={40}
                  />
                </Link>
              </div>
            </div>

            <ul className={`flex-1 flex justify-end ${styles.rightMenu}`}>
              <li className="max-w-28">
                <DisplaySearchBar />
              </li>
              <li>
                <AuthForm>
                  <UserIcon />
                </AuthForm>
              </li>
              <li>
                <WishlistSymbol />
              </li>
              <li>
                <CartSymbol />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
