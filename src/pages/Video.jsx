import { useState } from "react";
import AddVideoModal from "../components/AddVideoModal";
import VideoCard from "../components/VideoCard";

export default function Video() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [videos, setVideos] = useState([]); // start empty

  const addVideo = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  const deleteVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">

      {/* --- HEADER LINE (Line 1) --- */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Video Management</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-md"
        >
          + Add Video
        </button>
      </div>

      {/* --- NO VIDEOS YET MESSAGE --- */}
      {videos.length === 0 && (
        <p className="mt-4 text-gray-600 text-lg">No videos yet. Add one!</p>
      )}

      {/* --- VIDEO GRID --- */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {videos.map((vid, index) => (
          <VideoCard
            key={index}
            video={vid}
            onDelete={() => deleteVideo(index)}
          />
        ))}
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <AddVideoModal
          onClose={() => setIsModalOpen(false)}
          onUpload={addVideo}
        />
      )}
    </div>
  );
}
