import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllProducts from '../../components/Shop/AllProducts';

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex">
        <div className="w-[50px] 800px:w-[250px] 800px:min-w-[185px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-[90%] 800px:w-[78%] xl:w-[100%]">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
