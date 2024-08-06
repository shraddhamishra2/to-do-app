import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskHeader from "../components/TaskHeader";
import SearchBar from "../components/SearchBar";
import TaskInfo from "../components/TaskInfo";
import TaskStatus from "../components/TaskStatus";
import { useNavigate } from "react-router-dom";
import { url } from "../utils";

const Task = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [filteredTask, setFilteredTask] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const userEmail = localStorage.getItem("useremail");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const reverseTask = () => {
    const reversedTask = filteredTask.reverse();
    setFilteredTask(() => reversedTask);
    console.log("Reversed task: ", reversedTask);
  };
  const handleClick = () => navigate("/addtask");
  const fetchTasks = async () => {
    try {
      setShowLoader(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await axios.get(`${url}task/user/${userEmail}`).then((item) => {
        setTasks(item?.data);
        setFilteredTask(item?.data);
        setShowLoader(false);
      });
    } catch (error) {
      console.log(error);
      setShowLoader(false);
    }
  };
  useEffect(() => {
    fetchTasks();
    //eslint-disable-next-line
  }, [refresh]);
  return (
    <div>
      <div className="tasks-outer">
        <TaskHeader userName={name} />
        <SearchBar
          tasks={tasks}
          setFilteredTask={setFilteredTask}
          setFilterType={setFilterType}
          filterType={filterType}
        />
        <TaskStatus
          tasks={filteredTask}
          setRefresh={setRefresh}
          setFilteredTask={setFilteredTask}
          filterType={filterType}
          reverseTask={reverseTask}
        />
        <div className="taskContainer">
          {showLoader ? (
            /* From Uiverse.io by david-mohseni */
            <div class="loader">
              <div class="bar1"></div>
              <div class="bar2"></div>
              <div class="bar3"></div>
              <div class="bar4"></div>
              <div class="bar5"></div>
              <div class="bar6"></div>
              <div class="bar7"></div>
              <div class="bar8"></div>
              <div class="bar9"></div>
              <div class="bar10"></div>
              <div class="bar11"></div>
              <div class="bar12"></div>
            </div>
          ) : (
            <TaskInfo
              tasks={filteredTask}
              setRefresh={setRefresh}
              setFilterType={setFilterType}
              setShowLoader={setShowLoader}
            />
          )}
        </div>

        <div className="add-task">
          <button className="add-task-button" onClick={handleClick}>
            + Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
