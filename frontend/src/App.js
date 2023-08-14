import React, { useEffect, useState } from 'react';
import Header from './component/Layout/Header/Header';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";

import { Toaster } from 'react-hot-toast'
import Footer from './component/Layout/Footer/Footer';
import Home from './component/home/Home';
import ProductDetail from './component/Product/ProductDetail';
import Product from './component/Product/Product';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import Profile from './component/User/Profile';

import { useSelector } from 'react-redux';

import UserOptions from "./component/Layout/Header/UserOptions";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';

import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import axios from 'axios';

import StripeWrapper from './component/Cart/StripeWrapper';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrder';
import NewProduct from './component/Admin/NewProduct';
import ProductList from './component/Admin/ProductList';
import Dashboard from './component/Admin/Dashboard';

const App = () => {

  const [stripeLoading,setStripeLoading]=useState("")


 
 const [stripeApiKey,setStripeKey]=useState("")


 const {isAuthentiated,user}=useSelector(state=>state.user)

useEffect(()=>{
getStripeKey()
},[isAuthentiated])




async function getStripeKey(){
  if(isAuthentiated){
    setStripeLoading(true)
    const {data}= await axios.get("http://localhost:5000/api/v1/stripeapikey",{
     withCredentials:true
    })
  
   setStripeKey(data.stripeApiKey)
   setStripeLoading(false)
  }
 

 }
  return (
    <>
   <Toaster position='top-right' toastOptions={{
  success:{theme:{primary:"#4aed88"}}
}}>


</Toaster>

    {
      stripeLoading  ?<h1>"loading"</h1>:<>
      
      
   
      <Router>
      <Header/>
     
      {isAuthentiated && <UserOptions user={user} />}
    

     
      
      <Routes>
      
      
      <Route path='/'  element={<Home/>} />
      <Route path={"/product/:id"}  element={<ProductDetail/>} />
      <Route path={"/products"}  element={<Product/>} />
      <Route path={"/products/:keyword"}  element={<Product/>} />
      <Route path={"/login"}  element={<LoginSignUp/>} />
      
      <Route  path='/password/forgot' element={<ForgotPassword/>}   />
      <Route  path='/password/reset/:token' element={<ResetPassword/>}   />
      <Route  path='/cart' element={<Cart/>}   />

      <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthentiated}>
              <Profile />
            </ProtectedRoute>
          }
        />
       <Route
          path="/me/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthentiated}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
         <Route
          path="/password/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthentiated}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
       <Route
          path="/shipping"
          element={
            <ProtectedRoute isAuthenticated={isAuthentiated}>
              <Shipping />
            </ProtectedRoute>
          }
        />
       <Route
          path="/order/confirm"
          element={
            <ProtectedRoute isAuthenticated={isAuthentiated}>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute isAuthenticated={isAuthentiated}>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
       <Route
          path="/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthentiated}>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/process/payment"
          element={
            <ProtectedRoute isAuthenticated={isAuthentiated}>
              {stripeApiKey ? <StripeWrapper stripeApiKey={stripeApiKey} /> : null}
            </ProtectedRoute>
          }
        />
 

   
 <Route
          path="/admin/product/create"
          element={
            <ProtectedRoute isAuthenticated={isAuthentiated}>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthentiated}>
              <ProductList />
            </ProtectedRoute>
          }
        />
       <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthentiated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
    

       
       

     

     
    
      </Routes>
      
      
      
      <Footer/>
      </Router>
      </>
    }


</>
  )
}

export default App