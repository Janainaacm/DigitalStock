import axios from 'axios';
import { useAuthState } from '../AuthState'; 
import { API_URL } from "./config";

const getToken = () => {
  const state = useAuthState(); 
  return state.token;
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
