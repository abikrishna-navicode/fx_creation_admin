import React, { useEffect, useState } from "react";

export default function AddEditVideoModal({
  onClose,
  onSave,
  initialData = null,
  categories = ["Short Video", "Long Video"],
}) {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setVideoUrl(initialData.url || "");
      setSelectedCategory(initialData.category || "");
    }
  }, [initialData]);

  const normalizeEmbed = (url) => {
    try {
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
    if (!title.trim() || !videoUrl.trim() || !selectedCategory) {
      alert("Please provide title, URL, and category.");
      return;
    }

    const videoObj = {
      id: initialData?.id || null,
      title: title.trim(),
      url: normalizeEmbed(videoUrl.trim()),
      category: selectedCategory,
    };

    onSave(videoObj);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">
          {initialData ? "Edit Video" : "Add New Video"}
        </h2>

        <div className="flex flex-col gap-3">
          <input
            className="w-full border rounded p-2"
            placeholder="Video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full border rounded p-2"
            placeholder="YouTube URL or embed URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          {/* CATEGORY SELECTION */}
          <div className="flex flex-col items-start w-full">
            <label className="font-regular text-sm mb-1 text-left w-full">Category</label>
            <select
              className="w-full border rounded p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">-- choose --</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 w-full mt-2">
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
