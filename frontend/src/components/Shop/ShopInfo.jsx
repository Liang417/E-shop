import { useDispatch } from 'react-redux';
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
  const [seller, setSeller] = useState(null);
  const { id } = useParams();

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
        <div>
          <div className="w-full py-5">
            <div className="w-full flex item-center justify-center">
              <img
                src={`${backendURL}/${seller?.avatar}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{seller?.name}</h3>
            <p className="text-[16px] p-[10px] text-[#000000a6] flex items-center">
              {seller?.description}
            </p>
          </div>
          <div className="p-2">
            <h5 className="font-[600] text-center">Address</h5>
            <h4 className="text-[#000000a6] text-center">{seller?.address}</h4>
          </div>
          <div className="p-2">
            <h5 className="font-[600] text-center">Phone Number</h5>
            <h4 className="text-[#000000a6] text-center">{seller?.phoneNumber}</h4>
          </div>
          <div className="p-2">
            <h5 className="font-[600] text-center">total Product</h5>
            <h4 className="text-[#000000a6] text-center">10</h4>
          </div>
          <div className="p-2">
            <h5 className="font-[600] text-center">Joined On</h5>
            <h4 className="text-[#000000a6] text-center">{seller?.createdAt.slice(0, 10)}</h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                <span className="text-white">Edit Shop</span>
              </div>
              <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                <Link to="/shop/dashboard">
                  <span className="text-white">Go Dashboard</span>
                </Link>
              </div>
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
