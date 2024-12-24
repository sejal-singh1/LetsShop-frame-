import './UpdatePassword.css';

import { Fragment ,useState,useEffect} from 'react';
import { useNavigate} from "react-router-dom";


import Loadar from '../layout/Loadar/lodar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors} from '../../actions/userAction.jsx';  
import { useAlert } from 'react-alert';
import axios from 'axios';
import MetaData from '../layout/MetaData.jsx';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
const UpdateProfile=()=>{
    
        const dispatch = useDispatch();
        const alert=useAlert();
        const navigate=useNavigate();
        
        const { error, loading } = useSelector((state) => state.profile||{});
       
   //    


   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");


    
        const updatePasswordSubmit=async(e)=>{
            e.preventDefault();
            console.log('Form Data:', {
                oldPassword:oldPassword,
                newPassword:newPassword,
                confirmPassword:confirmPassword,

                
                
            });
           try{
           const{data} =await axios.put(`/api/users/password/update`,{oldPassword:oldPassword,newPassword:newPassword,confirmPassword:confirmPassword});
        
        
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
},[dispatch,error,alert,navigate]);
        return(
            <Fragment>
            {loading ? (
              <Loadar />
            ) : (
              <Fragment>
                <MetaData title="Change Password" />
                <div className="updatePasswordContainer">
                  <div className="updatePasswordBox">
                    <h2 className="updatePasswordHeading">Update Profile</h2>
                    <form
                className="updatePasswordForm"
                
                onSubmit={updatePasswordSubmit}
              >
                  <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old password"
                    required
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="new password"
                    required
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
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