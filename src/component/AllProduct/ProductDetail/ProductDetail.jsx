
import { Fragment, useEffect,useState } from "react";
import axios from "axios";

import Loadar from "../../layout/Loadar/lodar.jsx";

import './ProductDetail.css'
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.jsx";
import {useAlert} from "react-alert";
import {useDispatch,useSelector} from "react-redux";
import { addItemsToCart } from "../../../actions/cartAction.jsx";
import {Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,} from "@material-ui/core";
  import {Rating} from "@material-ui/lab";
  import {
    
    newReview,
    clearErrors,
  } from "../../../actions/productActions.jsx";


  import { NEW_REVIEW_RESET } from "../../../constants/productConstant.jsx";


const ProductDetail=()=>{
 const dispatch=useDispatch();
   const {id}=useParams();//get the id from url
    const [product,setProduct]=useState(null);
   const [loading,setLoading]=useState(true);
   const[quantity,setQuantity]=useState(1);
   const [open, setOpen] = useState(false);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");



   
   const { success, error: reviewError } = useSelector(
    (state) => state.newReview
   );
   

    const alert=useAlert();
    

  const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth<600?20:25,
    value:product?product.ratings:0,
    isHalf:true,
  };


  const increaseQuantity=()=>{
    if(product.Stoke<=quantity) return;
    const qty=quantity+1;
    setQuantity(qty);
  };

  const decreaseQuantity=()=>{
if(1>=quantity)  return;
    const qty=quantity-1;
    setQuantity(qty);
  };

//ad

  const addItemaToCardHandler=()=>{
   dispatch(addItemsToCart(id,quantity));
    alert.success("items added To Cart")
  };


  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(()=>{
    const fetchProductDetails=async()=>{
      setProduct(null);
      setLoading(true);
        try{
            const{data}=await axios.get(`/api/product/${id}`);
          
            setProduct(data);
          
        }catch(error){
            alert.show("failed to load product.");
            
        }finally{
            setLoading(false);
        }
    };
    fetchProductDetails();

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

},[dispatch,id,alert,reviewError,success]);

  
    return (
       < fragment>
  {loading ?(
    <Loadar/>
  
  ):(
  <Fragment>
 <div className="product-detail">
          <div className="product-images">
            {product.images && product.images.map((item, index) => (
              <img
                key={item.url}
                className={index === 0 ? "product-image-main" : "product-thumbnail"}
                src={item.url}
                alt={`Product ${index}`}
              />
            ))}
          </div>
          <div className="product-info">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-id">Product #{product._id}</p>
            <div className="product-rating">
              <ReactStars {...options} />
              <span className="product-reviews">{product.numOfReviews} Reviews</span>
            </div>
            
            <h1 className="product-price">{`₹${product.price}`}</h1>
            
            <div className="button-group">
              <div className="quantity-input">
                <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button className="quantity-button" onClick={increaseQuantity}>+</button>
              </div>
              <button className="add-to-cart" disabled={product.Stoke<1?true:false} onClick={addItemaToCardHandler}>Add to Cart</button>
            </div>
            <div className="stock-status">
              Status:
              <b className={product.Stoke < 1 ? "out-of-stock" : "in-stock"}>
                {product.Stoke < 1 ? "Out of Stock" : "In Stock"}
              </b>
            </div>
            <div className="description">
              Description:<p>{product.description}</p>
            </div>
            <button className="submit-review"  onClick={submitReviewToggle}>Submit Review</button>
          </div>
        </div>
      
    
<h3 className="review-rating">REVIEWS</h3>

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

               <Button  onClick={reviewSubmitHandler}   color="primary">
                Submit
              </Button>  
            </DialogActions>
          </Dialog>


{product.reviews && product.reviews.length>0?(
  <div className="reviews">
    {product.reviews&&
  
    product.reviews.map((review)=>(<ReviewCard key={review._id} review={review}/>))}
    
  </div>
):(
  <p className="no-review">No reviews</p>
)}


          </Fragment>
          
  )}
  </fragment>
          
        );
};
export default ProductDetail;



