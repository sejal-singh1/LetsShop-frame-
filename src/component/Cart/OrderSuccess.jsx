
import './PaymentSuccess.css'; // Add your styles in this CSS file
import { Link } from "react-router-dom";
const PaymentSuccess = () => {
  return (


    <div className="payment-success-page">
    

      <div className="success-message">
        <div className="icon-checkmark">✔</div>
        <h2>Payment Successful!</h2>
        <p>Your order has been confirmed by the vendor. Thank you for giving us the opportunity to serve you.</p>

       <Link  to= "/orders">View Orders</Link>
       
      </div>
    </div>
  );
};

export default PaymentSuccess;
