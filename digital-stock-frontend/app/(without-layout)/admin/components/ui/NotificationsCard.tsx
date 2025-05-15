import { useAdminState } from "@/app/store/AdminState";
import { useAppState } from "@/app/store/BackendAPIState";
import { OrderInterface, ProductInterface } from "@/app/utils/Types";
import { useEffect, useState } from "react";

type Props = {
  onOrders: () => void;
  onProducts: () => void;
}

const Notifications = ({onOrders, onProducts}: Props) => {
    const { orders, fetchAllOrders } = useAdminState()
    const { productList, fetchAllProducts } = useAppState()
    const [newOrdersList, setNewOrdersList] = useState<OrderInterface[]>([])
    const [productsOutOfStock, setProductsOutOfStock] = useState<ProductInterface[]>([])

    useEffect(() => {
      if (orders.length == 0) {
        fetchAllOrders()
      } else if (newOrdersList.length == 0) {
        const pendingOrders = orders.filter(order => order.status === 'PENDING');
        setNewOrdersList(pendingOrders);
      }

      if (productList.length == 0) {
        fetchAllProducts()
      } else if (productsOutOfStock.length == 0) {
        const outOfStockProducts = productList.filter(product => product.stock === 0);
        setProductsOutOfStock(outOfStockProducts);
      }

    }, [orders, productList])

    
    if (newOrdersList.length == 0 && productsOutOfStock.length == 0){
      return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default xl:col-span-4">
          <h4 className="mb-6 px-7 text-xl font-semibold text-black ">
            Notifications
          </h4>
          <p className="border-t text-gray-400 border-stroke py-4 px-4 text-center">
            No new notifications!
          </p>
        </div>
      )
    }

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default xl:col-span-4">
          <h4 className="mb-6 px-7 text-xl font-semibold text-black ">
            Notifications
          </h4>
    
          <div>
            {newOrdersList.map((order, key) => (
              <div
                onClick={onOrders}
                className="flex items-center gap-5 py-3 px-7 hover:bg-gray-300 border-b shadow-inner"
                key={key}
              >
                <div className="relative h-14 w-14 rounded-full flex items-center justify-center">
                  <svg className="h-10 w-10 text-gray-600"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.4"  strokeLinecap="round"  strokeLinejoin="round">  <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />  <line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                </div>
    
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h5 className="font-medium text-black ">
                      {order.firstName} {order.lastName}
                    </h5>
                    <p className="text-sm text-black">Has placed a new order.</p>
                    <p className="text-xs">{order.orderDate}</p>
                    
                  </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <span className="text-sm font-medium text-white">
                        
                      </span>
                    </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {productsOutOfStock.map((product, key) => (
              <div
                onClick={onProducts}
                className="flex items-center gap-5 py-3 px-7 hover:bg-gray-3 border-b"
                key={key}
              >
                <div className="relative h-14 w-14 rounded-full">
                  <img src={product.imageUrl} alt="Product" />
                  <span
                    className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white"
                  ></span>
                </div>
    
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h5 className="font-medium text-black ">
                        Out of stock
                    </h5>
                    <p>
                      <span className="text-sm text-black">
                      {product.name}
                      </span>
                      <span className="text-xs"> . {product.colorName} min</span>
                    </p>
                  </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <span className="text-sm font-medium text-white">
                      </span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}
export default Notifications;