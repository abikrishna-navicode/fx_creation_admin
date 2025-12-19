import React, { useEffect, useRef, useState } from "react";
import {
  loadAlbumsFromStorage,
  saveAlbumsToStorage,
  generateId,
  fileToDataUrl,
} from "../../utils/storage";
import {
  FiTrash2,
  FiUpload,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const MAX_IMAGES_PER_ALBUM = 20;
const MAX_ALBUMS = 10;

export default function AlbumPage() {
  const [albums, setAlbums] = useState(loadAlbumsFromStorage() || []);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [viewer, setViewer] = useState({ open: false, index: 0, images: [] });
  const [newAlbumName, setNewAlbumName] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);

  const fileInputRef = useRef(null);

  const remainingSlots = currentAlbum
    ? MAX_IMAGES_PER_ALBUM - currentAlbum.photos.length
    : 0;

  useEffect(() => {
    saveAlbumsToStorage(albums);
  }, [albums]);

  // ---------- ALBUM ACTIONS ----------
  const createAlbum = () => {
    if (!newAlbumName.trim() || albums.length >= MAX_ALBUMS) return;
    const album = {
      id: generateId("album"),
      name: newAlbumName.trim(),
      photos: [],
    };
    setAlbums((prev) => [...prev, album]);
    setNewAlbumName("");
  };

  const saveAlbum = (album) => {
    setAlbums((prev) => prev.map((a) => (a.id === album.id ? album : a)));
    setCurrentAlbum(album);
  };

  const deleteAlbum = (id) => {
    if (!confirm("Delete this album and all images?")) return;
    setAlbums((prev) => prev.filter((a) => a.id !== id));
    setCurrentAlbum(null);
  };

  // ---------- IMAGE ACTIONS ----------
  const addFilesToPreview = async (files) => {
    if (!files.length || !currentAlbum) return;

    const allowed = files.slice(
      0,
      MAX_IMAGES_PER_ALBUM -
        currentAlbum.photos.length -
        previewImages.length
    );
    if (!allowed.length) return;

    const buffers = await Promise.all(allowed.map(fileToDataUrl));
    const images = buffers.map((src) => ({ id: generateId("img"), src }));
    setPreviewImages((prev) => [...prev, ...images]);
  };

  const savePreview = () => {
    if (!previewImages.length) return;
    const updatedAlbum = {
      ...currentAlbum,
      photos: [...currentAlbum.photos, ...previewImages.map((i) => i.src)],
    };
    saveAlbum(updatedAlbum);
    setPreviewImages([]);
    setShowUpload(false);
  };

  const removePreviewImage = (id) => {
    setPreviewImages((prev) => prev.filter((i) => i.id !== id));
  };

  const deleteImage = (index) => {
    if (!confirm("Delete this image?")) return;
    const updatedPhotos = currentAlbum.photos.filter((_, i) => i !== index);
    saveAlbum({ ...currentAlbum, photos: updatedPhotos });
  };

  const onDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;
    const items = [...currentAlbum.photos];
    const [moved] = items.splice(dragIndex, 1);
    items.splice(dropIndex, 0, moved);
    saveAlbum({ ...currentAlbum, photos: items });
    setDragIndex(null);
  };

  // ---------- VIEWER ----------
  const openViewer = (index) =>
    setViewer({ open: true, index, images: currentAlbum.photos });
  const closeViewer = () =>
    setViewer({ open: false, index: 0, images: [] });
  const prevImage = () =>
    setViewer((v) => ({
      ...v,
      index: (v.index - 1 + v.images.length) % v.images.length,
    }));
  const nextImage = () =>
    setViewer((v) => ({
      ...v,
      index: (v.index + 1) % v.images.length,
    }));

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-center lg:text-left">
        Albums
      </h1>

      {/* CREATE ALBUM */}
      {!currentAlbum && albums.length < MAX_ALBUMS && (
        <div className="flex flex-col lg:flex-row gap-2 items-center lg:items-start justify-center lg:justify-start">
          <input
            className="border p-2 rounded w-full sm:w-72 text-center lg:text-left"
            placeholder="Album name"
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
          />
          <button
            onClick={createAlbum}
            className="bg-orange-500 text-white px-4 rounded h-10 w-full sm:w-72 lg:w-auto"
          >
            Create Album
          </button>
        </div>
      )}

      {/* ALBUM LIST */}
      {!currentAlbum && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center lg:place-items-stretch">
          {albums.map((a) => (
            <div
              key={a.id}
              className="relative group rounded-lg overflow-hidden shadow-md border hover:shadow-xl transition w-full max-w-[280px] lg:max-w-none"
            >
              <div
                className="cursor-pointer"
                onClick={() => setCurrentAlbum(a)}
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

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteAlbum(a.id);
                }}
                className="absolute top-2 right-2 bg-white shadow p-1 rounded opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ALBUM DETAIL */}
      {currentAlbum && (
        <>
          <div className="flex flex-col lg:flex-row gap-2 items-center lg:justify-start justify-center">
            <button
              onClick={() => {
                setCurrentAlbum(null);
                setPreviewImages([]);
              }}
              className="px-4 py-2 border rounded w-full sm:w-72 lg:w-auto"
            >
              Back
            </button>

            <button
              onClick={() => setShowUpload(true)}
              className="px-4 py-2 rounded text-white bg-orange-500 w-full sm:w-72 lg:w-auto"
            >
              Add Images
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 place-items-center lg:place-items-stretch mt-4">
            {currentAlbum.photos.map((img, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(index)}
                className="relative group w-full max-w-[260px] lg:max-w-none aspect-square overflow-hidden rounded border cursor-pointer"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  onClick={() => openViewer(index)}
                />

                <button
                  onClick={() => deleteImage(index)}
                  className="absolute top-2 right-2 bg-white p-1 rounded shadow opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md p-6 rounded relative">
            <button
              onClick={() => {
                setShowUpload(false);
                setPreviewImages([]);
              }}
              className="absolute top-3 right-3"
            >
              <FiX size={18} />
            </button>

            <h3 className="font-semibold mb-3 text-center text-lg">
              Add Images
            </h3>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addFilesToPreview(Array.from(e.dataTransfer.files));
              }}
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed rounded p-6 text-center cursor-pointer mb-4"
            >
              <FiUpload size={32} className="mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-gray-600">
                Drag & drop images or click to browse
              </p>
            </div>

            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 place-items-center">
                {previewImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative w-full max-w-[120px] aspect-square border rounded overflow-hidden"
                  >
                    <img src={img.src} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removePreviewImage(img.id)}
                      className="absolute top-1 right-1 bg-white rounded p-1 shadow"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  setShowUpload(false);
                  setPreviewImages([]);
                }}
                className="px-4 py-2 border rounded w-full sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 bg-orange-500 text-white rounded w-full sm:w-auto"
              >
                Browse
              </button>

              <button
                onClick={savePreview}
                disabled={!previewImages.length}
                className="px-4 py-2 bg-green-500 text-white rounded w-full sm:w-auto"
              >
                Save
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) =>
                addFilesToPreview(Array.from(e.target.files))
              }
            />
          </div>
        </div>
      )}

      {/* IMAGE VIEWER */}
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
