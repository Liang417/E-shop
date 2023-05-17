import React from 'react';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { backendURL } from '../../apiConfig';
import { addToCart, removeFromCart } from '../../redux/slice/cartSlice';
import { useDispatch } from 'react-redux';

const CartCard = ({ data }) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(data.qty);
  const totalPrice = ((data.discountPrice || data.originalPrice) * value).toLocaleString();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const increment = (data) => {
    if (data.stock <= value) {
      toast.error('Maximum stock🥲');
    } else {
      setValue(value + 1);
      const updateCart = { ...data, qty: value + 1 };
      dispatch(addToCart(updateCart));
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCart = { ...data, qty: value === 1 ? 1 : value - 1 };
    dispatch(addToCart(updateCart));
  };

  return (
    <div className="border-b px-2 pb-4">
      <div className="flex justify-end mt-2">
        <RxCross1
          className="cursor-pointer"
          size={16}
          onClick={() => {
            removeFromCartHandler(data);
          }}
        />
      </div>
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <div className="w-full text-center">{data.qty}</div>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${backendURL}/${data.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1 className="text-sm">{data.name}</h1>
          <h4 className="font-400 text-end text-gray-400">
            ${data.discountPrice || data.originalPrice} * {value}
          </h4>
          <h4 className="text-end font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US$ {totalPrice}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
