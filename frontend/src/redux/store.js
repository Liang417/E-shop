import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice.js';
import sellerReducer from './slice/sellerSlice.js';
import productReducer from './slice/productSlice.js';
import eventReducer from './slice/eventSlice.js';
import cartReducer from './slice/cartSlice.js';
import wishListReducer from './slice/wishListSlice.js';
import orderReducer from './slice/orderSlice.js';

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
    cart: cartReducer,
    wishList: wishListReducer,
    order: orderReducer,
  },
});

export default Store;
