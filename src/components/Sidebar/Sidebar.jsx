import React, { useState } from "react";
import {
  MdSpaceDashboard,
  MdVideoLibrary,
  MdMessage,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { FaPhotoVideo, FaBookOpen } from "react-icons/fa";
import { logout } from "../../utils/auth";

const Sidebar = ({ onNavigate, onLogout }) => {
  const [active, setActive] = useState("dashboard");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile/Tablet sidebar toggle

  const handleClick = (page) => {
    setActive(page);
    onNavigate(page);
    setMobileOpen(false); // Close sidebar on small screens after click
  };

  const confirmLogout = async () => {
    setLoading(true);
    try {
      await logout();
      onLogout();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const menuItem = (page, Icon, label) => (
    <button
      onClick={() => handleClick(page)}
      className={`px-3 py-2 rounded flex items-center gap-2 text-sm w-full text-left ${
        active === page
          ? "bg-orange-500 text-white"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <>
      {/* Hamburger Button for Mobile & Tablets (sm to md) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-orange-500 text-white rounded shadow"
      >
        <MdMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[250px] p-6 flex flex-col border-r bg-white
          transform transition-transform duration-300 shadow-lg z-50
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:flex`}
      >
        {/* Close Button for Mobile & Tablets */}
        <div className="flex justify-end lg:hidden mb-4">
          <button onClick={() => setMobileOpen(false)}>
            <MdClose size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <div className="font-bold text-sm">
            FX CREATION <br /> STUDIO
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1 z-50">
          {menuItem("dashboard", MdSpaceDashboard, "Dashboard")}
          {menuItem("sections", FaPhotoVideo, "Image Sections")}
          {menuItem("albums", FaBookOpen, "Album Section")}
          {menuItem("video", MdVideoLibrary, "Video Management")}
          {menuItem("contact", MdMessage, "Contact Messages")}
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => setShowConfirm(true)}
          className="mt-auto bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600 w-full"
        >
          Logout
        </button>
      </aside>

      {/* Blurred Overlay for Mobile & Tablets */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[320px]">
            <h3 className="text-lg font-semibold mb-3">Confirm Logout</h3>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-60"
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
