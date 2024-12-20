"use client";
import { useEffect, useState } from "react";
import AdminBanner from "./components/ui/AdminBanner";
import SideBar from "./components/SideBar";
import AdminDashboard from "./components/AdminDashboard";
import ProductManagementPage from "./components/AdminProductManagementPage";
import AddProductPage from "./components/AddProductPage";
import EditProductPage from "./components/AdminEditProductPage";
import UserManagementPage from "./components/UserManagementPage";
import UserDetailsPage from "./components/UserDetailsPage";
import AdminProfilePage from "./components/AdminProfilePage";
import AdminOrderManagementPage from "./components/AdminOrderManagement";
import AdminOrderDetailsPage from "./components/AdminOrderDetailsPage";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminState } from "../store/AdminState";

type CurrentPage =
  | "dashboard"
  | "profile"
  | "products"
  | "add-product"
  | "edit-product"
  | "users"
  | "user-details"
  | "orders"
  | "order-details";

const AdminPage = () => {
    const {orderDetails} = useAdminState()
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPage =
    (searchParams.get("currentPage") as CurrentPage) || "profile";
  const [currentPage, setCurrentPage] = useState<CurrentPage>(initialPage);


  const renderComponent = () => {
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboard />;
  
      case "products":
        return (
          <ProductManagementPage
            onAddProduct={() => setCurrentPage("add-product")}
            onEditProduct={() => setCurrentPage("edit-product")}
          />
        );
  
      case "add-product":
        return <AddProductPage onProducts={() => setCurrentPage("products")} />;
  
      case "edit-product":
        return <EditProductPage onProducts={() => setCurrentPage("products")} />;
  
      case "users":
        return (
          <UserManagementPage
            onUserDetails={() => setCurrentPage("user-details")}
          />
        );
  
      case "user-details":
        return <UserDetailsPage onUsers={() => setCurrentPage("users")} />;
  
      case "profile":
        return <AdminProfilePage />;
  
      case "orders":
        return (
          <AdminOrderManagementPage
            onOrderDetails={() => setCurrentPage("order-details")}
          />
        );
  
      case "order-details":
        return (
          <AdminOrderDetailsPage
            onBack={() => setCurrentPage("orders")}
          />
        );
  
      default:
        return (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-gray-500">Page not found</p>
          </div>
        );
    }
  };
  
  useEffect(() => {
    const query = new URLSearchParams({ currentPage }).toString();
    router.replace(`/admin?${query}`);
  }, [currentPage, router]);

  return (
    <section className="h-screen w-full">
      <AdminBanner />

      <div className="grid grid-cols-[250px_1fr] h-full">
        <div className="col-span-1">
          <SideBar
            onDashboard={() => setCurrentPage("dashboard")}
            onProducts={() => setCurrentPage("products")}
            onAddProduct={() => setCurrentPage("add-product")}
            onUsers={() => setCurrentPage("users")}
            onOrders={() => setCurrentPage("orders")}
            onProfile={() => setCurrentPage("profile")}
          />
        </div>

        <div className="col-span-1 overflow-auto">{renderComponent()}</div>
      </div>
    </section>
  );
};

export default AdminPage;
