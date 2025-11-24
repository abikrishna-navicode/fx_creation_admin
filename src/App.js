import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import GalleryManager from "./components/GalleryManager";
import AlbumPage from "./components/AlbumPage";
import Video from "./pages/Video";
import BookingManagement from "./pages/BookingManagement";

export default function App() {
  const [activePage, setActivePage] = useState("gallery");
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // ───── Album Actions ────────────────────────────
  function openAlbum(album) {
    setSelectedAlbum(album);
    setActivePage("album");
  }

  function addAlbum(newAlbum) {
    setAlbums((prev) => [...prev, newAlbum]);
  }

  function deleteAlbum(albumToDelete) {
    setAlbums((prev) => prev.filter((a) => a !== albumToDelete));
    if (selectedAlbum === albumToDelete) {
      setSelectedAlbum(null);
      setActivePage("gallery");
    }
  }

  function deleteImage(albumToUpdate, imageIndex) {
    setAlbums((prev) =>
      prev.map((a) =>
        a === albumToUpdate
          ? { ...a, images: a.images.filter((_, i) => i !== imageIndex) }
          : a
      )
    );
  }

  // ───── Layout ────────────────────────────────
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <Sidebar onNavigate={setActivePage} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {activePage === "gallery" && (
          <GalleryManager
            albums={albums}
            onOpenAlbum={openAlbum}
            onAddAlbum={addAlbum}
            onDeleteAlbum={deleteAlbum}
          />
        )}

        {activePage === "album" && selectedAlbum && (
          <AlbumPage
            album={selectedAlbum}
            onDeleteImage={(index) => deleteImage(selectedAlbum, index)}
          />
        )}

        {activePage === "video" && <Video />}

        {activePage === "dashboard" && (
          <h1 className="text-2xl font-bold">Dashboard Coming Soon...</h1>
        )}

        {activePage === "booking" && <BookingManagement />}

        {activePage === "contact" && (
          <h1 className="text-2xl font-bold">Contact Messages Coming Soon...</h1>
        )}
      </main>
    </div>
  );
}
