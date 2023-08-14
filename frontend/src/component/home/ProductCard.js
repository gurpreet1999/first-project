import React from 'react'
import {Link } from "react-router-dom"
import Rating from '@mui/material/Rating';

const ProductCard = ({product}) => {

const options={
    value: product.ratings,
    readOnly:'readOnly',
    color:"rgb(20,20,20,0.1)",
    activeColor:"tomato",
    value:2.5
}

  return (
    <Link className='productCard' to={`/product/${product._id}`}  >

<div className='image-container'  >
<img src={product.images[0].url} alt={product.name} />
</div>
      <p>{product.name}</p>
      <div>
      <Rating  readOnly value={product.ratings}    />
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>

    </Link>
  )
}

export default ProductCard