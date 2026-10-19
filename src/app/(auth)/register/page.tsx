"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Sparkles } from "lucide-react";

import { api } from "@/lib/api";
import { registerSchema, RegisterInput } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Sesuai endpoint API /api/auth/register
      await api.post("/api/auth/register", {
        name: data.name,
        username: data.username,
        phone: data.phone,
        password: data.password,
      });

      // Setelah register sukses, arahkan ke halaman login
      router.push("/login");
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Terjadi kesalahan saat pendaftaran. Silakan coba lagi.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex items-center justify-center p-4 overflow-hidden">
      {/* Efek Gradient / Glow Ungu di Bagian Bawah */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-112.5 h-75 bg-purple-600/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Card Form Utama (Presisi sesuai Figma Register) */}
      <div className="relative z-10 w-full max-w-86.25 bg-black/40 backdrop-blur-md rounded-[16px] border border-white/10 p-[32px_16px] flex flex-col gap-4 shadow-2xl my-8">
        {/* Header / Logo */}
        <div className="flex flex-col items-center justify-center text-center gap-2 mb-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="font-bold text-lg tracking-tight">Sociality</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight mt-1">Register</h1>
        </div>

        {/* Form Register */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* Field Name */}
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="name"
              className="text-xs font-semibold text-gray-200"
            >
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register("name")}
              className="bg-[#0D0E12] border-white/10 text-white placeholder:text-gray-500 rounded-lg h-10 text-sm focus-visible:ring-purple-500"
            />
            {errors.name && (
              <span className="text-[11px] text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Field Username */}
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="username"
              className="text-xs font-semibold text-gray-200"
            >
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              {...register("username")}
              className="bg-[#0D0E12] border-white/10 text-white placeholder:text-gray-500 rounded-lg h-10 text-sm focus-visible:ring-purple-500"
            />
            {errors.username && (
              <span className="text-[11px] text-red-500">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Field Number Phone */}
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="phone"
              className="text-xs font-semibold text-gray-200"
            >
              Number Phone
            </Label>
            <Input
              id="phone"
              placeholder="Enter your number phone"
              {...register("phone")}
              className="bg-[#0D0E12] border-white/10 text-white placeholder:text-gray-500 rounded-lg h-10 text-sm focus-visible:ring-purple-500"
            />
            {errors.phone && (
              <span className="text-[11px] text-red-500">
                {errors.phone.message}
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

          {/* Field Confirm Password */}
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="confirmPassword"
              className="text-xs font-semibold text-gray-200"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your confirm password"
                {...register("confirmPassword")}
                className="bg-[#0D0E12] border-white/10 text-white placeholder:text-gray-500 rounded-lg h-10 text-sm pr-9 focus-visible:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-[11px] text-red-500">
                {errors.confirmPassword.message}
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

        {/* Footer / Link ke Login */}
        <div className="text-center text-xs text-gray-300 mt-1">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#8C7CFF] hover:underline font-semibold"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
