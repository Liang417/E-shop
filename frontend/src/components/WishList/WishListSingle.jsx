import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import {BsCartPlus} from "react-icons/bs";

const WishListSingle = ({ data }) => {
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" size={25}/>
        <img
          src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${data.price}
          </h4>
        </div>
        <div>
          <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart" />
        </div>
      </div>
    </div>
  );
};

export default WishListSingle;
