//src/components/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const Handle = (e) => {
    e.preventDefault();

    alert("Login Successfully ✅");

    // Login success → Jobs page
    navigate("/jobs");
  };

  return (
    <div style={box}>
      <h2>Login</h2>

      <form onSubmit={Handle}>
        <input type="email" placeholder="Email" required />
        <br /><br />

        <input type="password" placeholder="Password" required />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const box = {
  maxWidth: "400px",
  margin: "80px auto",
  textAlign: "center",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
};

export default Login;
