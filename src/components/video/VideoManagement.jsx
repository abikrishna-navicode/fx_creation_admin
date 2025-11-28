// src/components/video/VideoManagement.jsx
import React, { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../../utils/storage";
import AddEditVideoModal from "./AddEditVideoModal";
import VideoCard from "./VideoCard";
import CategoryFilter from "./CategoryFilter";

export default function VideoManagement() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editVideo, setEditVideo] = useState(null);

  // Load videos and categories on mount (and whenever component remounts)
  useEffect(() => {
    const vs = getFromStorage("videos", []);
    const cs = getFromStorage("categories", []);
    setVideos(vs);
    setCategories(cs);
  }, []);

  // helper to persist videos and update state
  const persistVideos = (updated) => {
    saveToStorage("videos", updated);
    setVideos(updated);
  };

  const handleOpenAdd = () => {
    setEditVideo(null);
    setShowModal(true);
  };

  const handleEdit = (video) => {
    setEditVideo(video);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    const updated = videos.filter((v) => v.id !== id);
    persistVideos(updated);
  };

  const handleSaveFromModal = ({ video, categories: updatedCategories }) => {
    // update categories if provided
    if (updatedCategories) {
      const uniq = Array.from(new Set(updatedCategories));
      saveToStorage("categories", uniq);
      setCategories(uniq);
    }

    if (video.id) {
      // edit existing video
      const updated = videos.map((v) => (v.id === video.id ? video : v));
      persistVideos(updated);
    } else {
      // new video
      const newVideo = { ...video, id: Date.now() };
      const updated = [...videos, newVideo];
      persistVideos(updated);
    }

    setShowModal(false);
    setEditVideo(null);
  };

  const filteredVideos =
    filter === "all" ? videos : videos.filter((v) => v.category === filter);

  return (
    <div className="p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Video Management</h1>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={handleOpenAdd}
        >
          + Add Video
        </button>
      </div>

      {/* Category filter */}
      <CategoryFilter
        categories={["all", ...categories]}
        active={filter}
        onSelect={setFilter}
      />

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredVideos.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 p-10 border rounded">
            No videos yet. Click <strong>+ Add Video</strong> to add one.
          </div>
        ) : (
          filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onEdit={() => handleEdit(video)}
              onDelete={() => handleDelete(video.id)}
            />
          ))
        )}
      </div>

      {showModal && (
        <AddEditVideoModal
          onClose={() => {
            setShowModal(false);
            setEditVideo(null);
          }}
          onSave={handleSaveFromModal}
          initialData={editVideo}
          existingCategories={categories}
        />
      )}
    </div>
  );
}
