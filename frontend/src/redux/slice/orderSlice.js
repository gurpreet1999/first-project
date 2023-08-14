import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myurl } from "./api";

const initialState={
myorder:[],

}


export const createOrder= createAsyncThunk("order/createorder",async(order,{rejectWithValue})=>
{

    try{
        const {data}=await axios.post(`${myurl}/order/new`,order,{

            headers:{
                "Content-Type":"application/json"
        
            },
            withCredentials:true
        
        })
        
        console.log(data)
        
        
        
        return data.order
    }
    catch(err){
return rejectWithValue(err)
    }

})



export const fetchMyOrder= createAsyncThunk("order/fetchmyorder",async(_,{rejectWithValue})=>
{
    try{
        const {data}=await axios.get(`${myurl}/orders/me`,{

   
            withCredentials:true
        
        })
        
        console.log(data)
        
        return data.orders
    }
    catch(err){
return rejectWithValue(err)
    }




})




const orderSlice=createSlice({
name:"order",
initialState,
reducers:{

},
extraReducers:{
    [createOrder.fulfilled]:(state,action)=>{
       


 
    },
    [fetchMyOrder.pending]:(state,action)=>{
        
        return {
           ...state,
           loading:true
        }
     
        },
    [fetchMyOrder.fulfilled]:(state,action)=>{
        
        return {
            ...state,
            loading:false,
          myorder:action.payload
        }


   },
   [fetchMyOrder.rejected]:(state,action)=>{
        
    return {
        ...state,
        loading:false,
        error:action.payload.err
    }

 
    },
    
}
})


export default orderSlice.reducer



