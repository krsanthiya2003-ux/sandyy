//src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Save user (temporary – localStorage)
    const userData = { name, email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    setError("");
    setSuccess(true);

    // Redirect after success
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div style={pageBg}>
      <div style={card}>
        <h2 style={{ textAlign: "center" }}>Create Account</h2>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div style={successBox}>
            ✅ Registration Successful! <br />
            Welcome <b>{name}</b> 👋 <br />
            Redirecting to Login...
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={input}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={input}
          />

          <button
            type="submit"
            disabled={success}
            style={{
              ...btn,
              backgroundColor: success ? "gray" : "#1976d2",
            }}
          >
            Register
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account?{" "}
        </p>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const pageBg = {
  width:"1400px",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #2193b0, #6dd5ed)",
};

const card = {
  backgroundColor: "white",
  padding: "30px",
  width: "350px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const btn = {
  width: "100%",
  padding: "10px",
  border: "none",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

const successBox = {
  backgroundColor: "#d4edda",
  color: "#155724",
  padding: "10px",
  borderRadius: "6px",
  textAlign: "center",
  marginBottom: "10px",
};

export default Register;
