import React, { useEffect, useState } from "react";
import {
  loadSectionsFromStorage,
  saveSectionsToStorage,
  generateId,
  fileToDataUrl,
} from "../../utils/storage";
import ImageViewer from "./ImageViewer";

export default function SectionsPage() {
  // Load / init sections
  const [sections, setSections] = useState(() => {
    const existing = loadSectionsFromStorage();
    if (existing && existing.length) return existing;
    return [
      { id: "header", title: "Header", images: [] },
      { id: "experience", title: "Experience", images: [] },
      { id: "creativity", title: "Creativity", images: [] },
      { id: "expertise", title: "Expertise", images: [] },
      { id: "gallery", title: "Gallery", images: [] },
      { id: "vision", title: "Vision", images: [] },
    ];
  });

  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id);
  const [viewer, setViewer] = useState({ open: false, index: 0, images: [] });
  const [newSectionTitle, setNewSectionTitle] = useState("");

  useEffect(() => {
    saveSectionsToStorage(sections);
  }, [sections]);

  const activeSection = sections.find((s) => s.id === activeSectionId);

  /* -------------------- SECTION ACTIONS -------------------- */

  const addSection = () => {
    if (!newSectionTitle.trim()) return alert("Section title required");

    const newSection = {
      id: generateId("section"),
      title: newSectionTitle.trim(),
      images: [],
    };

    setSections((prev) => [...prev, newSection]);
    setActiveSectionId(newSection.id);
    setNewSectionTitle("");
  };

  const editSectionTitle = (sectionId, title) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, title } : s))
    );
  };

  const deleteSection = (sectionId) => {
    if (!confirm("Delete this section and all images?")) return;

    setSections((prev) => {
      const updated = prev.filter((s) => s.id !== sectionId);
      if (updated.length) setActiveSectionId(updated[0].id);
      return updated;
    });
  };

  /* -------------------- IMAGE ACTIONS -------------------- */

  const handleAddFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !activeSection) return;

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

  /* -------------------- IMAGE VIEWER -------------------- */

  const openViewer = (index = 0) =>
    setViewer({ open: true, index, images: activeSection.images });

  const closeViewer = () =>
    setViewer({ open: false, index: 0, images: [] });

  const viewerIndexChange = (fn) =>
    setViewer((v) => ({
      ...v,
      index: typeof fn === "function" ? fn(v.index) : fn,
    }));

  /* -------------------- UI -------------------- */

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Image Sections</h1>

      <div className="flex gap-4">
        {/* LEFT – SECTIONS LIST */}
        <div className="w-72 bg-white border rounded p-3">
          <div className="font-semibold mb-2">Sections</div>

          <div className="flex gap-2 mb-3">
            <input
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="New section name"
              className="border px-2 py-1 text-sm rounded flex-1"
            />
            <button
              onClick={addSection}
              className="px-3 py-1 bg-orange-500 text-white rounded text-sm"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {sections.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSectionId(s.id)}
                  className={`flex-1 text-left px-2 py-1 rounded ${
                    s.id === activeSectionId
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {s.title}
                </button>

                <input
                  value={s.title}
                  onChange={(e) => editSectionTitle(s.id, e.target.value)}
                  className="border px-1 text-xs rounded w-28"
                />

                <button
                  onClick={() => deleteSection(s.id)}
                  className="text-xs text-red-600"
                >
                  delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – IMAGES */}
        <div className="flex-1 bg-white border rounded p-4">
          <div className="flex justify-between mb-3">
            <div>
              <div className="text-sm text-gray-500">Active Section</div>
              <div className="font-semibold">{activeSection?.title}</div>
            </div>

            <div className="flex gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleAddFiles}
                />
                <span className="px-3 py-1 bg-orange-500 text-white rounded text-sm">
                  Add images
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {activeSection?.images.map((img, i) => (
              <div key={img.id} className="relative">
                <img
                  src={img.src}
                  className="h-36 w-full object-cover rounded cursor-pointer"
                  onClick={() => openViewer(i)}
                />
                <button
                  onClick={() => deleteImage(img.id)}
                  className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

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
