"use client";
import { useAuthState } from "@/app/store/AuthState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  currentPage: string;
  onUsers: () => void;
  onProducts: () => void;
  onAddProduct: () => void;
  onOrders: () => void;
  onDashboard: () => void;
  onProfile: () => void;
  onCalendar: () => void;
};

const SideBar = ({
  currentPage,
  onUsers,
  onProducts,
  onAddProduct,
  onOrders,
  onDashboard,
  onProfile,
  onCalendar,
}: Props) => {
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
    <div className="absolute left-0 w-full bg-blue-500">
      <nav
        id="sidebar"
        className={`bg-white shadow-lg h-screen w-[250px] fixed left-0 transition-transform duration-300 z-[100] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div
          id="sidebar-collapse-menu"
          className="bg-white shadow-lg h-screen py-6 px-4 top-[70px] left-0 overflow-auto"
        >
          <h6 className="text-blue-600 mt-4 text-sm font-bold px-4">Main</h6>
          <ul className="space-y-2 mt-3">
            <li>
              <button
                onClick={() => {
                  onDashboard();
                  setIsOpen(false);
                }}
                className={`w-full text-sm flex items-center rounded-md px-4 py-2 transition-all ${
                  currentPage === "dashboard"
                    ? "text-white bg-blue-400 rounded-l-full"
                    : "hover:bg-gray-100 text-gray-800 bg-white"
                }`}
              >
                <svg
                  className="h-5 w-5 mr-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x="4" y="4" width="6" height="6" rx="1" />
                  <rect x="4" y="14" width="6" height="6" rx="1" />
                  <rect x="14" y="14" width="6" height="6" rx="1" />
                  <line x1="14" y1="7" x2="20" y2="7" />
                  <line x1="17" y1="4" x2="17" y2="10" />
                </svg>

                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onCalendar();
                  setIsOpen(false);
                }}
                className={`w-full text-sm flex items-center rounded-md px-4 py-2 transition-all ${
                  currentPage === "calendar"
                    ? "text-white bg-blue-400 rounded-l-full"
                    : "hover:bg-gray-100 text-gray-800 bg-white"
                }`}
              >
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Calendar</span>
              </button>
            </li>
          </ul>

          <div className="mt-6">
            <h6 className="text-blue-600 text-sm font-bold px-4">Management</h6>
            <ul className="mt-3 space-y-2">
              <li>
                <button
                  onClick={() => {
                    onUsers();
                    setIsOpen(false);
                  }}
                  className={`w-full text-sm flex items-center rounded-md px-4 py-2 transition-all ${
                    currentPage === "users"
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
                  <span>Users</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onOrders();
                    setIsOpen(false);
                  }}
                  className={`w-full text-sm flex items-center rounded-md px-4 py-2 transition-all ${
                    currentPage === "orders"
                      ? "text-white bg-blue-400 rounded-l-full"
                      : "hover:bg-gray-100 text-gray-800 bg-white"
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.4"
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
            </ul>
          </div>

          <div className="mt-6">
            <h6 className="text-blue-600 text-sm font-bold px-4">Products</h6>
            <ul className="mt-3 space-y-2">
              <li>
                <button
                  onClick={() => {
                    onProducts();
                    setIsOpen(false);
                  }}
                  className={`w-full text-sm flex items-center rounded-md px-4 py-2 transition-all ${
                    currentPage === "products"
                      ? "text-white bg-blue-400 rounded-l-full"
                      : "hover:bg-gray-100 text-gray-800 bg-white"
                  }`}
                >
                  <svg
                    width="20px"
                    height="20px"
                    className="mr-2"
                    viewBox="0 0 1700 1700"
                    strokeWidth="1.4"
                    stroke="currentColor"
                    fill="currentColor"
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
                  <span>Products</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onAddProduct();
                    setIsOpen(false);
                  }}
                  className={`w-full text-sm flex items-center rounded-md px-4 py-2 transition-all ${
                    currentPage === "add-product"
                      ? "text-white bg-blue-400 rounded-l-full"
                      : "hover:bg-gray-100 text-gray-800 bg-white"
                  }`}
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span>Add product</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h6 className="text-blue-600 text-sm font-bold px-4">Actions</h6>
            <ul className="mt-3 space-y-2">
              <li>
                <button
                  onClick={() => {
                    onProfile();
                    setIsOpen(false);
                  }}
                  className={`w-full text-sm flex items-center rounded-md px-4 py-2 transition-all ${
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
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/"
                  className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
                >
                  <svg
                    fill="currentColor"
                    className="w-[18px] h-[18px] mr-3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z"
                      data-original="#000000"
                    ></path>
                  </svg>

                  <span>Store</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-gray-800 text-sm mb-20 w-full flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
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
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <button
        id="toggle-sidebar"
        onClick={toggleSidebar}
        className="lg:hidden w-8 h-8 z-[200] fixed ml-3 -mt-14 cursor-pointer flex items-center justify-center rounded-full outline-none transition-all duration-500"
      >
        <div
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        >
          <svg
            className="h-8 w-8 text-gray-100"
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
        >
          <svg
            className="h-8 w-8 text-gray-100"
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
        </div>
      </button>
    </div>
  );
};

export default SideBar;
