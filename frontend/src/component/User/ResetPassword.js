import React, { useEffect, useState } from 'react'
import MetaData from '../Layout/MetaData'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./ResetPassword.css"
import  toast  from 'react-hot-toast';
import { removeAuthError, resetpass } from '../../redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const ResetPassword = () => {


  const {token}=useParams()

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  

    
const dispatch=useDispatch()

const {error,loading,success}=useSelector((state)=>state.user)


const resetPasswordSubmit=(e)=>{
e.preventDefault()
dispatch(resetpass({token,password,confirmPassword}))





}


useEffect(()=>{

  if(error){
  toast.error(error)
  dispatch(removeAuthError())
  return;
  }
  
  if(success){
    toast.success('password Reseted Successfully , pls login to continue')
    dispatch(removeAuthError())
    return;
  }
  
  
  },[error,success])

  return (
   <>
     <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                  disabled={loading}
                />
              </form>
            </div>
          </div>
   
   
   </>
  )
}

export default ResetPassword