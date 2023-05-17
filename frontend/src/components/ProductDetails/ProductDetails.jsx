import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import ProductDetailInfo from './ProductDetailInfo';
import { backendURL } from '../../apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/slice/cartSlice';
import { addToWishList, removeFromWishList } from '../../redux/slice/wishListSlice';

const ProductDetails = ({ data }) => {
  const { carts } = useSelector((state) => state.cart);
  const { wishLists } = useSelector((state) => state.wishList);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();

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
    setSelect(0);
    if (data && wishLists && wishLists.find((item) => item._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishLists]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  return (
    <div className="bg-white text-sm">
      {data ? (
        <div className={`${styles.section} w-[90%] `}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] flex flex-col justify-center items-center">
                <div className="w-full flex items-center justify-center">
                  <img
                    className="w-[70%] "
                    src={`${backendURL}/${data && data.images[select]}`}
                    alt=""
                  />
                </div>
                <div className="w-[80%] flex items-center justify-start mt-3 overflow-x-auto">
                  {data &&
                    data.images.map((item, index) => (
                      <div
                        className={`${
                          select === index ? 'border-2 border-green-400' : 'border-2'
                        } cursor-pointer  mr-3`}
                        key={index}
                      >
                        <div className="w-[90px] h-[12vh]">
                          <img
                            src={`${backendURL}/${item}`}
                            alt=""
                            className="h-full w-full object-cover"
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle} leading-tight p-3 mb-2`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>{data.discountPrice}$</h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + '$' : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-l from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[9px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  <div>
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
                <div
                  className={`${styles.button} mt-6 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
