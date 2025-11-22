import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import GalleryManager from "./components/GalleryManager";
import AlbumPage from "./components/AlbumPage";
import Video from "./pages/Video";

export default function App() {
  const [activePage, setActivePage] = useState("gallery");
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  function openAlbum(album) {
    setSelectedAlbum(album);
    setActivePage("album");
  }

  function addAlbum(newAlbum) {
    setAlbums((prev) => [...prev, newAlbum]);
  }

  function deleteAlbum(albumToDelete) {
    setAlbums((prev) => prev.filter((a) => a !== albumToDelete));
    if (selectedAlbum === albumToDelete) setActivePage("gallery");
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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onNavigate={setActivePage} />

      <div className="flex-1 p-6 overflow-auto">
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

        {/* NEW PAGE */}
        {activePage === "video" && <Video />}
      </div>
    </div>
  );
}
