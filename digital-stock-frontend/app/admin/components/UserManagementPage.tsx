"use client";
import { useAdminState } from "@/app/store/AdminState";
import { UserInterface } from "@/app/utils/Types";
import { useEffect } from "react";

type Props = {
  onUserDetails: () => void;
};

const UserManagementPage = ({onUserDetails}: Props) => {
  const { fetchAllUsers, userList, setUserDetails } = useAdminState();

  useEffect(() => {
    if (userList.length === 0) {
      console.log("Fetching users...");
      fetchAllUsers();
    }
  }, [userList, fetchAllUsers]); 

  useEffect(() => {
    console.log("Users:", userList);
    console.log("Is users an array?", Array.isArray(userList));
  })

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
                          <button className="mr-4" title="Delete">
                            <svg
                              className="w-5 fill-red-600 hover:fill-red-500 hover:scale-[1.1] transition-all duration-500"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                data-original="#000000"
                              />
                              <path
                                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                data-original="#000000"
                              />
                            </svg>
                          </button>
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
