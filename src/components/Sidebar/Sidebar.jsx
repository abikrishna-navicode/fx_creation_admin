import React from "react";
import { IoIosCard } from "react-icons/io";

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="h-screen p-6 flex flex-col gap-8">
      {/* Logo section */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="logo" className="w-10 h-10 object-contain" />
        <div className="text-lg font-bold">FX CREATIONS STUDIO</div>
      </div>

      {/* Sidebar menu */}
      <nav className="flex flex-col gap-3 text-sm">
        <button
          onClick={() => onNavigate("dashboard")}
          className="text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
        >
          <IoIosCard />
          Dashboard
        </button>

        <button
          onClick={() => onNavigate("gallery")}
          className="text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
        >
          <IoIosCard />
          Gallery Management
        </button>

        <button
          onClick={() => onNavigate("video")}
          className="text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
        >
          <IoIosCard />
          Video Management
        </button>

        <button
          onClick={() => onNavigate("booking")}
          className="text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
        >
          <IoIosCard />
          Booking Management
        </button>

        <button
          onClick={() => onNavigate("contact")}
          className="text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
        >
          <IoIosCard />
          Contact Messages
        </button>
      </nav>

      <div className="mt-auto text-xs text-gray-500">© FX Creations</div>
    </div>
  );
};

export default Sidebar;
