import React, { useEffect, useState } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/styles';
import { backendURL } from '../../apiConfig';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slice/cartSlice';
import { addToWishList, removeFromWishList } from '../../redux/slice/wishListSlice';

const ProductPreviewCard = ({ setOpen, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cart);
  const { wishLists } = useSelector((state) => state.wishList);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('bg-[#00000030]')) {
      setOpen(false);
    }
  };

  const incrementCount = () => {
    if (count + 1 > data.stock) {
      toast.error('Maximum stock🥲');
    } else {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addToCartHandler = (id) => {
    const isItemExists = carts && carts.find((item) => item._id === id);
    if (isItemExists) {
      toast.error('This product already in the cart😮');
    } else {
      const cartData = { ...data, qty: count };
      dispatch(addToCart(cartData));
      toast.success('Product added to cart successfully👍');
    }
  };

  const wishListHandler = (data) => {
    const isItemExists = wishLists && wishLists.find((item) => item._id === data._id);
    setClick(!click);
    if (isItemExists) {
      dispatch(removeFromWishList(data));
    } else {
      dispatch(addToWishList(data));
    }
  };

  useEffect(() => {
    if (data && wishLists && wishLists.find((item) => item._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishLists]);

  return (
    <div className="bg-[#fff] cursor-auto">
      {data ? (
        <div
          className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center "
          onClick={handleClickOutside}
        >
          <div className="w-[90%] 800px:w-[80%] h-[90vh] 800px:h-[80vh] bg-white rounded-md shadow-sm relative overflow-y-scroll p-4 mt-10 800px:mt-0">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 hover:cursor-pointer hover:text-red-500"
              onClick={() => setOpen(false)}
            />
            {/*Left side */}
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] pt-5">
                <div className="flex items-center justify-center">
                  <img
                    src={`${backendURL}/${data.images[0]}`}
                    alt="product_img"
                    className="w-[80%] object-cover"
                  />
                </div>

                <div className="flex items-center justify-evenly">
                  <div className="flex items-center">
                    <Link to={`/shop/profile/${data.shop._id}`}>
                      <img
                        src={`${backendURL}/${data.shop.avatar}`}
                        alt=""
                        className="w-[50px] h-[50px] border border-black rounded-full mr-2"
                      />
                    </Link>
                    <div>
                      <Link to={`/shop/profile/${data.shop._id}`}>
                        <h3 className={`${styles.shop_name} text-center`}>{data.shop.name}</h3>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`${styles.button} text-[#fff] bg-[#000] mt-4 rounded-[4px] h-11 hover:text-yellow-300 hover:bg-opacity-80`}
                    onClick={() => navigate(`/user/profile?inbox=true`)}
                  >
                    <span className="flex items-center ">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>

                  <div className="flex justify-end mr-8">
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => wishListHandler(data)}
                        color={click ? 'red' : '#333'}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => wishListHandler(data)}
                        color={click ? 'red' : '#333'}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* Right side */}
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>{data.name}</h1>
                <p className="whitespace-pre-line">{data.description}</p>

                <div className="flex pt-6 mr-5 justify-end">
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + '$' : null}
                  </h3>
                  <h4 className={`${styles.productDiscountPrice}`}>{data.discountPrice}$</h4>
                </div>

                <div className="flex justify-end mr-5">
                  <div className="flex items-center mt-5 justify-between pr-3">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l w-10 h-10 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">{count}</span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r w-10 h-10 shadow-lg hover:opacity-75 transition duration-300 ease-in-out "
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-end mr-5">
                  <div
                    className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center justify-end text-[#fff] hover:text-yellow-300 hover:bg-opacity-80 `}
                    onClick={() => {
                      addToCartHandler(data._id);
                    }}
                  >
                    <span className="flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductPreviewCard;
