import './LoginSignu.css'

import { Fragment,useRef ,useState,useEffect} from 'react';
import { Link,useNavigate} from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen"
import FaceIcon from "@material-ui/icons/Face";

import Loadar from '../layout/Loadar/lodar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors,login } from '../../actions/userAction.jsx';  
import { useAlert } from 'react-alert';
import axios from 'axios';


const LoginSignUp=()=>{
   const dispatch = useDispatch();
   const alert=useAlert();
   const{error,loading,isAuthenticated} = useSelector(state=>state.user)
  const navigate=useNavigate();
 const loginTab=useRef(null);
const registerTab=useRef(null);
const switcherTab=useRef(null);


 const[loginEmail,setLoginEmail]=useState("");
 const[loginPassword,setLoginPassword]=useState("");


const[signName,setSignName]=useState("");
const[signEmail,setSignEmail]=useState("");
const[signPassword,setSignPassword]=useState("");
const[signUsername,setSignUsername]=useState("");


//login
 const loginSubmit= (e)=>{
   e.preventDefault();
dispatch(login(loginEmail,loginPassword));
 };
 const redirect = location.search ? location.search.split("=")[1] : "/account";

    
//register
const registerSubmit=async(e)=>{
    e.preventDefault();
    console.log('Form Data:', {
        name: signName,
        email: signEmail,
        password: signPassword,
        username: signUsername
    });
   try{
   const{data} =await axios.post(`/api/users/register`,{name:signName, email:signEmail,password:signPassword,username:signUsername});


 console.log("Registration successfully",data);
 navigate("/account");

   
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
    if(isAuthenticated){
navigate(redirect)
    }
},[dispatch,error,alert,isAuthenticated,navigate,redirect]);


 const switchTabs=(e,tab)=>{
  if(tab === "login"){
     switcherTab.current.classList.add("shiftToNeutral");
    switcherTab.current.classList.remove("shiftToRight");
 registerTab.current.classList.remove("shiftToNeutralForm");
  loginTab.current.classList.remove("shiftToLeft");

  }
    if(tab==="register"){
        switcherTab.current.classList.add("shiftToRight");
        switcherTab.current.classList.remove("shiftToNeutral");
     registerTab.current.classList.add("shiftToNeutralForm");
     loginTab.current.classList.add("shiftToLeft"); 
    }
 };


    return (
        <fragment>
            {loading ?(
                <Loadar/>
            ):(

     <Fragment>
      
      <div className='LScontainer'>
             <div className='LSBox'>
                <div>
                    <div className='L_S_toggle'>
                        <p onClick={(e)=> switchTabs(e,"login")}>LOGIN</p>
                        <p onClick={(e)=> switchTabs(e,"register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className='loginform' ref={loginTab} onSubmit={loginSubmit} >
                <div className='loginEmail'>
<MailOutlineIcon/>
<input 
type='email'
placeholder='Email'
required
value={loginEmail}
onChange={(e)=> setLoginEmail(e.target.value)}/></div>
<div className='loginPassword'>
    <LockOpenIcon/>
    <input
    type='password'
    placeholder='Password'
    required
    value={loginPassword}
    onChange={(e)=>setLoginPassword(e.target.value)}
    />
                </div>
                
                <Link to ="/password/forget">forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn"/>

                </form>
                   <form
                    className='signupform'
                    ref={registerTab}
encType='multipart/form-data'
onSubmit={registerSubmit}
>
    <div className='signupName'>
        <FaceIcon/>
        <input
        type='text'
        placeholder='Name'
        required
        name='name'
        value={signName}
        onChange={(e)=>setSignName(e.target.value)}
        />
    </div>
    <div className='signupEmail'>
    <MailOutlineIcon/>
        <input
        type='email'
        placeholder='Email'
        required
        name='email'
        value={signEmail}
        onChange={(e)=>setSignEmail(e.target.value)}
        />
    </div>
    <div className='signupPassword'>
    <LockOpenIcon/>
        <input
        type='password'
        placeholder='Password'
        required
        name='password'
        value={signPassword}
        onChange={(e)=>setSignPassword(e.target.value)}
        />
        </div>
        <div className='signUsername'>
        <FaceIcon/>
        <input
        type='text'
        placeholder='Username'
        required
        name='username'
        value={signUsername}
        onChange={(e)=>setSignUsername(e.target.value)}
        /> 

</div>
        <input 
         type='submit'
        value="Register"
        className='signupBtn'
        />         
       </form>        
          </div>
</div>
  </Fragment>
)}
</fragment>
    );
};
 LoginSignUp.propTypes


export default LoginSignUp


            

  
