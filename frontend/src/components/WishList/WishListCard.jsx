import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { BsCartPlus } from 'react-icons/bs';
import { backendURL } from '../../apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishList } from '../../redux/slice/wishListSlice';
import { addToCart } from '../../redux/slice/cartSlice';
import { toast } from 'react-toastify';

const WishListCard = ({ data }) => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromWishListHandler = (data) => {
    dispatch(removeFromWishList(data));
  };

  const addToCartHandler = (data) => {
    const isItemExists = carts && carts.find((item) => item._id === data._id);
    if (isItemExists) {
      toast.error('This product already in the cart😮');
    } else {
      toast.success('Product added to cart successfully👍');
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
    }
  };

  return (
    <div className="border-b px-3 py-2">
      <div className="w-full h-[100px] flex items-center">
        <div>
          <RxCross1 className="cursor-pointer" onClick={() => removeFromWishListHandler(data)} />
        </div>
        <img src={`${backendURL}/${data.images[0]}`} alt="" className="w-[80px] h-[80px] ml-2" />

        <div className="max-w-[270px] ml-3">
          <h1 className="">{data.name.length > 70 ? data.name.slice(0, 70) + '...' : data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US$ {data.discountPrice || data.originalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            className="cursor-pointer text-[20px]"
            title="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
