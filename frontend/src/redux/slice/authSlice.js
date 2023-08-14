import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myurl } from "./api";

const initialState = {
  user: undefined,
  isAuthentiated: false,
  loading: false,
};

export const resetpass = createAsyncThunk(
  "user/resetpassword",
  async (value, { rejectWithValue }) => {
    try {
      const { token, password, confirmPassword } = value;
      const { data } = await axios.put(
        `${myurl}/password/reset/${token}`,
        { password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updatepass = createAsyncThunk(
  "user/updatepassword",
  async (value, { rejectWithValue }) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = value;

      const { data } = await axios.put(
        `${myurl}/password/update`,
        { oldPassword, newPassword, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const forgotpass = createAsyncThunk(
  "user/forgotpassword",
  async (email, { rejectWithValue }) => {
    try {
      console.log(email);
      const { data } = await axios.post(
        `${myurl}/password/forget`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/loginuser",
  async (dataa, { rejectWithValue }) => {
    try {
      let email = dataa.loginEmail;
      let password = dataa.loginPassword;

      console.log(dataa);
      const config = {
        headers: {
          "Content-type": "application/json",

          withCredentials: true,
        },
      };
      const { data } = await axios.post(
        `${myurl}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(data);
      return data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/registeruser",
  async (formdata, { rejectWithValue }) => {
    try {
      console.log(formdata);
      const config = {
        headers: { "Content-type": "multipart/form-data" },
        withCredentials: true,
      };
      const { data } = await axios.post(`${myurl}/register`, formdata, config);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const { data } = await axios.get(`${myurl}/logout`, {
    withCredentials: true,
  });

  return data;
});

export const updateProfile = createAsyncThunk(
  "user/updateprofile",
  async (formdata,{rejectWithValue}) => {
    try{
      const { data } = await axios.put(`${myurl}/me/update`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(data)
      return data;
    }
   catch(err){
    return rejectWithValue(err.data.response)
   }
  }
);

const authSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    removeAuthError(state, action) {
      return {
        ...state,
        error: null,
        success: null,
      };
    },
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [userLogin.fulfilled]: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        isAuthentiated: true,
        loading: false,
      };
    },
    [userLogin.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload.message,
        isAuthentiated: false,
        loading: false,
      };
    },
    [userRegister.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [userRegister.fulfilled]: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        isAuthentiated: true,
        loading: false,
      };
    },
    [userRegister.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload.message,
        loading: false,
        isAuthentiated: false,
      };
    },

    [logout.fulfilled]: (state, action) => {
      return {
        ...state,
        user: undefined,
        isAuthentiated: false,
      };
    },
    [updateProfile.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [updateProfile.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        success: true,
      };
    },
    [updateProfile.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    },
    [forgotpass.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [forgotpass.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        success: true,
      };
    },
    [forgotpass.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    },
    [updatepass.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [updatepass.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        success: true,
      };
    },
    [updatepass.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    },
    [resetpass.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [resetpass.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        success: true,
      };
    },
    [resetpass.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    },
  },
});

export const { removeAuthError } = authSlice.actions;
export default authSlice.reducer;
