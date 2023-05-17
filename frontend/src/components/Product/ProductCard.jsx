import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';
import ProductPreviewCard from './ProductPreviewCard.jsx';
import { backendURL } from '../../apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList } from '../../redux/slice/wishListSlice';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/slice/cartSlice';

const ProductCard = ({ data }) => {
  const { wishLists } = useSelector((state) => state.wishList);
  const { carts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const wishListHandler = (data) => {
    const isItemExists = wishLists && wishLists.find((item) => item._id === data._id);
    setClick(!click);
    if (isItemExists) {
      dispatch(removeFromWishList(data));
    } else {
      dispatch(addToWishList(data));
    }
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

  useEffect(() => {
    if (wishLists && wishLists.find((item) => item._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishLists]);

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow p-3 relative cursor-pointer hover:border-2 hover:border-indigo-500">
        <Link to={`/product/${data._id}`}>
          <img
            src={`${backendURL}/${data.images && data.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/profile/${data.shop._id}`} className="text-center ">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + '...' : data.name}
          </h4>
          <div className="flex">
            <AiFillStar className="mr-1 text-yellow-400 text-xl" />
            <AiFillStar className="mr-1 text-yellow-400 text-xl" />
            <AiFillStar className="mr-1 text-yellow-400 text-xl" />
            <AiFillStar className="mr-1 text-yellow-400 text-xl" />
            <AiOutlineStar className="mr-1 text-yellow-400 text-xl" />
          </div>
          <div className="py-2 flex items-center justify-between">
            <span className="font-[400] text-[17px] text-emerald-500">{data.sold_out} sold</span>
            <div className="flex">
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + ' $' : null}
              </h4>
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0 ? data.originalPrice : data.discountPrice}$
              </h5>
            </div>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => wishListHandler(data)}
              color={click ? 'red' : '#333'}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => wishListHandler(data)}
              color={click ? 'red' : '#333'}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductPreviewCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
