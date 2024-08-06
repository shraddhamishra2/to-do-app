import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
  const navigate = useNavigate();
  // const formatDate = (formatDate) => {
  //   const date = new Date(formatDate);
  //   return date.toISOString().split("T")[0];
  // };
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    completeBy: "",
    priority: "low",
  });
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };
  // console.log(taskData);
  const handleAddTask = async () => {
    try {
      // console.log("Task priority: ", taskData.priority);
      const response = axios
        .post("https://task-manager-server-chi-three.vercel.app/task/add", {
          title: taskData.title,
          description: taskData.description,
          adddate: Date.now(),
          duedate: taskData.completeBy,
          priority: taskData.priority,
          user: localStorage.getItem("useremail"),
          completed: false,
        })
        .then((res) => {
          alert("Task added successfully!");
          navigate("/task");
        });
      console.log("Response: ", response);
    } catch (error) {
      alert("Task addition failed!");
      console.error("Error adding task: ", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <div className="auth-outer-container">
      <div className="auth-heading add-task-heading">Add New Task</div>
      <div className="horizontal-line"></div>
      <div className="task-input-main">
        <div className="input-container">
          <div className="label">Title</div>
          <input
            type="text"
            placeholder="Enter Task Title"
            name="title"
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
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="input-container">
          <div className="date-priority">
            <div className="task-date">
              <div className="label">Complete By</div>
              <input type="date" name="completeBy" onChange={handleChange} />
            </div>
            <div className="task-priority">
              <div className="label">Priority</div>
              <select name="priority" id="" onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="add" onClick={handleAddTask}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
