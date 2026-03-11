import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://be-social-media-api-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk Token (Nanti digunakan setelah Login)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
