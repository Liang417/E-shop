import React from 'react';
import styles from '../../styles/styles';

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex">
        <div className={`${styles.normalFlex}`}>
          <div className={`${styles.cart_button}`}>
            <span className={`${styles.cart_button_text} `}>1.Shipping</span>
          </div>
          <div
            className={`${
              active > 1 ? '!bg-[#f63b60]' : '!bg-[#FDE1E6]'
            } w-[30px] 800px:w-[70px] h-[4px]`}
          ></div>
        </div>

        <div className={`${styles.normalFlex}`}>
          <div className={`${active > 1 ? '' : '!bg-[#FDE1E6]'} ${styles.cart_button}`}>
            <span className={`${active > 1 ? '' : '!text-[#f63b60]'} ${styles.cart_button_text}`}>
              2.Payment
            </span>
          </div>
          <div
            className={`${
              active > 3 ? '!bg-[#f63b60]' : '!bg-[#FDE1E6]'
            } w-[30px] 800px:w-[70px] h-[4px]`}
          ></div>
        </div>

        <div className={`${styles.normalFlex}`}>
          <div className={`${active > 2 ? '' : '!bg-[#FDE1E6]'} ${styles.cart_button}`}>
            <span className={`${active > 2 ? '' : '!text-[#f63b60]'} ${styles.cart_button_text}`}>
              3.Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
