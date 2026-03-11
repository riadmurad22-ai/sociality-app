import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  user: string;
  handle: string;
  content: string;
  time: string;
  likes: number;
}

export default function Timeline() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, user: "Admin Sociality", handle: "@admin", content: "Selamat datang di Sociality! Ayo mulai berbagi cerita hari ini.", time: "1h", likes: 12 },
    { id: 2, user: "Ria Murad", handle: "@riamurad", content: "Aplikasi ini keren banget, UI-nya dapet banget nuansa dark mode-nya.", time: "30m", likes: 5 },
  ]);

  const handlePost = () => {
    if (!content.trim()) return;
    const newPost: Post = { id: Date.now(), user: "User Ganteng", handle: "@user_test", content: content, time: "Just now", likes: 0 };
    setPosts([newPost, ...posts]);
    setContent('');
  };

  const toggleLike = (id: number) => {
    setLikedPosts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* SIDEBAR KIRI */}
      <aside className="w-64 border-r border-gray-800 p-6 hidden md:block sticky top-0 h-screen">
        <h2 className="text-3xl font-black mb-8 text-purple-500 italic cursor-pointer" onClick={() => navigate('/timeline')}>S.</h2>
        <nav className="space-y-6 text-lg">
          <div onClick={() => navigate('/timeline')} className="flex items-center gap-3 text-purple-400 font-bold cursor-pointer"><span>🏠</span> Home</div>
          <div onClick={() => navigate('/search')} className="flex items-center gap-3 text-gray-400 hover:text-purple-400 cursor-pointer transition"><span>🔍</span> Explore</div>
          <div onClick={() => navigate('/profile')} className="flex items-center gap-3 text-gray-400 hover:text-purple-400 cursor-pointer transition"><span>👤</span> Profile</div>
        </nav>
        <button onClick={() => { logout(); navigate('/login'); }} className="mt-12 w-full py-3 border border-red-500/50 text-red-500 rounded-xl hover:bg-red-500/10 transition-all font-semibold">Logout</button>
      </aside>

      {/* FEED TENGAH */}
      <main className="flex-1 max-w-2xl border-r border-gray-800 pb-20">
        <header className="sticky top-0 bg-black/60 backdrop-blur-xl p-4 border-b border-gray-800 z-10 flex justify-between items-center">
          <h1 className="text-xl font-bold">Home Feed</h1>
        </header>

        <div className="p-4 border-b border-gray-800">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-linear-to-tr from-purple-500 to-pink-500" />
            <div className="flex-1">
              <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-xl placeholder-gray-600 resize-none py-2" placeholder="Apa yang terjadi?" rows={2} />
              <div className="flex justify-between items-center pt-3 border-t border-gray-900 mt-2">
                <div className="flex gap-4 text-purple-500 text-lg"><span>🖼️</span><span>📊</span><span>😀</span></div>
                <button onClick={handlePost} disabled={!content.trim()} className="bg-purple-600 px-6 py-2 rounded-full font-bold hover:bg-purple-700 disabled:opacity-50 transition-all">Post</button>
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {posts.map((post) => (
            <div key={post.id} className="p-4 hover:bg-white/2 transition group">
              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-full bg-gray-800 border border-gray-700" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2"><span className="font-bold">{post.user}</span><span className="text-gray-500 text-sm">· {post.time}</span></div>
                    <button onClick={() => setPosts(posts.filter(p => p.id !== post.id))} className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">🗑️</button>
                  </div>
                  <p className="mt-1 text-gray-200">{post.content}</p>
                  <div className="flex justify-between mt-4 text-gray-500 text-sm max-w-md">
                    <span className="hover:text-blue-400">💬 0</span>
                    <button onClick={() => toggleLike(post.id)} className={likedPosts.includes(post.id) ? 'text-red-500' : ''}>
                      {likedPosts.includes(post.id) ? '❤️' : '🤍'} {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                    </button>
                    <span>📊 0</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* SIDEBAR KANAN */}
      <aside className="w-80 p-6 hidden lg:block sticky top-0 h-screen overflow-y-auto">
        <div className="bg-[#16181c] p-3 rounded-full mb-6 border border-transparent focus-within:border-purple-500 transition-all">
          <input type="text" placeholder="Search Sociality" className="bg-transparent border-none focus:ring-0 w-full text-sm" />
        </div>
        <div className="bg-[#16181c] rounded-2xl border border-gray-800 overflow-hidden mb-4">
          <h3 className="font-black text-xl p-4">Who to follow</h3>
          {[{ n: "Bill Gates", h: "@billgates" }, { n: "Elon Musk", h: "@elonmusk" }].map(u => (
            <div key={u.h} className="flex items-center justify-between p-4 hover:bg-white/3">
              <div className="flex gap-3"><div className="w-10 h-10 rounded-full bg-purple-900" /><div><p className="font-bold text-sm">{u.n}</p><p className="text-gray-500 text-xs">{u.h}</p></div></div>
              <button className="bg-white text-black px-4 py-1 rounded-full text-xs font-bold">Follow</button>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}