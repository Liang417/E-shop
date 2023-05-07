import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import sellerReducer from './sellerSlice.js';

const Store = configureStore({
  reducer: { user: userReducer, seller: sellerReducer },
});

export default Store;
