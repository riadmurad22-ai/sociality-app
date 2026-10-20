"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CheckCircle2, Home, PlusSquare, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditProfilePage() {
  const router = useRouter();
  
  // State form profil
  const [formData, setFormData] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@email.com",
    phone: "081234567890",
    bio: "Creating unforgettable moments with my favorite person! 📸 Let's cherish every second together!",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessAlert(true);
    
    // Setelah simpan, simulasikan navigasi kembali ke halaman profil utama
    setTimeout(() => {
      setShowSuccessAlert(false);
      router.push("/profile");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pb-24">
      {/* Header Atas */}
      <header className="w-full h-20 sticky top-0 z-20 bg-black/90 backdrop-blur-md border-b border-[#181D27] px-6 md:px-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Sociality Logo" className="w-6 h-6 object-contain" />
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

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="w-full max-w-200 mt-4 px-4 flex justify-end">
          <div className="bg-[#079455] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg text-xs font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Success Update</span>
          </div>
        </div>
      )}

      {/* Container Utama Edit Profile (Lebar 800px) */}
      <main className="w-full max-w-200 flex flex-col gap-6 p-4 mt-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white hover:text-gray-300 text-sm font-semibold flex items-center gap-1">
            ← Edit Profile
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0D0E12] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl">
          
          {/* Profile Picture Section */}
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20 border-2 border-purple-500">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button 
              type="button" 
              variant="outline" 
              className="bg-black/40 border-white/20 hover:bg-white/10 text-white text-xs h-9 rounded-xl"
            >
              Change Photo
            </Button>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-gray-300">Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white rounded-xl h-11 text-xs focus:border-purple-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-gray-300">Username</Label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white rounded-xl h-11 text-xs focus:border-purple-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-gray-300">Email</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white rounded-xl h-11 text-xs focus:border-purple-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-gray-300">Number Phone</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white rounded-xl h-11 text-xs focus:border-purple-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-gray-300">Bio</Label>
              <textarea
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-[#6C5CE7] hover:bg-[#5b4cc4] text-white font-medium text-sm rounded-xl transition-all shadow-lg mt-2"
          >
            Save Changes
          </Button>
        </form>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#0A0D12]/95 backdrop-blur-md border-t border-[#181D27] py-3 px-6 flex items-center justify-around max-w-md mx-auto rounded-t-2xl shadow-lg">
        <button onClick={() => router.push("/feed")} className="text-gray-400 hover:text-white flex flex-col items-center">
          <Home className="w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-white flex flex-col items-center">
          <Search className="w-6 h-6" />
        </button>
        <button onClick={() => router.push("/create")} className="text-gray-400 hover:text-white flex flex-col items-center">
          <PlusSquare className="w-6 h-6" />
        </button>
        <button className="text-purple-500 flex flex-col items-center">
          <UserIcon className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}