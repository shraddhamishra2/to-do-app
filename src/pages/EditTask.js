import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location?.state;
  console.log(state);
  const formatDate = (formatDate) => {
    const date = new Date(formatDate);
    return date.toISOString().split("T")[0];
  };
  const [taskData, setTaskData] = useState({
    title: state.title,
    description: state.description,
    completeBy: formatDate(state.duedate),
    priority: state.priority,
  });

  console.log(taskData);
  const handleChange = (e) => {
    console.log("Name: ", e.target.name);
    console.log("Value: ", e.target.value);
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };
  const handleUpdateTask = async () => {
    axios
      .put(
        `https://task-manager-server-chi-three.vercel.app/task/${state._id}`,
        {
          title: taskData.title,
          description: taskData.description,
          completeBy: taskData.completeBy,
          priority: taskData.priority,
        }
      )
      .then((response) => {
        console.log("Task updated!", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    navigate("/task");
  };
  return (
    <div className="auth-outer-container">
      <div className="auth-heading edit-heading">Edit Task</div>
      <div className="horizontal-line"></div>
      <div className="task-input-main">
        <div className="input-container">
          <div className="label">Title</div>
          <input
            type="text"
            name="title"
            placeholder="Enter Task Title"
            value={taskData.title}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <div className="label">Description</div>
          <textarea
            name="description"
            id=""
            rows={10}
            cols={20}
            placeholder="Description"
            value={taskData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="input-container">
          <div className="date-priority">
            <div className="task-date">
              <div className="label">Complete By</div>
              <input
                type="date"
                name="completeBy"
                value={taskData.completeBy}
                onChange={handleChange}
              />
            </div>
            <div className="task-priority">
              <div className="label">Priority</div>
              <select
                name="priority"
                id=""
                value={taskData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button className="cancel">Cancel</button>
          <button className="update" onClick={handleUpdateTask}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
