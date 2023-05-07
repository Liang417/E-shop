import React, { useEffect } from 'react';
import Login from '../components/Auth/Login.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full h-screen bg-gray-50">
      <Login />
    </div>
  );
};

export default LoginPage;
