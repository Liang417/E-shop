import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import UserOrderDetail from '../components/Order/UserOrderDetail.jsx';

const UserOrderDetailPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-10 800px:mt-5">
        <UserOrderDetail />
      </div>
      <Footer />
    </div>
  );
};

export default UserOrderDetailPage;
