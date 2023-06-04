import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import ShopInfo from '../../components/Shop/ShopInfo.jsx';
import ShopProfileData from '../../components/Shop/ShopProfileData.jsx';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopProfilePage = () => {
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (seller && seller._id === id) setIsOwner(true);
  }, []);

  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full sm:flex py-5">
        <div className="w-[100%] sm:w-[25%] lg:w-[40%] sm:min-w-[320px] min-h-[90vh] max-h-[90vh] mr-5 sm:sticky sm:top-10 sm:left-0 sm:z-10 bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll mb-5">
          <ShopInfo isOwner={isOwner} />
        </div>
        <div className="w-[100%] sm:w-[70%] rounded-[4px]">
          <ShopProfileData />
        </div>
      </div>
    </div>
  );
};

export default ShopProfilePage;
