import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Task from "./pages/Task";
import TaskDetail from "./pages/TaskDetail";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Profile from "./pages/Profile";

function App() {
  return (
    // <div className="App">
    //   <Login />
    //   <Register />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="register" element={<Register />} />
        <Route path="task" element={<Task />} />
        <Route path="addtask" element={<AddTask />} />
        <Route path="details" element={<TaskDetail />} />
        <Route path="edit" element={<EditTask />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
