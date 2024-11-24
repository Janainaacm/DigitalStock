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
import { useAuthState } from "./AuthState";

interface AppState {
  users: UserInterface[];
  productList: ProductInterface[];
  allProductVariants: ProductInterface[];
  filteredProductList: ProductInterface[]
  product: ProductInterface | null;
  categories: CategoryInterface[];
  wishlist: ProductInterface[];
  orders: OrderInterface[];
  cart: CartInterface[];
  searchBar: string;


  // User Actions
  fetchUserById: (userId: string) => Promise<UserInterface | null>;
  updateUserProfile: (updatedUser: UserInterface) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;

  // Product Actions
  fetchProducts: () => Promise<void>;
  setFilteredProductList: (searchResult: ProductInterface[]) => void;
  fetchProductById: (productId: string) => Promise<ProductInterface | null>;
  fetchProductsByCategory: (categoryName: string) => Promise<ProductInterface[]>;
  fetchAllProductColorsByName: (productName: string, currentProductId: string) => Promise<ProductInterface[] | null>;
  setSearchBar: (searchInput: string) => void;

  // Order Actions
  fetchOrderById: (orderId: string) => Promise<OrderInterface | null>;
  fetchOrdersByUserId: (userId: string) => Promise<OrderInterface[]>;
  fetchOrderByStatus: (status: string) => Promise<OrderInterface[]>;
  placeOrder: (userId: string) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;

  // Wishlist Actions
  fetchWishlist: (userId: string) => Promise<ProductInterface[]>;
  addToWishlist: (userId: string, productId: string) => Promise<void>;
  removeFromWishlist: (userId: string, productId: string) => Promise<void>;
  clearWishlist: (userId: string) => Promise<void>;

  // Cart Actions
  fetchCartByUserId: (userId: string) => Promise<CartInterface>;
  addItemToCart: (product: ProductInterface) => Promise<void>;
  removeItemFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;

  // Admin Actions
  fetchAllUsers: () => Promise<UserInterface[]>;
  addNewProduct: (productData: ProductInterface) => Promise<void>;
  editProduct: (productId: string, productDetails: ProductInterface) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  fetchAllOrders: () => Promise<OrderInterface[]>;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;

}

export const useAppState = create<AppState>((set) => ({
  users: [],
  productList: [],
  allProductVariants: [],
  filteredProductList: [],
  product: null,
  categories: [],
  wishlist: [],
  orders: [],
  cart: [],
  searchBar: "",




  // User Actions
  fetchUserById: async (userId: string): Promise<UserInterface | null> => {
    try {
      const response = await axiosInstance.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  },
  

  updateUserProfile: async (updatedUser: UserInterface): Promise<void> => {
    if (!updatedUser.id) return;

    try {
      await axiosInstance.put(
        `${API_URL}/user/${updatedUser.id}`,
        updatedUser
      );
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  deleteUser: async (userId: string): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/user/${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },


  // Product Actions
  fetchProducts: async (): Promise<void> => {
    try {
      console.log("Fetching products...");
      const response = await axios.get(`${API_URL}/products`);
      console.log("Products fetched:", response.data);
      set({ 
        productList: response.data
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  
  setFilteredProductList: async (searchResult: ProductInterface[]) => {
    set({ 
      filteredProductList: searchResult
    });
  },


  fetchProductById: async (productId: string): Promise<ProductInterface | null> => {
    try {
      const response = await axios.get(`${API_URL}/products/id/${productId}`);
      set({ product: response.data });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  },

  fetchProductsByCategory: async (categoryName: string): Promise<ProductInterface[]> => {
    try {
      const response = await axios.get(`${API_URL}/products/category/${categoryName}`);
      set({ productList: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },


  fetchAllProductColorsByName: async (productName: string, colorName: string): Promise<ProductInterface[] | null> => {
    try {
      const response = await axios.get(`${API_URL}/products/name/${productName}/colors`);
      const allColors = response.data;
      console.log("All Colors:", allColors);
      console.log("Current colorName:", colorName);
      
      const sendBackList = allColors.filter((p: ProductInterface) => p.colorName !== colorName);
      console.log("Filtered Colors:", sendBackList);
      
      set({ allProductVariants: sendBackList }); 
  
      return sendBackList; 
    } catch (error) {
      console.error("Error fetching product colors by name:", error);
      return null;
    }
  },
  

  setSearchBar: (searchInput: string) => {
    set({
      searchBar: searchInput
    })
  },



  // Order Actions
  fetchOrderById: async (orderId: string): Promise<OrderInterface | null> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return null; 
    }
  },

  fetchOrdersByUserId: async (userId: string): Promise<OrderInterface[]> => {
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

  placeOrder: async (userId: string): Promise<void> => {
    try {
      const response = await axiosInstance.post(`${API_URL}/orders/place/${userId}`);
      set({ orders: [...useAppState.getState().orders, response.data] });
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  },

  cancelOrder: async (orderId: string): Promise<void> => {
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

  deleteOrder: async (orderId: string): Promise<void> => {
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
  fetchWishlist: async (userId: string): Promise<ProductInterface[]> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/user/${userId}`);
      set({ wishlist: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw error;
    }
  },

  addToWishlist: async (userId: string, productId: string): Promise<void> => {
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
  
  removeFromWishlist: async (userId: string, productId: string): Promise<void> => {
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

  clearWishlist: async (userId: string): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/user/${userId}/clear`);
      set({ wishlist: [] });
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      throw error;
    }
  },





// Cart Actions
fetchCartByUserId: async (userId: string): Promise<CartInterface> => {
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

  
  removeItemFromCart: async (cartItemId: string): Promise<void> => {
    const user = useAuthState.getState().user;

    if (!user) {
      console.log('User is not authenticated');
      return;
    }

    try {
      const response = await axiosInstance.delete(`${API_URL}/cart/${user.id}/${cartItemId}`);
      set({ cart: response.data });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  },

  clearCart: async (): Promise<void> => {
    const user = useAuthState.getState().user;

    if (!user) {
      console.log('User is not authenticated');
      return;
    }

    try {
      const response = await axiosInstance.delete(`${API_URL}/cart/${user.id}`);
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
        productList: [...state.productList, response.data], // Updated to productList
      }));
    } catch (error) {
      console.error("Error adding new product:", error);
      throw error;
    }
  },
  
  editProduct: async (productId: string, productDetails: ProductInterface): Promise<void> => {
    try {
      const response = await axiosInstance.put(`${API_URL}/products/${productId}`, productDetails);
      set((state) => ({
        productList: state.productList.map((product) =>
          product.id === productId ? response.data : product
        ), // Updated to productList
      }));
    } catch (error) {
      console.error("Error editing product:", error);
      throw error;
    }
  },
  
  deleteProduct: async (productId: string): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/products/${productId}`);
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
      const response = await axiosInstance.get(`${API_URL}/orders`);
      set({ orders: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching all orders:", error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId: string, status: string): Promise<void> => {
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
