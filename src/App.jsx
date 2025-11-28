import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import VideoManagement from "./components/video/VideoManagement";
import Main from "./components/main/Main";
import GalleryPage from "./components/gallery/GalleryPage";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex">
      <Sidebar onNavigate={setPage} />

      <main className="flex-1 p-6">
        {page === "dashboard" && <Main />}
        {page === "gallery" && <GalleryPage />}
        {page === "video" && <VideoManagement />}
      </main>
    </div>
  );
}
