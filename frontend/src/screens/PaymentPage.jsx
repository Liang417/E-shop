import React, { useEffect } from 'react';
import Payment from '../components/Payment/Payment';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const { carts } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (!carts.length > 0) {
      navigate('/', { replace: true });
    }
  }, [carts, navigate]);

  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <div className="mt-20 800px:mt-10">
        <CheckoutSteps active={2} />
      </div>
      <Payment />
      <Footer />
    </div>
  );
};

export default PaymentPage;
