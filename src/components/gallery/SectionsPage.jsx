import React, { useEffect, useState, useRef } from "react";
import {
  loadSectionsFromStorage,
  saveSectionsToStorage,
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

const MAX_IMAGES_PER_SECTION = 20;

export default function SectionsPage() {
  const defaultSections = [
    { id: "hero", title: "Hero Section", images: [] },
    { id: "experience", title: "Experience Section", images: [] },
    { id: "creativity", title: "Creativity Section", images: [] },
    { id: "vision", title: "Vision Section", images: [] },
    { id: "gallery", title: "Gallery Section", images: [] },
  ];

  const [sections, setSections] = useState(() => {
    const stored = loadSectionsFromStorage();
    if (stored && stored.length) {
      return defaultSections.map((def) => {
        const found = stored.find((s) => s.id === def.id);
        return found ? found : def;
      });
    }
    return defaultSections;
  });

  const [activeSectionId, setActiveSectionId] = useState(defaultSections[0].id);
  const [showUpload, setShowUpload] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [viewer, setViewer] = useState({ open: false, index: 0, images: [] });

  const fileInputRef = useRef(null);

  const activeSection = sections.find((s) => s.id === activeSectionId);
  const remainingSlots = activeSection
    ? MAX_IMAGES_PER_SECTION - activeSection.images.length
    : 0;

  useEffect(() => {
    saveSectionsToStorage(sections);
  }, [sections]);

  // ---------- IMAGE ACTIONS ----------
  const addFilesToPreview = async (files) => {
    if (!files.length || remainingSlots <= 0) return;

    const allowed = files.slice(0, remainingSlots - previewImages.length);
    if (!allowed.length) return;

    const buffers = await Promise.all(allowed.map(fileToDataUrl));
    const images = buffers.map((src) => ({ id: generateId("img"), src }));
    setPreviewImages((prev) => [...prev, ...images]);
  };

  const savePreview = () => {
    if (!previewImages.length) return;
    setSections((prev) =>
      prev.map((s) =>
        s.id === activeSectionId
          ? { ...s, images: [...s.images, ...previewImages.map((i) => i.src)] }
          : s
      )
    );
    setPreviewImages([]);
    setShowUpload(false);
  };

  const removePreviewImage = (id) => {
    setPreviewImages((prev) => prev.filter((i) => i.id !== id));
  };

  const deleteImage = (index) => {
    if (!confirm("Delete this image?")) return;
    setSections((prev) =>
      prev.map((s) =>
        s.id === activeSectionId
          ? { ...s, images: s.images.filter((_, i) => i !== index) }
          : s
      )
    );
  };

  const onDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;
    const items = [...activeSection.images];
    const [moved] = items.splice(dragIndex, 1);
    items.splice(dropIndex, 0, moved);
    setSections((prev) =>
      prev.map((s) =>
        s.id === activeSectionId ? { ...s, images: items } : s
      )
    );
    setDragIndex(null);
  };

  // ---------- VIEWER ----------
  const openViewer = (index) =>
    setViewer({ open: true, index, images: activeSection.images });
  const closeViewer = () => setViewer({ open: false, index: 0, images: [] });
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
      {/* HEADING + SELECT */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
        <h1 className="text-2xl font-bold text-center lg:text-left">
          Image Sections
        </h1>

        <select
          className="border px-3 py-2 rounded w-full sm:w-80 text-center lg:text-left"
          value={activeSectionId}
          onChange={(e) => setActiveSectionId(e.target.value)}
        >
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <hr />

      {/* SECTION HEADER */}
      <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-3">
        <div className="text-xl font-semibold text-center lg:text-left">
          {activeSection.title}
        </div>

        <button
          onClick={() => setShowUpload(true)}
          disabled={remainingSlots <= 0}
          className={`px-4 py-2 rounded text-white bg-orange-500 w-full sm:w-60 lg:w-auto text-center ${
            remainingSlots <= 0 && "opacity-50 cursor-not-allowed"
          }`}
        >
          Add Images
        </button>
      </div>

      {remainingSlots <= 0 && (
        <p className="text-sm text-red-500 text-center lg:text-left">
          Maximum images reached. Delete one to add more.
        </p>
      )}

      {/* IMAGE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {activeSection.images.map((img, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(index)}
            className="relative group w-full max-w-[280px] aspect-square overflow-hidden rounded border cursor-pointer"
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
