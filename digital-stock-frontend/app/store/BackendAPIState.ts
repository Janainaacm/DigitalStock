import { create } from "zustand";
import axios from "axios";
import { API_URL } from "./config/config";
import {
  ProductInterface,
  CategoryInterface,
} from "../Types";
import { useAuthState } from "./AuthState";

interface AppState {
  productList: ProductInterface[];
  allProductVariants: ProductInterface[];
  filteredProductList: ProductInterface[];
  product: ProductInterface | null;
  categories: CategoryInterface[];
  searchBar: string;

  // Product Actions
  fetchProducts: () => Promise<void>;
  setFilteredProductList: (searchResult: ProductInterface[]) => void;
  fetchProductById: (productId: number) => Promise<ProductInterface | null>;
  fetchProductsByCategory: (
    categoryName: string
  ) => Promise<ProductInterface[]>;
  fetchAllProductColorsByName: (
    productName: string,
    currentProductId: string
  ) => Promise<ProductInterface[] | null>;
  setSearchBar: (searchInput: string) => void;
}

export const useAppState = create<AppState>((set) => ({
  productList: [],
  allProductVariants: [],
  filteredProductList: [],
  product: null,
  categories: [],
  searchBar: "",

  // Product Actions
fetchProducts: async (): Promise<void> => {
  try {
    console.log("Fetching products...");

    const response = await axios.get(`${API_URL}/products`);
    const products: ProductInterface[] = response.data;

    const user = useAuthState.getState().user;
    const wishlist = useAuthState.getState().wishlist;
    console.log("user: ", user);
    console.log("Wishlist: ", wishlist);

    if (user && wishlist) {
      const wishlistProductIds = new Set(wishlist.items.map((item) => item.product.id));

      const updatedProducts: ProductInterface[] = products.map((product) => ({
        ...product,
        isInWishlist: wishlistProductIds.has(product.id),
      }));

      set({
        productList: updatedProducts,
      });

      console.log("Products updated with wishlist status.");
    } else {
      set({
        productList: products,
      });

      console.log("Products fetched without user-specific updates.");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
},


  setFilteredProductList: async (searchResult: ProductInterface[]) => {
    set({
      filteredProductList: searchResult,
    });
  },

  fetchProductById: async (
    productId: number
  ): Promise<ProductInterface | null> => {
    try {
      const response = await axios.get(`${API_URL}/products/id/${productId}`);
      set({ product: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  },

  fetchProductsByCategory: async (
    categoryName: string
  ): Promise<ProductInterface[]> => {
    try {
      const response = await axios.get(
        `${API_URL}/products/category/${categoryName}`
      );
      set({ productList: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  fetchAllProductColorsByName: async (
    productName: string,
    colorName: string
  ): Promise<ProductInterface[] | null> => {
    try {
      const response = await axios.get(
        `${API_URL}/products/name/${productName}/colors`
      );
      const allColors = response.data;
      console.log("All Colors:", allColors);
      console.log("Current colorName:", colorName);

      const sendBackList = allColors.filter(
        (p: ProductInterface) => p.colorName !== colorName
      );
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
      searchBar: searchInput,
    });
  },
}));
