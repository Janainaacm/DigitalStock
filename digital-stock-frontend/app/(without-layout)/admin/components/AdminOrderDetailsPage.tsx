"use client";

import LoadingPage from "@/app/components/loadingPage/LoadingPage";
import { useAdminState } from "@/app/store/AdminState";
import { OrderInterface, OrderItemInterface } from "@/app/utils/Types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  onBack: () => void;
};

const AdminOrderDetailsPage = ({ onBack }: Props) => {
  const { orderDetails, updateOrderStatus, cancelOrder } = useAdminState();
  const [itemsAmount, setItemsAmount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [allChecked, setAllChecked] = useState(false);
  const [cancelationReason, setCancelationReason] = useState("");

  useEffect(() => {
    if (orderDetails) {
      const initialSelection: Record<number, boolean> =
        orderDetails.orderItems.reduce(
          (acc: Record<number, boolean>, item: OrderItemInterface) => {
            acc[item.id] = false;
            return acc;
          },
          {} as Record<number, boolean>
        );
      setSelectedItems(initialSelection);

      const numberOfItems = orderDetails.orderItems.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
      setItemsAmount(Number(numberOfItems.toFixed(2)));
    }
  }, [orderDetails]);

  useEffect(() => {
    const allSelected = Object.values(selectedItems).every(
      (isSelected) => isSelected
    );
    setAllChecked(allSelected);
  }, [selectedItems]);

  if (!orderDetails) {
    return (
      <LoadingPage/>
    )
  }

  const handleDivClick = (id: number) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSetOrderStatus = (status: string) => {
    if (allChecked) {
      updateOrderStatus(orderDetails.id, status);
      onBack();
    }
  };

  const handleCancelOrder = (order: OrderInterface) => {
    if (
      order.status == "CONFIRMED" ||
      order.status == "SHIPPED" ||
      order.status == "DELIVERED"
    ) {
      return;
    }

    try {
      cancelOrder(order.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="pb-24  pt-12 relative">
        <div className="flex justify-between px-4 md:px-8">
          <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-3">
            Order Details
          </h2>
          <div className={`group transition-all flex justify-center relative`}>
            <button
              onClick={onBack}
              type="button"
              className={`inline-block no-underline text-lg text-gray-500 font-semibold p-2 duration-500 group-hover:tracking-widest group-hover:text-gray-600`}
            >
              Go back
            </button>
            <div className="border-b-2 border-transparent absolute bottom-1 w-2.5 duration-500 mx-2 group-hover:w-full group-hover:border-gray-600 group-hover:duration-500"></div>
          </div>
        </div>

        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div className="flex items-start flex-col gap-6 xl:flex-row ">
            <div className="w-full max-w-sm md:max-w-3xl xl:max-w-sm flex items-start flex-col gap-8 max-xl:mx-auto">
              <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                <h2 className="font-manrope font-bold text-2xl leading-10 text-black pb-4 border-b border-gray-200 ">
                  Actions
                </h2>
                <p className="font-semibold text-lg text-gray-600 mt-2 p-2">
                  Order Status
                </p>
                {orderDetails.status == "CONFIRMED" ? (
                  <div>
                    <div className="mb-6 rounded-lg px-2 border-gray-200">
                      <button
                        className={`px-4 py-2 text-white rounded-md ${
                          allChecked ? "bg-green-500" : "bg-gray-300"
                        }`}
                        disabled={!allChecked}
                        onClick={() => handleSetOrderStatus("SHIPPED")}
                      >
                        Set as SHIPPED
                      </button>
                      <p className="h-3 pt-1 text-sm text-gray-500">
                        {allChecked
                          ? null
                          : "Check all products in order to ship"}
                      </p>
                    </div>
                    <p className="font-semibold text-lg text-gray-600 mt-2 p-2">
                      Cancel order
                    </p>
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
                    <button
                      className={`px-4 py-2 text-white rounded-md ${
                        cancelationReason
                          ? "bg-red-300 hover:bg-red-500 transition duration-500"
                          : "bg-gray-300"
                      }`}
                      disabled={!cancelationReason}
                      onClick={() => handleCancelOrder(orderDetails)}
                    >
                      Cancel order
                    </button>
                  </div>
                ) : (
                  <div>
                    {orderDetails.status == "SHIPPED" ? (
                       <div className="mb-6 rounded-lg px-2 border-gray-200">
                       <button
                         className={`px-4 py-2 text-white rounded-md ${
                            allChecked ? "bg-blue-500" : "bg-gray-300"
                          }`}
                         onClick={() => handleSetOrderStatus("DELIVERED")}
                         disabled={!allChecked}
                       >
                         Set Delivered
                       </button>
                       <p className="h-3 pt-1 text-sm text-gray-500">
                         {allChecked
                           ? null
                           : "Check all products in order to ship"}
                       </p>
                     </div>
                    ) : (
                      <div>
                        <h3 className="px-2 text-xl font-semibold text-red-600">
                          CANCELLED
                        </h3>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="p-6 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
                <h2 className="font-manrope font-bold text-2xl leading-10 text-black pb-4 border-b border-gray-200 ">
                  Information
                </h2>
                <p className="font-semibold text-lg text-gray-600 mt-2 p-2">
                  Customer data
                </p>
                <div className="mb-6 bg-gray-50 shadow-inner rounded-lg px-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Full Name:
                    </p>
                    <p className="font-medium text-md leading-8 text-gray-900">
                      {orderDetails.firstName} {orderDetails.lastName}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Email:
                    </p>
                    <p className="font-medium text-md leading-8 text-gray-600">
                      {orderDetails.email}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Phone number:
                    </p>
                    <p className="font-medium text-md leading-8 text-gray-600">
                      {orderDetails.phoneNo}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-lg text-gray-600 mt-2 p-2">
                  Delivery data
                </p>
                <div className="mb-6 bg-gray-50 shadow-inner rounded-lg px-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Address line:
                    </p>
                    <p className="font-medium text-md leading-8 text-gray-900">
                      {orderDetails.address.addressLine}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      City:
                    </p>
                    <p className="font-medium text-md leading-8 text-gray-600">
                      {orderDetails.address.city}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      State:
                    </p>
                    <p className="font-medium text-md leading-8 text-gray-600">
                      {orderDetails.address.state}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Zip code:
                    </p>
                    <p className="font-medium text-md leading-8 text-gray-600">
                      {orderDetails.address.zipCode}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-lg text-gray-600 mt-2 p-2">
                  Order summery:
                </p>
                <div className="mb-6 bg-gray-50 shadow-inner rounded-lg px-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Items:
                    </p>
                    <p className="font-medium text-md leading-8 text-gray-900">
                      {itemsAmount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Shipping:
                    </p>
                    <p className="font-medium text-md leading-8 text-gray-600">
                      $5
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Cost:
                    </p>
                    <p className="font-medium text-md leading-8 text-gray-600">
                      ${orderDetails.subtotal - 5}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-md leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Subtotal:
                    </p>
                    <p className="font-medium text-md leading-8 text-gray-600">
                      ${orderDetails.subtotal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-sm md:max-w-3xl max-xl:mx-auto">
              {orderDetails.orderItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleDivClick(item.id)}
                  className="grid py-2 grid-cols-1 gap-6"
                >
                  <div
                    className={`rounded-3xl p-6 bg-gray-100 border flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 ${
                      selectedItems[item.id]
                        ? "border-blue-400 bg-gray-50 shadow-md"
                        : "border-gray-100 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="img-box">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full md:max-w-[122px] p-1 bg-white rounded-lg object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 md:gap-8">
                      <div className="">
                        <h2 className="font-medium text-xl text-black mb-3">
                          {item.product.name}
                        </h2>
                        <p className="font-normal text-sm text-gray-500 ">
                          Color: {item.product.colorName}
                        </p>
                        <p className="font-normal text-sm text-gray-500 ">
                          QTY: {item.quantity}
                        </p>
                        <p className="font-normal text-sm text-gray-500 ">
                          Left in stock: {item.product.stock}
                        </p>
                      </div>

                      <div className="flex justify-end items-center relative">
                        {item.quantity > 1 ? (
                          <p className="absolute top-2 text-sm text-gray-500">
                            U.P: ${item.product.price}
                          </p>
                        ) : null}
                        <h6 className="font-medium text-xl leading-8 text-indigo-600">
                          $
                          {Number(item.quantity * item.product.price).toFixed(
                            2
                          )}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminOrderDetailsPage;
