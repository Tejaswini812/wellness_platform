import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import SessionEditor from "./components/SessionEditor";
import PublishedSessions from "./components/PublishedSessions";
import ForgotPassword from "./components/ForgotPassword"; // <-- Add this import

function App() {
  return (
    <Router>
      <Routes>
        {/* Default login */}
        <Route path="/" element={<Login />} />

        {/* Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* <-- Add this route */}

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Create Session */}
        <Route path="/create-session" element={<SessionEditor />} />

        {/* Published Sessions */}
        <Route path="/published-sessions" element={<PublishedSessions />} />
      </Routes>
    </Router>
  );
}

export default App;