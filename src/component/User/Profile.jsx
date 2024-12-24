

import './profile.css';

import { Fragment,useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loadar from "../layout/Loadar/lodar";
import { useNavigate } from "react-router-dom";

// Assuming user is passed as a prop, adjust the component to receive it
const Profile = () => {
    const navigate=useNavigate();
    const {user,loading,isAuthenticated}=useSelector((state)=>state.user);
    useEffect(()=>{
if(isAuthenticated===false){
    navigate("/login");
}
    },[navigate,isAuthenticated]
    );
    return (
        <Fragment>
            {loading ? (
                <Loadar/>
            ):(
        <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
            <div className='profile'>
            <div className="profile-container">
                <div>
                    <h1>My Profile</h1>
                    <img 
                        src={"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"} 
                        alt={user.name} 
                    />
                    <Link to="/me/update">Edit Profile</Link>
                </div>
                <div>
                <div>
                    <h4>Full Name </h4>
                    <p>{user.name}</p>
                </div>
                <div>
                <h4>Email</h4>
                <p>{user.email}</p>
                </div>
                <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
              </div>
                </div>
            </div>
            </div>
            </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;
