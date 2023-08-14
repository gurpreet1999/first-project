import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import user from "../../../images/user.png"
import cartImage from "../../../images/cart.png"
import headerLogo from "../../../images/dark-logo.png"
import { Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux'

const Header = () => {
  const {cartitem}=useSelector((state)=>state.cart)
  const [keyword, setKeyword] = useState("");
  const navigate=useNavigate()
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };


  return (
    <>
    <nav class="navbar">
    <div class="nav">
        <img src={headerLogo} class="brand-logo" alt=""/>
        <div class="nav-items">
            <div class="search">
                <input type="text" class="search-box"    onChange={(e) => setKeyword(e.target.value)}  placeholder="search brand, product"/>
                <button class="search-btn" onClick={searchSubmitHandler}  >search</button>
            </div>
            <Link to={'/profile'}><img src={user} alt=""/></Link>
            <Link  to={'/cart'}><Badge badgeContent={cartitem.length} color="primary">
            <ShoppingCartIcon
         
        />
</Badge></Link>
        </div>
    </div>
    </nav>
    <ul class="links-container">
    <li class="link-item"><Link to={"/"} className="link">Home</Link></li>
    <li class="link-item"><Link to={'/products'} className="link">Products</Link></li>
    <li class="link-item"><Link  to={'/orders'}  className="link">Myorders</Link></li>
    <li class="link-item"><Link  to={'/admin/product/create'} class="link">Become A Seller</Link></li>
    
</ul>
    </>
  )
}

export default Header