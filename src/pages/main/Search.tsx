import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const topics = [
    { cat: "Tech · Trending", t: "#ReactJS_2026", p: "12.5K Posts" },
    { cat: "Indonesia · Trending", t: "Sociality App", p: "5,400 Posts" },
    { cat: "Programming", t: "#TailwindV4", p: "8,234 Posts" },
  ];

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
            className="flex items-center gap-3 text-purple-400 font-bold cursor-pointer transition"
          >
            <span>🔍</span> Explore
          </div>
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 text-gray-400 hover:text-purple-400 cursor-pointer transition"
          >
            <span>👤</span> Profile
          </div>
        </nav>
      </aside>

      <main className="flex-1 max-w-2xl border-r border-gray-800">
        <div className="sticky top-0 bg-black/60 backdrop-blur-xl p-4 z-10 border-b border-gray-800">
          <div className="bg-[#16181c] p-3 rounded-full border border-transparent focus-within:border-purple-500 transition-all flex items-center gap-3">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search topics..."
              className="bg-transparent border-none focus:ring-0 w-full text-sm"
              autoFocus
            />
          </div>
        </div>
        <div className="divide-y divide-gray-800">
          {topics.map((t, i) => (
            <div
              key={i}
              className="p-4 hover:bg-white/3 cursor-pointer transition"
            >
              <p className="text-xs text-gray-500">{t.cat}</p>
              <p className="font-bold text-lg">{t.t}</p>
              <p className="text-xs text-gray-500">{t.p}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
