import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import { Country, State } from 'country-state-city';
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiURL } from '../../apiConfig';

const Checkout = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selected, setSelected] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  const subTotalPrice = carts.reduce(
    (acc, item) => acc + item.qty * item?.discountPrice || item?.originalPrice,
    0
  );
  const shippingPrice = subTotalPrice * 0.1;
  const discountPercentage = couponData ? discountPrice : '';
  const totalPrice = couponData
    ? (subTotalPrice + shippingPrice - discountPercentage).toFixed(2)
    : (subTotalPrice + shippingPrice).toFixed(2);

  const paymentSubmit = () => {
    if (!(name && phoneNumber && address && zipCode && country && city)) {
      toast.error('Please input your delivery address.');
    } else {
      const shippingInfo = {
        name,
        phoneNumber,
        address,
        zipCode,
        country,
        city,
      };
      const orderData = {
        totalPrice,
        subTotalPrice,
        shippingPrice,
        discountPrice,
        shippingInfo,
        carts,
        user,
      };

      localStorage.setItem('latestOrder', JSON.stringify(orderData));
      navigate('/user/payment');
    }
  };

  const couponSubmit = async (e) => {
    e.preventDefault();

    await axios
      .get(`${apiURL}/coupon/${couponCode}`)
      .then((res) => {
        const coupon = res.data.coupon;
        const matchedProducts = carts.filter((product) => product.shop._id === coupon.shop._id);
        if (matchedProducts.length === 0) {
          toast.error('This coupon is invalid for those products🥲');
        } else {
          const eligiblePrice = matchedProducts.reduce(
            (acc, product) => acc + product.qty * product.discountPrice || product.originalPrice,
            0
          );
          let discountPriceWithCoupon = (eligiblePrice * coupon.percentage) / 100;

          if (discountPriceWithCoupon > coupon.maxDiscount) {
            discountPriceWithCoupon = coupon.maxDiscount;
          } else if (discountPriceWithCoupon < coupon.minDiscount) {
            discountPriceWithCoupon = coupon.minDiscount;
          }

          setDiscountPrice(discountPriceWithCoupon);
          setCouponData(coupon);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    setDiscountPrice(null);
    window.scrollTo(0, 0);
  }, [carts]);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            name={name}
            setName={setName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            address={address}
            setAddress={setAddress}
            zipCode={zipCode}
            setZipCode={setZipCode}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            setCouponData={setCouponData}
            subTotalPrice={subTotalPrice}
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
            discountPercentage={discountPercentage}
            couponSubmit={couponSubmit}
          />
          <div className="flex justify-center">
            <div className={`${styles.button} w-[70%] mt-10`} onClick={paymentSubmit}>
              <h5 className="text-white">Go to Payment</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  country,
  setCountry,
  city,
  setCity,
  address,
  setAddress,
  zipCode,
  setZipCode,
  selected,
  setSelected,
}) => {
  return (
    <div className="w=-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] text-center font-[500]">Shipping Information</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            ></input>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user.email}
              required
              readOnly
              className={`${styles.input} text-gray-400`}
            ></input>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className={`${styles.input} !w-[95%]`}
            ></input>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2">Choose your country</option>
              {Country.getAllCountries().map((item) => (
                <option value={item.isoCode} key={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[100%]">
            <label className="block pb-2">Address</label>
            <input
              type="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>
      </form>

      <h5 className="text-[18px] inline-block mb-3">Choose From saved address</h5>
      <div>
        {user && user.address.length === 0 ? (
          <div className="text-center">No saved address</div>
        ) : (
          user.address.map((item, index) => (
            <div className="w-full flex mt-1" key={index}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  checked={selected === item}
                  onClick={() =>
                    setSelected(item) ||
                    setAddress(item.address) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <span>{item.addressType}</span>
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const CartData = ({
  couponCode,
  setCouponCode,
  setCouponData,
  subTotalPrice,
  shippingPrice,
  totalPrice,
  couponSubmit,
  discountPercentage,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shippingPrice.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentage ? '$' + discountPercentage.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
      <br />
      <form onSubmit={couponSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
