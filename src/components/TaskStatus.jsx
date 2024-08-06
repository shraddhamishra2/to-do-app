import React, { useEffect, useState } from "react";
import { MdSort } from "react-icons/md";

const TaskStatus = ({ tasks, setFilteredTask, filterType, reverseTask }) => {
  const [toggleKey, setToggleKey] = useState(false);
  const [sortType, setSortType] = useState("date");
  const priorityValue = {
    high: 3,
    medium: 2,
    low: 1,
  };
  let totalTasks = tasks.length;
  let totalCompleted = tasks.filter((task) => task.completed).length;
  const length = (totalCompleted / totalTasks) * 100;
  const myStyle = {
    width: `${length}%`,
  };
  const sortTaskAscending = (type) => {
    const taskList = [...tasks];
    if (type === "title") {
      taskList.sort((a, b) => {
        let titleA = a.title.toLowerCase();
        let titleB = b.title.toLowerCase();
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      });
      console.log("Sorted tasks in ascending order by title: ", taskList);
      // setFilteredTask(taskList);
    }
    if (type === "date") {
      taskList.sort((a, b) => {
        let duedateA = new Date(a.duedate);
        let duedateB = new Date(b.duedate);
        return duedateA - duedateB;
      });
      console.log("Sorted tasks in ascending order by duedate: ", taskList);
      // setFilteredTask(taskList);
    }
    if (type === "priority") {
      taskList.sort((a, b) => {
        let priorityA = a.priority;
        let priorityB = b.priority;
        return priorityValue[priorityA] - priorityValue[priorityB];
      });
      console.log("Sorted tasks in ascending order by priority: ", taskList);
      // setFilteredTask(taskList);
    }
    setFilteredTask(taskList);
  };
  const sortTaskDescending = (type) => {
    const taskList = [...tasks];
    if (type === "title") {
      taskList.sort((b, a) => {
        let titleA = a.title.toLowerCase();
        let titleB = b.title.toLowerCase();
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      });
      console.log("Sorted tasks in descending order by title: ", taskList);
      // setFilteredTask(taskList);
    }
    if (type === "date") {
      taskList.sort((b, a) => {
        let duedateA = new Date(a.duedate);
        let duedateB = new Date(b.duedate);
        return duedateA - duedateB;
      });
      console.log("Sorted tasks in descending order by duedate: ", taskList);
      // setFilteredTask(taskList);
    }
    if (type === "priority") {
      taskList.sort((b, a) => {
        let priorityA = a.priority;
        let priorityB = b.priority;
        return priorityValue[priorityA] - priorityValue[priorityB];
      });
      console.log("Sorted tasks in descending order by priority: ", taskList);
      // setFilteredTask(taskList);
    }
    setFilteredTask(taskList);
  };
  const handleChange = (e) => {
    console.log("Inside handleChange");
    setSortType(e.target.value);
  };
  useEffect(() => {
    toggleKey ? sortTaskAscending(sortType) : sortTaskDescending(sortType);
    //eslint-disable-next-line
  }, [toggleKey, sortType]);
  return (
    <div className="status-task-container">
      <div className="task-status-content">
        <div className="task-status-heading">{filterType} Tasks</div>
        <div className="task-status-filter">
          <select
            name="status-filter"
            id="status-filter-id"
            onChange={handleChange}
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
          </select>
          <MdSort
            onClick={() => {
              setToggleKey(!toggleKey);
              // reverseTask();
            }}
          />
        </div>
      </div>
      <div className="status-update-bar">
        <div className="update-bar-container">
          <div className="update-bar" style={myStyle}></div>
        </div>
        <div className="update-bar-content">
          {totalCompleted}/{totalTasks}
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
