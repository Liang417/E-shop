import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import sellerReducer from './sellerSlice.js';
import productReducer from './productSlice.js';

const Store = configureStore({
  reducer: { user: userReducer, seller: sellerReducer, product: productReducer },
});

export default Store;
