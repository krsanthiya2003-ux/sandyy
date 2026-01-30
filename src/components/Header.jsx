// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully! 👋");
    navigate("/login");
  };

  return (
    <div style={headerStyle}>
      <h2>Smart Job Portal</h2>
      <nav style={navStyle}>
        <Link to="/" style={link}>Home</Link>
        <Link to="/jobs" style={link}>Jobs</Link>
        <Link to="/profile" style={link}>Profile</Link>
        
        {!user ? (
          <>
            <Link to="/register" style={link}>Register</Link>
            <Link to="/login" style={link}>Login</Link>
          </>
        ) : (
          <div style={userSection}>
            <span style={idBadge}>{user.userId}</span>
            <button onClick={handleLogout} style={logoutBtn}>Logout</button>
          </div>
        )}
      </nav>
    </div>
  );
}

const headerStyle = { backgroundColor: "#ffd39b", padding: "15px", textAlign: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" };
const navStyle = { display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "10px" };
const link = { color: "black", textDecoration: "none", fontWeight: "bold" };
const userSection = { display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" };
const idBadge = { background: "#333", color: "white", padding: "4px 10px", borderRadius: "20px", fontSize: "12px" };
const logoutBtn = { background: "#ff5252", color: "white", border: "none", padding: "5px 12px", borderRadius: "5px", cursor: "pointer" };

export default Header;