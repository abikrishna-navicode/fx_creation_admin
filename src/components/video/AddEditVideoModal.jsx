// src/components/video/AddEditVideoModal.jsx
import React, { useEffect, useState } from "react";
import { getFromStorage } from "../../utils/storage";

export default function AddEditVideoModal({
  onClose,
  onSave,
  initialData = null,
  existingCategories = [],
}) {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(existingCategories || []);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setVideoUrl(initialData.url || initialData.video_url || "");
      setSelectedCategory(initialData.category || "");
      setNewCategory("");
    }
  }, [initialData]);

  useEffect(() => {
    // sync with storage in case categories were changed elsewhere
    const cs = getFromStorage("categories", []);
    setCategories(cs);
  }, []);

  const normalizeEmbed = (url) => {
    try {
      // if it's a youtube link, convert to embed
      const short = /youtu\.be\/(.+)/;
      const long = /v=([^&]+)/;
      if (short.test(url)) return `https://www.youtube.com/embed/${url.match(short)[1]}`;
      if (long.test(url)) return `https://www.youtube.com/embed/${url.match(long)[1]}`;
      return url;
    } catch {
      return url;
    }
  };

  const handleSave = () => {
    const finalCategory = newCategory.trim() !== "" ? newCategory.trim() : selectedCategory;
    if (!title.trim() || !videoUrl.trim() || !finalCategory) {
      alert("Please provide title, URL and a category (or add a new one).");
      return;
    }

    // update categories list to pass back
    const updatedCategories = Array.from(new Set([...categories, finalCategory]));

    const videoObj = {
      id: initialData && initialData.id ? initialData.id : null,
      title: title.trim(),
      url: normalizeEmbed(videoUrl.trim()),
      category: finalCategory,
    };

    onSave({ video: videoObj, categories: updatedCategories });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {initialData ? "Edit Video" : "Add New Video"}
          </h2>

          <input
            className="w-full border rounded p-2 mb-3"
            placeholder="Video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full border rounded p-2 mb-3"
            placeholder="YouTube URL or embed URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <label className="text-sm font-medium">Category</label>
          <select
            className="w-full border rounded p-2 mb-3"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- choose existing --</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            className="w-full border rounded p-2 mb-3"
            placeholder="Or add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
            >
              {initialData ? "Save Changes" : "Add Video"}
            </button>

            <button
              onClick={onClose}
              className="flex-1 border p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}