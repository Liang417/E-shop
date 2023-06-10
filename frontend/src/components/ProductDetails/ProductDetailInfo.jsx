import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import { Link, useNavigate } from 'react-router-dom';
import { apiURL, backendURL } from '../../apiConfig';
import { AiOutlineMessage } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsOfShop } from '../../redux/slice/productSlice';
import Ratings from '../Product/Rating';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductDetailInfo = ({ data }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { shopProducts } = useSelector((state) => state.product);
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalReviewsCount =
    shopProducts && shopProducts.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    shopProducts &&
    shopProducts.reduce(
      (acc, product) => acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsCount || 0;

  const averageRating = avg.toFixed(2);

  // If the conversation exist, navigate to inbox, otherwise create conversation in backend first then navigate.
  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${apiURL}/conversation/`, {
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/user/profile?inbox=true`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error('Please login first');
    }
  };

  useEffect(() => {
    dispatch(getAllProductsOfShop(data.shop._id));
  }, []);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b py-6 px-3 800px:px-10">
        <div className="relative">
          <h5
            className={'text-[#000] font-[600] cursor-pointer 800px:text-[20px]'}
            onClick={() => setActive(1)}
          >
            Details
          </h5>
          {active === 1 ? <div className={`${styles.active_indicator}`}></div> : null}
        </div>
        <div className="relative">
          <h5
            className={'text-[#000] font-[600] cursor-pointer 800px:text-[20px]'}
            onClick={() => setActive(2)}
          >
            Reviews
          </h5>
          {active === 2 ? <div className={`${styles.active_indicator}`}></div> : null}
        </div>
        <div className="relative">
          <h5
            className={'text-[#000] font-[600] cursor-pointer 800px:text-[20px]'}
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? <div className={`${styles.active_indicator}`}></div> : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">{data.description}</p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col py-3 overflow-y-scroll">
          {data &&
            data?.reviews?.map((review, index) => (
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

          <div className="w-full flex justify-center">
            {data && (data?.reviews?.length === 0 || data.reviews === undefined) && (
              <h3 className="text-[18px]">No Reviews for this product🥲</h3>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:[80%] flex flex-col">
            <div className="flex flex-col items-center justify-center my-2">
              <Link to={`/shop/profile/${data.shop._id}`}>
                <img
                  src={`${backendURL}/${data?.shop?.avatar}`}
                  alt=""
                  className="w-[100px] h-[100px] border border-black rounded-full"
                />
                <h3 className="pt-3 text-[20px] text-blue-400 pb-3 text-center">
                  {data.shop.name}
                </h3>
              </Link>
              <h5>{averageRating} Ratings</h5>
            </div>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[20%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">{data.shop?.createdAt?.slice(0, 10)}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{' '}
                <span className="font-[500]">{shopProducts && shopProducts.length}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">{totalReviewsCount}</span>
              </h5>
              <div
                className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                onClick={handleMessageSubmit}
              >
                <span className="text-white flex items-center">
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </div>
              <Link to={`/shop/profile/${data.shop._id}`}>
                <div className={`${styles.button} !rounded-[4px] !h-[40px] mt-3`}>
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailInfo;
