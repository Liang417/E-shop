import React, { useEffect } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import Checkout from '../components/Checkout/Checkout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {
  const { carts } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    if (!carts.length > 0) {
      navigate('/', { replace: true });
    }
  }, [carts, navigate]);
  return (
    <div>
      <Header />
      <div className="mt-20 800px:mt-10">
        <CheckoutSteps active={1} />
      </div>
      <Checkout />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
