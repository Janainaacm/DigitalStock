import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from './config';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('your_cookie_name'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
