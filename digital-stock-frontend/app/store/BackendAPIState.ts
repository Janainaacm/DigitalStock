import { create } from "zustand";
import axios from "axios";
import { API_URL } from "./config/config";
import { ProductInterface, CategoryInterface } from "../utils/Types";
import { useAuthState } from "./AuthState";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AppState {
  productList: ProductInterface[];
  displayProducts: ProductInterface[];
  allProductVariants: ProductInterface[];
  filteredProductList: ProductInterface[];
  product: ProductInterface | null;
  categories: CategoryInterface[];
  searchBar: string;
  chosenCategory: string;
  productId: number | null;
  searchKeyword: string;
  isAuthOpen: boolean;

  setIsAuthOpen: (isOpen: boolean) => void;
  selectProduct: (product: ProductInterface) => void;
  fetchDisplayProducts: () => void;
  fetchAllProducts: () => Promise<void>;
  fetchAllCategories: () => Promise<void>;
  fetchProductsBySearch: () => Promise<void>;
  setFilteredProductList: (searchResult: ProductInterface[]) => void;
  fetchProductById: (productId: number) => Promise<ProductInterface | null>;
  fetchProductsByCategory: (
    categoryName: string,
    router: AppRouterInstance
  ) => Promise<void>;
  fetchAllProductColorsByName: (
    productName: string
  ) => Promise<ProductInterface[] | null>;
  setSearchBar: (searchInput: string) => void;
  setChosenCategory: (categoryName: string) => void;
  setSearchKeyword: (keyword: string) => void;
}

export const useAppState = create<AppState>((set) => ({
  productList: [],
  displayProducts: [],
  allProductVariants: [],
  filteredProductList: [],
  product: null,
  categories: [],
  searchBar: "",
  chosenCategory: "",
  productId: null,
  searchKeyword: "",
  isAuthOpen: false,

  
  setIsAuthOpen: (isOpen: boolean) => {
    set({
      isAuthOpen: isOpen,
    });
  },

  selectProduct: (product: ProductInterface) => {
    set({
      product: product,
    });
  },

  fetchDisplayProducts: () => {
    const { productList, filteredProductList } = useAppState.getState();

    const user = useAuthState.getState().user;
    const wishlist = useAuthState.getState().wishlist;

    if (filteredProductList.length === 0) {
      console.log("filteredProductList is 0");

      if (user && wishlist) {
        const wishlistProductIds = new Set(
          wishlist.items.map((item) => item.product.id)
        );

        const updatedProducts: ProductInterface[] = productList.map(
          (product) => ({
            ...product,
            isInWishlist: wishlistProductIds.has(product.id),
          })
        );

        set({
          displayProducts: updatedProducts,
        });
      } else {
        set({
          displayProducts: productList,
        });
      }
    } else {
      console.log("filteredProductList is:", filteredProductList);
      if (user && wishlist) {
        const wishlistProductIds = new Set(
          wishlist.items.map((item) => item.product.id)
        );

        const updatedProducts: ProductInterface[] = filteredProductList.map(
          (product) => ({
            ...product,
            isInWishlist: wishlistProductIds.has(product.id),
          })
        );

        set({
          displayProducts: updatedProducts,
        });
      } else {
        set({
          displayProducts: filteredProductList,
        });
      }
    }
  },

  fetchAllProducts: async (): Promise<void> => {
    try {
      console.log("Fetching products...");

      const response = await axios.get(`${API_URL}/products`);

      set({
        productList: response.data,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  fetchAllCategories: async (): Promise<void> => {
    try {
      const response = await axios.get(`${API_URL}/products/categories`);

      set({
        categories: response.data,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  fetchProductsBySearch: async (): Promise<void> => {},

  setFilteredProductList: (searchResult: ProductInterface[]) => {
    set({
      filteredProductList: searchResult,
    });
    console.log(
      "filtered list after problem: ",
      useAppState.getState().filteredProductList
    );
  },

  fetchProductById: async (
    productId: number
  ): Promise<ProductInterface | null> => {
    try {
      const response = await axios.get(`${API_URL}/products/id/${productId}`);
      set({ product: response.data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  },

  fetchProductsByCategory: async (
    categoryName: string,
    router: AppRouterInstance
  ): Promise<void> => {
    try {
      const response = await axios.get(
        `${API_URL}/products/category/${categoryName}`
      );

      set((state) => ({
        ...state,
        filteredProductList: response.data,
        chosenCategory: categoryName,
        searchKeyword: categoryName,
      }));
      console.log(
        "filtered productList: ",
        useAppState.getState().filteredProductList
      );

      router.push("/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  fetchAllProductColorsByName: async (
    productName: string
  ): Promise<ProductInterface[] | null> => {
    try {
      const response = await axios.get(
        `${API_URL}/products/name/${productName}/colors`
      );

      set({ allProductVariants: response.data });

      return response.data;
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

  setChosenCategory: (categoryName: string) => {
    set({
      chosenCategory: categoryName,
    });
  },

  setSearchKeyword: (keyword: string) => {
    set({
      searchKeyword: keyword,
    });
  },
}));
