"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Search,
  Heart,
  Bookmark,
  MessageCircle,
  Send,
  Trash2,
  Home,
  PlusSquare,
  User as UserIcon,
  ArrowLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;

  // State untuk interaksi pos
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [isSaved, setIsSaved] = useState(false);

  // State untuk komentar
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah Connor",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      text: "Wih fotonya keren banget! Di mana ini lokasinya?",
      time: "2h ago",
    },
    {
      id: 2,
      author: "Alex Turner",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      text: "Mantap dokumentasinya bro!",
      time: "1h ago",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: Date.now(),
      author: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      text: newComment,
      time: "Just now",
    };

    setComments([...comments, commentObj]);
    setNewComment("");
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const handleDeletePost = () => {
    if (confirm("Apakah Anda yakin ingin menghapus postingan ini?")) {
      // Sesuai endpoint DELETE /api/posts/{id}
      router.push("/feed");
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

      {/* Main Container Post Detail */}
      <main className="w-full max-w-170 flex flex-col gap-4 p-4 mt-4">
        {/* Tombol Kembali & Delete Post (jika owner) */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            onClick={handleDeletePost}
            className="text-red-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1 transition-colors bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Post
          </button>
        </div>

        {/* Post Card Detail */}
        <div className="bg-[#0D0E12] border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          {/* Author Header */}
          <div className="p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 border border-white/10">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xs font-bold">John Doe</h3>
                <span className="text-[10px] text-gray-400">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* Large Image View */}
          <div className="w-full bg-black max-h-125 flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop"
              alt="Post Detail"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Actions & Counts */}
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLikeToggle}
                  className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                  />
                  <span>{likeCount}</span>
                </button>
                <div className="flex items-center gap-1.5 text-xs text-gray-300">
                  <MessageCircle className="w-5 h-5" />
                  <span>{comments.length}</span>
                </div>
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Bookmark
                  className={`w-5 h-5 ${isSaved ? "fill-white text-white" : ""}`}
                />
              </button>
            </div>

            {/* Caption */}
            <p className="text-xs text-gray-200 leading-relaxed">
              <span className="font-bold mr-2">johndoe</span>
              Creating unforgettable moments with my favorite person! 📸 Let's
              cherish every second together!
            </p>
          </div>

          {/* Comments Section */}
          <div className="border-t border-white/10 p-4 flex flex-col gap-4 bg-black/30">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              Comments
            </h4>

            {/* List Comments */}
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
              {comments.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start justify-between gap-3 text-xs bg-black/40 p-2.5 rounded-xl border border-white/5"
                  >
                    <div className="flex items-start gap-2.5">
                      <Avatar className="w-7 h-7 mt-0.5">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-200">
                            {comment.author}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-gray-300 mt-0.5">{comment.text}</p>
                      </div>
                    </div>
                    {/* Tombol Delete Comment (jika owner komentar) */}
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Comment Composer */}
            <form
              onSubmit={handleAddComment}
              className="flex items-center gap-2 mt-2"
            >
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 rounded-xl h-10 text-xs focus-visible:ring-purple-500"
              />
              <Button
                type="submit"
                className="bg-[#6C5CE7] hover:bg-[#5b4cc4] text-white h-10 px-4 rounded-xl shrink-0 transition-all"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
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
