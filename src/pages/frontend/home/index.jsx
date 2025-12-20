import React, { useState, useEffect,useRef } from "react";
import {
  Heart, Home, MessageCircle, PlusSquare,
  Search, Compass, Bookmark, MoreHorizontal
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function InstagramHome() {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState([]);
  const feedRef = useRef(null);

  // Dummy stories
  const stories = [...Array(8)].map((_, i) => ({
    id: i + 1,
    src: `https://i.pravatar.cc/150?img=${i + 10}`,
    username: `user${i + 1}`,
  }));

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        { id: 1, type: "image", src: "https://picsum.photos/600/600?1" },
        { id: 2, type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { id: 3, type: "image", src: "https://picsum.photos/600/600?3" },
        { id: 4, type: "image", src: "https://picsum.photos/600/600?4" },
        { id: 5, type: "image", src: "https://picsum.photos/600/600?5" },
        { id: 6, type: "image", src: "https://picsum.photos/600/600?6" },
        { id: 7, type: "image", src: "https://picsum.photos/600/600?7" },
        { id: 8, type: "image", src: "https://picsum.photos/600/600?8" },
      ]);
      setLoadingPosts(false);
    }, 1500);
  }, []);

 


 useEffect(() => {
    const handleScroll = () => {
      if (!feedRef.current) return; // ✅ Null guard
      const videos = feedRef.current.querySelectorAll("video");
      videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          video.play();
        } else {
          video.pause();
        }
      });
    };
    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, []);
  return (
    <div className="dark:bg-black dark:text-white min-h-screen flex flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Feed */}
      <main ref={feedRef} className="flex-1 max-w-xl mx-auto relative overflow-y-auto" >
        {/* Stories */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-4 px-2 sticky top-0 bg-black z-10 border-b border-gray-800" style={{scrollbarWidth: "none"}}>
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center ">
              <div className="w-16 h-16 rounded-full border-2 border-pink-500">
                <img
                  src={story.src}
                  className="w-full h-full rounded-full object-cover"
                  alt={story.username}
                />
              </div>
              <span className="text-xs mt-1">{story.username}</span>
            </div>
          ))}
        </div>

        {/* Posts */}
        <div className="mt-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-800 rounded-md mb-6">
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/40?img=${post.id + 20}`}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold text-sm">john_doe</span>
                </div>
                <MoreHorizontal />
              </div>

              {/* Post Media */}
              {loadingPosts ? (
                <Skeleton className="w-full h-80" />
              ) : post.type === "image" ? (
                <img src={post.src} className="w-full object-cover" alt="post" />
              ) : (
                <video
                  className="w-full aspect-video"
                  src={post.src}
                  controls
                  autoPlay
                  muted
                  loop
                />
              )}

              {/* Actions */}
              <div className="flex justify-between px-4 py-3">
                <div className="flex gap-4">
                  <Heart className="hover:text-red-500 cursor-pointer" />
                  <MessageCircle className="cursor-pointer" />
                </div>
                <Bookmark className="cursor-pointer" />
              </div>

              {/* Likes & Caption */}
              <p className="px-4 font-semibold text-sm">12,345 likes</p>
              <p className="px-4 text-sm mt-1">
                <span className="font-semibold mr-1">john_doe</span>
                Enjoying the vibes 🌅
              </p>

              {/* Comment Input */}
              <div className="border-t border-gray-800 mt-3 p-3">
                <input
                  placeholder="Add a comment..."
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar />

      {/* Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
}

/* Sidebar */
function Sidebar() {
  const menuItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <Compass />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
  ];

  return (
    <aside className="hidden md:flex flex-col p-4 lg:w-64 md:w-20 border-r border-gray-800 sticky top-0 h-screen">
      <h1 className="text-2xl font-bold mb-8">Instagram</h1>
      <nav className="flex flex-col gap-3">
        {menuItems.map((item, idx) => (
          <SidebarItem key={idx} icon={item.icon} text={item.text} />
        ))}
        {/* Profile */}
        <SidebarItem
          icon={
            <img
              src="https://i.pravatar.cc/40"
              className="w-6 h-6 rounded-full"
            />
          }
          text="Profile"
        />
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text }) {
  return (
    <div className="flex items-center gap-4 p-2 rounded-md cursor-pointer hover:bg-gray-900">
      {icon}
      <span className="hidden lg:inline">{text}</span>
    </div>
  );
}

/* Right Sidebar */
function RightSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-80 p-4 sticky top-0 h-screen">
      {/* Profile */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://i.pravatar.cc/50"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold">your_username</p>
          <p className="text-gray-400 text-sm">Your Name</p>
        </div>
      </div>

      {/* Suggestions */}
      <p className="text-gray-400 text-sm mb-4">Suggestions for you</p>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <img
              src={`https://i.pravatar.cc/40?img=${i + 30}`}
              className="w-8 h-8 rounded-full"
            />
            <p className="text-sm font-semibold">suggested_{i}</p>
          </div>
          <button className="text-blue-500 text-sm font-semibold">
            Follow
          </button>
        </div>
      ))}
    </aside>
  );
}

/* Bottom Navbar */
function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around p-2 md:hidden">
      <Home className="cursor-pointer" />
      <Search className="cursor-pointer" />
      <PlusSquare className="cursor-pointer" />
      <Heart className="cursor-pointer" />
      <MessageCircle className="cursor-pointer" />
    </nav>
  );
}
