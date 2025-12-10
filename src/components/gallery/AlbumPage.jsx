import React, { useState } from "react";
import {
  loadAlbumsFromStorage,
  saveAlbumsToStorage,
  generateId,
  fileToDataUrl,
} from "../../utils/storage";
import { FiEdit2, FiTrash2, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function AlbumPage() {
  const [albums, setAlbums] = useState(loadAlbumsFromStorage() || []);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [viewer, setViewer] = useState({ open: false, index: 0, images: [] });
  const [newAlbumName, setNewAlbumName] = useState("");
  const [editTitle, setEditTitle] = useState("");

  // ---------- ALBUM ACTIONS ----------
  const createAlbum = () => {
    if (!newAlbumName.trim()) return;
    const album = { id: generateId("album"), name: newAlbumName.trim(), photos: [] };
    const updated = [...albums, album];
    setAlbums(updated);
    saveAlbumsToStorage(updated);
    setNewAlbumName("");
  };

  const saveAlbum = (album) => {
    const updatedAlbums = albums.map((a) => (a.id === album.id ? album : a));
    setAlbums(updatedAlbums);
    saveAlbumsToStorage(updatedAlbums);
    setCurrentAlbum(album);
  };

  const deleteAlbum = (id) => {
    if (!confirm("Delete this album and all images?")) return;
    const updated = albums.filter((a) => a.id !== id);
    setAlbums(updated);
    saveAlbumsToStorage(updated);
    setCurrentAlbum(null);
  };

  const updateAlbumName = (id, name) => {
    const updatedAlbums = albums.map((a) => (a.id === id ? { ...a, name } : a));
    setAlbums(updatedAlbums);
    saveAlbumsToStorage(updatedAlbums);
    if (currentAlbum && currentAlbum.id === id) setCurrentAlbum({ ...currentAlbum, name });
  };

  // ---------- IMAGE ACTIONS ----------
  const addImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !currentAlbum) return;
    const base64s = await Promise.all(files.map(fileToDataUrl));
    const updatedAlbum = { ...currentAlbum, photos: [...currentAlbum.photos, ...base64s] };
    saveAlbum(updatedAlbum);
    e.target.value = "";
  };

  const deleteImage = (i) => {
    if (!confirm("Delete this image?")) return;
    const updatedPhotos = currentAlbum.photos.filter((_, idx) => idx !== i);
    saveAlbum({ ...currentAlbum, photos: updatedPhotos });
  };

  // ---------- IMAGE VIEWER ----------
  const openViewer = (i) => setViewer({ open: true, index: i, images: currentAlbum.photos });
  const closeViewer = () => setViewer({ open: false, index: 0, images: [] });
  const nextImage = () => setViewer((v) => ({ ...v, index: (v.index + 1) % v.images.length }));
  const prevImage = () =>
    setViewer((v) => ({ ...v, index: (v.index - 1 + v.images.length) % v.images.length }));

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">Albums</h1>

      {/* CREATE ALBUM */}
      {!currentAlbum && (
        <div className="flex gap-2 items-center mb-4">
          <input
            className="border p-2 rounded w-60"
            placeholder="Album name"
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
          />
          <button
            onClick={createAlbum}
            className="bg-orange-500 text-white px-4 rounded h-10"
          >
            Create Album
          </button>
        </div>
      )}

      {/* ALBUM LIST */}
      {!currentAlbum && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {albums.map((a) => (
            <div
              key={a.id}
              className="relative group rounded-lg overflow-hidden shadow-md border hover:shadow-xl transition"
            >
              <div
                className="cursor-pointer"
                onClick={() => {
                  const fresh = albums.find((al) => al.id === a.id);
                  setCurrentAlbum(fresh);
                  setEditTitle(fresh.name);
                }}
              >
                <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
                  {a.photos[0] ? (
                    <img
                      src={a.photos[0]}
                      alt={a.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div className="bg-white p-2 text-center font-semibold text-sm">
                  {a.name}
                </div>
              </div>

              {/* EDIT + DELETE ICON BUTTONS */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newName = prompt("Edit album name:", a.name);
                    if (newName) updateAlbumName(a.id, newName);
                  }}
                  className="bg-white shadow p-1 rounded hover:bg-orange-200"
                >
                  <FiEdit2 size={16} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAlbum(a.id);
                  }}
                  className="bg-white shadow p-1 rounded hover:bg-red-200"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
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
            Back
          </button>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={addImages}
            className="mt-2"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {currentAlbum.photos.map((img, i) => (
              <div
                key={i}
                className="relative group w-full aspect-square overflow-hidden rounded border cursor-pointer"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  onClick={() => openViewer(i)}
                />

                {/* SMALL DELETE ICON */}
                <button
                  onClick={() => deleteImage(i)}
                  className="absolute top-2 right-2 bg-white p-1 rounded shadow opacity-0 group-hover:opacity-100 transition hover:bg-red-200"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* FULL IMAGE VIEWER */}
      {viewer.open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={closeViewer}
            className="absolute top-4 right-6 text-white text-3xl"
          >
            <FiX />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-5 text-white text-4xl"
          >
            <FiChevronLeft />
          </button>
          <img
            src={viewer.images[viewer.index]}
            className="max-h-[90%] max-w-[90%] rounded"
          />
          <button
            onClick={nextImage}
            className="absolute right-5 text-white text-4xl"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
