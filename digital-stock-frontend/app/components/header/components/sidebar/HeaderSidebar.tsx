import AuthForm from "@/app/(with-layout)/auth/AuthForm";
import WhistlistIcon from "@/public/icons/WishlistIcon";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState, Fragment, useEffect } from "react";
import { useAuthState } from "@/app/store/AuthState";
import Image from "next/image";
import MenuIcon from "@/public/icons/MenuIcon";
import UserIcon from "@/public/icons/UserIcon";
import DisplaySearchBar from "@/app/components/searchBar/DisplaySearchBar";
import { useAppState } from "@/app/store/BackendAPIState";
import AllProductsIcon from "@/public/icons/AllProductsIcon";
import SmartphoneIcon from "@/public/icons/SmartphoneIcon";
import ComputerIcon from "@/public/icons/ComputerIcon";
import EarphoneIcon from "@/public/icons/EarphoneIcon";
import WatchIcon from "@/public/icons/WatchIcon";

export default function HeaderSidebar() {
  const router = useRouter();
  const { wishlist } = useAuthState();
  const { user } = useAuthState();
  const [open, setOpen] = useState(false);
  const [extended, setExtended] = useState(false);

  const [WishlistNumber, setWishlistNumber] = useState(0);
  const { fetchProductsByCategory } = useAppState();

  const toggleModal = () => setOpen((prev) => !prev);
  const toggleExtend = () => setExtended((prev) => !prev);

  useEffect(() => {
    if (wishlist) {
      setWishlistNumber(wishlist.items.length);
    }
  }, [wishlist, user]);

  const searchByCategory = (category: string) => {
    fetchProductsByCategory(category, router);
  };

  const redirect = (path: string) => {
    if (open) {
      toggleModal();
    }
    router.push(`${path}`);
  };

  return (
    <>
      <div className="relative">
        <button
          type="button"
          aria-label="Hamburger Menu"
          onClick={toggleModal}
          className="focus:outline-none"
        >
          <MenuIcon />
        </button>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          style={{ zIndex: 100 }}
          static
          open={open}
          onClose={toggleModal}
        >
          <div className="min-h-screen fixed left-0">
            <div className="fixed inset-0 bg-black-300 bg-opacity-50" />
            <TransitionChild
              as={Fragment}
              enter="ease-linear duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="ease-linear duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div
                style={{ height: "100vh" }}
                className="relative opacity-95 overflow-y-auto inline-block dur h-screen w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl"
              >
                  <button
                    type="button"
                    className="outline-none absolute right-5 top-5 focus:outline-none text-3xl sm:text-2xl"
                    onClick={toggleModal}
                  >
                    &#10005;
                  </button>

                <div className="my-12">
                  <div className="itemContainer px-6 w-full flex flex-col justify-around items-center">
                    <div className="pt-5 pb-3 bg-white z-[200] flex w-full">
                      <DisplaySearchBar inSideBar={true} />
                    </div>
                    <ul className="space-y-3  h-full overflow-auto z-50">
                      <li className="group w-full text-xl border-b py-4 my-3 flex justify-between">
                        <button
                          onClick={() => redirect("/")}
                          className="group-hover:text-blue-400 text-gray-600 block"
                        >
                          Home
                        </button>
                      </li>
                      <li className="group relative w-full text-xl border-b py-4 my-3">
                        <button
                          onClick={toggleExtend}
                          className="group-hover:text-blue-400 group-hover:fill-blue-400 text-gray-600 block"
                        >
                          Store
                          <svg
                            width="16px"
                            height="16px"
                            className={`ml-1 inline-block ${extended ? "rotate-180" : ""} transition-transform duration-500`} 
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
                          className={`top-5 left-0 z-50 block space-y-2 bg-white overflow-hidden min-w-[250px] max-h-0 transition-all duration-500
                            ${
                              extended
                                ? "py-3 max-h-[700px] before:bg-[rgba(0,0,0,0.5)] pt-3"
                                : ""
                            } `}
                        >
                          <li className="border-b py-3">
                            <button
                              onClick={() => redirect("/products")}
                              className="hover:text-[#007bff] text-gray-600 text-[15px] block"
                            >
                              <AllProductsIcon extraClass="mr-4"/>
                              All products
                            </button>
                          </li>
                          <li className="border-b py-3">
                            <button
                              onClick={() => searchByCategory("Computers")}
                              className="hover:text-[#007bff] text-gray-600 text-[15px] block"
                            >
                              <ComputerIcon extraClass="mr-4"/>
                              Computers
                            </button>
                          </li>
                          <li className="border-b py-3">
                            <button
                              onClick={() => searchByCategory("Smartphones")}
                              className="hover:text-[#007bff] text-gray-600 text-[15px] block"
                            >
                              <SmartphoneIcon extraClass="mr-4"/>
                              Smartphones
                            </button>
                          </li>
                          <li className="border-b py-3">
                            <button
                              onClick={() => searchByCategory("Earphones")}
                              className="hover:text-[#007bff] text-gray-600 text-[15px] block"
                            >
                              <EarphoneIcon extraClass="mr-4"/>
                              Earphones
                            </button>
                          </li>
                          <li className="pt-3">
                            <button
                              onClick={() => searchByCategory("Watches")}
                              className="hover:text-[#007bff] text-gray-600  text-[15px] block"
                            >
                              <WatchIcon extraClass="mr-4"/>
                              Watches
                            </button>
                          </li>
                        </ul>
                      </li>
                      <li className="w-full group text-xl border-b py-4 my-3 flex justify-between">
                      <button
                          onClick={() => redirect("/about")}
                          className="group-hover:text-blue-400 text-gray-600 block"
                        >
                          About
                        </button>
                      </li>
                      <li className="w-full group text-xl border-b py-4 my-3 flex justify-between">
                      <button
                          onClick={() => redirect("/contact")}
                          className="group-hover:text-blue-400 text-gray-600 block"
                        >
                          Contact
                        </button>
                      </li>
                      <li 
                      onClick={toggleModal}
                      className="w-full group text-xl border-b py-4 my-3">
                        <AuthForm extraClass="w-full">
                          <div className="flex group-hover:text-blue-400 text-gray-600 block justify-between items-center w-full">
                            <span>{user ? "Profile" : "Login"}</span>
                            <div className="flex-shrink-0">
                              <UserIcon extraClass="group-hover:text-blue-400" />
                            </div>
                          </div>
                        </AuthForm>
                      </li>
                     {user && user.role == "ROLE_USER" && (
                      <li className="w-full group text-xl border-b py-4 my-3 flex justify-between">
                        <button
                          onClick={() => redirect("/wishlist")}
                          className="group-hover:text-blue-400 text-gray-600 block w-full flex justify-between"
                        >
                          <span>Wishlist</span>
                          <div className="relative">
                            <WhistlistIcon />
                            {WishlistNumber > 0 && (
                              <span
                                className={`absolute text-xs -top-0 -left-7 bg-gray-500 group-hover:bg-blue-400 text-gray-100 py-1 px-2 rounded-full`}
                              >
                                {WishlistNumber}
                              </span>
                            )}
                          </div>
                        </button>
                      </li>
                     )} 
                      
                    </ul>
                    <div className="mt-14">
                    <button
                          onClick={() => redirect("/")}>
                    <Image
                      className="justify-center scale-[2]"
                      src="/logo-with-text.svg"
                      alt="Logo"
                      width={85}
                      height={22}
                    />
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
