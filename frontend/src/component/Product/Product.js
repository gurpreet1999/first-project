import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import "./Product.css";
import ProductCard from "../home/ProductCard";
import { Slider, Typography } from "@mui/material";
import Pagination from "react-js-pagination";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slice/productSlice";
import Loader from "../Layout/Loader/Loader";

const categories = [
  "Laptop",
  "Footwear",
  "Accessories",
  "Electronics",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Product = () => {
  const [price, setPrice] = useState([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [rating, setRatings] = useState(0);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const { products, productsCount, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.product.products);

    const {loading } =useSelector((state) => state.product);



  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hii here")
    console.log(category)
    dispatch(fetchProducts({keyword, currentPage, price, category, rating}));
    
  }, [currentPage, category,rating, keyword, price, rating]);

  let count = filteredProductsCount;

  return (
<>
{false? (
        <Loader />
      ) : (

    <>
      <MetaData title="PRODUCTS -- ECOMMERCE" />
      <h2 className="productsHeading">Products</h2>

      <div className="products">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>

      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />

        <Typography>Categories</Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={rating}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
        </fieldset>
      </div>
      {resultPerPage < count && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </>
      )
}
    </>
  );
};

export default Product;
