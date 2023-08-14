import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myurl } from "./api";

const initialState = {
  cartitem: [],
  shippingInfo: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload.product;
      const quantity = action.payload.quantity;
      console.log(item);

      const deatilToBeAddedToCart = {
        product: item._id,
        name: item.name,
        price: item.price,
        image: item.images[0].url,
        stock: item.Stock,
      };

      const existingIndex = state.cartitem.findIndex(
        (i) => i.product === item._id
      );

      console.log(existingIndex);

      if (existingIndex >= 0) {
        state.cartitem[existingIndex] = {
          ...state.cartitem[existingIndex],
          quantity: state.cartitem[existingIndex].quantity + quantity,
        };
      } else {
        let tempProduct = { ...deatilToBeAddedToCart, quantity: quantity };

        state.cartitem.push(tempProduct);
      }
    },

    increaseQuantityOfCartItem(state, action) {
      const id = action.payload;
      console.log(action.payload);

      const item = state.cartitem.findIndex((i) => i._id === id);

      console.log(item);

      state.cartitem[item] = {
        ...state.cartitem[item],
        quantity: state.cartitem[item].quantity + 1,
      };
    },
    decreaseQuantityOfCartItem(state, action) {
      const itemId = action.payload;

      const item = state.cartitem.findIndex((i) => i._id === itemId);

      state.cartitem[item] = {
        ...state.cartitem[item],
        quantity: state.cartitem[item].quantity - 1,
      };
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload;

      const item = state.cartitem.findIndex((i) => i._id === itemId);

      console.log(item);

      state.cartitem.splice(item, 1);
    },

    clearCart(state, action) {
      state.cartitem = [];
    },
    addShippingInfo(state, action) {
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },
  },

  extraReducers: {},
});

export const {
  addShippingInfo,
  addToCart,
  increaseQuantityOfCartItem,
  decreaseQuantityOfCartItem,
  clearCart,
  removeItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
