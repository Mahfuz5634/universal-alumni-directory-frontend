import api from "../services/api";

// 🔐 Register
export const registerUser = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { error: "Register failed" };
  }
};

// 🔐 Login
export const loginUser = async (loginData) => {
  try {
    const res = await api.post("/auth/login", loginData);

    // token save
    localStorage.setItem("token", res.data.token);

    return res.data;
  } catch (error) {
    throw error.response?.data || { error: "Login failed" };
  }
};