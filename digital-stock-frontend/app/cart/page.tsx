'use client'
import { useState } from "react";
import ViewCart from "./ViewCartPage";
import Checkout from "./CheckoutPage";
import OrderConfirmationPage from "./OrderConfirmationPage";
import { OrderInterface } from "../utils/Types";

type CurrentPage = "view-cart" | "checkout" | "order-confirmation";

const CartPage = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("view-cart");
  const [order, setOrder] = useState<OrderInterface>()
  
  const renderComponent = () => {
    if (currentPage == "view-cart") {
      return (
        <ViewCart
        onCheckout={() => setCurrentPage("checkout")}
        />
      )
    }

    if (currentPage == "checkout") {
      return (
        <Checkout
          onOrderConfirmation={() => setCurrentPage("order-confirmation")}
          onViewCart={() => setCurrentPage("view-cart")} 
          setOrder={(newOrder: OrderInterface) => setOrder(newOrder)} 
          />
      )
    }

    if (currentPage == "order-confirmation") {
      return (
      <OrderConfirmationPage
      order={order}/>)
    }
  }

  return (
    <>
    {renderComponent()}
    </>
  )
}

export default CartPage