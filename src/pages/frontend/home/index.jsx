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
  Volume2,
  VolumeX,
  Play,
  Pause,
} from "lucide-react";
import { Skeleton } from "antd";
import PostCreated from "../postCreated";
import { useDataContext } from "../../../context/getFoodContext";

export default function InstagraeHome() {
  const { data } = useDataContext();
  const [post, setPost] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const feedRef = useRef(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      setLoadingPosts(false);
    }
  }, [data]);

  const SkeletonBox = ({ className }) => (
    <div
      className={`bg-gray-100 dark:bg-gray-800 animate-pulse rounded ${className}`}
    ></div>
  );

  const stories = [...Array(15)].map((_, i) => ({
    id: i + 1,
    src: `https://i.pravatar.cc/150?img=${i + 20}`,
    username: `user${i + 1}`,
  }));

  return (
    <div className="dark:bg-[rgb(15,15,15)] dark:text-gray-200 min-h-screen w-full flex flex-row">
      <Sidebar setShowCreatePost={setShowCreatePost} />

      <main
        ref={feedRef}
        className="flex-1 max-w-xl mx-auto relative overflow-y-auto overflow-x-hidden"
      >
        {/* **************Stories********* */}
        <div
          className="flex gap-4 overflow-x-auto py-4 px-2 sticky top-0 z-10 border-b border-gray-400 bg-white dark:bg-[rgb(15,15,15)]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-pink-500">
                <img
                  src={story.src}
                  className="w-full h-full rounded-full object-cover"
                  alt={story.username}
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
                  <div className="flex justify-between items-center p-3">
                    <div className="flex items-center gap-3">
                      <SkeletonBox className="w-8 h-8 rounded-full" />
                      <SkeletonBox className="w-12 h-4 rounded-2xl" />
                    </div>
                    <MoreHorizontal />
                  </div>
                  <SkeletonBox className="w-full h-80" />
                </div>
              ))}
            </div>
          ) : (
            data.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          )}
        </div>
      </main>

      <RightSidebar />
      <BottomNavbar setShowCreatePost={setShowCreatePost} />

      {showCreatePost && (
        <PostCreated onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
}

// Instagram Video Player Component
function InstagramVideoPlayer({ videoUrl, postId }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const [showPlayPause, setShowPlayPause] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const lastTapRef = useRef(0);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowPlayPause(true);
      setTimeout(() => setShowPlayPause(false), 500);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleDoubleTap();
    } else {
      setTimeout(() => {
        if (Date.now() - lastTapRef.current >= DOUBLE_TAP_DELAY) {
          togglePlayPause();
        }
      }, DOUBLE_TAP_DELAY);
    }

    lastTapRef.current = now;
  };

  const handleDoubleTap = () => {
    setShowHeart(true);
    setIsLiked(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full aspect-video bg-black">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        onClick={handleTap}
      />

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70 transition"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Play/Pause Icon */}
      {showPlayPause && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black bg-opacity-50 p-4 rounded-full animate-ping">
            {isPlaying ? (
              <Pause size={40} className="text-white" />
            ) : (
              <Play size={40} className="text-white" />
            )}
          </div>
        </div>
      )}

      {/* Heart Animation */}
      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Heart
            size={100}
            className="text-white animate-bounce"
            fill="red"
            strokeWidth={0}
          />
        </div>
      )}

      {/* Play Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-30 p-4 rounded-full">
            <Play size={50} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
}

// Post Card Component
function PostCard({ post }) {
  const [like, setLike] = useState(false);

  return (
    <div className="border border-gray-300 dark:border-gray-800 rounded-md mb-6">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img
            src={ `https://i.pravatar.cc/40`}
            className="w-8 h-8 rounded-full"
            alt="user"
          />
          <span className="font-bold text-sm text-gray-950 dark:text-white">
            _{post.userDetails?.userName || "user_name"}
          </span>
        </div>
        <MoreHorizontal className="cursor-pointer" />
      </div>

      {/* Post Media */}
      {post.postType === "image" ? (
        <img
          src={post.mediaUrl.url}
          className="w-full object-cover"
          alt="post"
        />
      ) : (
        <InstagramVideoPlayer videoUrl={post.mediaUrl.url} postId={post._id} />
      )}

      {/* Actions */}
      <div className="flex justify-between px-4 py-3">
        <div className="flex gap-3">
          <Heart
            onClick={() => setLike(!like)}
            className={`cursor-pointer transition ${
              like ? "text-red-500" : "text-gray-700 dark:text-gray-300"
            }`}
            fill={like ? "red" : "none"}
          />
          <MessageCircle className="cursor-pointer text-gray-700 dark:text-gray-300" />
        </div>
        <Bookmark className="cursor-pointer text-gray-700 dark:text-gray-300" />
      </div>

      <p className="text-sm px-4 font-semibold">
        {post.likes || 0} likes
      </p>
      <p className="px-4 text-sm mt-1">
        <span className="font-semibold mr-1">
          {post.userDetails?.username || "user_name"}
        </span>
        {post.description || "No caption"}
      </p>

      {/* Comment Input */}
      <div className="border-t border-gray-300 dark:border-gray-800 mt-3 p-3">
        <input
          placeholder="Add a comment..."
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>
    </div>
  );
}

function Sidebar({ setShowCreatePost }) {
  const menuItems = [
    { icon: <Home />, text: "Home", onClick: () => console.log("Home") },
    { icon: <Search />, text: "Search", onClick: () => console.log("Search") },
    { icon: <Compass />, text: "Explore", onClick: () => console.log("Explore") },
    { icon: <MessageCircle />, text: "Messages", onClick: () => console.log("Messages") },
    { icon: <Heart />, text: "Notifications", onClick: () => console.log("Notifications") },
    {
      icon: <PlusSquare />,
      text: "Create",
      onClick: () => setShowCreatePost(true),
    },
  ];

  return (
    <div className="hidden md:flex flex-col p-4 lg:w-64 md:w-20 border-r border-gray-500 sticky top-0 h-screen">
      <h1 className="hidden md:flex text-md pl-0 lg:pl-3 lg:text-3xl font-bold mb-8">
        Zomato
      </h1>

      <div className="flex flex-col gap-3">
        {menuItems.map((item, i) => (
          <SidebarItem
            icon={item.icon}
            text={item.text}
            onClick={item.onClick}
            key={i}
          />
        ))}
        <SidebarItem
          icon={
            <img
              src="https://i.pravatar.cc/40"
              className="w-6 h-6 rounded-full"
              alt="Profile"
            />
          }
          text="Profile"
          onClick={() => console.log("Profile")}
        />
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, onClick }) {
  return (
    <div
      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <span className="hidden lg:inline">{text}</span>
    </div>
  );
}

function RightSidebar() {
  return (
    <div className="hidden lg:flex flex-col w-80 p-4 sticky top-0 h-screen">
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

      <p className="text-sm mt-6 text-gray-700 dark:text-gray-400">
        Suggestions for you
      </p>

      {[1, 2, 3, 4, 5].map((s) => (
        <div key={s} className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <img
              src={`https://i.pravatar.cc/40?img=${s + 10}`}
              alt="suggestion"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-semibold text-sm">suggested_user{s}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Followed by user1, user2
              </p>
            </div>
          </div>
          <button className="text-blue-500 text-sm font-semibold">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}

function BottomNavbar({ setShowCreatePost }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 bg-white dark:bg-gray-700 text-black dark:text-gray-300 border-t border-gray-300 flex justify-around md:hidden z-50">
      <Home className="cursor-pointer" />
      <Search className="cursor-pointer" />
      <PlusSquare
        className="cursor-pointer"
        onClick={() => setShowCreatePost(true)}
      />
      <Heart className="cursor-pointer" />
      <MessageCircle className="cursor-pointer" />
    </div>
  );
}