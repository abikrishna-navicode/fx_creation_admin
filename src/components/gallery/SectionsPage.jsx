import React, { useEffect, useState } from "react";
import {
  loadSectionsFromStorage,
  saveSectionsToStorage,
  generateId,
  fileToDataUrl,
} from "../../utils/storage";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import ImageViewer from "./ImageViewer";

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
  const [viewer, setViewer] = useState({ open: false, index: 0, images: [] });

  useEffect(() => {
    saveSectionsToStorage(sections);
  }, [sections]);

  const activeSection = sections.find((s) => s.id === activeSectionId);

  /* ------------ IMAGE ACTIONS ------------ */

  const handleAddFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const buffers = await Promise.all(files.map(fileToDataUrl));
    const imagesToAdd = buffers.map((src) => ({
      id: generateId("img"),
      src,
    }));

    setSections((prev) =>
      prev.map((s) =>
        s.id === activeSectionId
          ? { ...s, images: [...s.images, ...imagesToAdd] }
          : s
      )
    );

    e.target.value = "";
  };

  const deleteImage = (imageId) => {
    if (!confirm("Delete this image?")) return;
    setSections((prev) =>
      prev.map((s) =>
        s.id === activeSectionId
          ? { ...s, images: s.images.filter((i) => i.id !== imageId) }
          : s
      )
    );
  };

  const editImage = (imageId) => {
    alert("Edit feature coming soon for image ID: " + imageId);
  };

  /* ------------ VIEWER ------------ */

  const openViewer = (index = 0) =>
    setViewer({ open: true, index, images: activeSection.images });

  const closeViewer = () => setViewer({ open: false, index: 0, images: [] });

  const viewerIndexChange = (fn) =>
    setViewer((prev) => ({
      ...prev,
      index: typeof fn === "function" ? fn(prev.index) : fn,
    }));

  return (
    <div className="space-y-6 pb-10">

      {/* HEADING + DROPDOWN LEFT */}
      <div className="flex items-center gap-6 px-6">
        <h1 className="text-2xl font-bold">Image Sections</h1>

        <select
          className="border px-3 py-2 rounded w-72"
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

      {/* HORIZONTAL LINE */}
      <hr className="border-t border-gray-300" />

      {/* SECTION TITLE + ADD IMAGES BUTTON */}
      <div className="flex justify-between items-center px-6">
        <div className="text-xl font-semibold">{activeSection.title}</div>

        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleAddFiles}
          />
          <span className="px-3 py-2 bg-orange-500 text-white rounded text-sm h-10 flex items-center">
            Add Images
          </span>
        </label>
      </div>

      {/* IMAGES GRID */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-[1200px]">
          {activeSection.images.length > 0
            ? activeSection.images.map((img) => (
                <div
                  key={img.id}
                  className="relative group w-full aspect-square overflow-hidden rounded border cursor-pointer"
                >
                  <img
                    src={img.src}
                    className="w-full h-full object-cover"
                    onClick={() => openViewer(activeSection.images.indexOf(img))}
                  />

                  {/* EDIT + DELETE ICONS - BLACK/WHITE */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => editImage(img.id)}
                      className="bg-white p-1 rounded shadow hover:bg-gray-200"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="bg-white p-1 rounded shadow hover:bg-red-200"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            : // Placeholder squares if no images
              Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full aspect-square border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm"
                >
                  Image
                </div>
              ))}
        </div>
      </div>

      {/* FULL VIEWER */}
      {viewer.open && (
        <ImageViewer
          images={viewer.images}
          index={viewer.index}
          onClose={closeViewer}
          onIndexChange={(v) => viewerIndexChange(v)}
        />
      )}
    </div>
  );
}
