import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../Layout/Loader';
import { deleteEvent, getShopEvents, reset } from '../../redux/slice/eventSlice';

const AllEvents = () => {
  const { shopEvents, isLoading, success, error, message } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  // for get all events
  useEffect(() => {
    dispatch(getShopEvents(seller._id));
  }, [dispatch, seller._id]);

  // for error and success change
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
    if (success) {
      toast.success(message);
      dispatch(reset());
      dispatch(getShopEvents(seller._id));
    }
  }, [dispatch, error, success, message, seller._id]);

  const columns = [
    {
      field: 'name',
      headerName: 'Event Name',
      minWidth: 100,
      flex: 1.0,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 350,
      flex: 2.0,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'originalPrice',
      headerName: 'Original Price',
      minWidth: 100,
      flex: 1.0,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'discountPrice',
      headerName: 'Discount Price',
      minWidth: 100,
      flex: 1.0,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 80,
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'sold',
      headerName: 'Sold out',
      type: 'number',
      minWidth: 80,
      flex: 0.6,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Preview',
      flex: 0.8,
      maxWidth: 70,
      headerName: '',
      type: 'number',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const name = params.row.name;
        const product_name = name.replace(/\s+/g, '-');
        return (
          <>
            <Link to={`/events`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
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
  shopEvents &&
    shopEvents.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        description: item.description,
        originalPrice: `${item.originalPrice.toLocaleString()} $`,
        discountPrice: `${item.discountPrice.toLocaleString()} $`,
        Stock: item.stock,
        sold: item?.sold_out,
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

export default AllEvents;
