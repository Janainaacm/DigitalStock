import { create } from "zustand";
import axios from "axios";
import { API_URL } from "./config/config";
import {
  UserInterface,
  WishlistInterface,
  OrderInterface,
  ProductInterface,
  OrderItemInterface,
  CategoryInterface,
  CartInterface,
  CartItemInterface
} from "../Types";
import axiosInstance from "./config/axiosConfig";

interface AppState {
  user: UserInterface | null;
  users: UserInterface[];
  productsList: ProductInterface[];
  product: ProductInterface | null;
  categories: CategoryInterface[];
  wishlist: ProductInterface[];
  orders: OrderInterface[];
  cart: CartInterface |  null;


  // User Actions
  fetchUserById: (userId: number) => Promise<UserInterface | null>;
  updateUserProfile: (updatedUser: UserInterface) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;

  // Product Actions
  fetchProducts: () => Promise<ProductInterface[]>;
  fetchProductById: (productId: number) => Promise<ProductInterface | null>;
  fetchProductsByCategory: (categoryName: string) => Promise<ProductInterface[]>;
  fetchAllProductColorsByName: (productName: string) => Promise<ProductInterface[] | null>;

  // Order Actions
  fetchOrderById: (orderId: number) => Promise<OrderInterface | null>;
  fetchOrdersByUserId: (userId: number) => Promise<OrderInterface[]>;
  fetchOrderByStatus: (status: string) => Promise<OrderInterface[]>;
  placeOrder: (userId: number) => Promise<void>;
  cancelOrder: (orderId: number) => Promise<void>;
  deleteOrder: (orderId: number) => Promise<void>;

  // Wishlist Actions
  fetchWishlist: (userId: number) => Promise<ProductInterface[]>;
  addToWishlist: (userId: number, productId: number) => Promise<void>;
  removeFromWishlist: (userId: number, productId: number) => Promise<void>;
  clearWishlist: (userId: number) => Promise<void>;

  // Cart Actions
  fetchCartByUserId: (userId: number) => Promise<CartInterface>;
  addItemToCart: (product: ProductInterface) => Promise<void>;
  removeItemFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;

  // Admin Actions
  fetchAllUsers: () => Promise<UserInterface[]>;
  addNewProduct: (productData: ProductInterface) => Promise<void>;
  editProduct: (productId: number, productDetails: ProductInterface) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  fetchAllOrders: () => Promise<OrderInterface[]>;
  updateOrderStatus: (orderId: number, status: string) => Promise<void>;

}

export const useAppState = create<AppState>((set) => ({
  user: null,
  users: [],
  productsList: [],
  product: null,
  categories: [],
  wishlist: [],
  orders: [],
  cart: null,



  // User Actions
  fetchUserById: async (userId: number): Promise<UserInterface | null> => {
    try {
      const response = await axiosInstance.get(`/user/${userId}`);
      set({ user: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  },
  

  updateUserProfile: async (updatedUser: UserInterface): Promise<void> => {
    if (!updatedUser.id) return;

    try {
      const response = await axiosInstance.put(
        `${API_URL}/user/${updatedUser.id}`,
        updatedUser
      );
      set({ user: response.data });
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  deleteUser: async (userId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/user/${userId}`);
      set({ user: null });
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },


  // Product Actions
  fetchProducts: async (): Promise<ProductInterface[]> => {
    try {
      console.log("Fetching products...");
      const response = await axios.get(`${API_URL}/products`);
      console.log("Products fetched:", response.data);
      set({ 
        productsList: response.data
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  


  fetchProductById: async (productId: number): Promise<ProductInterface | null> => {
    try {
      const response = await axios.get(`${API_URL}/products/id/${productId}`);
      set({ product: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  },

  fetchProductsByCategory: async (categoryName: string): Promise<ProductInterface[]> => {
    try {
      const response = await axios.get(`${API_URL}/products/category/${categoryName}`);
      set({ productsList: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },



  fetchAllProductColorsByName: async (productName: string): Promise<ProductInterface[] | null> => {
    try {
      const response = await axios.get(`${API_URL}/products/name/${productName}/colors`);
      set({ productsList: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching product colors by name:", error);
      return null;
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

  fetchOrdersByUserId: async (userId: number): Promise<OrderInterface[]> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/orders/user`);
      set({ orders: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders by user ID:", error);
      return [];
    }
  },

  fetchOrderByStatus: async (status: string): Promise<OrderInterface[]> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/orders/status/${status}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders by status:", error);
      return [];
    }
  },

  placeOrder: async (userId: number): Promise<void> => {
    try {
      const response = await axiosInstance.post(`${API_URL}/orders/place/${userId}`);
      set({ orders: [...useAppState.getState().orders, response.data] });
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  },

  cancelOrder: async (orderId: number): Promise<void> => {
    try {
      const response = await axiosInstance.put(`${API_URL}/orders/${orderId}`);
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? response.data : order
        ),
      }));
    } catch (error) {
      console.error("Error canceling order:", error);
      throw error;
    }
  },

  deleteOrder: async (orderId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/orders/${orderId}`);
      set((state) => ({
        orders: state.orders.filter((order) => order.id !== orderId),
      }));
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },  
  



  // Wishlist Actions
  fetchWishlist: async (userId: number): Promise<ProductInterface[]> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/user/${userId}`);
      set({ wishlist: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw error;
    }
  },

  addToWishlist: async (userId: number, productId: number): Promise<void> => {
    try {
      const response = await axiosInstance.post(`${API_URL}/user/${userId}/product/${productId}`);
      set((state) => ({
        wishlist: [...state.wishlist, response.data],
      }));
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      throw error;
    }
  },
  
  removeFromWishlist: async (userId: number, productId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/user/${userId}/product/${productId}`);
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== productId),
      }));
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      throw error;
    }
  },

  clearWishlist: async (userId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/user/${userId}/clear`);
      set({ wishlist: [] });
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      throw error;
    }
  },





// Cart Actions
fetchCartByUserId: async (userId: number): Promise<CartInterface> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/cart/${userId}`);
      set({ cart: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },

  addItemToCart: async (product: ProductInterface): Promise<void> => {
    console.log("made it here")
    const userId = useAppState.getState().user?.id;
    if (!userId) {
      console.log("no user, open login pop up")
      return;
    }

    try {
        const response = await axiosInstance.post(`${API_URL}/cart/add`, {
            productId: product.id,
            quantity: 1, 
        });
        set({ cart: response.data }); 
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
    }
},

  
  removeItemFromCart: async (cartItemId: number): Promise<void> => {
    const userId = useAppState.getState().user?.id;
    if (!userId) return;

    try {
      const response = await axiosInstance.delete(`${API_URL}/cart/${userId}/${cartItemId}`);
      set({ cart: response.data });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  },

  clearCart: async (): Promise<void> => {
    const userId = useAppState.getState().user?.id;
    if (!userId) return;

    try {
      const response = await axiosInstance.delete(`${API_URL}/cart/${userId}`);
      set({ cart: response.data });
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  },



  // Admin Actions
  fetchAllUsers: async (): Promise<UserInterface[]> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/users`);
      set({ users: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  },

  addNewProduct: async (productData: ProductInterface): Promise<void> => {
    try {
      const response = await axiosInstance.post(`${API_URL}/products/new`, productData);
      set((state) => ({
        productsList: [...state.productsList, response.data], // Updated to productList
      }));
    } catch (error) {
      console.error("Error adding new product:", error);
      throw error;
    }
  },
  
  editProduct: async (productId: number, productDetails: ProductInterface): Promise<void> => {
    try {
      const response = await axiosInstance.put(`${API_URL}/products/${productId}`, productDetails);
      set((state) => ({
        productsList: state.productsList.map((product) =>
          product.id === productId ? response.data : product
        ), // Updated to productList
      }));
    } catch (error) {
      console.error("Error editing product:", error);
      throw error;
    }
  },
  
  deleteProduct: async (productId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/products/${productId}`);
      set((state) => ({
        productsList: state.productsList.filter((product) => product.id !== productId), // Updated to productList
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
  

  fetchAllOrders: async (): Promise<OrderInterface[]> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/orders`);
      set({ orders: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching all orders:", error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId: number, status: string): Promise<void> => {
    try {
      const response = await axiosInstance.put(`${API_URL}/orders/update/${orderId}`, status, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? { ...order, status: response.data.status } : order
        ),
      }));
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  }
}));
