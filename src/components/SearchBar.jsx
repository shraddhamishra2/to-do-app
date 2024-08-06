import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ tasks, setFilteredTask, filterType, setFilterType }) => {
  const [searchType, setSearchType] = useState("text");
  const handleChange = (e) => {
    console.log("Event: ", e);
    if (e.target.type === "text") {
      let filteredTask = tasks.filter((task) => {
        const title = task.title.toLowerCase();
        let enteredTitle = e.target.value.toLowerCase();
        return title.includes(enteredTitle);
      });
      setFilteredTask(filteredTask);
      console.log("Search tasks by name: ", filteredTask);
    }
    if (e.target.type === "date") {
      let filteredTask = tasks.filter((task) => {
        const taskDate = formatDate(task.duedate);
        let enteredDate = e.target.value;
        enteredDate = formatDate(enteredDate);
        return taskDate === enteredDate;
      });
      setFilteredTask(filteredTask);
      console.log("Search tasks by date: ", filteredTask);
    }
  };
  const formatDate = (duedate) => {
    const taskDate = new Date(duedate);
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formatter.format(taskDate);
  };
  const handleComplete = () => {
    setFilterType("complete");
    const filteredTask = tasks.filter((task) => task.completed);
    console.log("Filtered tasks: ", filteredTask);
    setFilteredTask(filteredTask);
  };
  const handleAll = () => {
    setFilterType("all");
    setFilteredTask(tasks);
  };
  const handlePending = () => {
    setFilterType("pending");
    const filteredTask = tasks.filter((task) => !task.completed);
    console.log("Pending tasks: ", filteredTask);
    setFilteredTask(filteredTask);
  };
  const handleToday = () => {
    setFilterType("today");
    const date = new Date();
    const filteredTask = tasks.filter((task) => {
      const givendate = formatDate(task.duedate);
      return givendate === formatDate(date);
    });
    console.log("Today's tasks: ", filteredTask);
    setFilteredTask(filteredTask);
  };
  const handleDelayed = () => {
    setFilterType("delayed");
    const today = new Date();
    const filteredTask = tasks.filter((task) => {
      const taskDate = new Date(task.duedate);
      const isDelayed = taskDate < today && !task.completed;
      return isDelayed;
    });
    console.log("Delayed's tasks: ", filteredTask);
    setFilteredTask(filteredTask);
  };
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="search-icon">
          <CiSearch />
        </div>
        <input
          type={searchType}
          name="search"
          id="searchId"
          placeholder="Search tasks"
          onChange={handleChange}
        />
        <select
          name="filter"
          id="filterId"
          onChange={(e) =>
            setSearchType(e.target.value === "byName" ? "text" : "date")
          }
        >
          <option value="byName">By Name</option>
          <option value="byDate">By Date</option>
        </select>
      </div>
      <div className="filter-buttons">
        <button
          className={`allButton ${filterType === "all" ? "active-button" : ""}`}
          onClick={handleAll}
        >
          All
        </button>
        <button
          className={`completeButton ${
            filterType === "complete" ? "active-button" : ""
          }`}
          onClick={handleComplete}
        >
          Completed
        </button>
        <button
          className={`pendingButton ${
            filterType === "pending" ? "active-button" : ""
          }`}
          onClick={handlePending}
        >
          Pending
        </button>
        <button
          className={`todayButton ${
            filterType === "today" ? "active-button" : ""
          }`}
          onClick={handleToday}
        >
          Today's
        </button>
        <button
          className={`delayedButton ${
            filterType === "delayed" ? "active-button" : ""
          }`}
          onClick={handleDelayed}
        >
          Delayed
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
