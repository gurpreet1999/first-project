import {combineReducers}  from "@reduxjs/toolkit"
import productReducer from "./slice/productSlice"
import authReducer from "./slice/authSlice"
import cartReducer from "./slice/cartSlice"
import orderReducer from "./slice/orderSlice"


const rootReducer=combineReducers({
     product:productReducer,
     user:authReducer,
     cart:cartReducer,
     order:orderReducer
     
     
     
})

export default rootReducer