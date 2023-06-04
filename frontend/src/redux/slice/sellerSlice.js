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

export const updateSeller = createAsyncThunk('seller/updateSeller', async (updateData) => {
  try {
    const { data } = await axios.put(`${apiURL}/shop/update`, updateData, {
      withCredentials: true,
    });
    return { seller: data.seller, success: 'Update successfully🙂' };
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const updateSellerAvatar = createAsyncThunk('seller/updateSellerAvatar', async (avatar) => {
  try {
    const options = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
    const { data } = await axios.put(`${apiURL}/shop/update-avatar`, avatar, options);
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
    reset: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadSeller.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.seller = action.payload;
      })
      .addCase(loadSeller.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.seller = null;
        state.error = action.error.message;
      });
    builder
      .addCase(updateSellerAvatar.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(updateSellerAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.seller = action.payload;
      })
      .addCase(updateSellerAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(updateSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.seller = action.payload.seller;
        state.success = action.payload.success;
      })
      .addCase(updateSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { reset } = sellerSlice.actions;

export default sellerSlice.reducer;
