import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // Thay đổi base URL này nếu API của bạn có đường dẫn khác
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để đính kèm token vào mỗi request nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); 