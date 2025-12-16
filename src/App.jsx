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

  /* NOT LOGGED IN → LOGIN PAGE */
  if (!loggedIn) {
    return <Login onSuccess={() => setLoggedIn(true)} />;
  }

  /* ADMIN PANEL */
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        onNavigate={setPage}
        onLogout={() => {
          setLoggedIn(false);
          setPage("dashboard");
        }}
      />

      <main className="flex-1 p-6 overflow-y-auto">
        {page === "dashboard" && <Main />}
        {page === "sections" && <SectionsPage />}
        {page === "albums" && <AlbumPage />}
        {page === "video" && <VideoManagement />}
        {page === "contact" && <h1>Contact Messages</h1>}
      </main>
    </div>
  );
}
