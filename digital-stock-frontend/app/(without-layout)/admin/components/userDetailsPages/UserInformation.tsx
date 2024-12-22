import { UserInterface } from "@/app/utils/Types";

type Props = {
    user: UserInterface;
}

const UserInformationAdminPage = ({user}: Props) => {

    return (
        <div className="relative font-[sans-serif] bg-gray-100 shadow-inner py-6 px-10 shadow-inner">
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
                      <div
                        className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                      >
                        {user.firstName ? user.firstName : "." }
                      </div>
                      <div
                        className={`absolute text-sm text-gray-400 duration-300 transform ${
                            user.firstName
                            ? "-translate-y-6 scale-75 top-3 origin-[0]"
                            : "start-8 scale-100 -translate-y-8 bg-white"
                        }`}
                      >
                        First name
                      </div>
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
                      <div
                        className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                      >
                        {user.lastName ? user.lastName : "." }
                      </div>
                      <div
                        className={`absolute text-sm text-gray-400 duration-300 transform ${
                            user.lastName
                            ? "-translate-y-6 scale-75 top-3 origin-[0]"
                            : "start-8 scale-100 -translate-y-8 bg-white"
                        }`}
                      >
                        Last name
                      </div>
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
                      <div
                        className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                      >
                        {user.email ? user.email : "."}
                      </div>
                      <div
                        className={`absolute text-sm text-gray-400 duration-300 transform ${
                            user.email
                            ? "-translate-y-6 scale-75 top-3 origin-[0]"
                            : "start-8 scale-100 -translate-y-8 bg-white"
                        }`}
                      >
                        Email
                      </div>
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
                      <div
                        className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                      >
                        {user.phoneNo ? user.phoneNo : "." }
                      </div>
                      <div
                        className={`absolute text-sm text-gray-400 duration-300 transform ${
                            user.phoneNo
                            ? "-translate-y-6 scale-75 top-3 origin-[0]"
                            : "start-8 scale-100 -translate-y-8 bg-white"
                        }`}
                      >
                        Phone number
                      </div>
                    </div>
                  </div>
                </div> 
    
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 p-6 bg-white rounded-b-xl shadow-md border-b border-x">
                  <div className="sm:col-span-6 mx-4">
                    <div className="relative mt-2 h-18">
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
                      <div
                        className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                      >
                        {user.address.addressLine ? user.address.addressLine : "." }
                      </div>
                      <div
                        className={`absolute text-sm text-gray-400 duration-300 transform ${
                            user.address.addressLine
                            ? "-translate-y-11 scale-75 top-3 origin-[0]"
                            : "start-8 scale-100 -translate-y-8 bg-white"
                        }`}
                      >
                        Address Line
                      </div>
                    </div>
                  </div>
    
                  <div className="sm:col-span-2">
                    <div className="relative mt-2 mx-4 h-11 h-18">
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
                      <div
                        className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                      >
                        {user.address.city ? user.address.city : "." }
                      </div>
                      <div
                        className={`absolute text-sm text-gray-400 duration-300 transform ${
                            user.address.city
                            ? "-translate-y-6 scale-75 top-3 origin-[0]"
                            : "start-8 scale-100 -translate-y-8 bg-white"
                        }`}
                      >
                        City
                      </div>
                    </div>
                  </div>
    
                  <div className="sm:col-span-2">
                    <div className="relative mt-2 mx-4 h-18">
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
                      <div
                        className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                      >
                        {user.address.state ? user.address.state : "." }
                      </div>
                      <div
                        className={`absolute text-sm text-gray-400 duration-300 transform ${
                            user.address.state
                            ? "-translate-y-11 scale-75 top-3 origin-[0]"
                            : "start-8 scale-100 -translate-y-8 bg-white"
                        }`}
                      >
                        State
                      </div>
                    </div>
                  </div>
     
                  <div className="sm:col-span-2">
                    <div className="relative mt-2 mx-4">
                      <div
                        id="zip-code"
                        className="block ps-8 pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                      >
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
                          <circle cx="12" cy="11" r="3" />
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                        </svg>
                      </span>
                        {user.address.zipCode ? user.address.zipCode : "." }
                      </div>
                      <div
                        className={`absolute text-sm text-gray-400 duration-300 transform ${
                            user.address.zipCode
                            ? "-translate-y-11 scale-75 top-3 origin-[0]"
                            : "start-8 scale-100 -translate-y-8 bg-white"
                        }`}
                      >
                        Zip code
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      );
}

export default UserInformationAdminPage;