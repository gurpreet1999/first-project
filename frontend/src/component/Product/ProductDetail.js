import React, { useEffect, useState } from "react";
import MetaData from "../Layout/MetaData";
import { Carousel } from "react-responsive-carousel";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProductDetail.css";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const { cartitem } = useSelector((state) => state.cart);
  const { myorder } = useSelector((state) => state.order);
  const { isAuthentiated } = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [product, setproduct] = useState("");
  const [reviewAdded, setReviewAdded] = useState("");

  const { id } = useParams();
  const productId = id;

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const addToCartHandler = (product) => {
    if (product?.Stock < 1) {
      toast.error("Product is out of Stock");
      return;
    }
    dispatch(addToCart({ product, quantity }));
    setproduct({ ...product, Stock: product.Stock - 1 });
    toast.success("Item Added to cart");
  };
  const submitReviewToggle = () => {

    let bought;

    myorder.forEach((ord)=>{
     
   const firstOrderProducts=ord.orderItems;
  

      bought= firstOrderProducts.findIndex((prod)=>{
      
     return prod.product===product._id})
     
     console.log("third",bought)
     if(bought>-1){
      return ;
     }
  
    })
    if(bought>-1){
      open ? setOpen(false) : setOpen(true);
    }
else{
  toast.error('u have to purchase the product to  add review')
}
    
  };

  const addReview = async () => {
    if (!isAuthentiated) {
      toast.error("Login first to add Review");
      return;
    }
    const { data } = await axios.put(
      "http://localhost:5000/api/v1/review",
      { rating, comment, productId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(data);
    setReviewAdded(data);
    toast.success("Thank for your valuable feedback");
  };

  const fetchproductDetail = async (id) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/product/${id}`
    );

    console.log(cartitem);
    const currentProduct = data.product;

    const thisItemAlreadyPresentInCart = cartitem.findIndex(
      (prod) => prod.product === currentProduct._id
    );

    console.log(thisItemAlreadyPresentInCart);
    if (thisItemAlreadyPresentInCart > -1) {
      let quantityPresntINcART =
        cartitem[thisItemAlreadyPresentInCart].quantity;
      setproduct({
        ...currentProduct,
        Stock: currentProduct.Stock - quantityPresntINcART,
      });
    } else {
      setproduct(currentProduct);
    }
  };

  useEffect(() => {
    fetchproductDetail(id);
  }, [id, reviewAdded]);

  useEffect(() => {
    if (product) {
    }
  }, [product]);

  const reviewSubmitHandler = () => {
    console.log(myorder)

 

      

    if (rating && comment) {
      addReview();
      setOpen(false);
    } else {
      toast.error("pls add rating and comment to submit");
    }
  };
  return (
    <>
      {product ? (
        <>
          {" "}
          <MetaData title={`${product?.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product?.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product?.name}</h2>
                <p>Product # {product?._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating readOnly value={product.ratings} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product?.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product?.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    onClick={() => {
                      addToCartHandler(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product?.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product?.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product?.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductDetail;

//component pehle load ho jata he ...fir data atta he
//vii this one
