import React, { Fragment, useEffect } from "react";

import "./MyOrder.css";
import { useSelector, useDispatch } from "react-redux";

import { DataGrid } from '@mui/x-data-grid';

import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader/Loader";
import { Typography } from "@mui/material";
import { fetchMyOrder } from "../../redux/slice/orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();



  const { myorder } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
     
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
     
    },
  ];
  const rows = [];

  myorder.length > 0  &&
    myorder.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    
dispatch(fetchMyOrder())

  }, []);

  return (
    <Fragment>
      <MetaData title={`${user?.name} - Orders`} />

      {false ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;