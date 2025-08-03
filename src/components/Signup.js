import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser, saveToken } from "../api";
import "../styles.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signupUser(name, email, password);

    if (result.success && result.token) {
      saveToken(result.token);
      navigate("/dashboard");
    } else {
      alert(result.message || "Signup failed");
    }
  };

  return (
    <div
      className="auth-page"
      style={{
        backgroundImage: "url('/image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      <div className="signup-card auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p className="subtitle">Sign up to start your wellness journey</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>
        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}