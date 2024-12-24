
import './OrderDetails.css';
import  { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loadar/lodar";
import { useAlert } from "react-alert";
import { useParams } from 'react-router-dom';


const OrderDetails = () => {
    const {id}=useParams();
    const {order={} ,error,loading}=useSelector((state)=>state.orderDetails ||{});
    

    const dispatch = useDispatch();
    const alert = useAlert();
  

    
    
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id]);
    
    
  return (

    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Order Details" />
        
 

    <div className="order-details-container">
      <h2 className='h2'>My Orders /  #{order && order._id}</h2>

      <div className="order-item">
        <div className="order-info"><h2>Order Items:</h2>
        
        {order.orderItems && order.orderItems.map((item)=>
       <div   key={item.product} className='order-material'>
        <img src={item.image} alt="Product"/>
       <p> <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link></p>

                      <span>
                       <p><strong>quantity  </strong> {item.quantity} X <strong>price </strong> ₹{item.price} ={" "}</p>
                       </span>
                    <span> <p> <b>₹{item.price * item.quantity}</b></p></span>
                      
                      


        
</div>
        )}

        
        
          </div>
        </div>
        <div className="shipment-info">
          <p><h2>Shipment Address:</h2> 
          <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNO}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.houseNumber}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
          </div>
          
          </p>
          <div className='orderStatusContainerBox'></div>
          <p><strong>Payment:</strong> <div className="status delivered">
            
            
          <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
            
            
            </div>
            
            
            
            
            <div className='status delivered'>
                  
                  <span>₹{order.totalPrice && order.totalPrice}</span>
                </div>
            
            
            
            
            
            
            
            
            </p>
          <Typography className="download-button">Order Status</Typography>
        </div>
        <div className="order-tracking">
          
          <div className="tracking-step">
          <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
            
            
          </div>
        </div>
      

        
      </div>
    

    </Fragment>
      )}
    </Fragment>

  );
};

export default OrderDetails;









