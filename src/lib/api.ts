import axios from "axios";

// Ganti baseURL sesuai dengan URL backend API Anda
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api-example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menempelkan token otorisasi secara otomatis
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
