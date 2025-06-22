import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Cart, CartItem } from '../../api/types';
import { cartService } from '../../api/services/cart';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching cart data
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCartItems();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.cart = null;
      });
  },
});

export const { clearCartState } = cartSlice.actions;

export default cartSlice.reducer; 