import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import DashboardMessage from '../../components/Shop/DashboardMessage.jsx';

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex">
        <div className="w-[50px] 800px:w-[250px] 800px:min-w-[185px]">
          <DashboardSideBar active={8} />
        </div>
        <DashboardMessage />
      </div>
    </div>
  );
};

export default ShopInboxPage;
