import './UpdateProfile.css';

import { Fragment ,useState,useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";

import Loadar from '../layout/Loadar/lodar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors} from '../../actions/userAction.jsx';  
import { useAlert } from 'react-alert';
import axios from 'axios';
import MetaData from '../layout/MetaData.jsx';
const UpdateProfile=()=>{
    
        const dispatch = useDispatch();
        const alert=useAlert();
        const navigate=useNavigate();
        const { user } = useSelector((state) => state.user);
        const { error, loading } = useSelector((state) => state.profile||{});
       
   //    


const[signName,setSignName]=useState("");
const[signEmail,setSignEmail]=useState("");


    
        const updateProfileSubmit=async(e)=>{
            e.preventDefault();
            console.log('Form Data:', {
                name: signName,
                email: signEmail,

                
                
            });
           try{
           const{data} =await axios.put(`/api/users/me/update`,{name:signName, email:signEmail});
        
        
         console.log("updation succesfully",data);
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
},[dispatch,error,alert,user,navigate]);
        return(
            <Fragment>
            {loading ? (
              <Loadar />
            ) : (
              <Fragment>
                <MetaData title="Update Profile" />
                <div className="updateProfileContainer">
                  <div className="updateProfileBox">
                    <h2 className="updateProfileHeading">Update Profile</h2>
                    <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                  <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={signName}
                    onChange={(e) => setSignName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={signEmail}
                    onChange={(e) => setSignEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    );
    };
    export default UpdateProfile;