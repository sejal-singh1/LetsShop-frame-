import CartItemCard from './CartItemCard';

import './Cart.css';

import {  useSelector } from 'react-redux';
import { Fragment } from 'react';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useNavigate} from "react-router-dom";


const Cart = () => {
   const navigate=useNavigate();
   const {cartItems} =useSelector((state)=>state.cart);
    const checkOutHandler=()=>{
        navigate("/login?redirect=shipping")
    };

    return (
        <fragment>
             {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>Your cart is empty!</Typography>
          <Link to="/products">Shop now</Link>
          </div>
      ) : (
        <Fragment> 
        <div className="cart-page-container">
            <div className="cart-container">
                {/* <h2 className="cart-title">Shopping Cart</h2> */}

                {/* Cart Items */}
                <div className="cart-items">
                    <div className="cart-item-headers">
                        <span className="header-product-details">Product Details</span>
                        <span className="header-quantity">Quantity</span>
                        <span className="header-price">Price</span>
                        <span className="header-total">SubTotal</span>
                    </div>
                    {cartItems.map((item, index) => (
                        <CartItemCard key={index} item={item} />
                    ))}
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                    <div className="order-summary-content" >
                        <div className="order-summary-item">
                            <span>ITEMS</span>
                            <span>{`${cartItems.length}`}</span>
                        </div>
                        
                        <div className="order-summary-total">
                            <span>TOTAL COST   </span>
                            <span>{`₹${cartItems.reduce((total,item)=>total+item.price*item.quantity,0)}`}</span>
                        </div>
                        <button className="checkout-button" onClick={checkOutHandler}>CHECKOUT</button>
                        
                    </div>
                </div>
            </div>
            
        </div>
        </Fragment>
      )}
        </fragment>
    );
};

export default Cart;
