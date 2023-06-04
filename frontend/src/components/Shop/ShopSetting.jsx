import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { backendURL } from '../../apiConfig';
import { AiOutlineCamera } from 'react-icons/ai';
import { reset, updateSeller, updateSellerAvatar } from '../../redux/slice/sellerSlice';
import { toast } from 'react-toastify';

const ShopSetting = () => {
  const { seller, error, success } = useSelector((state) => state.seller);
  const [name, setName] = useState(seller && seller.name);
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipCode] = useState(seller && seller.zipCode);
  const [description, setDescription] = useState(seller && seller.description);
  const dispatch = useDispatch();

  const avatarUpdateHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    dispatch(updateSellerAvatar(formData));
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const updateData = { name, address, phoneNumber, zipCode, description };
    dispatch(updateSeller(updateData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
    if (success) {
      toast.success(success);
      dispatch(reset());
    }
  }, [error, success, dispatch]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full flex flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={`${backendURL}/${seller?.avatar}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full object-cover border-[3px] border-[#3ad132]"
            />
            <label htmlFor="avatar">
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[3px] right-[5px]">
                <input
                  type="file"
                  id="avatar"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={avatarUpdateHandler}
                />
                <AiOutlineCamera />
              </div>
            </label>
          </div>
        </div>

        {/* shop info */}
        <form className="flex flex-col items-center" onSubmit={updateHandler}>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-3">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-3">
              <label className="block pb-2">Shop Description</label>
            </div>
            <textarea
              cols="5"
              rows="8"
              type="text"
              placeholder={`${seller?.description || 'Enter your shop description'}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] 800px:mb-0`}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-3">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="name"
              placeholder={seller?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-3">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-3">
              <label className="block pb-2">Shop Zip Code</label>
            </div>
            <input
              type="number"
              placeholder={seller?.zipCode}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={`${styles.input} !w-[95%] 800px:mb-0`}
              required
            />
          </div>

          <input
            className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] my-4 cursor-pointer`}
            type="submit"
            value="Update Shop"
            readOnly
          />
        </form>
      </div>
    </div>
  );
};

export default ShopSetting;
