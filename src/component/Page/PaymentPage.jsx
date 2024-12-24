




// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import Payment from '../Cart/Payment.jsx';  // Ensure this is the payment form component
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const PaymentPageWrapper = () => {
//   const [stripeApiKey, setStripeApiKey] = useState("");

//   const getStripeApikey = async () => {
//     try {
//       const { data } = await axios.get('/api/users/stripeapkey');
      
//       setStripeApiKey(data.stripeApiKey);
//     } catch (error) {
//       console.error("Error fetching Stripe API key:", error.message);
//     }
//   };

//   useEffect(() => {
//     getStripeApikey(); 
//      // Invoking the function to fetch the API key
//      console.log("Stripe API Key fetched:", stripeApiKey); // This should log the key
//   }, [stripeApiKey]);

//   return (
//     // Conditionally render the Elements component only when stripeApiKey is available
//     <>
//     {stripeApiKey ? (
//       <Elements stripe={loadStripe(stripeApiKey)}>
//         <Payment />
//       </Elements>
//     ) : (
//       <p>Loading payment options...</p>
//     )}
//   </>
//   );
// };

// export default PaymentPageWrapper;




import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from '../Cart/Payment.jsx';  // Ensure this is the payment form component
import { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentPageWrapper = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [loading, setLoading] = useState(true);

  const getStripeApikey = async () => {
    try {
        const { data } = await axios.get('/api/users/stripeapkey');
        if (data.stripeApiKey) {
          console.log("Fetched API Key:", data.stripeApiKey);
          setStripeApiKey(data.stripeApiKey);
        } else {
          console.error("Stripe API key is undefined");
        }
      } catch (error) {
        console.error("Error fetching Stripe API key:", error.message);
      }
  };

  useEffect(() => {
    getStripeApikey();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading payment options...</p>
      ) : (
        stripeApiKey ? (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Payment />
          </Elements>
        ) : (
          <p>Failed to load Stripe. Please try again later.</p>
        )
      )}
    </>
  );
};

export default PaymentPageWrapper;
