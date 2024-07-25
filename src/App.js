import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Task from "./pages/Task";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
