import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === cpassword) {
      try {
        const res = await axios
          .post("https://task-manager-server-chi-three.vercel.app/user/add", {
            emailId: email,
            name: username,
            passWord: password,
          })
          .then(() => {
            alert("Registration successful!");
            setUsername("");
            setPassword("");
            setCpassword("");
            setEmail("");
            navigate("/");
          })
          .catch((error) => alert(error.response.data.message));
      } catch (error) {
        console.log("Registration failed!" + error);
      }
    } else {
      alert("Password doesn't match!");
    }
  };
  return (
    <div className="auth-outer-container">
      <div className="auth-header-container">
        <div className="auth-heading">Register as New User</div>
      </div>
      <div className="auth-form-container">
        <div className="card">
          <form action="" className="auth-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <div className="label">Name</div>
              <input
                type="text"
                className="input"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <div className="label">Email</div>
              <input
                type="email"
                className="input"
                placeholder="username@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <div className="label">Password</div>
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <div className="label">Confirm Password</div>
              <input
                type="password"
                className="input"
                placeholder="Re-enter Password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
            <div className="small-text">
              Already have an account?{" "}
              <Link to={"/"}>
                <span className="primary-text">Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
