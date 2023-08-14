import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../Layout/MetaData";
import lightLogo from "../../images/light-logo.png"


import Loader from "../Layout/Loader/Loader";
import { fetchProducts } from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

  const dispatch=useDispatch()

  const {products,productsCount}=useSelector((state)=>state.product.products)

  const {loading}=useSelector((state)=>state.product)



useEffect(()=>{

  console.log("hiii")
dispatch(fetchProducts())

},[])
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <MetaData title="ECOMMERCE" />
          <header class="hero-section">
        <div class="content">
        
          <img src={lightLogo} class="logo" alt=""/>
          <p class="sub-heading">best fashion collection of all time</p>
        </div>
        </header>
          <div className="container" id="container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </>
      )}
    </>
  );
};

export default Home;
