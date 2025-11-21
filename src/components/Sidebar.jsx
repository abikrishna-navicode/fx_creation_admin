import { NavLink } from "react-router-dom";
import {
  Home,
  Images,
  Video,
  CalendarRange,
  MessageSquare,
  LogOut,
  User,
} from "lucide-react";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/" },
    { name: "Gallery Management", icon: <Images size={18} />, path: "/gallery" },
    { name: "Video Management", icon: <Video size={18} />, path: "/video" },
    { name: "Booking Management", icon: <CalendarRange size={18} />, path: "/booking" },
    { name: "Contact Messages", icon: <MessageSquare size={18} />, path: "/messages" },
  ];

  return (
    <aside className="w-72 bg-white shadow-sm border-r p-6 flex flex-col justify-between">
      {/* Logo */}
      <div>
        <h1 className="text-xl font-bold mb-10">FX CREATIONS STUDIO</h1>

        {/* Menu */}
        <nav className="space-y-1">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
                 ${
                   isActive
                     ? "bg-orange-500 text-white"
                     : "hover:bg-gray-100 text-gray-800"
                 }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer user panel */}
      <div className="border-t pt-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center bg-orange-500 text-white rounded-full">
            <User size={18} />
          </div>
          <div className="text-sm font-medium">Admin</div>
        </div>

        <button className="flex items-center gap-2 mt-3 text-red-500 hover:text-red-600 text-sm">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
