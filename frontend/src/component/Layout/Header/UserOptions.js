import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import React, { useState } from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import "./Header.css"

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slice/authSlice";


const UserOptions = ({ user }) => {

  const navigate = useNavigate();

const {cartitem}=useSelector((state)=>state.cart)
const dispatch=useDispatch()



const [open, setOpen] = useState(false);
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartitem.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartitem.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard(){
navigate("/admin/dashboard")
  }
  function orders(){
navigate("/orders")
  }
  function account(){
    navigate("/account")
  }
  function logoutUser(){
   dispatch(logout())
   navigate("/login")
  }
  function cart(){
    navigate("/cart")
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />

      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "9999" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 60 ? true : false}
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
