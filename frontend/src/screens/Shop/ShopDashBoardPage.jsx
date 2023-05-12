import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.jsx';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.jsx';
import DashboardHero from '../../components/Shop/Layout/DashboardHero.jsx';

const ShopDashBoardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[50px] 800px:w-[330px] sticky top-20">
          <DashboardSideBar active={1} />
        </div>
        <DashboardHero />
      </div>
    </div>
  );
};

export default ShopDashBoardPage;
