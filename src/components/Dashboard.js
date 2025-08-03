import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [publishedSessions, setPublishedSessions] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch total members
    fetch("http://localhost:5000/api/auth/users-count")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTotalMembers(data.count);
      });

    // Fetch published sessions count
    fetch("http://localhost:5000/api/sessions/count")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPublishedSessions(data.publishedCount);
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper" style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "linear-gradient(180deg, #6f5640, #a67c52)",
          color: "white",
          height: "100vh",
          padding: "20px",
          position: "fixed",
          boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin"
            style={{
              width: "80px",
              borderRadius: "50%",
              marginBottom: "10px",
              border: "3px solid #fff",
            }}
          />
          <h2 style={{ margin: "0", fontSize: "20px" }}>Admin</h2>
        </div>

        {/* Navigation Links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {[
            { label: "Dashboard", route: "/dashboard" },
            { label: "Create New Session", route: "/create-session" },
            { label: "Published Wellness Sessions", route: "/published-sessions" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.route)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                textAlign: "left",
                padding: "10px",
                borderRadius: "6px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.background = "#a67c52")}
              onMouseOut={(e) => (e.target.style.background = "none")}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "270px", padding: "30px", flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#6f5640" }}>
            Welcome to the Dashboard
          </h1>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#a67c52",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6f5640")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#a67c52")}
          >
            Logout
          </button>
        </div>

        {/* Cards Section */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* Total Members Card */}
          <div
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #a67c52, #6f5640)",
              borderRadius: "12px",
              padding: "25px",
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(140, 111, 86, 0.15)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2>Total Members</h2>
            <p style={{ fontSize: "32px", margin: "10px 0" }}>{totalMembers}</p>
          </div>

          {/* Published Sessions Card */}
          <div
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #6f5640, #e7d8c9)",
              borderRadius: "12px",
              padding: "25px",
              textAlign: "center",
              color: "#6f5640",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(140, 111, 86, 0.15)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2>Published Sessions</h2>
            <p style={{ fontSize: "32px", margin: "10px 0" }}>{publishedSessions}</p>
          </div>
        </div>

        {/* Announcement Banner */}
        <div
          style={{
            backgroundColor: "#e7d8c9",
            padding: "20px",
            borderRadius: "8px",
            marginTop: "30px",
            textAlign: "center",
            fontSize: "18px",
            boxShadow: "0 3px 8px rgba(140, 111, 86, 0.10)",
            color: "#6f5640",
            fontWeight: "500",
          }}
        >
          <p style={{ margin: "0" }}>
            📢 <strong>New Announcement:</strong> Check all published wellness
            sessions in the "Published Wellness Sessions" page!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;