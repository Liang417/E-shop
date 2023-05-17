import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import CreateEvent from '../../components/Shop/CreateEvent.jsx';

const ShopCreateEvent = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-start justify-between ">
        <div className="w-[50px] 800px:w-[330px] sticky top-20">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvent;
