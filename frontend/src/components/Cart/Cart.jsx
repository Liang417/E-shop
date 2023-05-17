import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoBagHandleOutline } from 'react-icons/io5';
import CartCard from './CartCard';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cart = ({ setOpenCart }) => {
  const { carts } = useSelector((state) => state.cart);

  const totalPrice = carts.reduce(
    (acc, item) => acc + item.qty * (item.discountPrice || item.originalPrice),
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-full sm:w-[55%] lg:w-[40%] xl:w-[30%]  bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {carts && carts.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-5">
              <AiOutlineCloseCircle
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart is empty</h5>
          </div>
        ) : (
          <>
            <div>
              {/* Item length */}
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">{carts.length} Items</h5>
                <AiOutlineCloseCircle
                  size={25}
                  className="fixed right-6 cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>

              {/* Cart single items */}
              <div className="w-full border-t">
                {carts && carts.map((item, index) => <CartCard key={index} data={item} />)}
              </div>
            </div>
            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD$ {totalPrice.toLocaleString()})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
