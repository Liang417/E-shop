import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from '../../apiConfig';

export const loadSeller = createAsyncThunk('seller/loadSeller', async () => {
  try {
    const { data } = await axios.get(`${apiURL}/shop/getSeller`, { withCredentials: true });
    return data.seller;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  error: null,
  seller: null,
};

export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSeller.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadSeller.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.seller = action.payload;
    });
    builder.addCase(loadSeller.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearErrors } = sellerSlice.actions;

export default sellerSlice.reducer;
