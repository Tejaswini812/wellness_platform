const API_URL = "http://localhost:5000/api"; // Backend API

// ---------------------- AUTH FUNCTIONS ----------------------
export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    // Save token automatically after login
    if (data.success && data.token) {
      saveToken(data.token);
    }

    return data;
  } catch {
    return { success: false, message: "Network error" };
  }
}

export async function signupUser(name, email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    // Save token automatically after signup
    if (data.success && data.token) {
      saveToken(data.token);
    }

    return data;
  } catch {
    return { success: false, message: "Network error" };
  }
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

// ---------------------- SESSION FUNCTIONS ----------------------

// Fetch all published sessions (public)
export async function getPublicSessions() {
  try {
    const res = await fetch(`${API_URL}/sessions`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

// Save draft session
export async function saveDraft(data) {
  const token = getToken();
  if (!token) return { success: false, message: "No token found. Please log in." };

  try {
    const res = await fetch(`${API_URL}/sessions/my-sessions/save-draft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch {
    return { success: false, message: "Network error" };
  }
}

// Publish session
export async function publishSession(data) {
  const token = getToken();
  if (!token) return { success: false, message: "No token found. Please log in." };

  try {
    const res = await fetch(`${API_URL}/sessions/my-sessions/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch {
    return { success: false, message: "Network error" };
  }
}
