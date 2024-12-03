import { create } from "zustand";
import axiosInstance from "./config/axiosConfig";
import { API_URL } from "./config/config";
import {
  OrderInterface,
  UserInterface,
  ProductInterface,
} from "../utils/Types";
import { useAuthState } from "./AuthState";
import { useAppState } from "./BackendAPIState";

interface UserState {
  // User Actions
  fetchUserById: () => Promise<void>;
  updateUserProfile: (updatedUser: UserInterface) => Promise<void>;
  deleteUser: () => Promise<void>;

  // Wishlist Actions
  isProductInWishlist: (productId: number) => boolean;
  fetchWishlist: () => Promise<ProductInterface[] | null>;
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  clearWishlist: () => Promise<void>;

  // Cart Actions
  fetchCart: () => Promise<void>;
  addItemToCart: (productId: number, quantity: number) => Promise<void>;
  removeItemFromCart: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;

  // Order Actions
  fetchOrderById: (orderId: number) => Promise<OrderInterface | null>;
  fetchOrdersByUserId: () => Promise<OrderInterface[]>;
  fetchOrderByStatus: (status: string) => Promise<OrderInterface[]>;
  placeOrder: () => Promise<void>;
  cancelOrder: (orderId: number) => Promise<void>;
  deleteOrder: (orderId: number) => Promise<void>;
}

export const useUserState = create<UserState>((set, get) => ({
 
  // User Actions
  fetchUserById: async (): Promise<void> => {
    const user = useAuthState.getState().user;
    if (!user) return;

    try {
      const response = await axiosInstance.get(`/user/${user.id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return;
    }
  },

  updateUserProfile: async (updatedUser: UserInterface): Promise<void> => {
    if (!updatedUser.id) return;

    const user = useAuthState.getState().user;
    if (!user) return;

    try {
      await axiosInstance.put(`${API_URL}/user/${user.id}`, updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  deleteUser: async (): Promise<void> => {
    const user = useAuthState.getState().user;
    if (!user) return;

    try {
      await axiosInstance.delete(`${API_URL}/user/${user.id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  // Wishlist Actions
  isProductInWishlist: (productId: number): boolean => {
    const wishlist = useAuthState.getState().wishlist;
    if (!wishlist) return false;
  
    return wishlist.items.some((item) => item.product.id === productId);
  },
  
  


  fetchWishlist: async (): Promise<ProductInterface[] | null> => {
    const user = useAuthState.getState().user;
    if (!user) return null;

    try {
      const response = await axiosInstance.get(
        `${API_URL}/wishlist/user/${user.id}`
      );

      useAuthState.setState({ wishlist: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw error;
    }
  },

  addToWishlist: async (productId: number): Promise<void> => {
    const user = useAuthState.getState().user;
    if (!user) return;
  
    try {
      const response = await axiosInstance.post(
        `${API_URL}/wishlist/user/${user.id}/product/${productId}`
      );
  
      console.log("API Response (Updated Wishlist):", response.data);
  
      useAuthState.setState({
        wishlist: response.data,
      });
  
      console.log("Updated Wishlist State:", useAuthState.getState().wishlist);
  
      useAppState.setState((state) => ({
        productList: state.productList.map((product) =>
          product.id === productId ? { ...product, isInWishlist: true } : product
        ),
      }));
  
      console.log(`Product ${productId} added to wishlist`);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      throw error;
    }
  },
  

  removeFromWishlist: async (productId: number): Promise<void> => {
    
    const user = useAuthState.getState().user;
    if (!user) return;
  
    const currentWishlist = useAuthState.getState().wishlist;
    if (!currentWishlist) return;

  
    try {
      await axiosInstance.delete(`${API_URL}/wishlist/${user.id}/${productId}/delete`);
  
      useAuthState.setState({
        wishlist: {
          ...currentWishlist,
          items: currentWishlist.items.filter((item) => item.product.id !== productId),
        },
      });
  
      useAppState.setState((state) => ({
        productList: state.productList.map((product) =>
          product.id === productId ? { ...product, isInWishlist: false } : product
        ),
      }));
  
      console.log(`Wishlist item ${productId} removed`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(`Product ${productId} not found in wishlist.`);
      } else {
        console.error("Error removing product from wishlist:", error);
        throw error;
      }
    }
  },
  
  
  
  

  clearWishlist: async (): Promise<void> => {
    const user = useAuthState.getState().user;
    if (!user) return;
  
    const currentWishlist = useAuthState.getState().wishlist;
    if (!currentWishlist) return;
  
    try {
      await axiosInstance.delete(`${API_URL}/wishlist/user/${user.id}/clear`);
  
      useAuthState.setState({
        wishlist: {
          ...currentWishlist,
          items: [], 
        },
      });
  
     
      useAppState.setState((state) => ({
        productList: state.productList.map((product) => ({
          ...product,
          isInWishlist: false,
        })),
      }));
  
      console.log("Wishlist cleared and productList updated");
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      throw error;
    }
  },
  
  

  // Cart Actions
  fetchCart: async (): Promise<void> => {
    const user = useAuthState.getState().user;
  if (!user) return;

  try {
    const response = await axiosInstance.get(`${API_URL}/cart/${user.id}`);
    useAuthState.setState({ cart: response.data }); 
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
  },

  addItemToCart: async (productId: number, quantity: number): Promise<void> => {
    const user = useAuthState.getState().user;
    if (!user) return;
  
    try {
      const response = await axiosInstance.put(
        `${API_URL}/cart/${user.id}/add/${productId}/${quantity}`
      );
  
      console.log("API Response (Updated Cart):", response.data);
  
      useAuthState.setState({
        cart: response.data,
      });
  
      console.log("Updated Cart State:", useAuthState.getState().cart);

  
      console.log(`Product ${productId} added to cart`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
    }
  },
  

  removeItemFromCart: async (productId: number, quantity: number): Promise<void> => {
    const user = useAuthState.getState().user;
    if (!user) return;
  
    const currentCart = useAuthState.getState().cart;
    if (!currentCart) return;
  
    try {
      const response = await axiosInstance.delete(`${API_URL}/cart/${user.id}/${productId}/${quantity}`);

      useAuthState.setState({
        cart: response.data,
      });

      console.log("Product removed from cart")
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
},
  
clearCart: async (): Promise<void> => {
    const user = useAuthState.getState().user;
    if (!user) return;
  
    const currentCart = useAuthState.getState().cart;
    if (!currentCart) return;
  
    try {
      await axiosInstance.delete(`${API_URL}/cart/${user.id}`);
      useAuthState.setState({
        cart: {
          ...currentCart,
          items: [],
        },
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  },
  

  // Order Actions
  fetchOrderById: async (orderId: number): Promise<OrderInterface | null> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return null;
    }
  },  

  fetchOrdersByUserId: async (): Promise<OrderInterface[]> => {
    const user = useAuthState.getState().user;
    if (!user) return [];
  
    try {
      const response = await axiosInstance.get(`${API_URL}/orders/user/${user.id}`);
      useAuthState.setState({ orders: response.data }); 
      return response.data;
    } catch (error) {
      console.error("Error fetching orders by user ID:", error);
      return [];
    }
  },
  
  fetchOrderByStatus: async (status: string): Promise<OrderInterface[]> => {
    const user = useAuthState.getState().user;
    if (!user) return []; // Optionally check authentication
  
    try {
      const response = await axiosInstance.get(`${API_URL}/orders/status/${status}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders by status:", error);
      return [];
    }
  },
  

  placeOrder: async (): Promise<void> => {
    const user = useAuthState.getState().user;
    if (!user) return;
  
    try {
      const response = await axiosInstance.post(`${API_URL}/orders/place/${user.id}`);
      const currentOrders = useAuthState.getState().orders;
      useAuthState.setState({
        orders: [...currentOrders, response.data], 
      });
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  },
  
  cancelOrder: async (orderId: number): Promise<void> => {
    const user = useAuthState.getState().user;
    if (!user) return;
  
    try {
      const response = await axiosInstance.put(`${API_URL}/orders/cancel/${orderId}`);
      const currentOrders = useAuthState.getState().orders;
      useAuthState.setState({
        orders: currentOrders.map((order) =>
          order.id === orderId ? response.data : order
        ),
      });
    } catch (error) {
      console.error("Error canceling order:", error);
      throw error;
    }
  },
  

  deleteOrder: async (orderId: number): Promise<void> => {
    const user = useAuthState.getState().user;
    if (!user) return;
  
    try {
      await axiosInstance.delete(`${API_URL}/orders/${orderId}`);
      const currentOrders = useAuthState.getState().orders;
      useAuthState.setState({
        orders: currentOrders.filter((order) => order.id !== orderId),
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },
  
}));
