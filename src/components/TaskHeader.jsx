import React, { useState } from "react";
import { SlSettings } from "react-icons/sl";
import Dropdown from "./Dropdown";

const TaskHeader = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="greetingHeader">
      <div className="greeting-header-content">
        <div className="auth-sub-heading">Welcome,</div>
        <div className="auth-heading">{props.userName}</div>
      </div>
      <div className="greeting-header-logo">
        <SlSettings className="setting-logo" onClick={toggleVisibility} />
        <Dropdown isVisible={isVisible} />
      </div>
    </div>
  );
};

export default TaskHeader;
