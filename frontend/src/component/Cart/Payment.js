import React, { Fragment, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import "./Payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {CardNumberElement,CardCvcElement,CardExpiryElement,useElements,useStripe}  from "@stripe/react-stripe-js"
import MetaData from "../Layout/MetaData"; 
import CheckoutSteps from "./CheckoutStep";
import { Typography } from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom" 
import { createOrder } from "../../redux/slice/orderSlice";
import  toast  from 'react-hot-toast';
import { clearCart } from "../../redux/slice/cartSlice";



const Payment = () => {

    const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();

  const { shippingInfo, cartitem } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const paymentdata={
    amount:Math.round(orderInfo.totalPrice*100),
    
  }


  const order = {
    shippingInfo,
    orderItems: cartitem,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

const payBtn=useRef(null)

const submitHandler=async(e)=>{

e.preventDefault()

payBtn.current.disabled=true;

try{

    const {data}=await axios.post("http://localhost:5000/api/v1/payment/process",paymentdata,{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
    })

    console.log(data)
const client_secret=data.client_secret
console.log(client_secret)
console.log(stripe,elements)

if (!stripe || !elements) return;
const result = await stripe.confirmCardPayment(client_secret, {
  payment_method: {
    card: elements.getElement(CardNumberElement),
    billing_details: {
      name: user.name,
      email: user.email,
      address: {
        line1: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postal_code: shippingInfo.pinCode,
        country: shippingInfo.country,
      },
    },
  },
});

if (result.error) {
  payBtn.current.disabled = false;
  toast.error('Error occured while payment')

  
} else {
  if (result.paymentIntent.status === "succeeded") {
    order.paymentInfo = {
      id: result.paymentIntent.id,
      status: result.paymentIntent.status,
    };
    toast.success('Payment Successfull')
    dispatch(createOrder(order));
    dispatch(clearCart())

    navigate("/success");
  } else {
    toast.error('Payment Unsuccesfull , if money deducted u will get refund within 2 working day')
  }
}  
   

}
catch(err){
 payBtn.current.disabled = false;
}
}


  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
