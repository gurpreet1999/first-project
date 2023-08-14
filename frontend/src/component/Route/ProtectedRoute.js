import React from 'react'
import {Navigate,Outlet} from "react-router-dom"



const ProtectedRoute = ({isAuthenticated,children,adminRoute,isAdmin,redirect="/login",redirectAdmin="/profile"}) => {


  console.log(isAuthenticated)

  //ese ye hoga ki pehle ye intejar karega --ki isauthenticated aa jaye --phir dekhega -- true he ya false
  
if(isAuthenticated===false){
 

return <Navigate state={{ data: "redirected"}}   to={"/login"} />

}
if(adminRoute && !isAdmin){
    return <Navigate to={"/"}   />
}



  return  children?children:<Outlet/>
}

export default ProtectedRoute