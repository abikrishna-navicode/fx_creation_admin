import React from "react";

export default function Sidebar({ onNavigate }) {
  return (
    <div className="w-64 bg-white shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">FX CREATIONS STUDIO</h2>

      <button
        onClick={() => onNavigate("dashboard")}
        className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
      >
        Dashboard
      </button>
      <button
        onClick={() => onNavigate("gallery")}
        className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
      >
        Gallery Management
      </button>
       <button
        onClick={() => onNavigate("video")}
        className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
      >
        Video Management
      </button>
      <button
        onClick={() => onNavigate("booking")}
        className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
      >
        Booking Management
      </button>
      <button
        onClick={() => onNavigate("contact")}
        className="block w-full text-left px-3 py-2 rounded hover:bg-gray-200"
      >
        Contact Messages
      </button>
    </div>
  );
}
