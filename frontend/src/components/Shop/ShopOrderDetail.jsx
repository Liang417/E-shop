import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import { BsFillBagFill } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfShop } from '../../redux/slice/orderSlice';
import { apiURL, backendURL } from '../../apiConfig';
import axios from 'axios';
import { toast } from 'react-toastify';

const ShopOrderDetail = () => {
  const { shop_orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const currentOrder = shop_orders && shop_orders.find((order) => order._id === id);
  const [status, setStatus] = useState(currentOrder?.status);
  const orderStatus = ['Processing', 'Transferred to delivery partner', 'Shipping', 'Delivered'];

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  const orderUpdateHandler = async () => {
    // can Not choice the original status to updated
    if (status === currentOrder.status) {
      return toast.error('You must choice a new status😡');
    }

    await axios
      .put(`${apiURL}/order/update/${id}`, { status }, { withCredentials: true })
      .then((res) => {
        toast.success('State updated successfully.');
        navigate('/shop/dashboard-orders');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async () => {
    // can Not choice the original status to updated
    if (status === currentOrder.status) {
      return toast.error('You must choice a new status😡');
    }
    
    await axios
      .put(`${apiURL}/order/refund-accept/${id}`, { status }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/shop/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] !w-[130px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{currentOrder?._id?.slice(-6)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{currentOrder?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {currentOrder &&
        currentOrder?.products.map((product, index) => (
          <div className="w-full flex justify-center mb-5" key={index}>
            <img src={`${backendURL}/${product.images[0]}`} alt="" className="w-[80x] h-[80px]" />
            <div className="w-full flex flex-col justify-between">
              <h5 className="pl-5 text-[12px] sm:text-[16px]">{product.name}</h5>
              <h5 className="pl-5 text-[12px] sm:text-[16px] text-[#000000bb] text-end">
                US${product.discountPrice.toLocaleString()} x {product.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px] font-bold">
          Total Price: US$ {currentOrder?.totalPrice.toLocaleString()}
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex">
        <div className="w-full 800px:w-[60%]">
          <h4 className="text-[20px] font-bold">Shipping Address:</h4>
          <h4 className="text-[14px] sm:text-[16px] mt-3">{currentOrder?.shippingInfo.country}</h4>
          <h4 className="text-[14px] sm:text-[16px]">{currentOrder?.shippingInfo.city}</h4>
          <h4 className="text-[14px] sm:text-[16px]">{currentOrder?.shippingInfo.address}</h4>
          <h4 className="text-[14px] sm:text-[16px]">{currentOrder?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%] mt-5 800px:mt-0">
          <h4 className="text-[20px] font-bold ">Payment Info:</h4>
          <h4
            className={`${
              currentOrder?.paymentInfo.status === 'succeeded' ? 'text-green-500' : 'text-red-500'
            } mt-3`}
          >
            Status:
            {currentOrder?.paymentInfo.status ? currentOrder?.paymentInfo.status : 'Not Paid'}
          </h4>
        </div>
      </div>

      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-bold">Order Status:</h4>
      {currentOrder?.status !== 'Processing refund' &&
        currentOrder?.status !== 'Refund success' && (
          <select
            value={status}
            defaultValue={currentOrder?.status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[250px] mt-2 border h-[35px] rounded-[5px]"
          >
            {orderStatus.slice(orderStatus.indexOf(currentOrder?.status)).map((option, index) => (
              <option value={option} key={index} disabled={currentOrder?.status === option}>
                {option}
              </option>
            ))}
          </select>
        )}

      {currentOrder?.status === 'Processing refund' || currentOrder?.status === 'Refund success' ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[250px] mt-2 border h-[35px] rounded-[5px]"
        >
          {['Processing refund', 'Refund success']
            .slice(['Processing refund', 'Refund success'].indexOf(currentOrder?.status))
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      ) : null}

      <div
        className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        onClick={
          currentOrder?.status !== 'Processing refund'
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }
      >
        Update Status
      </div>
    </div>
  );
};

export default ShopOrderDetail;
