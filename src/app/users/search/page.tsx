"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search as SearchIcon,
  Home,
  PlusSquare,
  User as UserIcon,
  UserPlus,
  UserCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserResult {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  isFollowing: boolean;
}

export default function SearchUsersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data hasil pencarian
  const dummyUsers: UserResult[] = [
    {
      id: "1",
      name: "Jane Smith",
      username: "janesmith",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      bio: "Digital creator & travel enthusiast ✨",
      isFollowing: false,
    },
    {
      id: "2",
      name: "Alex Rivera",
      username: "arivera",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      bio: "Software Engineer | Coffee lover ☕",
      isFollowing: true,
    },
    {
      id: "3",
      name: "Sophia Chen",
      username: "sophiac",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
      bio: "Photography & Lifestyle 📸",
      isFollowing: false,
    },
  ];

  const [users, setUsers] = useState<UserResult[]>(dummyUsers);

  // Filter hasil pencarian secara lokal
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleFollow = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user,
      ),
    );
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

        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10 border border-white/20">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Container Search */}
      <main className="w-full max-w-150 flex flex-col gap-6 p-4 mt-4">
        {/* Search Bar Input */}
        <div className="relative w-full">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search users by name or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D0E12] border-white/10 text-white placeholder:text-gray-500 pl-11 pr-4 h-11 rounded-xl text-xs focus-visible:ring-purple-500"
          />
        </div>

        {/* User Search Results List */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
            {searchQuery ? "Search Results" : "Suggested Users"}
          </h2>

          {filteredUsers.length === 0 ? (
            <div className="bg-[#0D0E12] border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center gap-2">
              <SearchIcon className="w-8 h-8 text-gray-600 mb-1" />
              <p className="text-xs font-semibold text-gray-300">
                No users found
              </p>
              <p className="text-[11px] text-gray-500">
                Try searching for a different name or username.
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-[#0D0E12] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-white/20 transition-all cursor-pointer"
                onClick={() => router.push(`/users/${user.username}`)}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Avatar className="w-11 h-11 border border-white/10 shrink-0">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-bold text-white truncate">
                      {user.name}
                    </span>
                    <span className="text-[11px] text-gray-400 truncate">
                      @{user.username}
                    </span>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">
                      {user.bio}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFollow(user.id);
                  }}
                  variant={user.isFollowing ? "outline" : "default"}
                  className={`h-8 px-3 rounded-lg text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all ${
                    user.isFollowing
                      ? "bg-transparent border-white/20 text-gray-300 hover:bg-white/10"
                      : "bg-[#6C5CE7] hover:bg-[#5b4cc4] text-white"
                  }`}
                >
                  {user.isFollowing ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      Follow
                    </>
                  )}
                </Button>
              </div>
            ))
          )}
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
        <button className="text-purple-500 flex flex-col items-center">
          <SearchIcon className="w-6 h-6" />
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
