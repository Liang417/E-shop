import React, { useState } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/styles';

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const handleMessageSubmit = () => {};

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('bg-[#00000030]')) {
      setOpen(false);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="bg-[#fff] cursor-auto">
      {data ? (
        <div
          className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center"
          onClick={handleClickOutside}
        >
          <div className="w-[90%] 800px:w-[80%] h-[90vh] 800px:h-[80vh] bg-white rounded-md shadow-sm relative overflow-y-scroll p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 hover:cursor-pointer hover:text-red-500"
              onClick={() => setOpen(false)}
            />
            {/*Left side */}
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={data.image_Url[0].url} alt="product_img" className="block mx-auto" />

                <div className="flex items-center justify-evenly">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px]">({data.shop.ratings}) Ratings</h5>
                  </div>

                  <div
                    className={`${styles.button} text-[#fff] bg-[#000] mt-4 rounded-[4px] h-11 hover:text-yellow-300 hover:bg-opacity-80`}
                    onClick={handleMessageSubmit}
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
                        onClick={() => {
                          setClick(!click);
                        }}
                        color={click ? 'red' : '#333'}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => {
                          setClick(!click);
                        }}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* Right side */}
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>{data.name}</h1>
                <p>{data.description}</p>

                <div className="flex pt-6 mr-5 justify-end">
                  <h3 className={`${styles.price}`}>{data.price ? data.price + '$' : null}</h3>
                  <h4 className={`${styles.productDiscountPrice}`}>{data.discount_price}$</h4>
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
                    onClick={() => {}}
                  >
                    <span className=" flex items-center ">
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

export default ProductDetailsCard;
