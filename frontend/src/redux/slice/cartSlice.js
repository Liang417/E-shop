import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addToCart = createAsyncThunk('cart/addToCart', async (data, { getState }) => {
  const state = getState();
  const { carts } = state.cart;
  const isItemExist = carts.find((cartItem) => cartItem._id === data._id);
  if (isItemExist) {
    return carts.map((cartItem) => (cartItem._id === data._id ? data : cartItem));
  } else {
    return [...carts, data];
  }
});

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (data, { getState }) => {
    const state = getState();
    const { carts } = state.cart;
    return carts.filter((cartItem) => cartItem._id !== data._id);
  }
);

const initialState = {
  carts: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.carts = action.payload;
        localStorage.setItem('cartItems', JSON.stringify(action.payload));
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.carts = action.payload;
        localStorage.setItem('cartItems', JSON.stringify(action.payload));
      });
  },
});

export default cartSlice.reducer;
