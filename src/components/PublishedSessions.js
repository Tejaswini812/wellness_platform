import React, { useEffect, useState } from "react";
import { getPublicSessions } from "../api";

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function PublishedSessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      const data = await getPublicSessions();
      setSessions(Array.isArray(data) ? data : data.data || []);
    }
    fetchSessions();
  }, []);

  return (
    <div
      style={{
        padding: "40px 0",
        background: "linear-gradient(120deg, #f8f6f2 0%, #e7d8c9 100%)",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2.2rem",
          fontWeight: "700",
          color: "#6f5640",
          marginBottom: "32px",
          letterSpacing: "1px",
        }}
      >
        Published Wellness Sessions
      </h2>
      {sessions.length === 0 ? (
        <p style={{ textAlign: "center", color: "#a67c52", fontSize: "1.1rem" }}>
          No sessions published yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "32px",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {sessions.map((session) => (
            <div
              key={session._id}
              style={{
                background: "#fffdf8",
                borderRadius: "18px",
                boxShadow: "0 6px 24px rgba(140, 111, 86, 0.10)",
                padding: "28px 22px",
                transition: "box-shadow 0.2s",
                border: "1px solid #e7d8c9",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {session.thumbnailUrl && (
                <img
                  src={session.thumbnailUrl}
                  alt={session.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "18px",
                    boxShadow: "0 2px 8px rgba(166, 124, 82, 0.08)",
                  }}
                />
              )}
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: "600",
                  color: "#8c6f56",
                  marginBottom: "8px",
                  letterSpacing: "0.5px",
                }}
              >
                {session.title}
              </h3>
              <p
                style={{
                  color: "#5b4636",
                  fontSize: "1rem",
                  marginBottom: "12px",
                  minHeight: "48px",
                }}
              >
                {session.description}
              </p>
              <div style={{ marginBottom: "10px" }}>
                {session.tags &&
                  session.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: "inline-block",
                        background: "#e7d8c9",
                        color: "#6f5640",
                        borderRadius: "6px",
                        padding: "4px 12px",
                        fontSize: "0.92rem",
                        fontWeight: "500",
                        marginRight: "7px",
                        marginBottom: "4px",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "#a67c52",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "1.1rem",
                  }}
                  title={session.instructor}
                >
                  {getInitials(session.instructor)}
                </div>
                <span style={{ color: "#6f5640", fontWeight: "500" }}>
                  {session.instructor}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.98rem",
                  color: "#8c6f56",
                  marginBottom: "8px",
                }}
              >
                <span>
                  <b>Difficulty:</b> {session.difficulty}
                </span>
                <span>
                  <b>Duration:</b> {session.duration}
                </span>
              </div>
              {session.scheduledTime && (
                <div
                  style={{
                    fontSize: "0.95rem",
                    color: "#a67c52",
                    marginBottom: "8px",
                  }}
                >
                  <b>Scheduled:</b>{" "}
                  {new Date(session.scheduledTime).toLocaleString()}
                </div>
              )}
              {session.json_file_url && (
                <a
                  href={session.json_file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#4a90e2",
                    fontSize: "0.98rem",
                    textDecoration: "underline",
                    marginTop: "10px",
                    display: "inline-block",
                  }}
                >
                  View JSON Data
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PublishedSessions;