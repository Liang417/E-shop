import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllEvents from '../../components/Shop/AllEvents.jsx';

const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex">
        <div className="w-[50px] 800px:w-[250px] 800px:min-w-[185px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-[90%] 800px:w-[78%] xl:w-[100%]">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEvents;
