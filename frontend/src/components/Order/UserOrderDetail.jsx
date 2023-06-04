import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import { BsFillBagFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfUser } from '../../redux/slice/orderSlice';
import { apiURL, backendURL } from '../../apiConfig';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserOrderDetail = () => {
  const { user_orders } = useSelector((state) => state.order);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();

  const reviewHandler = async () => {
    await axios
      .post(
        `${apiURL}/product/review`,
        {
          rating,
          comment,
          user: user._id,
          productId: selectedProduct?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment('');
        setRating(null);
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const refundHandler = async () => {
    await axios
      .put(`${apiURL}/order/refund-apply/${id}`, { status: 'Processing refund' })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const userId = user._id;
      const sellerId = currentOrder?.products[0].shop._id;
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
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const currentOrder = user_orders && user_orders.find((order) => order._id === id);
  console.log(currentOrder);
  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
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
              <h5 className="pl-5 text-[12px] sm:text-[16px] text-[#000000bb]">
                US${' '}
                {product?.discountPrice?.toLocaleString() ||
                  product?.originalPrice?.toLocaleString()}{' '}
                x {product.qty}
              </h5>
            </div>
            {!product.isReviewed && currentOrder?.status === 'Delivered' ? (
              <div
                className={`${styles.button} text-[#fff] text-center`}
                onClick={() => setOpen(true) || setSelectedProduct(product)}
              >
                Write a review
              </div>
            ) : null}
          </div>
        ))}

      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[95%] 800px:w-[60%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end px-3 pt-3">
              <RxCross1 size={25} onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>
            <h2 className="text-[26px] font-[500] font-Poppins text-center">Write your comment</h2>
            <br />
            <div className="w-full flex justify-center">
              <div className='flex items-center"'>
                <img
                  src={`${backendURL}/${selectedProduct?.images[0]}`}
                  alt=""
                  className="min-w-[100px] h-[100px]"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="pl-3 text-[12px] sm:text-[16px] 800px:text-[20px]">
                  {selectedProduct?.name}
                </div>
                <h4 className="pl-3 text-[20px]">
                  US${selectedProduct?.discountPrice} x {selectedProduct?.qty}
                </h4>
              </div>
            </div>

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">(optional)</span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? write your expression about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div
              className={`${styles.button} text-white text-[20px] ml-3`}
              onClick={rating > 0 ? reviewHandler : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px] font-bold">
          Total Price: US$ {currentOrder?.totalPrice?.toLocaleString()}
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
          <br />
          {currentOrder?.status === 'Delivered' && (
            <div className={`${styles.button} text-white`} onClick={refundHandler}>
              Give a Refund
            </div>
          )}
        </div>
      </div>
      <br />

      <div className={`${styles.button} text-white`} onClick={() => handleMessageSubmit()}>
        Send Message
      </div>
    </div>
  );
};

export default UserOrderDetail;
