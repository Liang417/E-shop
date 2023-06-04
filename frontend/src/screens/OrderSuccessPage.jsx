import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assests/animations/131018-order-confirmed.json';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { clearCart } from '../redux/slice/cartSlice';

const OrderSuccessPage = () => {
  const { isLoading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const style = {
    width: 500,
    height: 500,
  };

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  } else {
    return (
      <div>
        <Header />
        <div className="w-full h-screen 800px:h-[80%] flex items-center justify-center">
          <Lottie animationData={animationData} style={style} />
        </div>
        <Footer />
      </div>
    );
  }
};

export default OrderSuccessPage;
