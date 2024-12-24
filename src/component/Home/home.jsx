






import   { Fragment, useEffect,} from "react";

import './home.css';
import MetaData from "../layout/MetaData.jsx";
import Product from "./Product/Product.jsx";
import Loadar from "../layout/Loadar/lodar.jsx";
//import axios from "axios";
//import { useAlert } from "react-alert";
import {clearErrors, getProduct } from "../../actions/productActions.jsx";
import {useSelector,useDispatch} from "react-redux";
import { useAlert } from "react-alert";
import model from "../../images/model.jpg"
import Laptops from "../../images/laptop.jpg"
import Footwear from '../../images/footwere.jpg'
import dress from '../../images/dress.jpg'
import  camera from '../../images/camera.jpg'




function Home() {

  const alert = useAlert();
  const dispatch=useDispatch();
  const{loading,error,products,productsCount}=useSelector(
    (state)=>state.products
  );

  


  useEffect(()=>{ 
    if (error) {
      alert.error(error);
    
      dispatch(clearErrors());
    }
  dispatch(getProduct());
  },[dispatch,error,alert]);


  return (

    <Fragment>
 {loading ?( <Loadar/>


):(
       <Fragment>
         <MetaData title="Let's Shop"/>
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Let's Shop</h1>
          <p>Shop The Latest Trends Now</p>
          <a href="#container" className="cta-button">Discover Trends</a>
        </div>
        <div className="hero-image">
          <img src={model} alt="Model" />
        </div>
      </section>

      <section className="categories">
        <h2>Shop By </h2>
        <div className="category-items">
          <div className="category-item">
            <img src={Laptops} alt="Laptops" />
            <p>Laptops</p>
          </div>
          <div className="category-item">
            <img src={Footwear} alt="Footwear" />
            <p>Footwear</p>
          </div>
          <div className="category-item">
            <img src={camera} alt="Cameras" />
            <p>Cameras</p>
          </div>
          <div className="category-item">
            <img src={dress} alt="Dresses" />
            <p>Dresses</p>
          </div>
        </div>
      </section>

      <section className="collections">
        <h2 className="homeheading">Our Best Collections</h2>
        <div className="product-grid">
        <div className="container" id="container">       
    {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                    <Product  product={product} /> 
                ))
              ):(
                <p>No products founds</p>
              )}
           
        </div>
        </div>
      </section>
    </div>
    </Fragment>
 )}
        </Fragment>
  
  );
}

export default Home;
