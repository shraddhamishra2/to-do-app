import React from "react";
import { useNavigate } from "react-router-dom";

const Dropdown = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
  };
  return (
    <div>
      {props.isVisible ? (
        <ul className="dropdown-list">
          <li className="profile-item" onClick={handleClick}>
            My Profile
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
