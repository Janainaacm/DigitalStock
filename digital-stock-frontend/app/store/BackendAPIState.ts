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
  CartItemInterface,
  WishlistItemsInterface
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
  wishlist: WishlistItemsInterface[];
  orders: OrderInterface[];
  cart: CartInterface[];
  searchBar: string;


  // User Actions
  fetchUserById: (userId: number) => Promise<UserInterface | null>;
  updateUserProfile: (updatedUser: UserInterface) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;

  // Product Actions
  fetchProducts: () => Promise<void>;
  setFilteredProductList: (searchResult: ProductInterface[]) => void;
  fetchProductById: (productId: number) => Promise<ProductInterface | null>;
  fetchProductsByCategory: (categoryName: string) => Promise<ProductInterface[]>;
  fetchAllProductColorsByName: (productName: string, currentProductId: string) => Promise<ProductInterface[] | null>;
  setSearchBar: (searchInput: string) => void;

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
  removeFromWishlist: (userId: number, wishlistItemId: number) => Promise<void>;
  clearWishlist: (userId: number) => Promise<void>;

  // Cart Actions
  fetchCartByUserId: () => Promise<CartInterface | null>;
  addItemToCart: (productId: number, quantity: number) => Promise<void>;
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
  fetchUserById: async (userId: number): Promise<UserInterface | null> => {
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

  deleteUser: async (userId: number): Promise<void> => {
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
      
      const response = await axiosInstance.get(`${API_URL}/wishlist/user/${userId}`);
      
      set({ wishlist: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw error;
    }
  },

  addToWishlist: async (userId: number, productId: number): Promise<void> => {
    try {
      const response = await axiosInstance.post(`${API_URL}/wishlist/user/${userId}/product/${productId}`);

      set((state) => ({
        wishlist: [...state.wishlist, response.data],
      }));
      console.log("added to wishlist")
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      throw error;
    }
  },
  
  removeFromWishlist: async (userId: number, wishlistItemId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/wishlist/${userId}/${wishlistItemId}`);
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== wishlistItemId),
      }));
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      throw error;
    }
  },

  clearWishlist: async (userId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/wishlist/user/${userId}/clear`);
      set({ wishlist: [] });
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      throw error;
    }
  },





// Cart Actions
fetchCartByUserId: async (): Promise<CartInterface | null> => {
  const user = useAuthState.getState().user;

    if (!user) {
      console.log('User is not authenticated');
      return null;
    }

    try {
      const response = await axiosInstance.get(`${API_URL}/cart/${user.id}`);
      set({ cart: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },

  addItemToCart: async ( productId: number, quantity: number): Promise<void> => {
    const user = useAuthState.getState().user;

    if (!user) {
      console.log('User is not authenticated');
      return;
    }

    try {
        const response = await axiosInstance.post(`${API_URL}/cart/${user.id}/add/${productId}/${quantity}`);
        set({ cart: response.data }); 
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
    }
},

  
  removeItemFromCart: async (cartItemId: number): Promise<void> => {
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
  
  editProduct: async (productId: number, productDetails: ProductInterface): Promise<void> => {
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
  
  deleteProduct: async (productId: number): Promise<void> => {
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
