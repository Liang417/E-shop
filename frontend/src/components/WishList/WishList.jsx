import React from 'react';
import { AiOutlineCloseCircle, AiOutlineHeart } from 'react-icons/ai';
import WishListCard from './WishListCard';
import styles from '../../styles/styles';
import { useSelector } from 'react-redux';

const WishList = ({ setOpenCart }) => {
  const { wishLists } = useSelector((state) => state.wishList);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-full sm:w-[55%] lg:w-[40%] xl:w-[30%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {wishLists && wishLists.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <AiOutlineCloseCircle
              size={25}
              className="fixed top-4 right-6 cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
            <h5 className='text-xl'>Empty</h5>
          </div>
        ) : (
          <div>
            {/* Item length */}
            <div className={`${styles.normalFlex} p-4 `}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">{wishLists.length} items</h5>
              <AiOutlineCloseCircle
                size={25}
                className="fixed right-6 cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>

            {/* WishList single items */}
            <div className="w-full border-t">
              {wishLists &&
                wishLists.map((item, index) => <WishListCard key={index} data={item} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
