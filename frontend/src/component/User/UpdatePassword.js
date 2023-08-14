import React, { useEffect, useState } from 'react'
import MetaData from '../Layout/MetaData'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import "./UpdatePassword.css"
import axios from 'axios';

import  toast  from 'react-hot-toast';
import { removeAuthError, updatepass } from '../../redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


const dispatch=useDispatch()

const {error,loading,success}=useSelector((state)=>state.user)
const updatePasswordSubmit=(e)=>{
e.preventDefault()
dispatch(updatepass({oldPassword,newPassword,confirmPassword}))


}

const navigate=useNavigate()

useEffect(()=>{

  if(error){
  toast.error(error)
  dispatch(removeAuthError())
  return
  }
  
  if(success){
    toast.success('password Updated Successfully')
    dispatch(removeAuthError())
    navigate('/profile')
    return
  }
  
  
  },[error,success])
  

  return (
  <>
   <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  value="Change"
                  className="updatePasswordBtn"
                  disabled={loading}
                />
              </form>
            </div>
          </div>
  
  
  </>
  )
}

export default UpdatePassword