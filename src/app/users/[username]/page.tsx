"use client";

import React, { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Search, Home, PlusSquare, User, Grid } from "lucide-react";

function FriendsProfileContent() {
  const router = useRouter();
  const params = useParams();
  const username = (params?.username as string) || "janesmith";

  const [isFollowing, setIsFollowing] = React.useState(true);

  const handleToggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-black/80 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs">
            S
          </div>
          <span className="font-bold tracking-wide text-lg">Sociality</span>
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search"
            onClick={() => router.push("/users/search")}
            className="w-full rounded-full bg-zinc-900 py-1.5 pl-9 pr-4 text-xs text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-700"
          />
        </div>

        <div className="h-8 w-8 rounded-full overflow-hidden bg-zinc-800">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            alt="My Profile"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-xl px-4 pt-6">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        {/* Profile Card Info */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-full border-2 border-purple-500 p-0.5">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300"
              alt={username}
              width={96}
              height={96}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <h2 className="text-xl font-bold capitalize">{username}</h2>
          <span className="text-xs text-zinc-500">@{username}</span>

          <p className="mt-3 max-w-md text-xs text-zinc-300">
            Digital creator & travel enthusiast ✨ Exploring the world one photo
            at a time.
          </p>

          <button
            onClick={handleToggleFollow}
            className={`mt-4 rounded-full px-6 py-2 text-xs font-semibold transition ${
              isFollowing
                ? "border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            {isFollowing ? "✓ Following" : "Follow"}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/50 py-4 text-center">
          <div>
            <p className="text-base font-bold">4</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
              Post
            </p>
          </div>
          <div>
            <p className="text-base font-bold">125</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
              Followers
            </p>
          </div>
          <div>
            <p className="text-base font-bold">89</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
              Following
            </p>
          </div>
          <div>
            <p className="text-base font-bold">312</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
              Likes
            </p>
          </div>
        </div>

        {/* Gallery Tab */}
        <div className="mt-8 border-t border-zinc-800 pt-4">
          <div className="flex items-center justify-center gap-2 border-b-2 border-purple-500 pb-2 text-xs font-semibold text-white">
            <Grid size={16} />
            <span>Gallery</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
              "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500",
              "https://images.unsplash.com/photo-1476514525535-ce74f45814d3?w=500",
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500",
            ].map((url, idx) => (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden rounded-lg bg-zinc-900"
              >
                <Image
                  src={url}
                  alt={`Gallery image ${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-around rounded-full border border-zinc-800 bg-zinc-950/90 px-6 py-3 backdrop-blur w-80">
        <button
          onClick={() => router.push("/feed")}
          className="text-zinc-400 hover:text-white transition"
        >
          <Home size={20} />
        </button>
        <button
          onClick={() => router.push("/users/search")}
          className="text-zinc-400 hover:text-white transition"
        >
          <Search size={20} />
        </button>
        <button
          onClick={() => router.push("/create")}
          className="text-zinc-400 hover:text-white transition"
        >
          <PlusSquare size={20} />
        </button>
        <button
          onClick={() => router.push("/profile")}
          className="text-zinc-400 hover:text-white transition"
        >
          <User size={20} />
        </button>
      </nav>
    </div>
  );
}

export default function FriendsProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <FriendsProfileContent />
    </Suspense>
  );
}
