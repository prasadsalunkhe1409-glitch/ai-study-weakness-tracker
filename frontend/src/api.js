import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-study-weakness-tracker-d0k1.onrender.com/api",
});

// Attach token automatically
API.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const parsed = JSON.parse(userInfo);

      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;