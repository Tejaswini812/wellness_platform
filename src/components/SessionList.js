import React, { useEffect, useState } from "react";
import { getPublicSessions } from "../api";

export default function SessionList() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      const data = await getPublicSessions();
      setSessions(data);
    }
    fetchSessions();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Published Wellness Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions available.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session._id}>{session.title} ({session.status})</li>
          ))}
        </ul>
      )}
    </div>
  );
}
