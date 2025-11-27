import React, { useState } from "react";

export default function AlbumView({ album, onClose, onDeleteAlbum, onUpdateAlbum }) {
  const [currentIndex, setCurrentIndex] = useState(null); // index of image opened in modal

  const openImage = (i) => setCurrentIndex(i);
  const closeImage = () => setCurrentIndex(null);

  const deleteImage = (index) => {
    if (!confirm("Delete this image?")) return;
    const updated = { ...album, images: album.images.filter((_, i) => i !== index) };
    onUpdateAlbum(updated);
    if (currentIndex !== null) closeImage();
  };

  const addMoreImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const toBase64 = (file) =>
      new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.onerror = (err) => rej(err);
        reader.readAsDataURL(file);
      });
    const converted = await Promise.all(files.map((f) => toBase64(f)));
    const updated = { ...album, images: [...album.images, ...converted] };
    onUpdateAlbum(updated);
  };

  const deleteAlbumHandler = () => {
    if (!confirm("Delete this album and all images?")) return;
    onDeleteAlbum();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center p-6">
      <div className="bg-white w-full max-w-5xl h-[90vh] overflow-auto rounded shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <button onClick={onClose} className="px-3 py-1 border rounded mr-3">
              ← Back
            </button>
            <span className="text-xl font-semibold">{album.name}</span>
            <span className="ml-3 text-sm text-gray-500">({album.images.length} images)</span>
          </div>

          <div className="flex items-center gap-3">
            <label className="px-3 py-1 border rounded cursor-pointer text-sm">
              + Add Images
              <input type="file" accept="image/*" multiple onChange={addMoreImages} className="hidden" />
            </label>

            <button onClick={() => {
              const newName = prompt("Rename album", album.name);
              if (newName && newName.trim()) onUpdateAlbum({ ...album, name: newName.trim() });
            }} className="px-3 py-1 border rounded text-sm">
              Rename
            </button>

            <button onClick={deleteAlbumHandler} className="px-3 py-1 bg-red-500 text-white rounded text-sm">
              Delete Album
            </button>
          </div>
        </div>

        <div className="p-6">
          {album.images.length === 0 && (
            <div className="text-sm text-gray-500">No images. Use "Add Images" to upload.</div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {album.images.map((src, i) => (
              <div key={i} className="relative group">
                <img
                  src={src}
                  alt=""
                  className="w-full h-48 object-cover rounded cursor-pointer"
                  onClick={() => openImage(i)}
                />
                <button
                  onClick={() => deleteImage(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fullscreen image modal */}
        {currentIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="relative max-w-4xl w-full">
              <img src={album.images[currentIndex]} alt="" className="max-h-[80vh] w-auto mx-auto" />

              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <button
                  onClick={() => setCurrentIndex((s) => (s > 0 ? s - 1 : s))}
                  className="px-3 py-2 bg-white/70 rounded mr-2"
                >
                  ‹
                </button>
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <button
                  onClick={() => setCurrentIndex((s) => (s < album.images.length - 1 ? s + 1 : s))}
                  className="px-3 py-2 bg-white/70 rounded ml-2"
                >
                  ›
                </button>
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={closeImage} className="px-3 py-1 bg-white/70 rounded">
                  Close
                </button>
                <button
                  onClick={() => {
                    if (!confirm("Delete this image?")) return;
                    deleteImage(currentIndex);
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
