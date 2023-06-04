import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { apiURL, backendURL } from '../../apiConfig';
import styles from '../../styles/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { loadSeller } from '../../redux/slice/sellerSlice';
import { toast } from 'react-toastify';
import Loader from '../Layout/Loader';

const ShopInfo = ({ isOwner }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { shopProducts } = useSelector((state) => state.product);
  const [seller, setSeller] = useState(null);
  const { id } = useParams();

  const totalReviewsCount =
    shopProducts && shopProducts.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    shopProducts &&
    shopProducts.reduce(
      (acc, product) => acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsCount || 0;

  const averageRating = avg.toFixed(1);

  const logoutHandler = async () => {
    axios
      .get(`${apiURL}/shop/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(loadSeller());
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const getSellerInfo = async () => {
    setIsLoading(true);
    await axios
      .get(`${apiURL}/shop/getSellerInfo/${id}`)
      .then((res) => {
        setSeller(res.data.seller);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getSellerInfo();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='text-[0.9rem] md:text-[1rem]'>
          <div className="w-full">
            <div className="w-full flex item-center justify-center">
              <img
                src={`${backendURL}/${seller?.avatar}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{seller?.name}</h3>
            <p className="p-[10px] text-[#000000a6] flex items-center">
              {seller?.description}
            </p>
          </div>
          <div className="mb-2">
            <h5 className="font-[600] text-center">Address</h5>
            <h4 className="text-[#000000a6] text-center">{seller?.address}</h4>
          </div>
          <div className="mb-2">
            <h5 className="font-[600] text-center">Phone Number</h5>
            <h4 className="text-[#000000a6] text-center">{seller?.phoneNumber}</h4>
          </div>
          <div className="mb-2">
            <h5 className="font-[600] text-center">Ratings</h5>
            <h4 className="text-[#000000a6] text-center">{averageRating}/5</h4>
          </div>
          <div className="mb-2">
            <h5 className="font-[600] text-center">Total Products</h5>
            <h4 className="text-[#000000a6] text-center">{shopProducts?.length}</h4>
          </div>
          <div className="mb-2">
            <h5 className="font-[600] text-center">Joined On</h5>
            <h4 className="text-[#000000a6] text-center">{seller?.createdAt.slice(0, 10)}</h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/shop/setting">
                <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <Link to="/shop/dashboard">
                <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                  <span className="text-white">Go Dashboard</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
