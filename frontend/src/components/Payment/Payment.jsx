import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { apiURL } from '../../apiConfig';
import { toast } from 'react-toastify';

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    window.scroll(0, 0);
    const orderData = JSON.parse(localStorage.getItem('latestOrder'));
    setOrderData(orderData);
  }, []);

  const order = {
    carts: orderData?.carts,
    shippingInfo: orderData?.shippingInfo,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'Happy Coding🙂',
            amount: {
              currency_code: 'USD',
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => orderID);
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      if (payer !== undefined) {
        paypalHandler(payer);
      }
    });
  };

  const paypalHandler = async (payer) => {
    const config = {
      headers: { 'Content-type': 'application/json' },
    };

    order.paymentInfo = {
      id: payer.payer_id,
      status: 'succeeded',
      type: 'Paypal',
    };

    await axios.post(`${apiURL}/order`, order, config).then((res) => {
      setOpen(false);
      navigate('/user/order/success');
      toast.success('Order successfully👍');
      localStorage.setItem('cartItems', JSON.stringify([]));
      localStorage.setItem('latestOrder', JSON.stringify([]));
    });
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;
    try {
      const paymentData = {
        amount: Math.round(orderData?.totalPrice * 100),
      };

      const config = {
        headers: { 'Content-type': 'application/json' },
      };

      const { data } = await axios.post(`${apiURL}/payment`, paymentData, config);

      const client_secret = data.client_secret;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: 'Credit Card',
          };

          await axios.post(`${apiURL}/order`, order, config).then((res) => {
            setOpen(false);
            navigate('/user/order/success');
            toast.success('Order successfully👍');
            localStorage.setItem('cartItems', JSON.stringify([]));
            localStorage.setItem('latestOrder', JSON.stringify([]));
          });
        }
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    order.paymentInfo = {
      type: 'Cash On Delivery',
    };

    await axios.post(`${apiURL}/order`, order, config).then((res) => {
      setOpen(false);
      navigate('/user/order/success');
      toast.success('Order successfully👍');
      localStorage.setItem('cartItems', JSON.stringify([]));
      localStorage.setItem('latestOrder', JSON.stringify([]));
    });

    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#0000004b] flex justify-center items-center z-50 cursor-wait">
          <div className="inline-block w-10 h-10 border-4 border-white rounded-full border-t-black animate-spin"></div>
        </div>
      )}
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      <div>
        <div className="flex full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4
            className="text-[18px] pl-2 font-[600] text-[#000000b1] cursor-pointer"
            onClick={() => setSelect(1)}
          >
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    className={`${styles.input} !w-[95%] text-[#444]`}
                    defaultValue={user.name}
                    placeholder={user.name}
                    required
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: '19px',
                          color: '#444',
                        },
                        empty: {
                          color: '#3a120a',
                          backgroundColor: 'transparent',
                          '::placeholder': {
                            color: '#999',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input} !h-[35px] !w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: '19px',
                          color: '#444',
                        },
                        empty: {
                          color: '#3a120a',
                          backgroundColor: 'transparent',
                          '::placeholder': {
                            color: '#999',
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVC</label>
                  <CardCvcElement
                    className={`${styles.input} !h-[35px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: '19px',
                          color: '#444',
                        },
                        empty: {
                          color: '#3a120a',
                          backgroundColor: 'transparent',
                          '::placeholder': {
                            color: '#999',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>

      <br />
      {/* paypal */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4
            className="text-[18px] pl-2 font-[600] text-[#000000b1] cursor-pointer"
            onClick={() => setSelect(2)}
          >
            Pay with Paypal
          </h4>
        </div>

        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      'client-id':
                        'AWFWedayCxlDGP8DPlwqRV69aT6lv2GDEiMrIcoRjzWRy_zMW7g_9CAyzKsc4ene7B5U77bbJta6tmQe',
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: 'vertical' }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4
            className="text-[18px] pl-2 font-[600] text-[#000000b1] cursor-pointer"
            onClick={() => setSelect(3)}
          >
            Cash on Delivery
          </h4>
        </div>

        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.shippingPrice?.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? '- $' + orderData.discountPrice : '-'}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">${orderData?.totalPrice}</h5>
      <br />
    </div>
  );
};

export default Payment;
