import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../Layout/Loader';
import { getAllOrdersOfShop, reset } from '../../redux/slice/orderSlice';

const AllOrders = ({ refund }) => {
  const { shop_orders, isLoading, error } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  let filterOrders = [];

  if (refund) {
    filterOrders =
      shop_orders && shop_orders.filter((order) => order.status.toLowerCase().includes('refund'));
  } else {
    filterOrders =
      shop_orders && shop_orders.filter((order) => !order.status.toLowerCase().includes('refund'));
  }

  // get all orders of shop
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [dispatch, error]);

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
  filterOrders &&
    filterOrders.forEach((order) => {
      rows.push({
        id: order._id,
        status: order.status,
        productQty: order.products.length,
        total: order.totalPrice.toLocaleString() + ' $',
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllOrders;
