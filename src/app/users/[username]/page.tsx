"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Search,
  Home,
  PlusSquare,
  User as UserIcon,
  Grid,
  UserPlus,
  UserCheck,
  ArrowLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function FriendsProfilePage() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(124);

  // Sample data postingan teman/user lain
  const userPosts = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
  ];

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
    }
  };

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

      {/* Main Container Friends Profile */}
      <main className="w-full max-w-203 flex flex-col items-center gap-6 p-4 mt-4">
        {/* Tombol Back */}
        <div className="w-full flex justify-start">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        {/* Info Pengguna & Tombol Follow/Unfollow */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Avatar className="w-20 h-20 border-2 border-purple-500">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces" />
            <AvatarFallback>
              {username ? username.substring(0, 2).toUpperCase() : "US"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-bold capitalize">
              {username || "Jane Smith"}
            </h1>
            <p className="text-xs text-gray-400">@{username || "janesmith"}</p>
          </div>
          <p className="text-xs text-gray-300 max-w-md">
            Digital creator & travel enthusiast ✨ Exploring the world one photo
            at a time.
          </p>

          <Button
            onClick={handleFollowToggle}
            className={`h-9 px-6 rounded-xl text-xs font-medium mt-1 flex items-center gap-1.5 transition-all ${
              isFollowing
                ? "bg-transparent border border-white/20 text-gray-300 hover:bg-white/10"
                : "bg-[#6C5CE7] hover:bg-[#5b4cc4] text-white shadow-lg"
            }`}
          >
            {isFollowing ? (
              <>
                <UserCheck className="w-4 h-4" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Follow
              </>
            )}
          </Button>
        </div>

        {/* Statistik Profil (Post, Followers, Following, Likes) */}
        <div className="w-full grid grid-cols-4 gap-2 bg-[#0D0E12] border border-white/10 rounded-2xl py-4 px-6 text-center my-2">
          <div className="flex flex-col">
            <span className="font-bold text-base">{userPosts.length}</span>
            <span className="text-[11px] text-gray-400">Post</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base">{followerCount}</span>
            <span className="text-[11px] text-gray-400">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base">89</span>
            <span className="text-[11px] text-gray-400">Following</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base">312</span>
            <span className="text-[11px] text-gray-400">Likes</span>
          </div>
        </div>

        {/* Header Tab Gallery */}
        <div className="w-full flex border-b border-white/10">
          <div className="pb-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 border-purple-500 text-white w-full">
            <Grid className="w-4 h-4" /> Gallery
          </div>
        </div>

        {/* Grid Gallery Posts */}
        <div className="w-full grid grid-cols-3 gap-3">
          {userPosts.map((imgUrl, index) => (
            <div
              key={index}
              onClick={() => router.push(`/posts/${index + 1}`)}
              className="aspect-square bg-gray-900 rounded-xl overflow-hidden border border-white/10 group relative cursor-pointer"
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
        <button
          onClick={() => router.push("/users/search")}
          className="text-gray-400 hover:text-white flex flex-col items-center"
        >
          <Search className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/create")}
          className="text-gray-400 hover:text-white flex flex-col items-center"
        >
          <PlusSquare className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/profile")}
          className="text-gray-400 hover:text-white flex flex-col items-center"
        >
          <UserIcon className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}
