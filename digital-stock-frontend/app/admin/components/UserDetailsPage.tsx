import LoadingPage from "@/app/components/loadingPage/LoadingPage";
import { useAdminState } from "@/app/store/AdminState";
import { useState } from "react";
import UserOrdersAdminPage from "./userDetailsPages/UserOrders";
import UserWishlistAdminPage from "./userDetailsPages/UserWishlist";
import UserInformationAdminPage from "./userDetailsPages/UserInformation";

type Props = {
  onUsers: () => void;
};

type CurrentPage = "profile" | "orders" | "wishlist";

const UserDetailsPage = ({ onUsers }: Props) => {
  const { userDetails } = useAdminState();
  const allPages: CurrentPage[] = ["profile", "orders", "wishlist"];
  const [currentPage, setCurrentPage] = useState<CurrentPage>("profile");

  if (!userDetails) {
    return <LoadingPage />;
  }
  
  const renderComponent = () => {
    switch (currentPage) {
      case "orders": return (<UserOrdersAdminPage orders={userDetails.orders}/>)
      case "wishlist": return (<UserWishlistAdminPage wishlist={userDetails.wishlist}/>)
      case "profile": return (<UserInformationAdminPage user={userDetails}/>)
    }
  }

  return (
    <div className="w-full max-w-7xl mt-8 mx-auto">
      <h2 className="font-manrope font-extrabold px-4 md:px-8 text-3xl lead-10 text-black mb-9">
        User information
      </h2>
      <div className="flex sm:flex-col lg:flex-row px-4 md:px-8 sm:items-center justify-between">
        <ul className="flex gap-12 mb-5">
          {allPages.map((page) => (
            <li
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`font-medium text-lg leading-8 cursor-pointer ${
                currentPage === page ? "text-indigo-600" : "text-black"
              } hover:text-indigo-600 transition-all duration-300`}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {renderComponent()}
      </div>
    </div>
  );
};

export default UserDetailsPage;
