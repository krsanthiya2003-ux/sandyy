// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("seeker"); // Default role
  const [formData, setFormData] = useState({ name: "", email: "", password: "", companyName: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/register", { ...formData, role });
      alert(`Registration Successful! \nYour Unique ID is: ${res.data.userId} \nPlease keep this safe to Login.`);
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Email might already exist.");
    }
  };

  return (
    <div style={pageBg}>
      <div style={card}>
        <h2>Register as {role === "seeker" ? "Job Seeker" : "Employer"}</h2>
        <div style={tabContainer}>
          <button onClick={() => setRole("seeker")} style={role === "seeker" ? activeTab : tab}>Job Seeker</button>
          <button onClick={() => setRole("employer")} style={role === "employer" ? activeTab : tab}>Employer</button>
        </div>

        <form onSubmit={handleRegister}>
          <input style={input} placeholder="Full Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input style={input} type="email" placeholder="Email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
          {role === "employer" && (
            <input style={input} placeholder="Company Name" required onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
          )}
          <input style={input} type="password" placeholder="Password" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <button type="submit" style={regBtn}>Get My Unique ID</button>
        </form>
      </div>
    </div>
  );
}

const pageBg = { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f0f2f5" };
const card = { background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", width: "350px", textAlign: "center" };
const tabContainer = { display: "flex", justifyContent: "space-around", marginBottom: "20px" };
const input = { width: "100%", padding: "10px", margin: "10px 0", boxSizing: "border-box" };
const activeTab = { background: "#1976d2", color: "white", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer" };
const tab = { background: "#e0e0e0", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer" };
const regBtn = { width: "100%", padding: "12px", background: "#2e7d32", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" };

export default Register;