import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 border-r border-gray-800 p-6 hidden md:block sticky top-0 h-screen">
        <h2
          className="text-3xl font-black mb-8 text-purple-500 italic cursor-pointer"
          onClick={() => navigate("/timeline")}
        >
          S.
        </h2>
        <nav className="space-y-6 text-lg">
          <div
            onClick={() => navigate("/timeline")}
            className="flex items-center gap-3 text-gray-400 hover:text-purple-400 cursor-pointer transition"
          >
            <span>🏠</span> Home
          </div>
          <div
            onClick={() => navigate("/search")}
            className="flex items-center gap-3 text-gray-400 hover:text-purple-400 cursor-pointer transition"
          >
            <span>🔍</span> Explore
          </div>
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 text-purple-400 font-bold cursor-pointer transition"
          >
            <span>👤</span> Profile
          </div>
        </nav>
      </aside>

      <main className="flex-1 max-w-2xl border-r border-gray-800">
        <header className="p-4 flex items-center gap-6 sticky top-0 bg-black/60 backdrop-blur-xl border-b border-gray-800 z-10">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-gray-800 p-2 rounded-full transition"
          >
            ⬅️
          </button>
          <div>
            <h1 className="text-xl font-bold">User Ganteng</h1>
            <p className="text-xs text-gray-500">2 Posts</p>
          </div>
        </header>
        <div className="h-48 bg-gray-800 relative">
          <div className="absolute -bottom-16 left-4 w-32 h-32 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 border-4 border-black" />
        </div>
        <div className="mt-20 p-4">
          <div className="flex justify-end">
            <button className="px-4 py-2 border border-gray-700 rounded-full font-bold hover:bg-white/5 transition">
              Edit Profile
            </button>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold">User Ganteng</h2>
            <p className="text-gray-500">@user_test</p>
            <p className="mt-4">
              Building Sociality App 🚀 | Fullstack Developer
            </p>
          </div>
        </div>
        <div className="flex border-b border-gray-800 mt-4 text-center">
          <div className="flex-1 p-4 border-b-4 border-purple-500 font-bold">
            Posts
          </div>
          <div className="flex-1 p-4 text-gray-500 hover:bg-white/5 transition cursor-pointer">
            Likes
          </div>
        </div>
      </main>
    </div>
  );
}
