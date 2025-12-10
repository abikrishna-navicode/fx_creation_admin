import React, { useState } from "react";
import { MdSpaceDashboard, MdVideoLibrary, MdMessage } from "react-icons/md";
import { FaPhotoVideo, FaBookOpen } from "react-icons/fa";

const Sidebar = ({ onNavigate }) => {
  const [active, setActive] = useState("dashboard");

  // ⭐ Handles click + highlight + open screen
  const handleClick = (page) => {
    setActive(page);
    onNavigate(page);
  };

  const menuItem = (page, Icon, label) => (
    <button
      onClick={() => handleClick(page)}
      className={`text-left px-3 py-2 rounded flex items-center gap-2 transition-all
      ${active === page ? "bg-orange-500 text-white shadow-md" : "hover:bg-gray-100 text-gray-700"}
      `}
    >
      <Icon size={18} className={`${active === page ? "text-white" : "text-gray-600"}`} />
      {label}
    </button>
  );

  return (
    <div className="h-screen p-6 flex flex-col gap-8 border-r border-gray-300 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-4">
        <img src="/src/assets/images/logo.png" alt="logo" className="w-10 h-10 object-contain" />
        <div className="text-lg font-bold">FX CREATION STUDIO</div>
      </div>

      <nav className="flex flex-col gap-3 text-sm">
        {menuItem("dashboard", MdSpaceDashboard, "Dashboard")}
        {menuItem("sections", FaPhotoVideo, "Image Sections")}
        {menuItem("albums", FaBookOpen, "Album Section")}
        {menuItem("video", MdVideoLibrary, "Video Management")}
        {menuItem("booking", FaBookOpen, "Booking Management")}
        {menuItem("contact", MdMessage, "Contact Messages")}
      </nav>

      <div className="mt-auto text-xs text-gray-500">© FX Creation</div>
    </div>
  );
};

export default Sidebar;
