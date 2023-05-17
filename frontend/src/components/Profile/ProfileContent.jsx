import React, { useState } from 'react';
import { backendURL } from '../../apiConfig';
import { useSelector } from 'react-redux';
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backendURL}/${user?.avatar}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
              {/* name */}
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-3 800px:mb-0`}
                    required
                    value={name ?? undefined}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* email */}
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-3 800px:mb-0`}
                    required
                    value={email ?? undefined}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* phoneNumber */}
              <div className="w-full 800px:flex block pb-3 ">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-3 800px:mb-0`}
                    required
                    value={phoneNumber ?? undefined}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                {/* zip code */}
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-3 800px:mb-0`}
                    required
                    value={zipCode ?? undefined}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              {/* address1 */}
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Address1</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-3 800px:mb-0`}
                    required
                    value={address1 ?? undefined}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                {/* address2 */}
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Address2</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] `}
                    required
                    value={address2 ?? undefined}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrder />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* AllRefundOrders page */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/* Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

/* static data */
const orders = [
  {
    _id: '6309b642c47ec0b13e867ad1',
    orderItems: [{ name: 'Iphone 14 pro max' }],
    totalPrice: 1210,
    orderStatus: 'Processing',
  },
  {
    _id: '644ec18121d6f7cd97952115',
    orderItems: [{ name: 'Iphone 17 pro max' }],
    totalPrice: 99999,
    orderStatus: 'Delivered',
  },
  {
    _id: '6309b642c47ec0b13e867ad2',
    orderItems: [{ name: 'Iphone 14 pro max' }],
    totalPrice: 120,
    orderStatus: 'Processing',
  },
  {
    _id: '644ec18121d6f7cd97952116',
    orderItems: [{ name: 'Iphone 17 pro max' }],
    totalPrice: 99998,
    orderStatus: 'Delivered',
  },
  {
    _id: '6309b642c47ec0b13e867ad3',
    orderItems: [
      { name: 'Iphone 14 pro max' },
      { name: 'Iphone 14 pro max' },
      { name: 'Iphone 14 pro max' },
    ],
    totalPrice: 121,
    orderStatus: 'Processing',
  },
  {
    _id: '644ec18121d6f7cd97952117',
    orderItems: [{ name: 'Iphone 17 pro max' }, { name: 'Iphone 14 pro max' }],
    totalPrice: 9999,
    orderStatus: 'Delivered',
  },
];

const columns = [
  {
    field: 'id',
    headerName: 'Order ID',
    minWidth: 250,
    flex: 0.7,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 130,
    headerAlign: 'center',
    align: 'center',
    flex: 0.7,
    cellClassName: (params) => {
      return params.row.status === 'Delivered' ? 'text-green-500' : 'text-red-400';
    },
  },
  {
    field: 'itemsQty',
    headerName: 'Items Qty',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    minWidth: 130,
    flex: 0.7,
  },
  {
    field: 'total',
    headerName: 'Total (US$)',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    minWidth: 130,
    flex: 0.8,
  },
  {
    field: ' ',
    flex: 1,
    minWidth: 50,
    headerName: '',
    type: 'number',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <>
          <Link to={`/user/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        </>
      );
    },
  },
];

const rows = [];

orders &&
  orders.forEach((item) => {
    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: item.totalPrice,
      status: item.orderStatus,
    });
  });

const AllOrder = () => {
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrder = () => {
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] pb-2">Payment Method</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center justify-evenly pr-10 px-3 shadow">
        <img src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" alt="" />
        <h5 className="pl-5 font-[600]">Lewis</h5>
        <h6>4567 **** **** ****</h6>
        <h5>06/2023</h5>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] pb-2">Payment Method</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center justify-evenly pr-10 px-3 shadow">
        <h5 className="pl-5 font-[600]">Default</h5>
        <h6>143-1 37th Ave, Flushing, NY 11354</h6>
        <h6>(123) 456-7890</h6>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
