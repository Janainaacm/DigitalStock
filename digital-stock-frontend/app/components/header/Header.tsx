"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

import UserIcon from "@/public/icons/UserIcon";
import AuthForm from "@/app/(with-layout)/auth/AuthForm";

import styles from "./components/styles/Header.module.css";
import DisplaySearchBar from "../searchBar/DisplaySearchBar";
import CartSymbol from "./components/cartComponent/CartSymbol";
import WishlistSymbol from "./components/wishlistComponent/WishlistSymbol";
import { useAppState } from "@/app/store/BackendAPIState";
import { useRouter as useNavRouter } from "next/navigation";
import HeaderSidebar from "./components/sidebar/HeaderSidebar";
import { useRouter } from "next/compat/router";
import AllProductsIcon from "@/public/icons/AllProductsIcon";
import ComputerIcon from "@/public/icons/ComputerIcon";
import SmartphoneIcon from "@/public/icons/SmartphoneIcon";
import EarphoneIcon from "@/public/icons/EarphoneIcon";
import WatchIcon from "@/public/icons/WatchIcon";

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { fetchProductsByCategory, setFilteredProductList, setSearchKeyword } = useAppState();
  const router = useNavRouter();
  const Rrouter = useRouter();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [Rrouter, handleScroll]);

  const searchByCategory = (category: string) => {
    fetchProductsByCategory(category, router);
  };

  const getAllProducts = () => {
    setFilteredProductList([])
    setSearchKeyword("")
    router.push("/products");
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
            <div className="flex-1 lg:flex-0 lg:hidden">
              <HeaderSidebar />
            </div>

            <ul className={`flex-0 pt-1 lg:flex-1 flex ${styles.leftMenu}`}>
              <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
                <button
                  onClick={() => router.push("/")}
                  className="hover:text-gray-600 text-gray-800 transition-all duration-300 font-semibold block text-md"
                >
                  Home
                </button>
              </li>
              <li className="group max-lg:border-b max-lg:px-3 max-lg:py-3 relative">
                <button
                  className="hover:text-gray-600 text-gray-800 transition-all duration-300 group-hover:fill-gray-600 fill-gray-800 font-semibold text-md block"
                  onClick={() => getAllProducts()}
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

                <ul className="top-6 left-0 z-50 block space-y-2 bg-white overflow-hidden w-[200px] max-h-0 absolute shadow-lg group-hover:opacity-100 group-hover:max-h-[700px] px-3 mx-3 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                  <li className="border-b border-gray-300 w-full pb-3">
                    <button
                      onClick={() => getAllProducts()}
                      className="hover:text-blue-400 hover:fill-blue-400 transition-all duration-300 text-gray-600 font-semibold text-md block"
                    >
                      <AllProductsIcon extraClass="mr-4" />
                      All products
                    </button>
                  </li>

                  <li className="border-b border-gray-300 w-full py-3">
                    <button
                      onClick={() => searchByCategory("Computers")}
                      className="hover:text-blue-400 hover:fill-blue-400 transition-all duration-300 text-gray-600 font-semibold text-md block"
                    >
                      <ComputerIcon extraClass="mr-4" />
                      Computers
                    </button>
                  </li>

                  <li className="border-b border-gray-300 w-full py-3">
                    <button
                      onClick={() => searchByCategory("Smartphones")}
                      className="hover:text-blue-400 hover:fill-blue-400 transition-all duration-300 text-gray-600 font-semibold text-md block"
                    >
                      <SmartphoneIcon extraClass="mr-4" />
                      Smartphones
                    </button>
                  </li>
                  <li className="border-b border-gray-300 w-full py-3">
                    <button
                      onClick={() => searchByCategory("Earphones")}
                      className="hover:text-blue-400 hover:fill-blue-400 transition-all duration-300 text-gray-600 font-semibold text-md block"
                    >
                      <EarphoneIcon extraClass="mr-4" />
                      Earphones
                    </button>
                  </li>
                  <li className="border-b border-gray-300 w-full py-3">
                    <button
                      onClick={() => searchByCategory("Watches")}
                      className="hover:text-blue-400 hover:fill-blue-400 transition-all duration-300 text-gray-600 font-semibold text-md block"
                    >
                      <WatchIcon extraClass="mr-4" />
                      Watches
                    </button>
                  </li>
                </ul>
              </li>

              <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
                <Link
                  href="/about"
                  className="hover:text-gray-600 text-gray-800 transition-all duration-300 text-gray-600 font-semibold text-md block"
                >
                  About
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
                <Link
                  href="/contact"
                  className="hover:text-gray-600 text-gray-800 transition-all duration-300 text-gray-600 font-semibold text-md block"
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
              <li className="max-w-38">
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
