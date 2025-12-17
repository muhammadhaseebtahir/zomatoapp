import React from "react";
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
export default function Blog() {

  const stories = [...Array(15)].map((_, i) => ({
    id: i + 1,
    src: `https://i.pravatar.cc/150?img=${i + 20}`,
    username: `user${i + 1}`,
  }));

  return (
    <div className="dark:bg-gray-950 dark:text-gray-200 min-h-screen w-full flex flex-row ">
     {/* ********Side bar************ */}
      <Sidebar />
  
<main className=" flex-1 max-w-xl bg-amber-500  mx-auto relative overflow-y-auto overflow-x-hidden" >
{/* **************Stories********* */}
 <div className="flex gap-4 overflow-x-auto  py-4 px-2 sticky top-0 z-10 border-b border-gray-400 " style={{scrollbarWidth: "none",msOverflowStyle: "none"}}>
{stories.map((story)=>(
 <div key={story.id} className="flex " >
 <div className="w-16 h-16 rounded-full border-2 border-pink-500">

<img
   src={story.src}
   className="w-full h-full rounded-full object-cover"
/>
 </div>
 </div>
))

}
 </div>
 <div className="min-h-screen" ></div>

</main>
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
