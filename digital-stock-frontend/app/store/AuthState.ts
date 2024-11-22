import { create } from "zustand";
import axios from "axios";
import { UserInterface } from "../Types";
import { API_URL } from "./config/config";


interface AuthState {
  user: UserInterface | null;
  token: string | null;

  signIn: (username: string, password: string) => Promise<UserInterface | void>;
  registerUser: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthState = create<AuthState>((set) => ({
  user: null,
  token: null,

  signIn: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        username,
        password,
      });
  
      const user: UserInterface = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles,
        userWishlist: response.data.userWishlist || [],
        userOrders: response.data.userOrders || [],
        cart: response.data.cart || null,
      };
  
      
      set({ 
        user, 
        token: `${response.data.tokenType} ${response.data.accessToken}` 
      });

      window.location.href = "/"; 

      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in. Please check your credentials.");
      throw error;
    }
  },
  
  

  registerUser: async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });

      alert(response.data.message || "User registered successfully!");

      await useAuthState.getState().signIn(username, password);

    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register user. Please check the details and try again.");
    }
  },



  logout: async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
      set({ user: null, token: null }); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },
  
}));
