"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Home,
  Search,
  PlusSquare,
  User,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Data dummy untuk MVP Feed
const initialPosts = [
  {
    id: "1",
    author: {
      name: "johndoe",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    },
    createdAt: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=800&fit=crop",
    caption:
      "Enjoying the wonderful sunny day with best friends! Creating memories that will last a lifetime.",
    likesCount: 124,
    commentsCount: 18,
    isLiked: false,
    isSaved: false,
  },
  {
    id: "2",
    author: {
      name: "sarah_c",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    },
    createdAt: "5 hours ago",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop",
    caption:
      "Peaceful escape to nature. Nothing beats the sound of waves and fresh air.",
    likesCount: 350,
    commentsCount: 42,
    isLiked: true,
    isSaved: true,
  },
];

// Data dummy untuk Modal "Liked by"
const dummyLikedUsers = [
  {
    id: "u1",
    name: "johndoe",
    username: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    isFollowing: false,
  },
  {
    id: "u2",
    name: "sarah_c",
    username: "Sarah Connor",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    isFollowing: true,
  },
  {
    id: "u3",
    name: "michael_j",
    username: "Michael Jordan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    isFollowing: false,
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [likedUsers, setLikedUsers] = useState(dummyLikedUsers);

  // Toggle Like
  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likesCount: post.isLiked
              ? post.likesCount - 1
              : post.likesCount + 1,
          };
        }
        return post;
      }),
    );
  };

  // Toggle Save / Bookmark
  const handleSave = (id: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            isSaved: !post.isSaved,
          };
        }
        return post;
      }),
    );
  };

  // Toggle Follow pada Modal Likes
  const handleToggleFollow = (userId: string) => {
    setLikedUsers(
      likedUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, isFollowing: !user.isFollowing };
        }
        return user;
      }),
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pb-24">
      {/* Header / Navbar Atas dengan logo.png */}
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

      {/* Main Timeline Feed Container */}
      <main className="w-full max-w-150 flex flex-col gap-6 p-4 md:py-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full bg-[#0D0E12] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-xl"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border border-white/10">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>
                    {post.author.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {post.author.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {post.createdAt}
                  </span>
                </div>
              </div>
            </div>

            {/* Post Image Content */}
            <div className="w-full aspect-square bg-gray-900 relative">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Action Buttons Bar */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="transition-transform active:scale-125 focus:outline-none"
                >
                  <Heart
                    className={`w-6 h-6 ${post.isLiked ? "fill-red-500 text-red-500" : "text-white hover:text-gray-300"}`}
                  />
                </button>
                <button className="text-white hover:text-gray-300 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="text-white hover:text-gray-300 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => handleSave(post.id)}
                className="transition-transform active:scale-125 focus:outline-none"
              >
                <Bookmark
                  className={`w-6 h-6 ${post.isSaved ? "fill-white text-white" : "text-white hover:text-gray-300"}`}
                />
              </button>
            </div>

            {/* Likes Count & Caption Section */}
            <div className="px-4 pb-4 flex flex-col gap-1.5">
              <button
                onClick={() => setShowLikesModal(true)}
                className="text-xs font-semibold text-white text-left hover:underline w-fit"
              >
                {post.likesCount} likes
              </button>
              <div className="text-xs text-gray-300 leading-relaxed">
                <span className="font-semibold text-white mr-2">
                  {post.author.name}
                </span>
                {post.caption}
              </div>
              <button className="text-xs text-gray-500 text-left hover:text-gray-400 mt-1">
                View all {post.commentsCount} comments
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Modal "Liked by" */}
      {showLikesModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0A0D12] border border-[#181D27] rounded-2xl p-5 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm text-white">Likes</h3>
              <button
                onClick={() => setShowLikesModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {likedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 border border-white/10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white">
                        {user.name}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {user.username}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleToggleFollow(user.id)}
                    className={`h-8 px-4 text-xs font-medium rounded-full transition-all ${
                      user.isFollowing
                        ? "bg-transparent border border-white/20 text-white hover:bg-white/10"
                        : "bg-[#6C5CE7] hover:bg-[#5b4cc4] text-white"
                    }`}
                  >
                    {user.isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#0A0D12]/95 backdrop-blur-md border-t border-[#181D27] py-3 px-6 flex items-center justify-around max-w-md mx-auto rounded-t-2xl shadow-lg">
        <button className="text-purple-500 flex flex-col items-center">
          <Home className="w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-white flex flex-col items-center">
          <Search className="w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-white flex flex-col items-center">
          <PlusSquare className="w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-white flex flex-col items-center">
          <User className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}
