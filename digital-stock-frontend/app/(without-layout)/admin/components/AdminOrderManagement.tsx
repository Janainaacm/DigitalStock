"use client";

import { useAdminState } from "@/app/store/AdminState";
import { useAuthState } from "@/app/store/AuthState";
import { OrderInterface } from "@/app/utils/Types";
import { useEffect, useState } from "react";

type Props = {
  onOrderDetails: () => void;
};

const AdminOrderManagementPage = ({ onOrderDetails }: Props) => {
  const { user } = useAuthState();
  const {
    fetchAllOrders,
    orders,
    cancelOrder,
    setOrderDetails,
    updateOrderStatus,
  } = useAdminState();

  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedDateFrom, setSelectedDateFrom] = useState<string>("");
  const [selectedDateTo, setSelectedDateTo] = useState<string>("");
  const [extendedOrderId, setExtendedOrderId] = useState<number | null>(null);
  const [cancelationReason, setCancelationReason] = useState("");

  const toggleExtend = (id: number) => {
    setExtendedOrderId((prev) => (prev === id ? null : id));
  };

  const showDetails = (order: OrderInterface) => {
    setOrderDetails(order);
    onOrderDetails();
  };

  useEffect(() => {
    if (orders.length == 0) {
      fetchAllOrders();
    }
  }, []);

  if (!user) {
    return <p>No user found.</p>;
  }

  const filteredOrders = orders.filter((order: OrderInterface) => {
    const matchesStatus =
      filterStatus === "ALL" ||
      (filterStatus === "CANCELLED" && order.status === "CANCELLED") ||
      (filterStatus === "NEW" && order.status === "PENDING") ||
      (filterStatus === "COMPLETED" && order.status === "DELIVERED") ||
      (filterStatus === "ONGOING" && (order.status === "CONFIRMED" || order.status === "SHIPPED"));
  
    const orderDate = order.orderDate.split("T")[0];
    const matchesDate =
      (!selectedDateFrom || orderDate >= selectedDateFrom) &&
      (!selectedDateTo || orderDate <= selectedDateTo);
  
    return matchesStatus && matchesDate;
  });
  

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

  const handleConfirm = (orderId: number) => {
    updateOrderStatus(orderId, "CONFIRMED");
    
  };

  return (
    <>
      <section className="py-6 relative">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-manrope font-extrabold px-4 md:px-8 text-3xl lead-10 text-black mb-9">
            Order Overview
          </h2>
          <div className="flex sm:flex-col lg:flex-row px-4 md:px-8 sm:items-center justify-between ">
            <ul className="flex gap-12 mb-5">
              {["ALL", "NEW", "ONGOING", "COMPLETED", "CANCELLED"].map(
                (status) => (
                  <li
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`font-medium text-lg leading-8 cursor-pointer ${
                      filterStatus === status ? "text-indigo-600" : "text-black"
                    } hover:text-indigo-600 transition-all duration-300`}
                  >
                    {status === "NEW" &&
                    orders.some((order) => order.status === "PENDING") ? (
                      <div className="flex relative">
                        <span>
                          {status.charAt(0) + status.slice(1).toLowerCase()}
                        </span>
                        <div className="absolute -right-2 bg-red-500 h-2 w-2 rounded-full"></div>
                      </div>
                    ) : (
                      <div>
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                      </div>
                    )}
                  </li>
                )
              )}
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
                    {order.status == "PENDING" ||
                    order.status == "CANCELLED" ? (
                      <div>
                        {order.status == "PENDING" ? (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleConfirm(order.id)}
                              className="rounded-full px-7 py-3 bg-blue-500 text-white border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-blue-400 hover:scale-[1.06]"
                            >
                              Confirm order
                            </button>
                            <button
                              onClick={() => toggleExtend(order.id)}
                              className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400"
                            >
                              {extendedOrderId
                                ? "Close products"
                                : "Show products"}
                            </button>
                          </div>
                        ) : (
                            null
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => showDetails(order)}
                        className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400"
                      >
                        Show details
                      </button>
                    )}
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
                  className={`top-5 left-0 z-50 block bg-white overflow-scroll transition-all duration-500
                ${
                  extendedOrderId == order.id
                    ? "py-3 max-h-[700px] before:bg-[rgba(0,0,0,0.5)] pt-3"
                    : "max-h-0"
                } `}
                >
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex max-lg:flex-col items-center px-3 md:px-11"
                    >
                      <div className="grid grid-cols-7 w-full border-b">
                        <div className="col-span-3 sm:col-span-1">
                          <img
                            src={item.product.image}
                            alt=""
                            className="max-sm:mx-auto p-4 -ml-7 object-cover"
                          />
                        </div>
                        <div className="col-span-3 -ml-7 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                          <h6 className="font-manrope font-semibold text-2xl leading-9 text-black whitespace-nowrap">
                            {item.product.name}
                          </h6>
                          <p className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            Color: {item.product.colorName}
                          </p>
                          <p className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            Qty: {item.quantity}
                          </p>
                          <p className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            Price ${item.product.price}
                          </p>
                        </div>
                        <div className="col-start-7">
                          {item.product.stock == 0 ? (
                            <div className="flex items-center justify-center h-full ">
                              <div className="h-3 w-3 bg-red-600 rounded-full"></div>
                              <p className="ml-3 font-semibold text-lg text-red-700">
                                Out of stock
                              </p>
                            </div>
                          ) : null}
                          {item.product.stock < 20 &&
                          item.product.stock != 0 ? (
                            <div className="h-full flex flex-col justify-center">
                              <div className="flex flex-row items-center">
                                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                                <p className="ml-3 font-semibold text-lg text-yellow-500">
                                  Few in stock
                                </p>
                              </div>
                              <p className="text-gray-400 text-sm">
                                Stock: {item.product.stock}
                              </p>
                            </div>
                          ) : null}
                          {item.product.stock >= 20 ? (
                            <div className="h-full flex flex-col justify-center">
                              <div className="flex flex-row items-center">
                                <div className="h-3 w-3 bg-green-600 rounded-full"></div>
                                <p className="ml-3 font-semibold text-lg text-green-600">
                                  In stock
                                </p>
                              </div>
                              <p className="text-gray-400 text-sm">
                                Stock: {item.product.stock}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center py-5 border-b">
                    <div>
                      <button
                        onClick={() => handleCancelOrder(order)}
                        className={`ml-7 rounded-full mr-3 py-1 px-7 text-gray-600 font-semibold  ${
                          cancelationReason
                            ? "bg-red-400  text-white hover:shadow-gray-200 hover:bg-red-500 hover:scale-[1.06] transition-all duration-500"
                            : "bg-gray-300"
                        }`}
                        disabled={!cancelationReason}
                      >
                        Cancel order
                      </button>
                    </div>

                    <div className="mb-2 relative px-2 border-gray-200">
                      <input
                        id="cancelationReason"
                        type="text"
                        value={cancelationReason}
                        onChange={(e) => setCancelationReason(e.target.value)}
                        className="block pe-0 pt-3 pb-2 w-full text-md text-gray-900 bg-transparent border-0 z-20 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="cancelationReason"
                        className="absolute cursor-text text-sm text-gray-400 duration-300 transform -translate-y-7 scale-75 top-5 origin-[0] start-1 peer-placeholder-shown:start-2 peer-focus:start-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        Reason
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-5">
                  <div className="col-span-5 pb-2">
                    <div className="flex items-center h-full justify-between px-8">
                      <p className="font-normal text-lg text-gray-500">
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
export default AdminOrderManagementPage;
