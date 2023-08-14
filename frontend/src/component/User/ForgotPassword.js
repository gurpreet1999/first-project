import React, { useEffect, useState } from 'react'
import MetaData from '../Layout/MetaData'
import "./ForgotPassword.css"

import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import axios from 'axios';

import  toast  from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { forgotpass, removeAuthError } from '../../redux/slice/authSlice';



const ForgotPassword = () => {

  const {error,loading,success}=useSelector((state)=>state.user)

    const [email, setEmail] = useState("");

   const dispatch=useDispatch()

const forgotPasswordSubmit=(e)=>{

    e.preventDefault();
    console.log(email)
    dispatch(forgotpass(email))
   
    

}

useEffect(()=>{

if(error){
toast.error(error)
dispatch(removeAuthError())
return
}

if(success){
  toast.success('Reset Link has been send to your verified email')
  dispatch(removeAuthError())
  return
}


},[error,success])



  return (
   <>
   
   <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                  disabled={loading}
                />
              </form>
            </div>
          </div>
   
   
   </>
  )
}

export default ForgotPassword