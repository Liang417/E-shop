import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from 'react-icons/ai';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard.jsx';

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const product_name = data.name.replace(/\s+/g, '-');

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer hover:border-2 hover:border-indigo-500">
        <Link to={`/product/${product_name}`}>
          <img src={data.image_Url[0].url} alt="" className="w-full h-[170px] object-contain" />
        </Link>
        <Link to="/">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${product_name}`}>
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
            <span className="font-[400] text-[17px] text-emerald-500">{data.total_sell} sold</span>
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.price === 0 ? data.price : data.discount_price}$
              </h5>
              <h4 className={`${styles.price}`}>{data.price ? data.price + '$' : null}</h4>
            </div>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? 'red' : '#333'}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
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
            onClick={() => {}}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
