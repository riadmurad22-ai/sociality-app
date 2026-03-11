import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

/**
 * Hook untuk Login
 * Mengirim email & password ke API, menyimpan token ke Zustand,
 * dan mengarahkan user ke Timeline.
 */
export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: any) => {
      // Pastikan endpoint sesuai dengan dokumentasi API (biasanya /login)
      const response = await axiosInstance.post("/login", data);
      return response.data;
    },
    onSuccess: (res) => {
      // Mengambil token dari response API
      const token = res.token || res.data?.token;
      if (token) {
        setToken(token);
        alert("Login Berhasil! Selamat datang di Sociality.");
        navigate("/timeline");
      }
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Login Gagal! Email atau password salah.";
      alert(message);
    },
  });
};

/**
 * Hook untuk Registrasi Akun Baru
 * Mengirim data (username, email, password) ke API.
 */
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: any) => {
      // Pastikan endpoint sesuai dengan dokumentasi API (biasanya /register)
      const response = await axiosInstance.post("/register", data);
      return response.data;
    },
    onSuccess: () => {
      alert("Registrasi Berhasil! Silakan masuk menggunakan akun baru kamu.");
      navigate("/login"); // Redirect ke login setelah sukses daftar
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Registrasi Gagal! Email mungkin sudah digunakan.";
      alert(message);
    },
  });
};
