"use client";
import { Suspense, useEffect, useState } from "react";
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
import Calendar from "./components/Calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthState } from "@/app/store/AuthState";

type CurrentPage =
  | "dashboard"
  | "profile"
  | "products"
  | "add-product"
  | "edit-product"
  | "users"
  | "user-details"
  | "orders"
  | "order-details"
  | "calendar";

const AdminContent = () => {
  const { adminAuthCheck } = useAuthState();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<CurrentPage>(
    (searchParams.get("currentPage") as CurrentPage) || "dashboard"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await adminAuthCheck();
      if (!result) {
        sessionStorage.setItem("showAuth", "true");
        router.push("/");
      } else {
        setLoading(false);
      }
    };
  
    checkAuth();
  }, [adminAuthCheck, router]);
  

  useEffect(() => {
    const query = new URLSearchParams({ currentPage }).toString();
    router.replace(`/admin?${query}`);
  }, [currentPage, router]);

  if (loading) return <div>Loading...</div>;

  const renderComponent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <AdminDashboard
            onOrders={() => setCurrentPage("orders")}
            onProducts={() => setCurrentPage("products")}
          />
        );
      case "products":
        return (
          <ProductManagementPage
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
        return <AdminOrderDetailsPage onBack={() => setCurrentPage("orders")} />;
      case "calendar":
        return <Calendar />;
      default:
        return (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-gray-500">Page not found</p>
          </div>
        );
    }
  };

  return (
    <section className="h-screen w-full mt-20">
      <AdminBanner />

      <SideBar
        currentPage={currentPage}
        onDashboard={() => setCurrentPage("dashboard")}
        onProducts={() => setCurrentPage("products")}
        onAddProduct={() => setCurrentPage("add-product")}
        onUsers={() => setCurrentPage("users")}
        onOrders={() => setCurrentPage("orders")}
        onProfile={() => setCurrentPage("profile")}
        onCalendar={() => setCurrentPage("calendar")}
      />

      <div className="lg:ml-64">{renderComponent()}</div>
    </section>
  );
};

const AdminPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContent />
    </Suspense>
  );
};

export default AdminPage;
