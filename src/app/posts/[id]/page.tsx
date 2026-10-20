"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { ArrowLeft, Trash2, Heart, MessageCircle, Send } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
}

function PostDetailContent() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    // Simulasi data fetch / API client sesuai MVP
    // Anda bisa menggantinya dengan endpoint axios yang sebenarnya jika sudah ada
    setPost({
      id: String(postId),
      author: "Janesmith",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      content:
        "Digital creator & travel enthusiast ✨ Exploring the world one photo at a time.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      likes: 312,
      commentsCount: 2,
      isLiked: false,
    });

    setComments([
      {
        id: "1",
        author: "Alex Turner",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        content: "Amazing view! Where is this taken?",
        createdAt: "2h ago",
      },
      {
        id: "2",
        author: "Sarah Jenkins",
        avatar:
          "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
        content: "Love this vibe so much!",
        createdAt: "1h ago",
      },
    ]);

    setLoading(false);
  }, [postId]);

  const handleLike = () => {
    if (!post) return;
    setPost({
      ...post,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
      isLiked: !post.isLiked,
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentItem: Comment = {
      id: Date.now().toString(),
      author: "You",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      content: newComment,
      createdAt: "Just now",
    };

    setComments([...comments, commentItem]);
    setNewComment("");
  };

  const handleDeletePost = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      // Logic delete post
      router.push("/feed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Post not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-black/80 px-4 py-3 backdrop-blur">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="font-semibold">Post</h1>
        <button
          onClick={handleDeletePost}
          className="text-red-500 hover:text-red-400 transition"
        >
          <Trash2 size={20} />
        </button>
      </header>

      {/* Main Post Container */}
      <main className="mx-auto max-w-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={post.avatar}
            alt={post.author}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-sm">{post.author}</h3>
            <span className="text-xs text-zinc-500">2h ago</span>
          </div>
        </div>

        <p className="text-sm text-zinc-200 mb-4">{post.content}</p>

        {post.image && (
          <div className="relative mb-4 h-80 w-full overflow-hidden rounded-xl bg-zinc-900">
            <Image
              src={post.image}
              alt="Post content"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Actions Count */}
        <div className="flex items-center gap-6 border-b border-zinc-800 py-3 text-sm text-zinc-400">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition ${post.isLiked ? "text-red-500" : "hover:text-white"}`}
          >
            <Heart size={18} className={post.isLiked ? "fill-current" : ""} />
            <span>{post.likes} Likes</span>
          </button>
          <div className="flex items-center gap-2">
            <MessageCircle size={18} />
            <span>{comments.length} Comments</span>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-4 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Comments
          </h4>

          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start gap-3 border-b border-zinc-900 pb-3"
            >
              <Image
                src={comment.avatar}
                alt={comment.author}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div className="flex-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{comment.author}</span>
                  <span className="text-xs text-zinc-500">
                    {comment.createdAt}
                  </span>
                </div>
                <p className="text-zinc-300 mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Comment Composer Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-black p-3">
        <form
          onSubmit={handleAddComment}
          className="mx-auto flex max-w-xl items-center gap-2"
        >
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700"
          />
          <button
            type="submit"
            className="rounded-full bg-white p-2 text-black hover:bg-zinc-200 transition"
          >
            <Send size={16} />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default function PostDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PostDetailContent />
    </Suspense>
  );
}
