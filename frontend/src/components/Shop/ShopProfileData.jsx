import React, { useEffect, useState } from 'react';
import ProductCard from '../Product/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProductsOfShop } from '../../redux/slice/productSlice';

const ShopProfileData = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { shopProducts } = useSelector((state) => state.product);

  const [active, setActive] = useState(1);

  useEffect(() => {
    dispatch(getAllProductsOfShop(id));
  }, []);

  return (
    <div className="w-full">
      <div className="flex w-full items-center sm:justify-evenly justify-between">
        <div className="flex items-center" onClick={() => setActive(1)}>
          <h5
            className={`font-[600] text-[13px] sm:text-[20px] ${
              active === 1 ? 'text-green-500' : 'text-[#333]'
            } cursor-pointer`}
          >
            Shop Products
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(2)}>
          <h5
            className={`text-[600] text-[13px] sm:text-[20px] cursor-pointer ${
              active === 2 ? 'text-green-500' : 'text-[#333]'
            }`}
          >
            Running Events
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(3)}>
          <h5
            className={`text-[600] text-[13px] sm:text-[20px] cursor-pointer ${
              active === 3 ? 'text-green-500' : 'text-[#333]'
            }`}
          >
            Shop Reviews
          </h5>
        </div>
      </div>
      <br />
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
        {shopProducts && shopProducts.map((item, index) => <ProductCard data={item} key={index} />)}
      </div>
    </div>
  );
};

export default ShopProfileData;
