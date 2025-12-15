import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/auth/Login";
import SectionsPage from "./components/gallery/SectionsPage";
import AlbumPage from "./components/gallery/AlbumPage";
import VideoManagement from "./components/video/VideoManagement";
import Main from "./components/main/Main";
import { isLoggedIn } from "./utils/auth";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  if (!loggedIn) {
    return <Login onSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <div className="flex">
      <Sidebar
        onNavigate={setPage}
        onLogout={() => setLoggedIn(false)}
      />

      <main className="flex-1 p-6">
        {page === "dashboard" && <Main />}
        {page === "sections" && <SectionsPage />}
        {page === "albums" && <AlbumPage />}
        {page === "video" && <VideoManagement />}
      </main>
    </div>
  );
}
