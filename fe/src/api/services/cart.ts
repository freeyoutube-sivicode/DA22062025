import { Cart, CartItem } from '../types';
import { api } from "../index";

export const cartService = {
  getCartItems: async () => {
    const response = await api.get<Cart>('/gio-hang/');
    return response.data;
  },

  addToCart: async (productId: string, quantity: number) => {
    const response = await api.post<CartItem>('/gio-hang/items', {
      productId,
      quantity,
    });
    return response.data;
  },

  updateCartItem: async (itemId: string, quantity: number) => {
    const response = await api.put<CartItem>(`/gio-hang/items/${itemId}`, {
      quantity,
    });
    return response.data;
  },

  removeFromCart: async (itemId: string) => {
    await api.delete(`/gio-hang/items/${itemId}`);
  },
}; 