import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.jsx';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.jsx';
import CreateProduct from '../../components/Shop/CreateProduct';

const ShopCreateProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-start justify-between ">
        <div className="w-[50px] 800px:w-[330px] sticky top-20">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full flex justify-center ">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
