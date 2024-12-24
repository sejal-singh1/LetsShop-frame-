/* eslint-disable react/no-unescaped-entities */
import { Fragment } from 'react';
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import './ConfirmOrder.css'
  


        const ConfirmOrder = () => {
          const processingTimeInDays = 2; 
          const shippingTimeInDays = 5;  
            const navigate=useNavigate();
            const { shippingInfo, cartItems } = useSelector((state) => state.cart);
            const { user } = useSelector((state) => state.user);
          

// Get the current date
const currentDate = new Date();
// calculate a arrive date
const arrivalDate = new Date();
arrivalDate.setDate(currentDate.getDate() + processingTimeInDays + shippingTimeInDays);

const formattedArrivalDate = format(arrivalDate, 'MMMM dd, yyyy');


            if(!user||!shippingInfo){
                return <p>loading</p>
            }
            const subtotal = cartItems.reduce(
              (acc, item) => acc + item.quantity * item.price,
              0
            );
          
            const shippingCharges = subtotal > 1000 ? 0 : 200;
          
            const tax = subtotal * 0.18;
          
            const totalPrice = subtotal + tax + shippingCharges;
          
            
          
            const proceedToPayment = () => {
                const data = {
                  subtotal,
                  shippingCharges,
                  tax,
                  totalPrice,
                };
            
                sessionStorage.setItem("orderInfo", JSON.stringify(data));
            
                navigate("/process/payment");
              };

            return (
                <Fragment>
                     <MetaData title="Confirm Order" />
                     <CheckoutSteps activeStep={1} />
                <div className="order-confirmation">
                  
                    <h2>Thank you for your order #{user._id}</h2>
                    
        
                    <div className="order-details">
                        <div className="order-info">
                            <h3>Order placed</h3>
                            <p>Value shipping</p>
                            <p>Arrives by <strong>{formattedArrivalDate}</strong></p>
                            
                            <p>Sold by Let's Shop</p>
                            <p>Order {user._id}</p>
                        </div>
        
                        <div className="shipping-address">
                            <h3>Shipping address</h3>
                            <p>{shippingInfo.fullName}</p>
                            <p>{shippingInfo.phoneNO}</p>
                            <p>{shippingInfo.houseNumber}</p>
                            <p>{shippingInfo.roadName},{shippingInfo.city},{shippingInfo.state}</p>
                            <p>{shippingInfo.pinCode}</p>
                            <p>{shippingInfo.country}</p>
                        
                        </div>
                        
                    
        
                  <hr className='divider'/>
                        
                    <div className="product-details">

                        {cartItems && cartItems.map((item)=>
                        (
<div key={item.product}>
<img src={item.image} alt="Product" onError={() => console.log('Error loading image:', item.image)} />
   <p> <Link to={`/product/${item.product}`}>
    {item.name}</Link></p>
    <hr className='divider'/>
    <p><h4>Value shipping: Arrives by</h4> <strong  className='date'>{formattedArrivalDate}</strong></p>
    
    <p><h5>Quantity:</h5>{item.quantity}</p>
    
    <p>₹{item.price}</p>
    <p><h4>Total:</h4>
    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                    </p>
    </div>
                        ))}
                        
                    </div>
        </div>
        
                    <div className="order-summary">
                    <hr className='divider'/>
 <h3>Order Summery</h3>
            <div>
            <hr className='divider'/>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <hr className='divider'/>
              <div></div>
              
              <p>Shipping Charges:</p>
              
                <span>₹{shippingCharges}</span>
              </div>
              <hr className='divider'/>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
              <hr className='divider'/>
              <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
              </div>
              </div>

                
        
                    <div className="payment-info">
                        <h2>Payment type</h2>
                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
        
            
                </div>
            </Fragment>
        
    )
};
export default ConfirmOrder;