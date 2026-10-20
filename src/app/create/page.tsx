"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Image as ImageIcon,
  X,
  CheckCircle2,
  Home,
  Search,
  PlusSquare,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function CreatePostPage() {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleImageSelect = () => {
    setSelectedImage(
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=800&fit=crop",
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage && !caption) return;

    setShowAlert(true);
    setTimeout(() => {
      router.push("/feed");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pb-24">
      {/* Header Atas dengan logo.png */}
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

      {/* Alert Sukses */}
      {showAlert && (
        <div className="w-full max-w-113 mt-4 px-4">
          <div className="bg-[#079455] text-white px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg animate-fade-in">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">
              Post created successfully!
            </span>
          </div>
        </div>
      )}

      {/* Main Container Add Post */}
      <main className="w-full max-w-113flex flex-col gap-6 p-4 mt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Add Post</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0D0E12] border border-white/10 rounded-2xl p-5 flex flex-col gap-5 shadow-xl"
        >
          {/* Upload Photo Section */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-300">Photo</label>
            {selectedImage ? (
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-900 border border-white/10">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-3 right-3 bg-black/70 hover:bg-black p-1.5 rounded-full text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={handleImageSelect}
                className="w-full aspect-video border-2 border-dashed border-white/20 hover:border-purple-500 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer bg-black/40 transition-colors p-6 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-purple-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-200">
                    Click to upload photo
                  </span>
                  <span className="text-[10px] text-gray-500">
                    SVG, PNG, JPG or GIF (max. 800x800px)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Caption Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-300">
              Caption
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-[#6C5CE7] hover:bg-[#5b4cc4] text-white font-medium text-sm rounded-xl transition-all shadow-lg"
          >
            Post
          </Button>
        </form>
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
        <button className="text-purple-500 flex flex-col items-center">
          <PlusSquare className="w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-white flex flex-col items-center">
          <User className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}
