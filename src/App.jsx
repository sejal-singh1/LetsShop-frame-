
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./component/layout/Header/Header.jsx";
import webfont from "webfontloader";
import React from "react";
import Footer from "./component/layout/footer/footer.jsx";
import Home from "./component/Home/home.jsx";
import ProductDetail from './component/AllProduct/ProductDetail/ProductDetail.jsx';
import Search from './component/AllProduct/Search/Search.jsx';
import ProductSearch from './component/AllProduct/Products/ProductSearch.jsx';
import ProductsPagination from './component/AllProduct/Products/Pagination.jsx';
import LoginSignUp from './component/User/LoginSignup.jsx';
import store from './store.jsx'
import { loadUser } from './actions/userAction.jsx';
import UserOptions from './component/layout/Header/UserOptions.jsx'
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.jsx"
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import UpdatePassword from './component/User/UpdatePassword.jsx';
import ForgetPassword from './component/User/ForgetPassword.jsx';
import ResetPassword from './component/User/ResetPassword.jsx';
import Cart from './component/Cart/Cart.jsx'
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import PaymentSuccess from './component/Cart/OrderSuccess.jsx';
import MyOrders from  "./component/Order/MyOrder.jsx";
import OrderDetails from './component/Order/OrderDetails.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Dashboard from './component/Admin/Dashboard.jsx'
import ProductList from './component/Admin/ProductList.jsx';
import { useState } from 'react';
import axios from 'axios';
import Payment from './component/Cart/Payment.jsx';
import NewProduct from './component/Admin/NewProduct.jsx';
import UpdateProduct from './component/Admin/UpdateProduct.jsx';
import OrderList from './component/Admin/OrderList.jsx';
import ProcessOrder from './component/Admin/ProcessOrder.jsx';
import UsersList from './component/Admin/UserList.jsx';
import UpdateUser from './component/Admin/UpdateUser.jsx';
import ProductReviews from './component/Admin/ProductReviews.jsx';
import ProtectedRoute from './component/Route/ProtectedRoute.jsx';
import Contact from './component/layout/Contact/Contact.jsx';
import About from './component/layout/About/About.jsx';
import NotFound from './component/layout/Not found/NotFound.jsx';

function App() {

const{isAuthenticated,user} =useSelector((state)=>state.user);
const [stripeApiKey, setStripeApiKey] = useState("");
  //const [loading, setLoading] = useState(true);

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


 React.useEffect(()=>{
  webfont.load({
   google:{
     families:["Roboto","Droid Sans"," Chilanka"],
   },
   });
   store.dispatch(loadUser());
   getStripeApikey();
 },[]);

  return(
 <Router>
<Header/>
{isAuthenticated && <UserOptions user={user}/>}
<Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductDetail/>}/>
        <Route exact path="/products" element ={<ProductsPagination/>}/>
        <Route  path="/products/:keyword" element ={<ProductSearch/>}/>
        <Route exact path="/search" element ={<Search/>}/>



        <Route exact path='/account' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route exact path='/me/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>

        <Route exact path='/password/update' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>


        <Route exact path='/password/forget' element={<ForgetPassword/>}/>
        <Route exact path='/password/reset/:token' element={<ResetPassword/>}/>
        <Route exact path='/login' element={<LoginSignUp/>}/>
        <Route exact path='/cart'  element={<Cart/>}/>


        <Route exact path="/login/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>} />
       
      
     <Route exact path="/process/payment" element={ <Elements stripe={loadStripe(stripeApiKey)}>
     
      <Payment />
    </Elements>} />        


    <Route exact path="/success" element={<ProtectedRoute><PaymentSuccess/></ProtectedRoute>} />
    <Route exact path="/orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>} />




    <Route exact path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />
        
    <Route exact path="/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>} />
  
    <Route 
  exact 
  path="/admin/dashboard" 
  element={
    <ProtectedRoute isAdmin={true}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
<Route 
  exact 
  path="/admin/products" 
  element={
    <ProtectedRoute isAdmin={true}>
      <ProductList />
    </ProtectedRoute>
  } 
/>


<Route 
  exact 
  path="/admin/product" 
  element={
    <ProtectedRoute isAdmin={true}>
      <NewProduct/>
    </ProtectedRoute>
  } 
/>

  


<Route 
  exact 
  path="/admin/product/:id" 
  element={
    <ProtectedRoute isAdmin={true}>
      <UpdateProduct />
    </ProtectedRoute>
  } 
/>

      <Route 
  exact 
  path="/admin/orders" 
  element={
    <ProtectedRoute isAdmin={true}>
      <OrderList/>
    </ProtectedRoute>
  } 
/>  
    

<Route 
  exact 
  path="/admin/order/:id" 
  element={
    <ProtectedRoute isAdmin={true}>
      <ProcessOrder/>
    </ProtectedRoute>
  } 
  />
     

     <Route 
  exact 
  path="/admin/users" 
  element={
    <ProtectedRoute isAdmin={true}>
      <UsersList/>
    </ProtectedRoute>
  } 
  />

     
    
     
<Route 
  exact 
  path="/admin/user/:id" 
  element={
    <ProtectedRoute isAdmin={true}>
      <UpdateUser/>
    </ProtectedRoute>
  } 
  />
    
    
     
<Route 
  exact 
  path="/admin/reviews" 
  element={
    <ProtectedRoute isAdmin={true}>
      <ProductReviews/>
    </ProtectedRoute>
  } 
  />

     

<Route exact path="/contact" element ={<Contact/>}/>

<Route exact path="/about" element ={<About/>}/>


<Route  element ={<NotFound/>}/>


    
    
        
    
        
      </Routes>
<Footer/>

 </Router>
  
  );
}

export default App;
