import { create } from 'zustand';
import { CartInterface, OrderInterface, UserInterface, WishlistInterface } from '../Types';
import axios from 'axios';
import { API_URL } from "./config/config";
import axiosInstance from './config/axiosConfig';


interface AuthState {
  user: UserInterface | null;
  wishlist: WishlistInterface | null;
  orders: OrderInterface[];
  cart: CartInterface | null;

  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  registerUser: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}


export const useAuthState = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  wishlist: null,
  orders: [],
  cart: null,

  signIn: async (username, password) => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/auth/signin`,
        { username, password },
      );
     
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
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
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
  

  fetchUser: async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/auth/fetchUser`);
  
      const { data } = response;
  
      const {
        id,
        username,
        email,
        role,
        wishlist,
        orders,
        cart,
        firstName,
        lastName,
        phoneNo,
      } = data;
  
      set({
        user: {
          id,
          username,
          email,
          role,
          wishlist,
          orders,
          cart,
          firstName,
          lastName,
          phoneNo,
        }, 
        wishlist, 
        orders, 
        cart, 
        isAuthenticated: true, 
      });
    } catch (error) {
      console.error('Error fetching user:', error);
  
    }
  },
  
}));
