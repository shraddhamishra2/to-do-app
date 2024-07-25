import React, { useEffect, useState } from "react";
import axios from "axios";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const userEmail = localStorage.getItem("useremail");
  const name = localStorage.getItem("name");
  const fetchTasks = async () => {
    try {
      const res = await axios
        .get(
          `https://task-manager-server-chi-three.vercel.app/task/user/${userEmail}`
        )
        .then((data) => {});
      setTasks(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div>
      <div className="tasks-outer">
        <div className="tasks-header">
          Good Morning, <h3>{name}</h3>!
        </div>
        <div className="tasks-container">
          {tasks &&
            tasks.map((task, index) => {
              return <div className="card">{task.title}</div>;
            })}
        </div>
      </div>
    </div>
  );
};

export default Task;
