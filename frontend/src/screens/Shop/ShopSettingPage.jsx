import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import ShopSetting from '../../components/Shop/ShopSetting.jsx'

const ShopSettingPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start w-full">
        <div className="w-[50px] 800px:w-[330px] sticky top-20">
          <DashboardSideBar active={11} />
        </div>
        <ShopSetting />
      </div>
    </div>
  );
};

export default ShopSettingPage;
