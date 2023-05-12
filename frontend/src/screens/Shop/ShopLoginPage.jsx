import React, { useEffect } from 'react';
import ShopLogin from '../../components/Shop/ShopLogin.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.seller);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/shop/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full h-screen bg-gray-50">
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
