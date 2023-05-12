import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from '../apiConfig';

export const createProduct = createAsyncThunk('product/createProduct', async (newForm) => {
  try {
    const options = { headers: { 'Content-Type': 'multipart/form-data' } };
    const data = await axios.post(`${apiURL}/product`, newForm, options);
    return data.product;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const getAllProducts = createAsyncThunk('product/getAllProducts', async (id) => {
  try {
    const { data } = await axios.get(`${apiURL}/product/all/${id}`);
    return data.products;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
  try {
    const { data } = await axios.delete(`${apiURL}/product/${id}`, { withCredentials: true });
    return data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

const initialState = {
  isLoading: true,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.product = action.payload;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.message = action.payload;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.error = action.error.message;
    });
  },
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
