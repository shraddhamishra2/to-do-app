import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { RiFlag2Line } from "react-icons/ri";
import { url } from "../utils";
import axios from "axios";

const TaskDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state ? location.state.title : null;
  // console.log(title);
  const taskDate = new Date(location.state.adddate);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const date = formatter.format(taskDate);
  let taskPriority = "";
  if (location.state?.priority === "high") {
    taskPriority = "high-priority";
  } else if (location.state?.priority === "medium") {
    taskPriority = "medium-priority";
  } else {
    taskPriority = "low-priority";
  }
  const handleDelete = async () => {
    try {
      await axios.delete(`${url}task/delete/${location?.state._id}`);
      alert("Task deleted");
      navigate("/task");
    } catch (error) {
      alert("Task deletion failed!");
    }
  };
  return (
    <div className="auth-outer-container task-details-container">
      <div className="task-detail-header">
        <div className="header-left">
          <div className="date">Added on {date}</div>
          <div className="auth-heading">{title}</div>
          <div className="date">
            <div className="date-icon">
              <RiFlag2Line />
            </div>
            {date}
          </div>
        </div>
        <div className="header-right">
          <div className="header-right-logos">
            <RiDeleteBinLine className="delete-logo" onClick={handleDelete} />
            <FaRegEdit
              className="edit-logo"
              onClick={() => navigate("/edit", { state: location.state })}
            />
          </div>
          <div className={`${taskPriority}`}>
            {location.state?.priority} priority
          </div>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="task-description">{location.state?.description}</div>
      <button className="go-back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default TaskDetail;
