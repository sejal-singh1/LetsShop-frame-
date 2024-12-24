/* eslint-disable react/no-unescaped-entities */

import  { Fragment, useEffect, useRef,useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import logo from '../../images/logo.webp';
import './Payment.css';
import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment=()=> {

  const navigate=useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('Net Banking');
 

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  
  const {shippingInfo,cartItems}=useSelector((state)=>state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };



  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };



  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
  
      // Card Payment Logic
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/users/payment/process",
          paymentData,
          config
        );
        const client_secret = data.client_secret;

        if (!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
            address: {
              line1: shippingInfo.houseNumber,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

           dispatch(createOrder(order));

          navigate("/success");

         


        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
        <MetaData title="Payment"/>
        <CheckoutSteps activeStep={2}/>
    <div className="payment-container">

      <div className="payment-card">
        <div className="payment-header">
          <img src={logo} alt="Lets's Shop Logo" />
          <h2>Paying Let's Shop</h2>
        </div>
        <div className="amount-section">
          <p>Amount</p>
          <h3>{`₹${orderInfo && orderInfo.totalPrice}`}</h3>
        </div>
        
        <div className="payment-options">
          <h4>Select payment option</h4>
          <form className="paymentForm" onSubmit={(e)=>submitHandler(e)}>
            <div className="option">
              <input 
                type="radio" 
                value="Cards" 
                checked={paymentMethod === 'Cards'}
                onChange={handlePaymentMethodChange} 
                id="cards"
              />
              <label htmlFor="cards">credit /debit /cards</label>
            </div>
            
          <input 
          type="submit"  
          
          value={`PAY ₹ ${orderInfo && orderInfo.totalPrice} `}
          ref={payBtn}
          className="btn"/>
          </form>
        </div>
        


        {paymentMethod === 'Cards' && (
          <div className="Cards-details">
            <div className=" group">
              <label>Savings Account Number</label>
              <CardNumberElement  className="paymentInput" />
            </div>
            <div className="group">
              <label>Expiry Date</label>
              <CardExpiryElement className="paymentInput" />
            </div>
            <div className="group">
              <label>Cvv</label>
              <CardCvcElement className="paymentInput" />
            </div>
          </div>
        )}









          
      </div>
    </div>
    </Fragment>
  );
}

export default Payment;

