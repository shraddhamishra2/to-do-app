import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("Submitted!");
    try {
      const res = await axios.post(
        "https://task-manager-server-chi-three.vercel.app/user/login",
        { emailId: username, passWord: password }
      );
      console.log(res);
      alert(res?.data?.message);
      localStorage.setItem("useremail", res?.data?.user?.emailId);
      localStorage.setItem("name", res?.data?.user?.name);
      navigate("task");
    } catch (error) {
      console.log("Error: ", error);
      alert("Login failed" + error?.response?.data?.message);
    }
  };
  return (
    <div className="auth-outer-container">
      <div className="auth-header-container">
        <div className="auth-heading">Welcome</div>
        <div className="auth-sub-heading">Login to continue</div>
      </div>
      <div className="auth-form-container">
        <div className="card">
          <form action="" className="auth-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <div className="label">Username or Email</div>
              <input
                type="text"
                className="input"
                placeholder="username@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <div className="label">Password</div>
              <input
                type="password"
                className="input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <button type="submit">Login</button>
            <div className="small-text">
              Don't have an account?{" "}
              <Link to={"/register"}>
                <span className="primary-text">Sign Up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
