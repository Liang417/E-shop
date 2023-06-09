import React from 'react';
import styles from '../../styles/styles';
import CountDown from './CountDown.jsx';
import { Link } from 'react-router-dom';
import { backendURL } from '../../apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/slice/cartSlice';

const EventCard = ({ data }) => {
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = carts && carts.find((item) => item._id === data?._id);
    if (isItemExists) {
      toast.error('This product already in the cart😮');
    } else {
      toast.success('Product added to cart successfully👍');
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
    }
  };

  return (
    <div
      className="w-[95%] flex flex-col lg:flex-row items-center bg-white rounded-lg shadow p-2 
          mx-auto"
    >
      <div className="w-[80%] md:w-[50%] mx-3 flex justify-center">
        <img src={`${backendURL}/${data?.images[0]}`} alt="" className="object-cover p-2" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center p-5">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p className="whitespace-pre-wrap py-2">{data?.description}</p>
        <div className="flex py-2 justify-between items-center">
          <span className="font-[600] text-[22px] text-[#44a55e] ">{data?.sold_out} sold</span>
          <div className="">
            <h5 className="font-[500] text-[20px] text-[#d55b35] line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>
        </div>
        <CountDown data={data} />
        <div className="flex items-center justify-end">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div
              className={`${styles.button} text-[#fff] hover:text-yellow-300 hover:bg-opacity-80`}
            >
              See Details
            </div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5 hover:text-yellow-300 hover:bg-opacity-80`}
            onClick={() => {
              addToCartHandler(data);
            }}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
