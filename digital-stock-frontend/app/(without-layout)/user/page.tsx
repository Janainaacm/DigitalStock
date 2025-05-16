"use client";

import { Suspense, useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { useSearchParams, useRouter } from "next/navigation";
import UserProfilePage from "./components/UserProfilePage";
import UserOrderPage from "./components/UserOrderPage";
import WishlistPage from "./components/WishlistPage";
import Header from "@/app/components/header/Header";
import { useAuthState } from "@/app/store/AuthState";

type CurrentPage = "profile" | "orders" | "wishlist";

const UserContent = () => {
  const searchParams = useSearchParams();
  const { userAuthCheck } = useAuthState();
  const router = useRouter();
  const initialPage =
    (searchParams.get("currentPage") as CurrentPage) || "profile";
  const [currentPage, setCurrentPage] = useState<CurrentPage>(initialPage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await userAuthCheck();
      if (!result) {
        sessionStorage.setItem("showAuth", "true");
        router.push("/");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [userAuthCheck, router]);

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
    console.log(initialPage);
    const query = new URLSearchParams({ currentPage }).toString();
    router.replace(`/user?${query}`);
  }, [currentPage, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <SideBar
        currentPage={currentPage}
        onProfile={() => setCurrentPage("profile")}
        onOrders={() => setCurrentPage("orders")}
        onWishlist={() => setCurrentPage("wishlist")}
      />

      <div className="lg:ml-64 max-lg:shadow-inner">{renderComponent()}</div>
    </>
  );
};

const UserPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <UserContent />
    </Suspense>
  );
};
export default UserPage;
