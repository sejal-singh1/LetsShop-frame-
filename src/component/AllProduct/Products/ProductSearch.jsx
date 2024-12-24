import { Fragment, useEffect, useState } from "react";


import Product from "../../Home/Product/Product.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import './Product.css'
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography";



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
const ProductSearch = () => {
  const{keyword}=useParams();

  const [products, setProducts] = useState([]);
  const[price,setPrice]=useState([0,70000]);
  const[category,setCategory]=useState("");
  const[ratings,setRatings]=useState(0);

  
  
  

  useEffect(() => {
    const getProduct=async(keyword="",price=[0,70000],category,ratings=0)=>{
        
        try{
        const{data}=await axios.get(`/api/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte] =${price[1]}&category=${category}&ratings[gte]=${ratings}`);
        if (Array.isArray(data.products)) {
            setProducts(data.products);
          } else {
            throw new Error("Unexpected response structure");
          }
        } catch (error) {
          alert("Failed to load products.");
        
        }
    };
    getProduct(keyword,price,category,ratings);
  }, [keyword,price,category,ratings]);
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
    </Fragment>
    
  );
};

export default ProductSearch;
