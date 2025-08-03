import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to Arvyax Private Limited</h1>
      <div className="landing-buttons">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
