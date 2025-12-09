import React, { useEffect, useState } from "react";
import {
  loadAlbumsFromStorage,
  saveAlbumsToStorage,
  generateId,
} from "../../utils/storage";

export default function AlbumPage() {
  const [albums, setAlbums] = useState(loadAlbumsFromStorage());
  const [currentAlbum, setCurrentAlbum] = useState(null);

  const [viewer, setViewer] = useState({
    open: false,
    index: 0,
    images: [],
  });

  const [newAlbumName, setNewAlbumName] = useState("");
  const [editTitle, setEditTitle] = useState("");

  /* -------------------- ALBUM CRUD -------------------- */

  const createAlbum = () => {
    if (!newAlbumName.trim()) return;

    const album = {
      id: generateId("album"),
      name: newAlbumName.trim(),
      photos: [],
    };

    const updated = [...albums, album];
    setAlbums(updated);
    saveAlbumsToStorage(updated);
    setNewAlbumName("");
  };

  const deleteAlbum = (albumId) => {
    if (!confirm("Delete this album and all images?")) return;

    const updated = albums.filter((a) => a.id !== albumId);
    setAlbums(updated);
    saveAlbumsToStorage(updated);
    setCurrentAlbum(null);
  };

  const saveAlbum = (album) => {
    const updated = albums.map((a) => (a.id === album.id ? album : a));
    setAlbums(updated);
    saveAlbumsToStorage(updated);
    setCurrentAlbum(album);
  };

  /* -------------------- IMAGE ACTIONS -------------------- */

  const addImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !currentAlbum) return;

    const urls = files.map((f) => URL.createObjectURL(f));
    saveAlbum({ ...currentAlbum, photos: [...currentAlbum.photos, ...urls] });
    e.target.value = "";
  };

  const deleteImage = (index) => {
    if (!confirm("Delete this image?")) return;

    const photos = currentAlbum.photos.filter((_, i) => i !== index);
    saveAlbum({ ...currentAlbum, photos });
  };

  /* -------------------- IMAGE VIEWER -------------------- */

  const openViewer = (index) => {
    setViewer({
      open: true,
      index,
      images: currentAlbum.photos,
    });
  };

  const closeViewer = () =>
    setViewer({ open: false, index: 0, images: [] });

  const nextImage = () =>
    setViewer((v) => ({
      ...v,
      index: (v.index + 1) % v.images.length,
    }));

  const prevImage = () =>
    setViewer((v) => ({
      ...v,
      index: (v.index - 1 + v.images.length) % v.images.length,
    }));

  /* -------------------- UI -------------------- */

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Gallery Albums</h1>

      {/* CREATE ALBUM */}
      {!currentAlbum && (
        <div className="flex gap-2">
          <input
            className="border p-2 rounded"
            placeholder="Album name"
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
          />
          <button
            onClick={createAlbum}
            className="bg-orange-500 text-white px-4 rounded"
          >
            Create Album
          </button>
        </div>
      )}

      {/* ALBUM LIST */}
      {!currentAlbum && (
        <div className="grid grid-cols-3 gap-4">
          {albums.map((a) => (
            <div
              key={a.id}
              className="border p-4 rounded cursor-pointer hover:shadow"
              onClick={() => {
                setCurrentAlbum(a);
                setEditTitle(a.name);
              }}
            >
              <div className="font-semibold">{a.name}</div>
              <div className="text-sm">{a.photos.length} images</div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteAlbum(a.id);
                }}
                className="mt-2 text-xs text-red-600"
              >
                delete album
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ALBUM DETAIL */}
      {currentAlbum && (
        <>
          <button
            onClick={() => setCurrentAlbum(null)}
            className="px-3 py-1 border rounded"
          >
            back
          </button>

          {/* EDIT ALBUM TITLE */}
          <div className="flex gap-2 items-center">
            <input
              className="border p-2 rounded font-semibold"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() =>
                saveAlbum({ ...currentAlbum, name: editTitle })
              }
            />
            <button
              onClick={() => deleteAlbum(currentAlbum.id)}
              className="text-sm text-red-600"
            >
              delete album
            </button>
          </div>

          {/* ADD IMAGES */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={addImages}
          />

          {/* IMAGE GRID */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {currentAlbum.photos.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  className="w-full h-32 object-cover rounded cursor-pointer"
                  onClick={() => openViewer(i)}
                />
                <button
                  onClick={() => deleteImage(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                >
                  delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* IMAGE VIEWER MODAL */}
      {viewer.open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={closeViewer}
            className="absolute top-4 right-6 text-white text-2xl"
          >
            ✕
          </button>

          <button
            onClick={prevImage}
            className="absolute left-5 text-white text-3xl"
          >
            ‹
          </button>

          <img
            src={viewer.images[viewer.index]}
            className="max-h-[90%] max-w-[90%] rounded"
          />

          <button
            onClick={nextImage}
            className="absolute right-5 text-white text-3xl"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
