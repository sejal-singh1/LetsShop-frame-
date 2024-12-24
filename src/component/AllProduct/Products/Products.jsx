import { Fragment, useEffect,useState } from "react";
import './Product.css'
import Loadar from "../../layout/Loadar/lodar.jsx";
import Product from "../../Home/Product/Product.js";

import axios from "axios";



const Products=()=>{
  
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    

    useEffect(()=>{
        
const getProduct=async()=>{
    setLoading(true);
    try{
    const{data}=await axios.get(`/api/products`);
    if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      alert("Failed to load products.");
    } finally {
      setLoading(false);
    }
};
getProduct();
},[]);

    
    return (
      
         < fragment>
  {loading ?(
    <Loadar/>
  ):(
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
  </Fragment>
  )}
    </fragment>
    
    )
};

export default Products;