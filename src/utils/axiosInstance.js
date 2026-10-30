import axios from "axios";
import { BASE_URL } from "./apiPath.js";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized - token might be invalid or expired
        localStorage.removeItem("token"); // Clear token from storage
        window.location.href = "/login"; // Redirect to login page
      } else if (error.response.status === 403) {
        // Forbidden - user does not have permission
        alert("You do not have permission to perform this action.");
      } else {
        // Handle other errors
        alert(
          error.response.data.error || "An error occurred. Please try again.",
        );
      }
    } else if (error.request) {
      // No response received from server
      alert("No response from server. Please check your network connection.");
    } else {
      // Other errors
      alert("An error occurred. Please try again.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
