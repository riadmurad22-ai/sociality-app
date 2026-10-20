"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  CheckCircle2,
  Home,
  PlusSquare,
  User as UserIcon,
  Bookmark,
  Grid,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"gallery" | "saved">("gallery");
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);

  // Contoh data galeri foto pos profil
  const posts = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pb-24">
      {/* Header Atas */}
      <header className="w-full h-20 sticky top-0 z-20 bg-black/90 backdrop-blur-md border-b border-[#181D27] px-6 md:px-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Sociality Logo"
            className="w-6 h-6 object-contain"
          />
          <span className="font-bold text-xl tracking-tight">Sociality</span>
        </div>

        <div className="hidden md:flex items-center bg-[#0D0E12] border border-white/10 rounded-full px-4 py-2 w-72">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10 border border-white/20">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Success Alert Banner (Jika Baru Selesai Update Profile) */}
      {showSuccessAlert && (
        <div className="w-full max-w-203 mt-4 px-4 flex justify-end">
          <div
            className="bg-[#079455] text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg text-xs font-medium cursor-pointer"
            onClick={() => setShowSuccessAlert(false)}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Success Update</span>
          </div>
        </div>
      )}

      {/* Konten Profil Utama */}
      <main className="w-full max-w-203 flex flex-col items-center gap-6 p-4 mt-4">
        {/* Info Pengguna & Tombol Edit */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Avatar className="w-20 h-20 border-2 border-purple-500">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-bold">John Doe</h1>
            <p className="text-xs text-gray-400">johndoe</p>
          </div>
          <p className="text-xs text-gray-300 max-w-md">
            Creating unforgettable moments with my favorite person! 📸 Let's
            cherish every second together!
          </p>

          <Button
            onClick={() => router.push("/profile/edit")}
            variant="outline"
            className="bg-black/40 border-white/20 hover:bg-white/10 text-white text-xs h-9 px-6 rounded-xl mt-1"
          >
            Edit Profile
          </Button>
        </div>

        {/* Statistik Profil (Post, Followers, Following, Likes) */}
        <div className="w-full grid grid-cols-4 gap-2 bg-[#0D0E12] border border-white/10 rounded-2xl py-4 px-6 text-center my-2">
          <div className="flex flex-col">
            <span className="font-bold text-base">50</span>
            <span className="text-[11px] text-gray-400">Post</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base">100</span>
            <span className="text-[11px] text-gray-400">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base">43</span>
            <span className="text-[11px] text-gray-400">Following</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base">567</span>
            <span className="text-[11px] text-gray-400">Likes</span>
          </div>
        </div>

        {/* Tab Switcher (Gallery & Saved) */}
        <div className="w-full flex border-b border-white/10">
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex-1 pb-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === "gallery"
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-500"
            }`}
          >
            <Grid className="w-4 h-4" /> Gallery
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 pb-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === "saved"
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-500"
            }`}
          >
            <Bookmark className="w-4 h-4" /> Saved
          </button>
        </div>

        {/* Grid Gallery Posts */}
        <div className="w-full grid grid-cols-3 gap-3">
          {posts.map((imgUrl, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-900 rounded-xl overflow-hidden border border-white/10 group relative"
            >
              <img
                src={imgUrl}
                alt={`Post ${index}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#0A0D12]/95 backdrop-blur-md border-t border-[#181D27] py-3 px-6 flex items-center justify-around max-w-md mx-auto rounded-t-2xl shadow-lg">
        <button
          onClick={() => router.push("/feed")}
          className="text-gray-400 hover:text-white flex flex-col items-center"
        >
          <Home className="w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-white flex flex-col items-center">
          <Search className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/create")}
          className="text-gray-400 hover:text-white flex flex-col items-center"
        >
          <PlusSquare className="w-6 h-6" />
        </button>
        <button className="text-purple-500 flex flex-col items-center">
          <UserIcon className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}
