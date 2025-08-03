import React, { useState, useEffect } from "react";
import { saveDraft, publishSession } from "../api";
import "./SessionEditor.css";

export default function SessionEditor() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonUrl, setJsonUrl] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [instructor, setInstructor] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  // Convert hours & minutes to formatted string
  const getDurationString = () => {
    let h = hours ? `${hours}h ` : "";
    let m = minutes ? `${minutes}m` : "";
    return (h + m).trim() || "0m";
  };

  // Auto-save after 5 sec inactivity
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (title || tags || jsonUrl || description) {
        handleAutoSave();
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [title, tags, jsonUrl, description, hours, minutes]);

  const buildSessionData = () => ({
    title,
    tags: tags.split(",").map(tag => tag.trim()),
    json_file_url: jsonUrl,
    description,
    difficulty,
    duration: getDurationString(),
    instructor,
    thumbnailUrl,
    scheduledTime
  });

  const handleAutoSave = async () => {
    try {
      const data = buildSessionData();
      const res = await saveDraft(data);
      if (res && res.success && res.data && res.data._id) {
        setStatusMsg("Draft auto-saved!");
        setTimeout(() => setStatusMsg(""), 2000);
      } else {
        setStatusMsg(res.message || "Auto-save failed (unauthorized). Please login again.");
      }
    } catch (error) {
      console.error("Auto-save error:", error);
      setStatusMsg("Auto-save failed (unauthorized). Please login again.");
    }
  };

  const handlePublish = async () => {
    try {
      const data = buildSessionData();
      const result = await publishSession(data);
      console.log("Publish Response:", result);

      if (result && result.success && result.data && result.data._id) {
        alert("Session published successfully!");
        resetFields();
      } else {
        alert(result.message || "Failed to publish session. Please login again.");
      }
    } catch (error) {
      console.error("Publish error:", error);
      alert("Error publishing session. Check console.");
    }
  };

  const resetFields = () => {
    setTitle("");
    setTags("");
    setJsonUrl("");
    setDescription("");
    setHours("");
    setMinutes("");
    setInstructor("");
    setThumbnailUrl("");
    setScheduledTime("");
  };

  return (
    <div className="editor-container">
      <h2>Create Wellness Session</h2>

      <input
        type="text"
        placeholder="Enter session title (e.g., Morning Yoga)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="editor-input"
      />

      <input
        type="text"
        placeholder="Tags (comma separated, e.g., yoga, beginners)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="editor-input"
      />

      <textarea
        placeholder="Session description (benefits, instructions, etc.)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="editor-textarea"
      />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="editor-input"
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <div className="duration-fields">
        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="editor-input small-input"
        />
        <span>h</span>
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="editor-input small-input"
        />
        <span>m</span>
      </div>

      <input
        type="text"
        placeholder="Instructor name"
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
        className="editor-input"
      />

      <input
        type="text"
        placeholder="Thumbnail image URL"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
        className="editor-input"
      />

      <input
        type="datetime-local"
        value={scheduledTime}
        onChange={(e) => setScheduledTime(e.target.value)}
        className="editor-input"
      />

      <textarea
        placeholder="Paste JSON file URL or content here..."
        value={jsonUrl}
        onChange={(e) => setJsonUrl(e.target.value)}
        className="editor-textarea"
      />

      <div className="editor-buttons">
        <button className="btn-publish" onClick={handlePublish}>
          Publish
        </button>
        <button className="btn-draft" onClick={handleAutoSave}>
          Save Draft
        </button>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>

      {statusMsg && <p className="autosave-msg">{statusMsg}</p>}
    </div>
  );
}