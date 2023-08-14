import React, { useState } from 'react'
import MetaData from '../Layout/MetaData'
import { useNavigate } from 'react-router-dom';
import "./Search.css"

const Search = () => {

    const navigate=useNavigate()
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler=(e)=>{
        e.preventDefault();
         if(keyword.trim()){
        navigate(`/product/${keyword}`)
        }else{
            navigate("/product")
        }

    }
  return (
    <> <MetaData title="Search A Product -- ECOMMERCE" />
    <form className="searchBox" onSubmit={searchSubmitHandler}>
      <input
        type="text"
        placeholder="Search a Product ..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form></>
   
  )
}

export default Search