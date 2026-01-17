//src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div style={header}>
      <h2 style={{ marginBottom: "10px" }}>Smart Job Portal</h2>

      {/* Navigation Links BELOW title */}
      <nav>
        <Link to="/" style={link}>Home</Link>
        <Link to="/jobs" style={link}>Jobs</Link>
        <Link to="/profile" style={link}>Profile</Link>
        <Link to="/register" style={link}>Register</Link>
        <Link to="/login" style={link}>Login</Link>
      </nav>
    </div>
  );
}

/* Styles */
const header = {
  backgroundColor: "#ffd39b",
  color: "black",
  padding: "15px",
  textAlign: "center",
};

const link = {
  color: "black",
  margin: "0 15px",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Header;
