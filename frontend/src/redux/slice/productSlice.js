import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myurl } from "./api";

const initialState = {
  products: [],
  sellerProduct: [],
};

export const fetchProducts = createAsyncThunk(
  "product/fetchproduct",
  async (data, { rejectWithValue }) => {


let baseParams;

 if(data){
  const { keyword, currentPage, price, category, rating } = data;
   baseParams = {
    page: currentPage,
    "price[gte]": price[0],
    "price[lte]": price[1],
    "ratings[gte]": rating,
  };

  if (category) {
    baseParams.category = category;
  }
  if (keyword) {
    baseParams.keyword = keyword;
  }

 }
  
 

   


    try {
      console.log(data);
      let response;
      response = await axios.get(
        `${myurl}/products?${new URLSearchParams(baseParams)}`
      );

      console.log(response);
      return response.data;
    } catch (err) {
return rejectWithValue(err)

    }
  }
);



export const deleteSellerProduct=createAsyncThunk('product/deleteSellerProduct',async(id,{rejectWithValue})=>{

try{
 const { data } = await axios.delete(`${myurl}/admin/product/${id}`, {
            withCredentials: true,
          });
console.log(data)

}catch(err){
  return rejectWithValue(err)
}

})

export const getSellerAllProduct = createAsyncThunk(
  "product/getAllSellerProduct",
  async (_,{rejectWithValue}) => {
    try {
   

        const { data } = await axios.get(`${myurl}/admin/products`, {
            withCredentials: true,
          });
    

      console.log(data);
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formdata, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "multipart/form-data" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${myurl}/admin/product/new`,
        formdata,
        config
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    removeProductError(state,action){
      return {
        ...state,
        error:null,
        success:null
      }
    
    }

  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      return {
        ...state,
      loading:true
      }
    },
    [fetchProducts.fulfilled]: (state, action) => {
      return {
        ...state,
        products:action.payload,
        loading:false,
        success:true
      }
    },
    [fetchProducts.rejected]: (state, action) => {
      return {
        ...state,
       loading:false,
       error:action.payload.err,
       success:false
      }
    },

    [getSellerAllProduct.pending]: (state, action) => {
      return {
        ...state,
       loading:true
      };
    },
    [getSellerAllProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        sellerProduct:action.payload.products,
        loading:false,
        success:true
      };
    },
    [getSellerAllProduct.rejected]: (state, action) => {
      return {
        ...state,
        loading:false,
        error:action.payload.err,
        success:false
      };
    },
    
  },
});
export const {removeProductError}=productSlice.actions
export default productSlice.reducer;
