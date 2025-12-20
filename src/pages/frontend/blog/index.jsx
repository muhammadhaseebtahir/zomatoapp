import React, { useEffect, useRef, useState } from "react";
import {
  Heart,
  Home,
  MessageCircle,
  PlusSquare,
  Search,
  Compass,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Skeleton } from "antd";
export default function Blog() {
  const [post, setPost] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const feedRef = useRef(null);
  const [like, setLike] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPost([
        { id: 1, type: "image", src: "https://picsum.photos/600/600?1" },
        {
          id: 2,
          type: "video",
          src: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        { id: 3, type: "image", src: "https://picsum.photos/600/600?3" },
        { id: 4, type: "image", src: "https://picsum.photos/600/600?4" },
        { id: 5, type: "image", src: "https://picsum.photos/600/600?5" },
        { id: 6, type: "image", src: "https://picsum.photos/600/600?6" },
        { id: 7, type: "image", src: "https://picsum.photos/600/600?7" },
        { id: 8, type: "image", src: "https://picsum.photos/600/600?8" },
      ]);
      setLoadingPosts(false);
    }, 3000);
  }, []);

  const SkeletonBox = ({ className }) => (
    <div
      className={` bg-gray-100 dark:bg-gray-800 animate-pulse rounded ${className}`}
    ></div>
  );

  const stories = [...Array(15)].map((_, i) => ({
    id: i + 1,
    src: `https://i.pravatar.cc/150?img=${i + 20}`,
    username: `user${i + 1}`,
  }));

  return (
    <div className="dark:bg-[rgb(15,15,15)] dark:text-gray-200 min-h-screen w-full flex flex-row ">
      {/* ********Side bar************ */}
      <Sidebar />

      <main
        ref={feedRef}
        className=" flex-1 max-w-xl mx-auto relative overflow-y-auto overflow-x-hidden  "
      >
        {/* **************Stories********* */}
        <div
          className="flex gap-4 overflow-x-auto  py-4 px-2 sticky top-0 z-10 border-b border-gray-400 "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center ">
              <div className="w-16 h-16 rounded-full border-2 border-pink-500">
                <img
                  src={story.src}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-sm mb-1">{story.username}</span>
            </div>
          ))}
        </div>
        {/* ***********Post********* */}
        <div className="mt-4">
          {loadingPosts ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center p-3 ">
                    <div className="flex items-center gap-3">
                      <SkeletonBox className="w-8 h-8 rounded-full" />
                      <SkeletonBox className="w-12 h-4 rounded-2xl" />
                    </div>
                    <MoreHorizontal />
                  </div>

                  <SkeletonBox className="w-full h-80 " />
                </div>
              ))}
            </div>
          ) : (
            post.map((post) => (
              <div
                key={post.id}
                className="border border-gray-300 dark:border-gray-800 rounded-md mb-6"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/40?img=${post.id + 20}`}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-bold text-sm text-gray-950 dark:text-white">
                      john_doe
                    </span>
                  </div>
                  <MoreHorizontal />
                </div>

                {/* Post Media */}
                {post.type === "image" ? (
                  <img
                    src={post.src}
                    className="w-full object-cover"
                    alt="post"
                  />
                ) : (
                  <video
                    className="w-full aspect-video"
                    src={post.src}
                    controls
                    muted
                    loop
                  />
                )}
                {/* **************Action******* */}
                <div className="flex  justify-between px-4 py-3 ">
                  <div className="flex gap-3">
                    <Heart
                      onClick={() => setLike(!like)}
                      className={`cursor-pointer transition ${
                        like ? "text-red-500" : "text-gray-700"
                      }`}
                      fill={like ? "red" : "none"}
                    />
                    <MessageCircle className="cursor-pointer text-gray-700" />
                  </div>
                  <Bookmark className="cursor-pointer" />
                </div>
                <p className="text-sm px-4 font-semibold">12,345 likes</p>
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
            ))
          )}
        </div>
      </main>
      <RightSidebar />
    </div>
  );
}

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
    <div className="hidden md:flex flex-col  p-4 lg:w-64  md:w-20 border-r border-gray-500 sticky top-0 h-screen">
      <h1 className="hidden md:flex text-md pl-0 lg:pl-3  lg:text-3xl font-bold mb-8">
        Zomato
      </h1>

      <div className="flex flex-col gap-3">
        {menuItems.map((item, i) => (
          <SidebarItem icon={item.icon} text={item.text} key={i} />
        ))}
        <SidebarItem
          icon={
            <img
              src="https://i.pravatar.cc/40"
              className="w-6 h-6 rounded-full"
            />
          }
          text="Profile"
        />
      </div>
    </div>
  );
}

function SidebarItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white ">
      {icon}
      <span className="hidden lg:inline">{text}</span>
    </div>
  );
}

function RightSidebar() {
  return (
    <div className="hidden lg:flex flex-col w-80 p-4 sticky top-0 h-screen ">
      {/* ******Profile ****** */}
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/50"
          alt="user"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold">your_username</p>
          <p className="dark:text-gray-300 text-sm">Your Name</p>
        </div>
      </div>
      <p className="text-sm mt-6 text-gray-700 dark:text-gray-400  ">
        Suggestions for you 
      </p>
    </div>
  );
}
