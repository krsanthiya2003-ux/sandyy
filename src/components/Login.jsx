// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { userId, password });
      localStorage.setItem("user", JSON.stringify(res.data)); // Save user data
      alert(`Welcome back, ${res.data.name}!`);
      navigate(res.data.role === "employer" ? "/jobs" : "/");
    } catch (err) {
      alert("Invalid Unique ID or Password");
    }
  };

  return (
    <div style={box}>
      <h2>Login with Unique ID</h2>
      <form onSubmit={handleLogin}>
        <input style={input} placeholder="Unique ID (e.g., JS-1001)" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        <input style={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" style={btn}>Login</button>
      </form>
    </div>
  );
}

const box = { maxWidth: "350px", margin: "100px auto", textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" };
const input = { width: "100%", padding: "10px", margin: "10px 0", boxSizing: "border-box" };
const btn = { width: "100%", padding: "10px", background: "#1976d2", color: "white", border: "none", cursor: "pointer" };

export default Login;