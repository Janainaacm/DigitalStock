"use client";
import { useAuthState } from "@/app/store/AuthState";
import { useEffect, useState } from "react";
import { UserInterface } from "../../../utils/Types";
import { useUserState } from "../../../store/UserState";
import DeleteUserButton from "./functions/DeleteUserButton";

const UserProfilePage = () => {
  const { user } = useAuthState();
  const { updateUserProfile } = useUserState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhoneNo(user.phoneNo || "");
      setAddressLine(user.address?.addressLine || "");
      setCity(user.address?.city || "");
      setState(user.address?.state || "");
      setZipCode(user.address?.zipCode || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMsg("Email cannot be empty.");
      setError(true)
      return;
    }

    setIsLoading(true);
    if (user) {
      const updatedUser: UserInterface = {
        ...user,
        firstName,
        lastName,
        email,
        phoneNo,
        address: {
          addressLine,
          city,
          state,
          zipCode,
        },
      };
  
      try {
        await updateUserProfile(updatedUser);
        setSuccess(true)
      } catch (error) {
        console.log(error)
        setErrorMsg("An error occurred while updating the profile.");
        setError(true)
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!user) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-600 text-lg">Loading user profile...</p>
      </div>
    );
  }

  const setValues = () => {
    setFirstName(user.firstName ? user.firstName : "");
    setLastName(user.lastName ? user.lastName : "");
    setEmail(user.email ? user.email : "");
    setPhoneNo(user.phoneNo ? user.phoneNo : "");
    setAddressLine(user.address ? user.address.addressLine : "");
    setCity(user.address ? user.address.city : "");
    setState(user.address ? user.address.state : "");
    setZipCode(user.address ? user.address.zipCode : "");
  };


  return (
    <>
    <div className="relative font-[sans-serif] bg-gray-100 shadow-inner py-6 px-10 pt-12 -ml-2">
      <div className="p-6 rounded-xl shadow-md bg-white">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Hello, {user.username}
        </h1>
        <div className="pt-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Edit your personal information below.
          </p>
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mt-4">
              {errorMsg}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md mt-4">
              Profile updated successfully!
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-16 sm:grid-cols-2 p-6 bg-white rounded-t-xl shadow-md border-t border-x">
              <div>
                <div className="relative mt-2 mx-4">
                  <span className="absolute start-0 bottom-3 text-gray-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <input
                    id="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="first-name"
                    className="absolute cursor-text text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:start-8 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    First name
                  </label>
                </div>
              </div>

              <div>
                <div className="relative mt-2 mx-4">
                  <span className="absolute start-0 bottom-3 text-gray-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <input
                    id="last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="last-name"
                    className="absolute cursor-text text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:start-8 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Last name
                  </label>
                </div>
              </div>

              <div className="">
                <div className="relative mt-2 mx-4">
                  <span className="absolute start-0 bottom-3 text-gray-400">
                    <svg
                      className="h-5 w-5"
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
                      <polyline points="3 9 12 15 21 9 12 3 3 9" />
                      <path d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                      <line x1="3" y1="19" x2="9" y2="13" />
                      <line x1="15" y1="13" x2="21" y2="19" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute cursor-text text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:start-8 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Email
                  </label>
                </div>
              </div>

              <div className="">
                <div className="relative mt-2 mx-4">
                  <span className="absolute start-0 bottom-3 text-gray-400">
                    <svg
                      className="h-5 w-5 rtl:rotate-[270deg]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <input
                    id="phone-number"
                    type="text"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone-number"
                    className="absolute cursor-text text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:start-8 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Phone number
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 p-6 bg-white rounded-b-xl shadow-md border-b border-x">
              <div className="sm:col-span-6 mx-4">
                <div className="relative mt-2">
                  <span className="absolute start-0 bottom-3 text-gray-400">
                    <svg
                      className="h-5 w-5"
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
                      <polyline points="5 12 3 12 12 3 21 12 19 12" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                    </svg>
                  </span>
                  <input
                    id="address-line"
                    type="text"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="address-line"
                    className="absolute cursor-text text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:start-8 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Address line
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="relative mt-2 mx-4">
                  <span className="absolute start-0 bottom-3 text-gray-400">
                    <svg
                      className="h-5 w-5"
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
                      <polyline points="3 7 9 4 15 7 21 4 21 17 15 20 9 17 3 20 3 7" />
                      <line x1="9" y1="4" x2="9" y2="17" />
                      <line x1="15" y1="7" x2="15" y2="20" />
                    </svg>
                  </span>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="city"
                    className="absolute cursor-text text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:start-8 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    City
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="relative mt-2 mx-4">
                  <span className="absolute start-0 bottom-3 text-gray-400">
                    <svg
                      className="h-5 w-5"
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
                      <line x1="18" y1="6" x2="18" y2="6.01" />
                      <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />
                      <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />
                      <line x1="9" y1="4" x2="9" y2="17" />
                      <line x1="15" y1="15" x2="15" y2="20" />
                    </svg>
                  </span>
                  <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="state"
                    className="absolute cursor-text text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:start-8 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    State
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="relative mt-2 mx-4">
                  <span className="absolute start-0 bottom-3 text-gray-400">
                    <svg
                      className="h-5 w-5"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="12" cy="11" r="3" />{" "}
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                    </svg>
                  </span>
                  <input
                    id="zip-code"
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="zip-code"
                    className="absolute cursor-text text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:start-8 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Zip code
                  </label>
                </div>
              </div>

              <div className="pt-6 sm:col-span-6">
                <div className="flex justify-between mx-4">
                  <button
                    onClick={setValues}
                    type="button"
                    className="bg-gray-50 py-2 px-8 border border-gray-300 rounded-md shadow-sm text-md text-gray-600 font-semibold hover:bg-white hover:shadow-lg hover:text-gray-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`ml-3 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-md font-medium rounded-md text-white ${
                      isLoading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-500 hover:shadow-lg transform duration-200"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="p-6">
      <DeleteUserButton/>
      </div>
    </div>
    </>
  );
};
export default UserProfilePage;
