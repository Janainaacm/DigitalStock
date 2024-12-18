"use client";

import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import UserDashboardPage from "./UserDashboard";
import UserProfilePage from "./UserProfilePage";
import UserOrderPage from "./UserOrderPage";
import WishlistPage from "./WishlistPage";

type CurrentPage = "dashboard" | "profile" | "orders" | "wishlist";

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("dashboard");

  const renderComponent = () => {
    if (currentPage == "dashboard") {
      return <UserDashboardPage />;
    }

    if (currentPage == "profile") {
      return <UserProfilePage />;
    }

    if (currentPage == "orders") {
      return <UserOrderPage />;
    }

    if (currentPage == "wishlist") {
      return <WishlistPage />;
    }
  };

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="grid grid-cols-[250px_1fr] h-full">
        <div className="col-span-1">
          <SideBar
            onDashboard={() => setCurrentPage("dashboard")}
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
