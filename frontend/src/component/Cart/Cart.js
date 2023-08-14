import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import  toast  from 'react-hot-toast';
import Typography from '@mui/material/Typography';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import { clearCart, decreaseQuantityOfCartItem, increaseQuantityOfCartItem, removeItemFromCart } from "../../redux/slice/cartSlice";




const Cart = () => {

const navigate=useNavigate()

    const dispatch = useDispatch();
    const { cartitem } = useSelector((state) => state.cart);
  
    const increaseQuantity = (id, quantity, stock) => {
     
      if (stock <= quantity) {
        return;
      }
      console.log(id)
      dispatch(increaseQuantityOfCartItem(id));
    };
  
    const decreaseQuantity = (id, quantity) => {
    
      if (1 >= quantity) {
        return;
      }
      dispatch(decreaseQuantityOfCartItem(id));
    };
  


    const deleteCartItems = (id) => {
      dispatch(removeItemFromCart(id));
      toast.success('Item removed from cart')
    };
  
    const checkoutHandler = () => {
      navigate("/shipping");

    };
  
    return (
      <Fragment>
        {cartitem.length === 0 ? (
          <div className="emptyCart">
            <RemoveShoppingCartIcon />
  
            <Typography>No Product in Your Cart</Typography>
            <Link to="/products">View Products</Link>
          </div>
        ) : (
          <Fragment>
            <div className="cartPage">
              <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
              </div>
  
              {cartitem &&
                cartitem.map((item) => (
                  <div className="cartContainer" key={item.product}>
                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">{`₹${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                ))}
  
              <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                  <p>Gross Total</p>
                  <p>{`₹${cartitem.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                  <button onClick={checkoutHandler}>Check Out</button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };
  
  export default Cart;