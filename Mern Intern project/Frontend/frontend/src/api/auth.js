import { request, withAuth } from "./client";

export const registerUser = async (payload) => {
  try {
    const data = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  } catch (error) {
    console.error("Register API error:", error);
    throw error;
  }
};

export const loginUser = async (payload) => {
  try {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

export const fetchProfile = async (token) => {
  try {
    const data = await request("/auth/profile", {
      method: "GET",
      headers: withAuth(token),
    });
    return data;
  } catch (error) {
    console.error("Profile API error:", error);
    throw error;
  }
};
