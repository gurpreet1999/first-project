import React, { useEffect, useState } from 'react'
import MetaData from '../Layout/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthError, updateProfile } from '../../redux/slice/authSlice';
import FaceIcon from '@mui/icons-material/Face';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import "./UpdateProfile.css"
import  toast  from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const UpdateProfile = () => {


  const dispatch=useDispatch()
  const {user,error,loading,success}=useSelector((state)=>state.user)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

const navigate=useNavigate()


const updateProfileSubmit=(e)=>{
e.preventDefault()
console.log(avatar)
const myForm=new FormData()
myForm.set("name",name)
myForm.set("email",email)
myForm.set("file",avatar)

dispatch(updateProfile(myForm))



}




useEffect(()=>{

  if(error){
  toast.error(error)
  dispatch(removeAuthError())
  return
  }
  
  if(success){
    toast.success('profile Updated Successfully')
    dispatch(removeAuthError())
    navigate('/profile')
    return
  }
  
  
  },[error,success])



const updateProfileDataChange=(e)=>{

    const fileReader=new FileReader()

    console.log(e.target.files[0])
    setAvatar(e.target.files[0])





fileReader.onload=()=>{
if(fileReader.readyState===2){
    setAvatarPreview(fileReader.result)
    
}
}
fileReader.readAsDataURL(e.target.files[0])

}

useEffect(()=>{
if(user){
    setName(user.name)
    setEmail(user.email)
    setAvatarPreview(user.avatar.url)
}

},[user])

  return (
    <>

<MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                  
                />
              </form>
            </div>
          </div>


    </>
  )
}

export default UpdateProfile