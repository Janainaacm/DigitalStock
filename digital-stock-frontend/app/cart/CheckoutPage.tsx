'use client'
import { useAuthState } from "@/app/store/AuthState";
import { useUserState } from "@/app/store/UserState";
import { OrderInterface } from "@/app/utils/Types";
import { useEffect, useState } from "react";

type Props = {
  onOrderConfirmation: () => void;
  onViewCart: () => void;
  setOrder: (order: OrderInterface) => void;
} 

const Checkout = ({onOrderConfirmation, onViewCart, setOrder}: Props) => {
  const { cart, user } = useAuthState();
  const { placeOrder } = useUserState();
  const [subtotal, setSubtotal] = useState(0);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNo, setPhoneNo] = useState(user?.phoneNo || "");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (cart) {
      const newSubtotal = cart.items.reduce((acc, item) => {
        return (acc + item.product.price * item.quantity + 5);
      }, 0);

      setSubtotal(Number(newSubtotal.toFixed(2)));
    }
  }, [cart]);

  const validateFields = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNo.trim()) {
      setError("Please fill in all personal details.");
      return false;
    }
    if (!addressLine.trim() || !city.trim() || !state.trim() || !zipCode.trim()) {
      setError("Please fill in all shipping address fields.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleCompletePurchase = async () => {
    if (!validateFields()) return;

    if (user && cart) {

    try {
      
      const orderData: OrderInterface = {
        id: 0, 
        user: user,
        firstName,
        lastName,
        email,
        phoneNo,
        orderItems: cart.items,
        status: "PENDING",
        orderDate: new Date().toISOString(),
        address: {
          addressLine,
          city,
          state,
          zipCode,
        },
        subtotal,
      };
      
      await placeOrder(orderData);
      

      setSuccess(true);
      setOrder(orderData);
      setTimeout(() => {
        onOrderConfirmation()
        setSuccess(false);
      }, 3000);

      setFirstName(user?.firstName || "");
      setLastName(user?.lastName || "");
      setEmail(user?.email || "");
      setPhoneNo(user?.phoneNo || "");
      setAddressLine("");
      setCity("");
      setState("");
      setZipCode("");
    } catch (error: any) {
      console.error("Error completing purchase:", error);
      setError(
        error.response?.data?.message || "Failed to complete the purchase. Please try again."
      );
    }
  }    
  };


  const SuccessPopup = () => (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <svg
          className="h-12 w-12 text-green-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-lg font-semibold text-gray-700">Order placed successfully!</p>
      </div>
    </div>
  );

  return (
    <>
    {success && <SuccessPopup />}
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          <div className="relative h-full">
            <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">
                {cart?.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-white rounded-md">
                      <img
                        src={item.product.imageUrl}
                        className="w-full object-contain"
                      />
                    </div>
                    <div className="w-full">
                      <h3 className="text-base text-white">{item.product.name}</h3>
                      <ul className="text-xs text-gray-300 space-y-2 mt-2">
                        <li className="flex flex-wrap gap-4">
                          Color <span className="ml-auto">{item.product.colorName}</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Quantity <span className="ml-auto">{item.quantity}</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Total Price <span className="ml-auto">${item.product.price * item.quantity}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:absolute md:left-0 md:bottom-0 bg-gray-800 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-base text-white">
                Total <span className="ml-auto">${subtotal}</span>
              </h4>
            </div>
          </div>
        </div>

        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Complete your order
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mt-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md mt-4">
              Purchase completed successfully!
            </div>
          )}
          <form className="mt-8">
            <div>
              <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Phone No."
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-base text-gray-800 mb-4">Shipping Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Address Line"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-4 max-md:flex-col mt-8">
                <button
                  onClick={onViewCart}
                  type="button"
                  className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                >
                  Go back
                </button>
                <button
                  type="button"
                  onClick={handleCompletePurchase}
                  className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Complete Purchase
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
