import { RiFlag2Line } from "react-icons/ri";
import Checkbox from "../assets/CheckboxEmpty.png";
import CheckboxFilled from "../assets/Checkbox.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../utils";

const TaskInfo = ({ tasks, setRefresh, setFilterType }) => {
  const handleCheckboxClick = async (id) => {
    try {
      await axios.put(`${url}task/status/${id}`);
      setFilterType("all");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="tasks-container">
      {tasks &&
        tasks
          .map((task, index) => {
            const taskDate = new Date(task.duedate);
            const formatter = new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            const date = formatter.format(taskDate);
            let taskPriority = "";
            // console.log("Task priority: ", task?.priority);
            if (task?.priority === "high") {
              taskPriority = "high-priority";
            }
            if (task?.priority === "medium") {
              taskPriority = "medium-priority";
            }
            if (task?.priority === "low") {
              taskPriority = "low-priority";
            }
            return (
              <div className="card task-card" key={index}>
                <div className="task-info-group">
                  <img
                    src={task.completed ? CheckboxFilled : Checkbox}
                    alt="Incomplete task"
                    className="empty-checkbox"
                    onClick={() => {
                      handleCheckboxClick(task._id);
                    }}
                  />
                  <div
                    className="task-info"
                    onClick={() => {
                      navigate("/details", { state: task });
                    }}
                  >
                    <div className="task-title-priority">
                      <div className="task-title">{task?.title}</div>
                      <div className={`${taskPriority}`}>
                        {task?.priority} priority
                      </div>
                    </div>
                    <div className="small-text">{task?.description}</div>
                    <div className="date">
                      <div className="date-icon">
                        <RiFlag2Line />
                      </div>
                      {date}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          .reverse()}
    </div>
  );
};

export default TaskInfo;
