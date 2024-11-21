import { create } from "zustand";
import axios from "axios";
import { UserInterface } from "../Types";

interface AuthState {
  user: UserInterface | null;

  signIn: (username: string, password: string) => Promise<UserInterface | void>;
  registerUser: (username: string, email: string, password: string) => Promise<void>;
}

export const useAuthState = create<AuthState>((set) => ({
  user: null,

  signIn: async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/signin", {
        username,
        password,
      });
  
      const user: UserInterface = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles,
        token: `${response.data.tokenType} ${response.data.accessToken}`,
        userWishlist: response.data.userWishlist || [], 
        userOrders: response.data.userOrders || [], 
        cart: response.data.cart || null,
      };
  
      set({ user });
      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in. Please check your credentials.");
    }
  },
  

  registerUser: async (username, email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        username,
        email,
        password,
      });

      alert(response.data.message || "User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register user. Please check the details and try again.");
    }
  },
}));
