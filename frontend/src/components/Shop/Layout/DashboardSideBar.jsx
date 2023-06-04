import React from 'react';
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { VscNewFile } from 'react-icons/vsc';
import { CiMoneyBill, CiSettings } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import { BiLogOut, BiMessageSquareDetail } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import axios from 'axios';
import { apiURL } from '../../../apiConfig';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loadSeller } from '../../../redux/slice/sellerSlice';

const DashboardSideBar = ({ active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    axios
      .get(`${apiURL}/shop/logout`, { withCredentials: true })
      .then((res) => {
        dispatch(loadSeller());
        toast.success(res.data.message);
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="w-full h-full bg-white shadow-sm ">
      {/* buttons */}
      <div className="w-full flex items-center p-3 hover:bg-gray-200">
        <Link to="/shop/dashboard" className="w-full flex items-center">
          <RxDashboard size={30} color={`${active === 1 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[12px] md:text-[16px] font-[400] ${
              active === 1 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-3 hover:bg-gray-200">
        <Link to="/shop/dashboard-orders" className="w-full flex items-center">
          <FiShoppingBag size={30} color={`${active === 2 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[12px] md:text-[16px] font-[400] ${
              active === 2 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-3 hover:bg-gray-200">
        <Link to="/shop/dashboard-products" className="w-full flex items-center">
          <FiPackage size={30} color={`${active === 3 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[12px] md:text-[16px] font-[400] ${
              active === 3 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-3 hover:bg-gray-200">
        <Link to="/shop/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer size={30} color={`${active === 4 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[12px] md:text-[16px] font-[400] ${
              active === 4 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-3 hover:bg-gray-200">
        <Link to="/shop/dashboard-create-event" className="w-full flex items-center">
          <VscNewFile size={30} color={`${active === 5 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[12px] md:text-[16px] font-[400] ${
              active === 5 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-3 hover:bg-gray-200">
        <Link to="/shop/dashboard-create-product" className="w-full flex items-center">
          <AiOutlineFolderAdd size={30} color={`${active === 6 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[12px] md:text-[16px] font-[400] ${
              active === 6 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-3 hover:bg-gray-200">
        <Link to="/shop/dashboard-inbox" className="w-full flex items-center">
          <BiMessageSquareDetail size={30} color={`${active === 8 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[12px] md:text-[16px] font-[400] ${
              active === 8 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-3 hover:bg-gray-200">
        <Link to="/shop/dashboard-coupons" className="w-full flex items-center">
          <AiOutlineGift size={30} color={`${active === 9 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[12px] md:text-[16px] font-[400] ${
              active === 9 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-3 hover:bg-gray-200">
        <Link to="/shop/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund size={30} color={`${active === 10 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[12px] md:text-[16px] font-[400] ${
              active === 10 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-3 hover:bg-gray-200">
        <Link to="/shop/setting" className="w-full flex items-center">
          <CiSettings size={30} color={`${active === 11 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[12px] md:text-[16px] font-[400] ${
              active === 11 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Setting
          </h5>
        </Link>
      </div>

      <div
        className="w-full flex items-center p-3 hover:bg-gray-200 cursor-pointer"
        onClick={logoutHandler}
      >
        <BiLogOut size={30} />
        <h5
          className={`hidden 800px:block pl-2 text-[12px] md:text-[16px] font-[400]  text-[#555]`}
        >
          Log out
        </h5>
      </div>
    </div>
  );
};

export default DashboardSideBar;
