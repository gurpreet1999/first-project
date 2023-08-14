import React from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import "./Profile.css"
import { useSelector } from 'react-redux'


const Profile = () => {

  const {user}=useSelector((state)=>state.user)
  console.log(user)
  
  return (
    <>
    <MetaData title={`${user?.name}'s Profile`} />
    {
      user && 
       <div className="profileContainer">
          <div>
            <h1>My Profile</h1>
            <img src={user.avatar.url} alt={user.name} />
            <Link to="/me/update">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substr(0, 10)}</p>
            </div>

            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
        </div>
    }
       
 
 </>
  )
}

export default Profile