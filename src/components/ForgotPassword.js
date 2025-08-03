import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending reset email
    if (email) {
      setStatus("Password reset link sent to your email.");
    } else {
      setStatus("Please enter your email.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Send
          </button>
        </form>
        {status && <p style={{ marginTop: "15px", color: "hsl(17, 100%, 25%)" }}>{status}</p>}
      </div>
    </div>
  );
}