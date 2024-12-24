import { Fragment ,useEffect,useState} from "react";
import './ResetPassword.css';



import Loader from "../layout/Loadar/lodar.jsx"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/userAction.jsx";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.jsx";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
const ResetPassword=()=>{
    const {token}=useParams();
    const dispatch = useDispatch();
        const alert=useAlert();
const navigate=useNavigate();
const { error, loading } = useSelector((state) => state.profile||{})

const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const resetPasswordSubmit=async(e)=>{
    e.preventDefault();
    console.log('Form Data:', {
        password: password,
        confirmPassword: confirmPassword,
    });
    try{
        const{data} =await axios.put(`/api/users/password/reset/${token}`,{password:password,confirmPassword:confirmPassword});
     
      alert.show("Password Updated succesfully",data);
      navigate("/login");

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
},[dispatch,error,alert,navigate,token]);

return (

<Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}



</Fragment>
);
}
export default ResetPassword;