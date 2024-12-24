import { Fragment, useEffect, useState } from "react";


import Product from "../../Home/Product/Product.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import './Product.css'
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography";
import {useAlert} from "react-alert";


const Categories=[
  "Laptops",
  "Footwear",
  "men's Clothing",
  "Women's Clothing",
  "Home Decor",
  "Cameras",
  "MobilePhones",
  "Beauty & Personal Care",
  "Books $ Stationery"


];
const ProductsPagination = () => {
  const alert=useAlert();
  const{keyword}=useParams();
  const [products, setProducts] = useState([]);
  const[currentPage,setCurrentPage]=useState(1);
  const[resultPerPage,setResultPerPage]=useState(8);
  const[productCount,setProductCount]=useState(0);
  const[price,setPrice]=useState([0,70000]);
  const[category,setCategory]=useState("");
  const[ratings,setRatings]=useState(0);

  useEffect(() => {
    
    const paginationProduct=async(keyword="",page=1,price=[0,70000],category,ratings=0)=>{
        
        try{
        const{data}=await axios.get(`/api/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte] =${price[1]}&category=${category}&ratings[gte]=${ratings}`);
        if (Array.isArray(data.products)) {
            setProducts(data.products);
            setProductCount(data.productCount);
            setResultPerPage(data.resultPerPage)
          } else {
            throw new Error("Unexpected response structure");
          }
        } catch (error) {
          alert.error("Failed to load products.");
        
        }
    };
    paginationProduct(keyword,currentPage,price,category,ratings,alert);
  }, [keyword,currentPage,price,category,ratings,alert]);
  const setCurrentPageNo=(pageNumber)=>{
    setCurrentPage(pageNumber);
  };
  const priceHandler=(event,newPrice)=>{
    setPrice(newPrice);

  };
  

  return (
    
    <Fragment>
  <h2 className="productHeading">products</h2>
  <div className="products">
      {products.length>0 ? ( products.map((product)=>(
          <Product key ={product._id} product={product}/>
      ))
  ):(
      <p>No products found</p>
  )}
  </div>
  
<div className="filterBox">
<Typography>Price</Typography>
<Slider
value={price}
onChange={priceHandler}
valueLabelDisplay="auto"
aria-labelledby="range-slider"
min={0}
max={70000}
/>
<Typography>Categories</Typography>
<ul className="categoriesBox">
  {Categories.map((category)=>(
<li className="category-link"
  key={category}
  onClick={()=>setCategory(category)}>
    {category}
</li>
  ))}
</ul>
<fieldset>
  <Typography component="legend">Rating Above
  </Typography>
  <Slider 
  value={ratings}
  onChange={(e,newRatings)=>{
    setRatings(newRatings);
  }}
  aria-labelledby="continous-slider"
  valueLabelDisplay="auto"
  min={0}
  max={5}
  />
</fieldset>
</div>
{resultPerPage<productCount&&(
  <div className="PaginationBox">
    <Pagination
    activePage={currentPage}
    itemsCountPerPage={resultPerPage}
    totalItemsCount={productCount}
    onChange={setCurrentPageNo}
    nextPageText="Next"
    prevPageText="prev"
    firstPageText="first"
    lastPageText="last"
    itemClass="page-items"
    linkClass="page-link"
    activeClass="pageItemActive"
    activeLinkClass="pageLinkItemActive"
    />
  </div>
)}
    </Fragment>
    
  );
};

export default ProductsPagination;

