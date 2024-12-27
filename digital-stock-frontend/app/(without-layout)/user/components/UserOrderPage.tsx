import { useAuthState } from "@/app/store/AuthState";
import { useUserState } from "@/app/store/UserState";
import { OrderInterface } from "@/app/utils/Types";
import { useState } from "react";

const UserOrderPage = () => {
  const { user } = useAuthState();
  const { addItemToCart, cancelOrder } = useUserState();

  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedDateFrom, setSelectedDateFrom] = useState<string>("");
  const [selectedDateTo, setSelectedDateTo] = useState<string>("");
  const [extendedOrderId, setExtendedOrderId] = useState<number | null>(null); 

  const toggleExtend = (id: number) => {
    setExtendedOrderId((prev) => (prev === id ? null : id)); 
  };


  if (!user) {
    return <p>No user found.</p>;
  }

  const filteredOrders = user.orders.filter((order: OrderInterface) => {
    const matchesStatus =
      filterStatus === "ALL" ||
      (filterStatus === "CANCELLED" && order.status === "CANCELLED") ||
      (filterStatus === "COMPLETED" && order.status === "DELIVERED") ||
      (filterStatus === "ONGOING" &&
        order.status !== "CANCELLED" &&
        order.status !== "DELIVERED");

    const orderDate = order.orderDate.split("T")[0];
    const matchesDate =
      (!selectedDateFrom || orderDate >= selectedDateFrom) &&
      (!selectedDateTo || orderDate <= selectedDateTo);

    return matchesStatus && matchesDate;
  });

  const handleBuyAgain = (id: number) => {
    addItemToCart(id, 1);
  };

  const handleCancelOrder = (order: OrderInterface) => {
    if (order.status == "CONFIRMED" ||
    order.status == "SHIPPED" ||
    order.status == "DELIVERED") {
        alert("Cannot cancel order unless status is pending")
        return
    };

    if (order.status == "CANCELLED") {
        alert("Order is already cancelled")
        return
    };

    try {
        cancelOrder(order.id)
        alert("Order cancelled successfully")
    } catch (error) {
        console.log(error)   
    }

  }

  return (
    <>
      <section className="py-6 relative">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-manrope font-extrabold px-4 md:px-8 text-3xl lead-10 text-black mb-9">
            Order History
          </h2>
          <div className="flex sm:flex-col lg:flex-row px-4 md:px-8 sm:items-center justify-between ">
            <ul className="flex gap-12 mb-5">
              {["ALL", "ONGOING", "COMPLETED", "CANCELLED"].map((status) => (
                <li
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`font-medium text-lg leading-8 cursor-pointer ${
                    filterStatus === status ? "text-indigo-600" : "text-black"
                  } hover:text-indigo-600 transition-all duration-300`}
                >
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </li>
              ))}
            </ul>
            <div className="flex max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
              <div className="flex gap-4 mb-5">
                <input
                  type="date"
                  value={selectedDateFrom}
                  onChange={(e) => setSelectedDateFrom(e.target.value)}
                  className="border rounded py-2 px-4"
                />
                <span className="font-medium text-lg leading-8 text-black">
                  To
                </span>
                <input
                  type="date"
                  value={selectedDateTo}
                  onChange={(e) => setSelectedDateTo(e.target.value)}
                  className="border rounded py-2 px-4"
                />
              </div>
            </div>
          </div>
          <div className="border-t w-full px-4 md:px-8 shadow-inner">
          {filteredOrders.map((order) => (
            <div key={order.id} className="mt-7 border border-gray-300 pt-9">
              <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                <div className="data">
                  <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
                    Order id: #{order.id}
                  </p>
                  <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                    Order Date: {order.orderDate.split("T")[0]}
                  </p>
                  <div className="flex">
                    <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                      Status:
                    </p>
                    <p
                      className={`font-semibold ml-2 text-lg leading-8 mt-3 whitespace-nowrap ${
                        order.status === "CANCELLED"
                          ? "text-red-500"
                          : order.status === "DELIVERED"
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 max-md:mt-5">
                  <button
                    onClick={() => toggleExtend(order.id)}
                    className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400"
                  >
                    {extendedOrderId == order.id ? "Hide Details" : "Show details"}
                  </button>
                </div>
              </div>
              <svg
                className="mt-9 mb-3 w-full"
                width="1216"
                height="2"
                viewBox="0 0 1216 2"
                fill="none"
              >
                <path d="M0 1H1216" stroke="#D1D5DB" />
              </svg>

              <div
                className={`top-5 left-0 z-50 block space-y-2 bg-white overflow-scroll transition-all duration-500
              ${
                extendedOrderId == order.id
                  ? "py-3 max-h-[700px] before:bg-[rgba(0,0,0,0.5)] pt-3"
                  : "max-h-0"
              } `}
              >
                <div className="w-full">
                  <ol className="w-full flex flex-row items-center justify-between">
                    <li
                      className={`flex w-full flex-col font-semibold text-blue-500 gap-2`}
                    >
                      <div className="flex w-full justify-center items-center relative">
                        <div className="absolute bg-blue-500 right-0 w-1/2 h-1"></div>
                        <span className="z-10 bg-blue-500 rounded-full w-14 h-14 flex items-center justify-center">
                          <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="text-center">Pending</p>
                    </li>
                    <li
                      className={`flex w-full flex-col font-semibold  gap-2 ${
                        order.status == "CONFIRMED" ||
                        order.status == "SHIPPED" ||
                        order.status == "DELIVERED"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                    >
                      <div className="flex w-full justify-center items-center relative">
                        <div
                          className={`absolute w-full h-1 ${
                            order.status == "CONFIRMED" ||
                            order.status == "SHIPPED" ||
                            order.status == "DELIVERED"
                              ? "bg-blue-500"
                              : "border-y border-gray-300 bg-gray-100"
                          }`}
                        ></div>

                        <span
                          className={`z-10 rounded-full w-14 h-14 flex items-center justify-center ${
                            order.status == "CONFIRMED" ||
                            order.status == "SHIPPED" ||
                            order.status == "DELIVERED"
                              ? "bg-blue-500"
                              : "bg-gray-50 border border-gray-300"
                          }`}
                        >
                          <svg
                            className={`h-6 w-6 ${
                              order.status == "CONFIRMED" ||
                              order.status == "SHIPPED" ||
                              order.status == "DELIVERED"
                                ? "text-white"
                                : "text-gray-600"
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line x1="12" y1="22.08" x2="12" y2="12" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-center">Confirmed</p>
                    </li>
                    <li
                      className={`flex w-full flex-col font-semibold  gap-2 ${
                        order.status == "SHIPPED" || order.status == "DELIVERED"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                    >
                      <div className="flex w-full justify-center items-center relative">
                        <div
                          className={`absolute w-full h-1 ${
                            order.status == "SHIPPED" ||
                            order.status == "DELIVERED"
                              ? "bg-blue-500"
                              : "border-y border-gray-300 bg-gray-100"
                          }`}
                        ></div>
                        <span
                          className={`z-10 rounded-full w-14 h-14 flex items-center justify-center ${
                            order.status == "SHIPPED" ||
                            order.status == "DELIVERED"
                              ? "bg-blue-500"
                              : "bg-gray-50 border border-gray-300"
                          }`}
                        >
                          <svg
                            className={`h-7 w-7 ${
                              order.status == "SHIPPED" ||
                              order.status == "DELIVERED"
                                ? "text-white"
                                : "text-gray-600"
                            }`}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="7" cy="17" r="2" />
                            <circle cx="17" cy="17" r="2" />
                            <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-center">Shipped</p>
                    </li>
                    <li
                      className={`flex w-full flex-col font-semibold  gap-2 ${
                        order.status == "DELIVERED"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                    >
                      <div className="flex w-full justify-center items-center relative">
                        <div
                          className={`absolute left-0 w-1/2 h-1 ${
                            order.status == "DELIVERED"
                              ? "bg-blue-500"
                              : "border-y border-gray-300 bg-gray-100"
                          }`}
                        ></div>
                        <span
                          className={`z-10 rounded-full w-14 h-14 flex items-center justify-center ${
                            order.status == "DELIVERED"
                              ? "bg-blue-500"
                              : "bg-gray-50 border border-gray-300 shadow-inner"
                          }`}
                        >
                          <svg
                            className={`h-6 w-6 ${
                              order.status == "DELIVERED"
                                ? "text-white"
                                : "text-gray-600"
                            }`}
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
                      </div>
                      <p className="text-center">Delivered</p>
                    </li>
                  </ol>
                </div>

                <div className="w-2/5 px-6 pt-12 pb-5 mb-5 border-b">
                  <h6 className="text-lg text-gray-700 pb-3">
                    Order information:
                  </h6>
                  <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <div>
                      <p>Delivery information: </p>
                    </div>
                    <div className="flex flex-col items-end text-gray-500">
                      <p>
                        {order.address.addressLine}, {order.address.city}
                      </p>
                      <p>
                        {order.address.zipCode}, {order.address.state}
                      </p>
                    </div>
                    <div>
                      <p>Customer: </p>
                    </div>
                    <div className="flex flex-col items-end text-gray-500">
                      <p>
                        {order.firstName} {order.lastName}
                      </p>
                      <p>{order.phoneNo}</p>
                      <p>{order.email}</p>
                    </div>

                    <p></p>
                  </div>
                </div>

                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex max-lg:flex-col border-b py-2 items-center gap-8 lg:gap-24 px-3 md:px-11"
                  >
                    <div className="grid grid-cols-4 py-2 w-full">
                      <div className="col-span-4 sm:col-span-1">
                        <img
                          src={item.product.imageUrl}
                          alt=""
                          className="max-sm:mx-auto p-7 -ml-7 object-cover"
                        />
                      </div>
                      <div className="col-span-4 -ml-7 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                        <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
                          {item.product.name}
                        </h6>
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">
                          Color: {item.product.colorName}
                        </p>
                        <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                          <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            Qty: {item.quantity}
                          </span>
                          <p className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            Price ${item.product.price}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBuyAgain(item.product.id)}
                      className="rounded-full w-1/5 px-7 py-3 bg-blue-500 shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-300 hover:shadow-indigo-400 hover:bg-blue-600"
                    >
                      Buy Again
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5">
                <div className="justify-items-center py-6 border-gray-300 font-normal text-xl text-gray-500">
                  <button 
                  onClick={() => handleCancelOrder(order)}
                  className="flex items-center">
                    <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
                      <path
                        className="stroke-gray-600 transition-all duration-500 group-hover:stroke-indigo-600"
                        d="M14.0261 14.7259L25.5755 26.2753M14.0261 26.2753L25.5755 14.7259"
                        stroke=""
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Cancel order
                  </button>
                </div>
                <div className="col-span-4 border-x">
                  <div className="flex items-center h-full justify-between px-8">
                    <p className="font-normal text-xl text-gray-500">
                      Payment Succesfull
                    </p>
                    <p className="font-medium text-xl leading-8 text-black max-sm:py-4">
                      <span className="text-gray-500">Total Price: </span>$
                      {order.subtotal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default UserOrderPage;
