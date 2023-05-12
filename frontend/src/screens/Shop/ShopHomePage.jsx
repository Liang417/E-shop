import React from 'react';
import styles from '../../styles/styles'
import ShopInfo from '../../components/Shop/ShopInfo.jsx';
import ShopProfileData from '../../components/Shop/ShopProfileData.jsx';

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full sm:flex py-10 justify-between">
        <div className="w-[100%] sm:h-[90vh] mb-5 sm:w-[28%] sm:sticky sm:top-10 sm:left-0 sm:z-10 bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll ">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[100%] sm:w-[70%] rounded-[4px]">
          <ShopProfileData />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
