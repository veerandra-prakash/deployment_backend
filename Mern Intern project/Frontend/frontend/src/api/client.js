const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const request = async (path, options = {}) => {
  let response;
  try {
    const url = `${API_URL}${path}`;
    console.log(`API Request: ${options.method || 'GET'} ${url}`);
    
    response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch (err) {
    console.error("Network error:", err);
    throw new Error(`Network error: Unable to connect to server at ${API_URL}. Please ensure the backend is running.`);
  }

  // Try to parse JSON, but fall back to text for non-JSON responses
  let data = {};
  const text = await response.text().catch(() => "");
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    data = { message: text || "Invalid response from server" };
  }

  if (!response.ok) {
    // Handle structured error responses from backend
    const message = data?.message || data?.error || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    console.error(`API Error (${response.status}):`, message);
    throw error;
  }

  console.log(`API Success: ${options.method || 'GET'} ${path}`);
  return data;
};

export const withAuth = (token) => ({
  Authorization: `Bearer ${token}`,
});

