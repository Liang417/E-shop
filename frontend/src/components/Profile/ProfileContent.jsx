import React, { useEffect, useState } from 'react';
import { apiURL, backendURL } from '../../apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  deleteUserAddress,
  reset,
  updateUser,
  updateUserAddress,
  updateUserAvatar,
} from '../../redux/slice/userSlice';
import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';
import { Country, State } from 'country-state-city';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';
import { getAllOrdersOfUser } from '../../redux/slice/orderSlice';
import UserInboxPage from '../../screens/UserInboxPage';

const ProfileContent = ({ active }) => {
  const { user, error, success } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = { name, email, phoneNumber, password };
    dispatch(updateUser(updateData));
  };

  const avatarUpdateHandler = (e) => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    dispatch(updateUserAvatar(formData));
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
    <div className="w-[90%]">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backendURL}/${user?.avatar}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              />
              <label htmlFor="avatar">
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
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
                    disabled
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

                {/* password */}
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-3 800px:mb-0`}
                    required
                    value={password ?? undefined}
                    onChange={(e) => setPassword(e.target.value)}
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
          <AllOrder refund={false} />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllOrder refund={true} />
        </div>
      )}

      {active === 4 && (
        <div>
          <UserInboxPage />
        </div>
      )}

      {/* Change password */}
      {active === 6 && (
        <div>
          <ChangePassword />
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

const AllOrder = ({ refund }) => {
  const { user } = useSelector((state) => state.user);
  const { user_orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  let filterOrders = [];

  if (refund) {
    filterOrders =
      user_orders && user_orders.filter((order) => order.status.toLowerCase().includes('refund'));
  } else {
    filterOrders =
      user_orders && user_orders.filter((order) => !order.status.toLowerCase().includes('refund'));
  }

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      minWidth: 220,
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      flex: 1.0,
      cellClassName: (params) => {
        return params.row.status === 'Delivered' || params.row.status === 'Refund success'
          ? 'text-green-500'
          : 'text-red-400';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      headerAlign: 'center',
      align: 'center',
      type: 'number',
      minWidth: 80,
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

  filterOrders &&
    filterOrders.forEach((order) => {
      rows.push({
        id: order._id,
        itemsQty: order.products.length,
        total: order.totalPrice,
        status: order.status,
      });
    });
  return (
    <div className="pl-2 pt-1 sm:pl-8">
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

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${apiURL}/user/update-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] pb-2">Change Password</h1>
      <div className="w-full">
        <form onSubmit={passwordChangeHandler} className="flex flex-col items-center">
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">
              Enter your old password
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">
              Enter your new password
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">
              Enter your confirm password
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [addressType, setAddressType] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const addressTypeData = [
    {
      name: 'Default',
    },
    {
      name: 'Home',
    },
    {
      name: 'Office',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === '' || country === '' || city === '') {
      toast.error('Please fill all the fields!');
    } else {
      dispatch(updateUserAddress({ country, city, address, zipCode, addressType }));
      setOpen(false);
      setCountry('');
      setCity('');
      setAddress('');
      setZipCode(null);
      setAddressType('');
    }
  };

  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="w-full h-full bg-black bg-opacity-30 fixed top-0 left-0 flex justify-center items-center z-10">
          <div className="w-[75%] h-[85vh] sm:w-[60%] md:w-[50%] lg:w-[40%] mt-10 bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-[98%] flex mt-3 justify-end">
              <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">Add New Address</h1>
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="" disabled className="block pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option className="block pb-2" key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="" disabled className="block pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option className="block pb-2" key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" disabled className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option className="block pb-2" key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer bg-green-500`}
                      required
                      readOnly
                      value="Submit"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-center">
        <h1 className="text-[25px] font-[600] pb-2">My Address</h1>
      </div>
      <div
        className="w-[50px] h-[50px] bg-green-500 rounded-[50%] cursor-pointer flex items-center justify-center absolute bottom-10 right-10"
        onClick={() => setOpen(true)}
      >
        <FiPlus className="text-white text-[20px]" />
      </div>
      <br />
      {user &&
        user.address.map((item, index) => (
          <div
            className="w-full min-w-[300px] bg-white h-[70px] rounded-[4px] flex items-center justify-evenly shadow mb-3"
            key={index}
          >
            <div className="flex items-center px-3">
              <h5 className="font-[600]">{item.addressType}</h5>
            </div>

            <div className="flex items-center px-3">
              <h6 className="text-[12px] 800px:text-[unset]">{item.address}</h6>
            </div>

            <div className="flex items-center px-3">
              <h6 className="text-[12px] 800px:text-[unset]">{user.phoneNumber}</h6>
            </div>

            <div className="px-2">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.address.length === 0 && (
        <h5 className="text-center">You do not have any saved address😮</h5>
      )}
    </div>
  );
};

export default ProfileContent;
