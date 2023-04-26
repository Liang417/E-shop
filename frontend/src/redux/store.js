import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';

const Store = configureStore({
  reducer: { user: userReducer },
});

export default Store;
