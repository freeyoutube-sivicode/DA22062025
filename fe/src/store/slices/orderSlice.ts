import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../api/types';

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<{ id: string; status: 'pending' | 'confirmed' | 'completed' | 'cancelled' }>) => {
      const order = state.orders.find(order => order._id === action.payload.id);
      if (order) {
        order.Status = action.payload.status;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setOrders,
  addOrder,
  updateOrder,
  setLoading,
  setError,
} = orderSlice.actions;

export default orderSlice.reducer; 