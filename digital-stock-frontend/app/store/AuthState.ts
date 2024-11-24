import { create } from 'zustand';
import { UserInterface } from '../Types';
import axios from 'axios';
import { API_URL } from "./config/config";


interface AuthState {
  user: UserInterface | null;
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  registerUser: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthState = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  signIn: async (username, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/signin`,
        { username, password },
        { withCredentials: true } 
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
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
  

  fetchUser: async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/fetchUser`, {
        withCredentials: true, 
      });
  
      debugger
      set({
        user: response.data,
        isAuthenticated: true,
      });
      debugger
    } catch (error) {
      console.error('Error fetching user:', error);
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
  
}));
