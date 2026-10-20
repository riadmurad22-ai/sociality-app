"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { api } from "@/lib/api";
import { loginSchema, LoginInput } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Sesuai endpoint API /api/auth/login
      await api.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Setelah sukses, arahkan ke halaman feed
      router.push("/feed");
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Email atau password salah. Silakan coba lagi.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex items-center justify-center p-4 overflow-hidden">
      {/* Efek Gradient / Glow Ungu di Bagian Bawah */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-112.5 h-75 bg-purple-600/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Card Form Utama */}
      <div className="relative z-10 w-full max-w-86.25 bg-black/40 backdrop-blur-md rounded-[16px] border border-white/10 p-[32px_16px] flex flex-col gap-4 shadow-2xl my-8">
        {/* Header / Logo */}
        <div className="flex flex-col items-center justify-center text-center gap-2 mb-1">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Sociality Logo"
              className="w-5 h-5 object-contain"
            />
            <span className="font-bold text-lg tracking-tight">Sociality</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight mt-1">Login</h1>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* Field Email */}
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="email"
              className="text-xs font-semibold text-gray-200"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="bg-[#0D0E12] border-white/10 text-white placeholder:text-gray-500 rounded-lg h-10 text-sm focus-visible:ring-purple-500"
            />
            {errors.email && (
              <span className="text-[11px] text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Field Password */}
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="password"
              className="text-xs font-semibold text-gray-200"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="bg-[#0D0E12] border-white/10 text-white placeholder:text-gray-500 rounded-lg h-10 text-sm pr-9 focus-visible:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-[11px] text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Error Message dari API */}
          {errorMessage && (
            <div className="p-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded text-center">
              {errorMessage}
            </div>
          )}

          {/* Tombol Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#6C5CE7] hover:bg-[#5b4cc4] text-white font-medium rounded-full h-10 mt-2 transition-all"
          >
            {isLoading ? "Processing..." : "Submit"}
          </Button>
        </form>

        {/* Footer / Link ke Register */}
        <div className="text-center text-xs text-gray-300 mt-1">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#8C7CFF] hover:underline font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
