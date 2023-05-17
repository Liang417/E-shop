import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
} from './routes/Routes.js';
import {
  ShopSignupPage,
  ShopActivationPage,
  ShopLoginPage,
  ShopProfilePage,
  ShopDashBoardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvent,
  ShopAllEvents,
  ShopAllCoupons,
} from './routes/ShopRoutes';
import { UserProtectedRoute, ShopProtectedRoute } from './routes/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/slice/userSlice';
import { loadSeller } from './redux/slice/sellerSlice';
import { getAllProducts } from './redux/slice/productSlice';
import { getAllEvents } from './redux/slice/eventSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
    dispatch(getAllProducts());
    dispatch(getAllEvents());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/FAQ" element={<FAQPage />} />

        {/* user routes */}
        <Route path="/user/login" element={<LoginPage />}></Route>
        <Route path="/user/sign-up" element={<SignupPage />}></Route>
        <Route path="/user/activation/:activation_token" element={<ActivationPage />} />
        <Route
          path="/user/profile"
          element={
            <UserProtectedRoute>
              <ProfilePage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/user/checkout"
          element={
            <UserProtectedRoute>
              <CheckoutPage />
            </UserProtectedRoute>
          }
        />

        {/* shop routes */}
        <Route path="/shop/sign-up" element={<ShopSignupPage />} />
        <Route path="/shop/login" element={<ShopLoginPage />} />
        <Route path="/shop/activation/:activation_token" element={<ShopActivationPage />} />
        <Route
          path="/shop/profile/:id"
          element={
            <ShopProtectedRoute>
              <ShopProfilePage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/shop/dashboard"
          element={
            <ShopProtectedRoute>
              <ShopDashBoardPage />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/shop/dashboard-create-product"
          element={
            <ShopProtectedRoute>
              <ShopCreateProduct />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/shop/dashboard-products"
          element={
            <ShopProtectedRoute>
              <ShopAllProducts />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/shop/dashboard-create-event"
          element={
            <ShopProtectedRoute>
              <ShopCreateEvent />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/shop/dashboard-events"
          element={
            <ShopProtectedRoute>
              <ShopAllEvents />
            </ShopProtectedRoute>
          }
        />
        <Route
          path="/shop/dashboard-coupons"
          element={
            <ShopProtectedRoute>
              <ShopAllCoupons />
            </ShopProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
