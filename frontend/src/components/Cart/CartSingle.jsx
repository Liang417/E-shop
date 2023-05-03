import React from 'react';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';


const CartSingle = ({ data }) => {
  const [value, setValue] = React.useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b px-4 pb-4">
      <div className="flex justify-end my-2">
        <RxCross1 className="cursor-pointer" size={16} onClick={() => {}} />
      </div>
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[7px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>

        <img
          src="https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838"
          alt=""
          className="w-[80px] h-[80px] ml-3 "
        />
        <div className="pl-[5px]">
          <h1 className="text-sm">{data.name}</h1>
          <h4 className="font-400 text-gray-400 pt-3">
            ${data.price} * {value}
          </h4>
          <h4 className="text-end font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CartSingle;
