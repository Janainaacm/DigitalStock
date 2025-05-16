import { create } from 'zustand';
import { CartInterface, OrderInterface, UserInterface, WishlistInterface } from '../utils/Types';
import axios from 'axios';
import { API_URL } from "./config/config";
import axiosInstance from './config/axiosConfig';
import Cookies from "js-cookie";

interface AuthState {
  user: UserInterface | null;
  wishlist: WishlistInterface | null;
  orders: OrderInterface[];
  cart: CartInterface | null;
  isAuthenticated: boolean;

  adminAuthCheck: () => Promise<boolean>;
  userAuthCheck: () => Promise<boolean>;

  initializeState: () => void; 
  signIn: (username: string, password: string) => Promise<void>;
  registerUser: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<UserInterface | null> ;
  verifyPassword: (password: string) => Promise<boolean>;
  getUserRoleFromToken: () => Promise<string[]>;
}


export const useAuthState = create<AuthState>((set) => ({
  user: null,
  wishlist: null,
  orders: [],
  cart: null,
  isAuthenticated: false,


  adminAuthCheck: async(): Promise<boolean> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/auth/admin-auth-check`, {
        withCredentials: true,
      });
      
      return response.data;
    } catch {
      return false;
    }
  },

  userAuthCheck: async(): Promise<boolean> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/auth/user-auth-check`, {
        withCredentials: true,
      });
      
      return response.data;
    } catch {
      return false;
    }
  },

  initializeState: async () => {
    const user = await useAuthState.getState().fetchUser();
  
    if (user) {
      console.log("User found and state initialized.");
    } else {
      console.log("No user found. State remains unauthenticated.");
    }
  },
  
  

  signIn: async (username, password) => {
    try {
       await axiosInstance.post(
        `${API_URL}/auth/signin`,
        { username, password },
      );
  
      await useAuthState.getState().fetchUser();
  
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Failed to sign in. Please check your credentials.');
      throw error;
    }
  },
  
  

  registerUser: async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
      });
  
      alert(response.data.message || 'User registered successfully!');
  
      await useAuthState.getState().signIn(username, password);
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user. Please check the details and try again.');
    }
  },
  

  logout: async () => {
    try {
      await axiosInstance.post(`${API_URL}/auth/logout`);
      set({ user: null, isAuthenticated: false });

      Cookies.remove("user");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
  

  fetchUser: async (): Promise<UserInterface | null> => {
  try {
    const response = await axiosInstance.get(`${API_URL}/auth/fetchUser`);
    const user = response.data;

    set({
      user,
      wishlist: user.wishlist || null,
      orders: user.orders || [],
      cart: user.cart || null,
      isAuthenticated: true,
    });

    console.log(user)

    Cookies.set("user", JSON.stringify(user));

    return user;
  } catch (error) {
    console.log(error)
    return null;
  }
},

verifyPassword: async (password: string): Promise<boolean> => {
  const userId = useAuthState.getState().user?.id;

  if (!userId) {
    console.error("User ID not found.");
    return false;
  }

  try {
    const response = await axiosInstance.put(`${API_URL}/auth/verifyPassword`, {
      userId,
      password,
    });

    return response.data === true;
  } catch (error) {
    console.log(error)
    return false;
  }
},

getUserRoleFromToken: async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get(`${API_URL}/auth/role`);

    const roles = response.data;

    if (!roles || roles.length === 0) {
      console.warn('No roles found for the given token.');
      return [];
    }

    return roles;
  } catch (error) {
    console.error('Error fetching roles from token:', error);
    return [];
  }
},


  
}));
