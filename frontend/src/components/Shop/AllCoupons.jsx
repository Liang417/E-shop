import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../Layout/Loader';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { apiURL } from '../../apiConfig';
import axios from 'axios';

const AllCoupons = () => {
  const { seller } = useSelector((state) => state.seller);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [percentage, setPercentage] = useState('');
  const [minDiscount, setMinDiscount] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [coupons, setCoupons] = useState([]);

  const getAllCoupons = () => {
    setIsLoading(true);
    axios
      .get(`${apiURL}/coupon/all/${seller._id}`, { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.coupons);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
      });
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    axios
      .delete(`${apiURL}/coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        getAllCoupons();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post(
        `${apiURL}/coupon`,
        {
          name,
          couponCode,
          percentage,
          minDiscount,
          maxDiscount,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        getAllCoupons();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
      });
  };

  // for get all products
  useEffect(() => {
    getAllCoupons();
  }, []);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 1.0,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'couponCode',
      headerName: 'Coupon Code',
      minWidth: 100,
      flex: 2.0,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'percentage',
      headerName: 'Discount Percentage',
      minWidth: 100,
      flex: 1.0,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'minDiscount',
      headerName: 'minDiscount',
      type: 'number',
      minWidth: 80,
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'maxDiscount',
      headerName: 'maxDiscount',
      type: 'number',
      minWidth: 80,
      flex: 0.6,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Delete',
      flex: 0.8,
      maxWidth: 70,
      headerName: '',
      type: 'number',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  coupons &&
    coupons.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        couponCode: item.couponCode,
        percentage: `${item.percentage}%`,
        minDiscount: item.minDiscount || '',
        maxDiscount: item.maxDiscount || '',
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full bg-white">
          <div className="w-full flex justify-end items-center">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[1000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[90vh] bg-white rounded-md shadow">
                <div className="w-full flex justify-end">
                  <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpen(false)} />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">Create Coupon Code</h5>
                <form onSubmit={handleSubmit}>
                  <div className="my-3 px-5">
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter coupon name"
                    />
                  </div>

                  <div className="my-3 px-5">
                    <label className="pb-2">
                      Coupon code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={couponCode}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                    />
                  </div>

                  <div className="my-3 px-5">
                    <label className="pb-2">
                      Discount Percentage (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="percentage"
                      value={percentage}
                      min="1"
                      max="100"
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setPercentage(e.target.value)}
                      placeholder="Enter coupon discount percentage"
                    />
                  </div>

                  <div className="my-3 px-5">
                    <label className="pb-2">Minimum discount</label>
                    <input
                      type="number"
                      name="minDiscount"
                      value={minDiscount}
                      min="1"
                      max={`${maxDiscount}`}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMinDiscount(e.target.value)}
                      placeholder="Enter coupon minimum discount"
                    />
                  </div>

                  <div className="my-3 px-5">
                    <label className="pb-2">Maximum discount</label>
                    <input
                      type="number"
                      name="maxDiscount"
                      value={maxDiscount}
                      min="1"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMaxDiscount(e.target.value)}
                      placeholder="Enter coupon maximum discount"
                    />
                  </div>

                  <div className="flex justify-center">
                    <input
                      type="submit"
                      value="Create"
                      className="w-[50%] h-[35px] bg-slate-800 text-white my-3 cursor-pointer appearance-none text-center rounded-[3px] sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
