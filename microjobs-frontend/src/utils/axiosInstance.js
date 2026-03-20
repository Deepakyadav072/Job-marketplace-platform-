import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔥 ALWAYS ATTACH TOKEN
axiosInstance.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    try {
      const user = JSON.parse(storedUser);

      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (err) {
      console.error("Token parse error", err);
    }
  }

  return config;
});

export default axiosInstance;