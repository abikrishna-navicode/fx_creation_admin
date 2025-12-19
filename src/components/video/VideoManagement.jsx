import React, { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../../utils/storage";
import AddEditVideoModal from "./AddEditVideoModal";
import VideoCard from "./VideoCard";
import CategoryFilter from "./CategoryFilter";

export default function VideoManagement() {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editVideo, setEditVideo] = useState(null);

  const categories = ["all", "Short Video", "Long Video"]; // Fixed categories

  useEffect(() => {
    setVideos(getFromStorage("videos", []));
  }, []);

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
    if (!confirm("Delete this video?")) return;
    persistVideos(videos.filter((v) => v.id !== id));
  };

  const handleSaveFromModal = ({ video }) => {
    if (video.id) {
      persistVideos(videos.map((v) => (v.id === video.id ? video : v)));
    } else {
      persistVideos([...videos, { ...video, id: crypto.randomUUID() }]);
    }

    setShowModal(false);
    setEditVideo(null);
  };

  const filteredVideos =
    filter === "all" ? videos : videos.filter((v) => v.category === filter);

  return (
    <div className="p-4 lg:p-6">
      {/* TITLE + ADD BUTTON */}
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between mb-6 text-center lg:text-left">
        <h1 className="text-2xl font-bold">Video Management</h1>

        <button
          onClick={handleOpenAdd}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full sm:w-auto"
        >
          + Add Video
        </button>
      </div>

      {/* FILTER */}
      <div className="flex justify-center lg:justify-start mb-4">
        <CategoryFilter categories={categories} active={filter} onSelect={setFilter} />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 place-items-center lg:place-items-stretch">
        {filteredVideos.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 p-10 border rounded w-full">
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
          categories={categories.slice(1)} // Exclude "all" in modal
        />
      )}
    </div>
  );
}
