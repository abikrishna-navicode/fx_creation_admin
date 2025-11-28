import React from "react";
import GalleryPage from "../gallery/GalleryPage";
import VideoManagement from "../video/VideoManagement";

const Main = ({ activePage }) => {
  return (
    <div className="min-h-screen">
      {/* Header removed as requested — plain white screen */}
      {activePage === "dashboard" && (
        <div className="p-6 bg-white rounded shadow-sm">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-3 text-sm text-gray-600">Nothing to show yet.</p>
        </div>
      )}

      {activePage === "gallery" && (
        <div className="w-full">
          <GalleryPage />
        </div>
      )}
      {activePage === "video" && <VideoManagement />}
      {activePage === "booking" && <h1>Booking Management</h1>}
      {activePage === "contact" && <h1>Contact Messages</h1>}
    </div>
  );
};

export default Main;
