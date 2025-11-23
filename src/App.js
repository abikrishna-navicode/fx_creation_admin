// App.js
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import GalleryManager from "./components/GalleryManager";
import AlbumPage from "./components/AlbumPage";
import Video from "./pages/Video";
import BookingManagement from "./pages/BookingManagement"; // ✅ NEW IMPORT

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

  // ───── UI Layout ────────────────────────────────
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onNavigate={setActivePage} />

      <div className="flex-1 p-6 overflow-auto">

        {/* Gallery Management */}
        {activePage === "gallery" && (
          <GalleryManager
            albums={albums}
            onOpenAlbum={openAlbum}
            onAddAlbum={addAlbum}
            onDeleteAlbum={deleteAlbum}
          />
        )}

        {/* Album View */}
        {activePage === "album" && selectedAlbum && (
          <AlbumPage
            album={selectedAlbum}
            onDeleteImage={(index) => deleteImage(selectedAlbum, index)}
          />
        )}

        {/* Video Page */}
        {activePage === "video" && <Video />}

        {/* Dashboard */}
        {activePage === "dashboard" && (
          <h1 className="text-2xl font-bold">Dashboard Coming Soon...</h1>
        )}

        {/* Booking Management — FULL MODULE */}
        {activePage === "booking" && <BookingManagement />}

        {/* Contact Messages */}
        {activePage === "contact" && (
          <h1 className="text-2xl font-bold">Contact Messages Coming Soon...</h1>
        )}
      </div>
    </div>
  );
}
