// src/components/video/VideoCard.jsx
import React from "react";

export default function VideoCard({ video, onEdit, onDelete }) {
  return (
    <div className="bg-white border rounded shadow-sm p-3 flex flex-col">
      <div className="mb-2 text-sm text-gray-500">{video.category}</div>

      <div className="w-full bg-black/5 rounded overflow-hidden">
        {/* use provided embed URL (already normalized) */}
        <iframe
          src={video.url}
          title={video.title}
          className="w-full h-40"
          allowFullScreen
        />
      </div>

      <div className="mt-3 font-medium">{video.title}</div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 border px-3 py-1 rounded hover:bg-gray-50"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
