import React, { useEffect, useState } from 'react';
import ProductCard from '../Product/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProductsOfShop } from '../../redux/slice/productSlice';
import { getShopEvents } from '../../redux/slice/eventSlice';
import EventCard from '../Events/EventCard';
import Ratings from '../Product/Rating';
import { backendURL } from '../../apiConfig';

const ShopProfileData = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { shopProducts } = useSelector((state) => state.product);
  const { shopEvents } = useSelector((state) => state.event);

  const [active, setActive] = useState(1);

  const allReviews = shopProducts && shopProducts.map((product) => product.reviews).flat();

  useEffect(() => {
    dispatch(getAllProductsOfShop(id));
    dispatch(getShopEvents(id));
  }, [id]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-evenly ">
        <div className="flex items-center" onClick={() => setActive(1)}>
          <h5
            className={`font-[600] text-[0.85rem] md:text-[0.95rem] lg:text-[1.1rem] cursor-pointer ${
              active === 1 ? 'text-red-500' : 'text-[#333]'
            } `}
          >
            Products
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(2)}>
          <h5
            className={`font-[600] text-[0.85rem] md:text-[0.95rem] lg:text-[1.1rem] cursor-pointer ${
              active === 2 ? 'text-red-500' : 'text-[#333]'
            }`}
          >
            Running Events
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(3)}>
          <h5
            className={`font-[600] text-[0.85rem] md:text-[0.95rem] lg:text-[1.1rem] cursor-pointer ${
              active === 3 ? 'text-red-500' : 'text-[#333]'
            }`}
          >
            Reviews
          </h5>
        </div>
      </div>
      <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[20px] lg:grid-cols-3 lg:gap-[20px] mb-12 border-0">
          {shopProducts &&
            shopProducts.map((item, index) => <ProductCard data={item} key={index} />)}
        </div>
      )}

      {active === 2 && (
        <div className="w-full">
          <div>
            {shopEvents &&
              shopEvents.map((i, index) => (
                <div className="mb-4 text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
                  <EventCard data={i} key={index} />
                </div>
              ))}
          </div>
          {shopEvents && shopEvents.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">No Events😮</h5>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((review, index) => (
              <div className="w-full border-b mb-2" key={index}>
                <div className="flex items-center p-2">
                  <img
                    src={`${backendURL}/${review.user?.avatar}`}
                    alt=""
                    className="rounded-full w-[50px] h-[50px] mr-3"
                  />
                  <div>
                    <div className="flex justify-center">
                      <h1 className="font-bold mr-3">{review.user?.name}</h1>
                      <Ratings rating={review?.rating} />
                    </div>
                    <p className="">{review?.createdAt.slice(0, 10)}</p>
                  </div>
                </div>
                <div>
                  <p className="p-2 text-[0.85rem] md:text-[0.9rem] lg:text-[1rem]">
                    {review?.comment}
                  </p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">No Reviews have for this shop!</h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
