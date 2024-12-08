"use client";
import { useAuthState } from "@/app/store/AuthState";
import { useRouter } from "next/navigation";
import DeleteUserButton from "./DeleteUserButton";

const SideBar = () => {
  const { logout } = useAuthState();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    router.push("/")
  };



  return (
    <div>
      <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-8">
        <div
          id="sidebar-collapse-menu"
          className="bg-white shadow-lg h-screen fixed py-6 px-4 top-[70px] left-0 overflow-auto z-[99] lg:min-w-[250px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500"
        >
          <div className="mt-6">
            <h6 className="text-blue-600 text-sm font-bold px-4">Actions</h6>
            <ul className="mt-3 space-y-2">
              <li>
                <DeleteUserButton/>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-gray-800 text-sm mb-20 flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
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
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <button
        id="toggle-sidebar"
        className="lg:hidden w-8 h-8 z-[100] fixed top-[74px] left-[10px] cursor-pointer bg-[#007bff] flex items-center justify-center rounded-full outline-none transition-all duration-500"
      >
        <svg fill="#fff" className="w-3 h-3" viewBox="0 0 55.752 55.752">
          <path
            d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z"
            data-original="#000000"
          />
        </svg>
      </button>
    </div>
  );
};

export default SideBar;
