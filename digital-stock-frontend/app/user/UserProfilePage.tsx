"use client";
import { useAuthState } from "@/app/store/AuthState";
import { useEffect, useState } from "react";
import { UserInterface } from "../utils/Types";
import { useUserState } from "../store/UserState";

const UserProfilePage = () => {
  const { user } = useAuthState();
  const { updateUserProfile } = useUserState();

  if (!user) {
    return <p>No user found.</p>;
  }

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [phoneNo, setPhoneNo] = useState(user.phoneNo || "");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedUser: UserInterface = {
      ...user,
      firstName,
      lastName,
      email,
      phoneNo,
      address: {
        addressLine: addressLine,
        city,
        state,
        zipCode,
      },
    };

    try {
      await updateUserProfile(updatedUser);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("An error occurred while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative font-[sans-serif] p-6">
      <h1 className="text-4xl font-extrabold text-gray-800">
        Hello, {user.username}
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your personal information below.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <div className="mt-1">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-1">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <div className="mt-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <div className="mt-1">
                  <input
                    type="text"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    placeholder="Phone number"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6 mt-10">
                <div className="mt-1">
                  <input
                    type="text"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="Street address"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="mt-1">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="mt-1">
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="mt-1">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="ZIP / Postal code"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default UserProfilePage;
