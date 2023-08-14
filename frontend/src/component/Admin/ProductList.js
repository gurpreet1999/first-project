import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";


import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


import MetaData from "../Layout/MetaData";
import { Button } from "@mui/material";
import Sidebar from "./Sidebar";
import { deleteSellerProduct, getSellerAllProduct } from "../../redux/slice/productSlice";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();



  const { sellerProduct,updateTheList } = useSelector((state) => state.product);



  const deleteProductHandler = async(id) => {
   await  dispatch(deleteSellerProduct(id));
    dispatch(getSellerAllProduct())

    
  };

  useEffect(() => {
    dispatch(getSellerAllProduct())
  }, []);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5, renderCell: (params) => {
        const id = params.row.id;
        return (
          <Link to={`/product/${id}`}>
            {id}
          </Link>
        );
      }, },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
      renderCell: (params) => {
        const id = params.row.id; // Corrected way to access row's ID
        return (
          <Fragment>
            <Link to={`/admin/product/${id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteProductHandler(id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  sellerProduct &&
  sellerProduct.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;