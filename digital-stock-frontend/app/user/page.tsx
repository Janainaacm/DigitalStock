"use client";

import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { useSearchParams, useRouter } from "next/navigation";
import UserProfilePage from "./components/UserProfilePage";
import UserOrderPage from "./components/UserOrderPage";
import WishlistPage from "./components/WishlistPage";

type CurrentPage = "profile" | "orders" | "wishlist";

const UserPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialPage = (searchParams.get("currentPage") as CurrentPage) || "profile";
    const [currentPage, setCurrentPage] = useState<CurrentPage>(initialPage);
  
    const renderComponent = () => {
      switch (currentPage) {
        case "profile":
          return <UserProfilePage />;
        case "orders":
          return <UserOrderPage />;
        case "wishlist":
          return <WishlistPage />;
        default:
          return <UserProfilePage />;
      }
    };
  
    useEffect(() => {
      console.log(initialPage)
      const query = new URLSearchParams({ currentPage }).toString();
      router.replace(`/user?${query}`);
    }, [currentPage, router]);
  

  return (
    <>
      <div className="grid grid-cols-[250px_1fr] h-full">
        <div className="col-span-1">
          <SideBar
            onProfile={() => setCurrentPage("profile")}
            onOrders={() => setCurrentPage("orders")}
            onWishlist={() => setCurrentPage("wishlist")}
          />
        </div>

        <div className="col-span-1 overflow-auto">{renderComponent()}</div>
      </div>
    </>
  );
};
export default UserPage;
