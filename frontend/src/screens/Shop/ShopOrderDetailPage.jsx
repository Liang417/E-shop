import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import Footer from '../../components/Layout/Footer';
import ShopOrderDetail from '../../components/Shop/ShopOrderDetail.jsx';

const ShopOrderDetailPage = () => {
  return (
    <div>
      <DashboardHeader />
      <ShopOrderDetail />
      <Footer />
    </div>
  );
};

export default ShopOrderDetailPage;
