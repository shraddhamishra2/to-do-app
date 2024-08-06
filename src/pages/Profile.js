import React from "react";
import { useNavigate } from "react-router-dom";
import profilePicture from "../assets/profilePicture.png";

const Profile = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("useremail");
  const username = localStorage.getItem("name");
  //   if (email == null || username == null) {
  //     alert("Kindly login to continue!");
  //     navigate("/");
  //   } else {
  const handleClick = () => {
    try {
      localStorage.removeItem("useremail");
      localStorage.removeItem("name");
      alert("Logout Successful!");
      navigate("/");
    } catch (error) {
      alert("Logout failed!", error);
    }
  };
  const handleBackButton = () => {
    navigate("/task");
  };
  return (
    <div className="profile-container">
      <div className="auth-heading profile-heading">My Profile</div>
      <div className="profile-body">
        <div className="profile-picture">
          <div className="outer-ellipse">
            <div className="profile-image">
              <img src={profilePicture} alt="Profile" />
            </div>
          </div>
        </div>
        <div className="profile-info">
          <div className="title">{username}</div>
          <div className="small-text">{email}</div>
        </div>
      </div>
      <div className="buttons">
        <button className="logout-btn" onClick={handleClick}>
          Logout
        </button>
        <button className="go-back-button" onClick={handleBackButton}>
          Go Back
        </button>
      </div>
    </div>
  );
};
// };

export default Profile;
