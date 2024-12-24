
import './ForgetPassword.css';

import { Fragment ,useState,useEffect} from 'react';

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Loadar from '../layout/Loadar/lodar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors} from '../../actions/userAction.jsx';  
import { useAlert } from 'react-alert';
import axios from 'axios';
import MetaData from '../layout/MetaData.jsx';
const ForgetPassword=()=>{
    
    const dispatch = useDispatch();
    const alert=useAlert();

    const { error, loading } = useSelector((state) => state.profile||{});
   
const [email,setEmail]=useState("");




const forgetPasswordSubmit=async(e)=>{
    e.preventDefault();
    console.log('Form Data:', {
        
        email: email,
    });
    try{
        const{data} =await axios.post(`/api/users/password/forget`,{email:email});
      alert.show(data.message);
    }catch(error){
        if (error.response) {
            console.error("Error:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }   
};
   
useEffect(()=>{

    if(error){
        alert.error(error);
        dispatch(clearErrors());

    
    }
},[dispatch,error,alert]);
        
        
return (

<Fragment>
            {loading ? (
              <Loadar />
            ) : (
              <Fragment>
                <MetaData title="Forgot Password" />
                <div className="forgotPasswordContainer">
                  <div className="forgotPasswordBox">
                    <h2 className="forgotPasswordHeading">Forgot Password</h2>
                    <form
                className="forgotPasswordForm"
                
                onSubmit={forgetPasswordSubmit}
              >
                  <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
);
};
export default ForgetPassword;