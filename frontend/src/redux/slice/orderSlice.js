import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from '../../apiConfig';

// export const createProduct = createAsyncThunk('product/createProduct', async (newForm) => {
//   try {
//     const options = { headers: { 'Content-Type': 'multipart/form-data' } };
//     const data = await axios.post(`${apiURL}/product`, newForm, options);
//     return data.product;
//   } catch (err) {
//     throw new Error(err.response.data.message);
//   }
// });

export const getAllOrdersOfUser = createAsyncThunk('order/getAllOrdersOfUser', async (userId) => {
  try {
    const { data } = await axios.get(`${apiURL}/order/user/${userId}`);
    return data.user_orders;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const getAllOrdersOfShop = createAsyncThunk(
  'order/getAllOrdersOfShop',
  async (shopId) => {
    try {
      const { data } = await axios.get(`${apiURL}/order/shop/${shopId}`);
      return data.shop_orders;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
);

// export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
//   try {
//     const { data } = await axios.get(`${apiURL}/product/all`);
//     return data.products;
//   } catch (err) {
//     throw new Error(err.response.data.message);
//   }
// });

// export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
//   try {
//     const { data } = await axios.delete(`${apiURL}/product/${id}`, { withCredentials: true });
//     return data;
//   } catch (err) {
//     throw new Error(err.response.data.message);
//   }
// });

const initialState = {
  isLoading: true,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrdersOfUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOrdersOfUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user_orders = action.payload;
    });
    builder.addCase(getAllOrdersOfUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllOrdersOfShop.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOrdersOfShop.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shop_orders = action.payload;
    });
    builder.addCase(getAllOrdersOfShop.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
