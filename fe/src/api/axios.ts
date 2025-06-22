import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || 'Có lỗi xảy ra';
    toast.error(message);
    return Promise.reject(error);
  }
);

export default axiosInstance; 