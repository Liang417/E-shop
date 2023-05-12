import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import ShopSignup from '../../components/Shop/ShopSignup.jsx';
import { useSelector } from 'react-redux';

const ShopSignupPage = () => {
  const { isAuthenticated } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/shop/dashboard');
    }
  }, [isAuthenticated]);
  
  return (
    <div>
      <ShopSignup />
    </div>
  );
};

export default ShopSignupPage;
