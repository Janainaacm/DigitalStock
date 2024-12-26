import { create } from "zustand";
import axiosInstance from "./config/axiosConfig";
import { API_URL } from "./config/config";
import {
  UserInterface,
  ProductInterface,
  OrderInterface,
} from "../utils/Types";
import { useAppState } from "./BackendAPIState";
import { useAuthState } from "./AuthState";

interface AdminState {
  userList: UserInterface[];
  productList: ProductInterface[];
  orders: OrderInterface[];
  orderDetails: OrderInterface | null;
  userDetails: UserInterface | null;
  productDetails: ProductInterface | null;

  // Admin Actions
  fetchAllUsers: () => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
  addNewProduct: (productData: ProductInterface) => Promise<void>;
  editProduct: (productId: number, productDetails: ProductInterface) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  fetchAllOrders: () => Promise<OrderInterface[]>;
  updateOrderStatus: (orderId: number, status: string) => Promise<void>;
  addNewCategory: (categoryName: string) => Promise<void>;
  deleteCategory: (categoryId: number) => Promise<void>;
  cancelOrder: (orderId: number) => Promise<void>;
  setOrderDetails: (order: OrderInterface) => void;
  setUserDetails: (user: UserInterface) => void;
  setProductDetails: (product: ProductInterface) => void;
}

export const useAdminState = create<AdminState>((set) => ({
  userList: [],
  productList: [],
  orders: [],
  orderDetails: null,
  userDetails: null,
  productDetails: null,

  fetchAllUsers: async (): Promise<void> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/admin/users`);
      const list: UserInterface[] = response.data
      const filtered = list.filter((user) => user.role == "ROLE_USER")

      set({ userList: filtered });
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  },

  deleteUser: async (userId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/admin/delete/${userId}`);
      set((state) => ({
        userList: state.userList.filter((user) => user.id !== userId),
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  addNewProduct: async (productData: ProductInterface): Promise<void> => {
    try {
      const response = await axiosInstance.post(`${API_URL}/admin/products/new`, productData);
      set((state) => ({
        productList: [...state.productList, response.data], 
      }));
    } catch (error) {
      console.error("Error adding new product:", error);
      throw error;
    }
  },

  editProduct: async (productId: number, productDetails: ProductInterface): Promise<void> => {
    try {
      const response = await axiosInstance.put(`${API_URL}/admin/products/${productId}`, productDetails);
      set((state) => ({
        productList: state.productList.map((product) =>
          product.id === productId ? response.data : product 
        ),
      }));
    } catch (error) {
      console.error("Error editing product:", error);
      throw error;
    }
  },

  deleteProduct: async (productId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/admin/products/${productId}`);
      set((state) => ({
        productList: state.productList.filter((product) => product.id !== productId),
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  fetchAllOrders: async (): Promise<OrderInterface[]> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/admin/orders`);
      set({ orders: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching all orders:", error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId: number, status: string): Promise<void> => {
    try {
      const response = await axiosInstance.put(
        `${API_URL}/admin/orders/update/${orderId}`,
        {status}
      );
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? { ...order, status: response.data.status } : order 
        ),
      }));
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  addNewCategory: async (categoryName: string): Promise<void> => {
    try {

      const categoryDTO = { name: categoryName };

      const response = await axiosInstance.post(`${API_URL}/admin/categories/add`, categoryDTO)

      useAppState.setState((state) => ({
        categories: [...state.categories, response.data], 
      }));
      
    } catch (error) {
      throw error
    }
  },

  deleteCategory: async (categoryId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/admin/categories/delete/${categoryId}`);
  
      useAppState.setState((state) => ({
        categories: state.categories.filter((category) => category.id !== categoryId),
      }));
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error; 
    }
  },

  cancelOrder: async (orderId: number): Promise<void> => {
    const user = useAuthState.getState().user;
    if (!user) return;
  
    try {
      const response = await axiosInstance.put(`${API_URL}/orders/${user.id}/cancel/${orderId}`);
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

  setOrderDetails: (order: OrderInterface) => {
    set({ orderDetails: order});
  },

  setUserDetails: (user) => {
      set({userDetails: user})
  },

  setProductDetails: (product) => {
    set({productDetails: product})
},

  
}));
