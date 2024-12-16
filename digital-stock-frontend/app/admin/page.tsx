'use client'
import { useEffect, useState } from "react";
import AdminBanner from "./components/AdminBanner";
import SideBar from "./components/SideBar";
import AdminDashboard from "./dashboard/AdminDashboard";
import ProductManagementPage from "./productManagement/AdminProductManagementPage";
import AddProductPage from "./productManagement/addProduct/AddProductPage";
import EditProductPage from "./productManagement/editProduct/AdminEditProductPage";
import UserManagementPage from "./userManagement/UserManagementPage";
import UserDetailsPage from "./userManagement/[userId]/UserDetailsPage";

type CurrentPage = "dashboard" | "profile" | "products" | "add-product" | "edit-product" | "users" | "user-details" | "orders" | "order-details";


const AdminPage = () => {
    const [currentPage, setCurrentPage] = useState<CurrentPage>("dashboard");

    useEffect(() => {
        console.log("current page: ", currentPage)
    }, [currentPage])

    const renderComponent = () => {
        if (currentPage == "dashboard") {
            return (
                <AdminDashboard/>
            )
        }
        if (currentPage == "products") {
            return (
                <ProductManagementPage 
                onAddProduct={() => setCurrentPage("add-product")}
                onEditProduct={() => setCurrentPage("edit-product")}/>
            )
        }
        if (currentPage == "add-product") {
            return (
                <AddProductPage
                onProducts={() => setCurrentPage("products")}/>
            );
            
        }
        if (currentPage == "edit-product") {
            return (
            <EditProductPage
            onProducts={() => setCurrentPage("products")}/>)
        }
        if (currentPage == "users") {
            return (
            <UserManagementPage
            onUserDetails={() => setCurrentPage("user-details")}
            />)
        }
        if (currentPage == "user-details") {
            return (
            <UserDetailsPage
            onUsers={() => setCurrentPage("users")}/>)
        }
        
        
        
    }

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

          <div className="col-span-1 overflow-auto">
            {renderComponent()}
          </div>
        </div>
      </section>
        
    );
}

export default AdminPage;