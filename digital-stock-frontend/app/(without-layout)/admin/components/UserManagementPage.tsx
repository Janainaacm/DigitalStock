"use client";
import { useAdminState } from "@/app/store/AdminState";
import { UserInterface } from "@/app/utils/Types";
import { useEffect } from "react";
import DeleteUserButton from "./functions/DeleteUserButton";

type Props = {
  onUserDetails: () => void;
};

const UserManagementPage = ({onUserDetails}: Props) => {
  const { fetchAllUsers, userList, setUserDetails } = useAdminState();

  useEffect(() => {
    if (userList.length === 0) {
      fetchAllUsers();
    }
  }, []); 


  const onViewUser = (user: UserInterface) => {
    setUserDetails(user);
    onUserDetails();
  }

  
  return (
    <div className="relative font-[sans-serif] h-screen">
      <div>
        <h1 className="px-6 py-6 text-4xl font-extrabold text-gray-800">
          User Management
        </h1>

        <div className="flex items-start">
          <section className="main-content w-full overflow-auto px-6">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 whitespace-nowrap">
                  <tr>
                    <th className="p-4 text-left text-sm font-medium text-white">
                      Name
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                      Email
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                      Role
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                      Orders placed
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="whitespace-nowrap">
                  {userList.map((user) => (
                      <tr key={user.id} className="even:bg-blue-50 hover:bg-gray-300">
                        <td className="p-4 text-sm text-black">
                          {user.username}
                        </td>
                        <td className="p-4 text-sm text-black">{user.email}</td>
                        <td className="p-4 text-sm text-black">{user.role == "ROLE_ADMIN" ? "Admin" : "User"}</td>
                        <td className="p-4 text-sm text-black">{user.orders.length}</td>
                        <td className="p-4">
                          <button 
                          className="mr-4" 
                          onClick={() => onViewUser(user)}>
                            
                            <svg
                            className="h-5 w-5 text-blue-600 hover:text-blue-500 hover:scale-[1.1] transition-all duration-500"
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
                            <circle cx="12" cy="12" r="2" />
                            <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                            <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
                          </svg>
                          </button>
                          <DeleteUserButton user={user}/>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
