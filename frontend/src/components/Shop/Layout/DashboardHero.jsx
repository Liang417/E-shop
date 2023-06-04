import React, { useEffect } from 'react';
import styles from '../../../styles/styles';
import { AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfShop } from '../../../redux/slice/orderSlice';
import { getAllProductsOfShop } from '../../../redux/slice/productSlice';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { RiProductHuntLine } from 'react-icons/ri';
import { CiCircleList } from 'react-icons/ci';

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { shop_orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsOfShop(seller._id));
  }, [dispatch]);

  const columns = [
    {
      field: 'id',
      headerName: 'Order Id',
      minWidth: 220,
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      cellClassName: (params) => {
        return params.row.status === 'Delivered' || params.row.status === 'Refund success'
          ? 'text-green-500'
          : 'text-red-400';
      },
    },
    {
      field: 'productQty',
      headerName: 'Product Qty',
      minWidth: 100,
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'total',
      headerName: 'Total',
      minWidth: 100,
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Preview',
      flex: 0.8,
      maxWidth: 100,
      headerName: '',
      type: 'number',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <>
            <Link to={`/shop/order/${id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];
  shop_orders &&
    shop_orders.forEach((order) => {
      rows.push({
        id: order._id,
        status: order.status,
        productQty: order.products.length,
        total: order.totalPrice.toLocaleString() + ' $',
      });
    });

  return (
    <div className="w-[90%] p-4">
      <h3 className="text-[26px] font-Poppins pb-2 text-center">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded p-3">
          <div className="flex items-center">
            <BiMoneyWithdraw size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] !font-[400] text-[#00000085]`}
            >
              Account Balance <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${seller?.availableBalance.toLocaleString()}
          </h5>
          <div className="text-[#077f9c] text-end pr-3">
          </div>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded p-3">
          <div className="flex items-center">
            <CiCircleList size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {shop_orders && shop_orders.length.toLocaleString()}
          </h5>
          <div className="text-[#077f9c] text-end pr-3">
            <Link to="/shop/dashboard-orders">
              <span>View Orders</span>
            </Link>
          </div>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <RiProductHuntLine size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products && products.length.toLocaleString()}
          </h5>
          <div className="text-[#077f9c] text-end pr-3">
            <Link to="/shop/dashboard-products">
              <span>View Products</span>
            </Link>
          </div>
        </div>
      </div>
      <br />
      <h3 className="text-[26px] font-Poppins pb-3 text-center">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardHero;
