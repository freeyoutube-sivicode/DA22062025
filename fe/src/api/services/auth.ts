import { LoginCredentials, RegisterData, User } from '../types';
import { api } from "../index";

export const authService = {
  // login: async (credentials: LoginCredentials) => {
  //   const response = await api.post('/nguoi-dung/login', credentials);
  //   localStorage.setItem('token', response.data.token);
  //   localStorage.setItem('userId', response.data.user._id); // Save user ID here
  //   return response.data.user;
  // },

  register: async (data: RegisterData) => {
    const response = await api.post('/nguoi-dung/register', data);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.user._id); // Save user ID here
    return response.data.user;
  },

  logout: async () => {
    await api.post('/nguoi-dung/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Also remove user ID
  },

  getCurrentUser: async (userId: string, data: Partial<User>) => {
    const response = await api.put(`/nguoi-dung/${userId}`, data);
    return response.data;
  },

  updateProfile: async (userId: string, data: Partial<User>) => {
    const response = await api.put(`/nguoi-dung/${userId}`, data);
    return response.data;
  },
}; 