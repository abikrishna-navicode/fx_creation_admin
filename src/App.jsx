import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";

import SectionsPage from "./components/gallery/SectionsPage";
import AlbumPage from "./components/gallery/AlbumPage";

import VideoManagement from "./components/video/VideoManagement";
import Main from "./components/main/Main";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex">
      <Sidebar onNavigate={setPage} />

      <main className="flex-1 p-6">
        {page === "dashboard" && <Main />}
        {page === "sections" && <SectionsPage />}
        {page === "albums" && <AlbumPage />}
        {page === "video" && <VideoManagement />}
      </main>
    </div>
  );
}