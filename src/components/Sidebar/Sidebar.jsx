import React, { useState } from "react";
import {
  MdSpaceDashboard,
  MdVideoLibrary,
  MdMessage,
} from "react-icons/md";
import { FaPhotoVideo, FaBookOpen } from "react-icons/fa";
import { logout } from "../../utils/auth";

const Sidebar = ({ onNavigate, onLogout }) => {
  const [active, setActive] = useState("dashboard");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = (page) => {
    setActive(page);
    onNavigate(page);
  };

  const menuItem = (page, Icon, label) => (
    <button
      onClick={() => handleClick(page)}
      className={`text-left px-3 py-2 rounded flex items-center gap-2 text-sm
        ${
          active === page
            ? "bg-orange-500 text-white"
            : "hover:bg-gray-100 text-gray-700"
        }
      `}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const confirmLogout = () => {
    logout();          // clear auth + token
    setShowConfirm(false);
    onLogout();        // redirect to login
  };

  return (
    <>
      <aside className="h-screen w-[250px] p-6 flex flex-col border-r bg-white">
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <div className="font-bold text-sm leading-tight">
            FX CREATION
            <br />
            STUDIO
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2">
          {menuItem("dashboard", MdSpaceDashboard, "Dashboard")}
          {menuItem("sections", FaPhotoVideo, "Image Sections")}
          {menuItem("albums", FaBookOpen, "Album Section")}
          {menuItem("video", MdVideoLibrary, "Video Management")}
          {menuItem("contact", MdMessage, "Contact Messages")}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={() => setShowConfirm(true)}
          className="mt-auto bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[320px]">
            <h3 className="text-lg font-semibold mb-3">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
