"use client";
import { useAuthState } from "@/app/store/AuthState";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  currentPage: string;
  onProfile: () => void;
  onOrders: () => void;
  onWishlist: () => void;
};

const SideBar = ({ currentPage, onProfile, onOrders, onWishlist }: Props) => {
  const { logout } = useAuthState();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav
        id="sidebar"
        className={`bg-white shadow-lg h-screen w-[250px] fixed left-0 transition-transform duration-300 z-[100] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div
          id="sidebar-collapse-menu"
          className="bg-white shadow-lg h-screen py-6 pl-4 top-[70px] left-0 overflow-auto"
        >
          <div>
            <div className="w-full px-4 flex justify-end lg:hidden">
              <button onClick={toggleSidebar}>
                <svg
                  className="h-6 w-6 text-gray-700"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <h6 className="mt-3 text-blue-600 text-sm font-bold px-4">
              User Menu
            </h6>
            <ul className="mt-5 space-y-3">
              <li>
                <button
                  onClick={() => {onProfile(); setIsOpen(false)}}
                  className={`w-full text-sm flex items-center rounded-md p-4 py-2 transition-all ${
                    currentPage === "profile"
                      ? "text-white bg-blue-400 rounded-l-full"
                      : "hover:bg-gray-100 text-gray-800 bg-white"
                  }`}
                >
                  <svg
                    fill="currentColor"
                    className="w-[18px] h-[18px] mr-3"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                      data-original="#000000"
                    />
                  </svg>
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {onOrders(); setIsOpen(false)}}
                  className={`w-full text-sm flex items-center rounded-md px-4 py-2 transition-all ${
                    currentPage === "orders"
                      ? "text-white bg-blue-400 rounded-l-full"
                      : "hover:bg-gray-100 text-gray-800 bg-white"
                  }`}
                >
                  <svg
                    className="w-[26px] h-[26px] -ml-1 mr-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <circle cx="7" cy="17" r="2" />{" "}
                    <circle cx="17" cy="17" r="2" />
                    <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                  </svg>
                  <span>Orders</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {onWishlist(); setIsOpen(false)}}
                  className={`w-full text-sm flex items-center rounded-md px-4 py-2 transition-all ${
                    currentPage === "wishlist"
                      ? "text-white bg-blue-400 rounded-l-full"
                      : "hover:bg-gray-100 text-gray-800 bg-white"
                  }`}
                >
                  <svg
                    className="h-5 w-5 mr-3 -ml-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <polyline points="20 12 20 22 4 22 4 12" />{" "}
                    <rect x="2" y="7" width="20" height="5" />{" "}
                    <line x1="12" y1="22" x2="12" y2="7" />{" "}
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />{" "}
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>

                  <span>Wishlist</span>
                </button>
              </li>
            </ul>

            <h6 className="text-blue-600 text-sm font-bold px-4 mt-24 py-3">
              Sign out
            </h6>
            <button
              onClick={handleLogOut}
              className="text-gray-800 w-full text-sm mb-20 flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
            >
              <svg
                fill="currentColor"
                className="w-[18px] h-[18px] mr-3"
                viewBox="0 0 6.35 6.35"
              >
                <path
                  d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                  data-original="#000000"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <button
        id="toggle-sidebar"
        onClick={toggleSidebar}
        className="lg:hidden w-8 h-8 z-[100] fixed ml-3  cursor-pointer flex items-center justify-center rounded-full outline-none transition-all duration-500"
      >
        <div
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        >
          <svg
            className="h-6 w-6 text-gray-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
        <div
          className={`absolute transition-transform duration-200 ${
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default SideBar;
